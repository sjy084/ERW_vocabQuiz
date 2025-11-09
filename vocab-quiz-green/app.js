// Utility: load JSON
async function loadVocab() {
  const res = await fetch('./data/vocab.json', {cache: 'no-store'});
  if (!res.ok) throw new Error('vocab.json 로드 실패');
  return res.json();
}

// State
const state = {
  mode: 'en2ko',     // 'en2ko' | 'ko2en'
  theme: null,       // theme name
  words: [],         // current theme words
  order: [],         // shuffled indices
  i: 0,              // current pointer
  answered: false,
  wrongs: [],        // {idx, prompt, answer, user}
};

// Elements
const screenStart = document.getElementById('screen-start');
const screenQuiz  = document.getElementById('screen-quiz');
const screenResult= document.getElementById('screen-result');

const themeSel = document.getElementById('theme');
const btnStart = document.getElementById('btn-start');
const progress = document.getElementById('progress');

const badgeMode = document.getElementById('badge-mode');
const promptEl = document.getElementById('prompt');
const form = document.getElementById('answer-form');
const answerInput = document.getElementById('answer');
const feedback = document.getElementById('feedback');
const btnSubmit = document.getElementById('btn-submit');
const btnNext = document.getElementById('btn-next');

const resultScore = document.getElementById('result-score');
const wrongList = document.getElementById('wrong-list');
const btnRetryWrong = document.getElementById('btn-retry-wrong');
const btnHome = document.getElementById('btn-home');

// Simple shuffle
function shuffle(a) {
  const arr = [...a];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

// Normalize answer (case-insensitive, trim, collapse spaces)
function norm(s) {
  return (s ?? '').toString().trim().replace(/\s+/g, ' ').toLowerCase();
}

// Check correctness with support for multiple answers
function isCorrect(word, mode, user) {
  const userN = norm(user);
  const key = mode === 'en2ko' ? 'ko' : 'en';
  const answers = Array.isArray(word[key]) ? word[key] : [word[key]];
  return answers.map(x => norm(x)).includes(userN);
}

// Renderers
function setProgress() {
  if (!state.words.length) { progress.textContent = ''; return; }
  progress.textContent = `${state.i + 1} / ${state.words.length}`;
}

function showScreen(which) {
  screenStart.classList.toggle('hidden', which !== 'start');
  screenQuiz.classList.toggle('hidden', which !== 'quiz');
  screenResult.classList.toggle('hidden', which !== 'result');
}

function setModeBadge() {
  badgeMode.textContent = state.mode === 'en2ko' ? '영→한' : '한→영';
}

// Start quiz
async function init() {
  const data = await loadVocab();
  // populate themes
  const names = Object.keys(data.themes);
  themeSel.innerHTML = names.map(n => `<option value="${n}">${n}</option>`).join('');
  themeSel.value = names[0] || '';
  state._data = data;
  showScreen('start');
  setProgress();
  // enter key behavior on whole document: submit/next
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      if (!screenQuiz.classList.contains('hidden')) {
        e.preventDefault();
        if (!state.answered) {
          submitAnswer();
        } else {
          nextQuestion();
        }
      }
    }
  });
}

btnStart.addEventListener('click', () => {
  state.theme = themeSel.value;
  state.mode = document.querySelector('input[name="mode"]:checked').value;
  state.words = [...(state._data.themes[state.theme] || [])];
  state.order = shuffle(state.words.map((_, i) => i));
  state.i = 0;
  state.answered = false;
  state.wrongs = [];
  setModeBadge();
  showQuestion();
  showScreen('quiz');
  answerInput.focus();
});

function showQuestion() {
  const idx = state.order[state.i];
  const word = state.words[idx];
  const promptKey = state.mode === 'en2ko' ? 'en' : 'ko';
  promptEl.textContent = word[promptKey];
  feedback.style.display = 'none';
  feedback.className = 'feedback';
  feedback.textContent = '';
  btnNext.disabled = true;
  btnSubmit.disabled = false;
  answerInput.value = '';
  setProgress();
}

form.addEventListener('submit', (e) => {
  e.preventDefault();
  submitAnswer();
});

btnSubmit.addEventListener('click', (e) => {
  e.preventDefault();
  submitAnswer();
});

btnNext.addEventListener('click', () => {
  nextQuestion();
});

function submitAnswer() {
  if (state.answered) return;
  const idx = state.order[state.i];
  const word = state.words[idx];
  const ok = isCorrect(word, state.mode, answerInput.value);
  const ansKey = state.mode === 'en2ko' ? 'ko' : 'en';
  const corrects = Array.isArray(word[ansKey]) ? word[ansKey] : [word[ansKey]];
  feedback.style.display = 'block';
  if (ok) {
    feedback.className = 'feedback correct';
    feedback.innerHTML = `✅ 정답! <span class="small">정답: ${corrects.join(' / ')}</span>`;
  } else {
    feedback.className = 'feedback wrong';
    feedback.innerHTML = `❌ 오답. <span class="small">정답: ${corrects.join(' / ')}</span>`;
    const promptKey = state.mode === 'en2ko' ? 'en' : 'ko';
    state.wrongs.push({
      idx,
      prompt: word[promptKey],
      answer: corrects.join(' / '),
      user: answerInput.value
    });
  }
  btnSubmit.disabled = true;
  btnNext.disabled = false;
  state.answered = true;
}

function nextQuestion() {
  if (!state.answered) return;
  // advance
  if (state.i < state.words.length - 1) {
    state.i += 1;
    state.answered = false;
    showQuestion();
    answerInput.focus();
  } else {
    showResult();
  }
}

function showResult() {
  const total = state.words.length;
  const wrong = state.wrongs.length;
  const correct = total - wrong;
  resultScore.textContent = `총 ${total}문제 • 정답 ${correct} • 오답 ${wrong}`;
  wrongList.innerHTML = '';
  if (wrong === 0) {
    wrongList.innerHTML = '<p>완벽해요! 모든 문제를 맞혔습니다 🎉</p>';
  } else {
    for (const w of state.wrongs) {
      const el = document.createElement('div');
      el.className = 'wrong-item';
      el.innerHTML = `<div>
        <div class="wrong-q">문항: ${w.prompt}</div>
        <div class="small">정답: ${w.answer}</div>
      </div>
      <div class="small">입력: ${w.user || '(빈 입력)'}</div>`;
      wrongList.appendChild(el);
    }
  }
  showScreen('result');
}

btnRetryWrong.addEventListener('click', () => {
  if (state.wrongs.length === 0) {
    // nothing to retry -> go home
    showScreen('start');
    return;
  }
  // Build new set with only wrongs (preserve order but reshuffle for variation)
  const wrongIdxs = state.wrongs.map(w => w.idx);
  const unique = Array.from(new Set(wrongIdxs));
  state.order = shuffle(unique);
  state.i = 0;
  state.answered = false;
  state.wrongs = [];
  showScreen('quiz');
  showQuestion();
  answerInput.focus();
});

btnHome.addEventListener('click', () => {
  showScreen('start');
  progress.textContent = '';
});

// Kick off
init().catch(err => {
  alert(err.message || err);
});
