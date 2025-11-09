// quiz.js - 퀴즈 페이지 스크립트

let quizData = {
  words: [],
  modes: [],
  currentIndex: 0,
  wrongList: [],
  autoNextTimer: null
};

// 페이지 로드 시 초기화
window.addEventListener('DOMContentLoaded', () => {
  const wordSetKey = localStorage.getItem('wordSet');
  const modeString = localStorage.getItem('mode');

  if (!wordSetKey || !modeString) {
    alert('설정값이 없습니다. 처음 화면으로 이동합니다.');
    location.href = 'index.html';
    return;
  }

  // 오답 복습 모드 체크
  if (wordSetKey.startsWith('retry_')) {
    const wrongList = JSON.parse(localStorage.getItem('wrongList') || '[]');
    if (wrongList.length === 0) {
      alert('틀린 문제가 없습니다.');
      location.href = 'index.html';
      return;
    }
    quizData.words = [...wrongList].sort(() => Math.random() - 0.5);
  } else {
    // 일반 단어장 모드
    if (!WORD_SETS[wordSetKey]) {
      alert('단어장을 찾을 수 없습니다.');
      location.href = 'index.html';
      return;
    }
    const wordSet = WORD_SETS[wordSetKey];
    quizData.words = [...wordSet.words].sort(() => Math.random() - 0.5);
  }

  quizData.modes = modeString.split(',');
  quizData.currentIndex = 0;
  quizData.wrongList = [];

  showQuestion();

  // 확인/다음 버튼 클릭 이벤트
  document.getElementById('submit-btn').addEventListener('click', handleSubmit);

  // Enter 키 이벤트 - keydown으로 변경 (keypress는 deprecated)
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      e.preventDefault(); // 기본 동작 방지
      handleSubmit();
    }
  });
});

function handleSubmit() {
  const submitBtn = document.getElementById('submit-btn');
  const btnText = submitBtn.textContent.trim();
  
  if (btnText === '확인') {
    checkAnswer();
  } else if (btnText === '다음') {
    // 타이머 취소
    if (quizData.autoNextTimer) {
      clearTimeout(quizData.autoNextTimer);
      quizData.autoNextTimer = null;
    }
    nextQuestion();
  }
}

function showQuestion() {
  // 혹시 남아있는 타이머 취소
  if (quizData.autoNextTimer) {
    clearTimeout(quizData.autoNextTimer);
    quizData.autoNextTimer = null;
  }

  const { words, modes, currentIndex } = quizData;

  if (currentIndex >= words.length) {
    // 퀴즈 완료
    localStorage.setItem('totalCount', words.length);
    localStorage.setItem('wrongCount', quizData.wrongList.length);
    localStorage.setItem('wrongList', JSON.stringify(quizData.wrongList));
    location.href = 'result.html';
    return;
  }

  const word = words[currentIndex];
  
  // 현재 모드 랜덤 선택
  const currentMode = modes[Math.floor(Math.random() * modes.length)];

  // 문제와 정답 설정
  let question, answers, modeBadgeText;
  
  if (currentMode === 'en-ko') {
    question = word.term;
    answers = word.meaning;
    modeBadgeText = '영어 → 한국어';
  } else if (currentMode === 'ko-en') {
    question = word.meaning.join(', ');
    answers = [word.term];
    modeBadgeText = '한국어 → 영어';
  

index.html
69줄

html


main.js
33줄

js


quiz.html
45줄

html


quiz.js
235줄

js


result.html
42줄

html


result.js
51줄

js


study.html
47줄

html


study.js
35줄

js


style.css
395줄

css


words.js
61줄

js

간단한 영단어 암기 웹페이지야. 유사어 모드에 문제가 있어. 원했던건 유사어 모드를 선택시 유사어가 입력된 단어는 유사어와 term중 하나를 골라 문제를 출제, 나머지를 모두 정답으로 인정하고 유사어가 없는 문제는 자동으로 다른 모드중 하나를 골라 출제하는 것이었는데 유사어 모드를 선택시 한국어->영어만 가능해. 해결해줄래?


유사어 모드 폴백 로직 결함 파악 및 수정 방안 수립했음.
26초








문제를 찾았어요! quiz.js의 유사어 모드 fallback 로직에 문제가 있네요. 유사어만 선택했을 때, 유사어가 없는 단어를 만나면 자동으로 영어→한국어나 한국어→영어 중 하나를 선택해야 하는데, 현재는 그냥 문제를 건너뛰고 있어요.

quiz.js 파일을 수정해드릴게요:

Untitled
대화형 아티팩트 
수정했어요! 이제 유사어 모드가 제대로 작동할 거예요:

수정 내용:

유사어만 선택했을 때, 유사어가 없는 단어를 만나면 자동으로 영어→한국어 또는 한국어→영어 중 하나를 랜덤하게 선택해서 출제해요
다른 모드도 함께 선택했다면, 그 모드들 중에서 하나를 선택합니다
더 이상 문제를 건너뛰지 않아요
이제 유사어 모드를 선택하면:

유사어가 있는 단어 → 유사어와 term 중 하나를 문제로, 나머지를 정답으로 인정
유사어가 없는 단어 → 영어→한국어 또는 한국어→영어로 출제
정상적으로 작동할 거예요! 🎉

엥 유사어 모드가 가능은 해졌는데 문제가 있어.
유사어 모드와 다른 모드를 함께 선택하면 유사어가 있든 없든 함께 선택한, 유사어가 아닌 모드중 하나로 출력돼.


모드 선택 로직을 재구성하여 문제를 해결했다.
13초









아! 이해했어요. 현재는 먼저 모드를 랜덤으로 선택하고 나서 유사어를 체크하는데, 유사어 모드가 선택되어 있을 때는 유사어가 있는 단어는 무조건 유사어 모드로 출제해야 하는 거죠.

모드 선택 로직을 수정할게요:

Untitled
대화형 아티팩트 ∙ 버전 2 
완벽하게 수정했어요! 이제 로직이 이렇게 작동해요:

새로운 모드 선택 로직:

유사어 모드가 선택되어 있고 유사어가 있는 단어면 → 무조건 유사어 모드로 출제
유사어가 없는 단어면 → 유사어 모드를 제외한 다른 모드 중 랜덤 선택
예시:

유사어 모드 + 영어→한국어 선택 시:
"dog" (유사어: puppy, hound) → 유사어 모드로 출제
"apple" (유사어 없음) → 영어→한국어로 출제
유사어 모드만 선택 시:
"dog" (유사어 있음) → 유사어 모드로 출제
"apple" (유사어 없음) → 영어→한국어 또는 한국어→영어 중 랜덤 선택
이제 의도한 대로 작동할 거예요! 🎉



오늘 어떤 도움을 드릴까요?






1
/
3
  } else if (currentMode === 'synonym') {
    // 유사어 모드
    if (!word.synonyms || word.synonyms.length === 0) {
      // 유사어가 없으면 다른 모드로 fallback
      const fallbackModes = modes.filter(m => m !== 'synonym');
      let fallbackMode;
      
      if (fallbackModes.length > 0) {
        // 다른 모드가 선택되어 있으면 그 중 하나를 랜덤 선택
        fallbackMode = fallbackModes[Math.floor(Math.random() * fallbackModes.length)];
      } else {
        // 유사어만 선택했을 때는 en-ko와 ko-en 중 랜덤 선택
        fallbackMode = Math.random() < 0.5 ? 'en-ko' : 'ko-en';
      }
      
      if (fallbackMode === 'en-ko') {
        question = word.term;
        answers = word.meaning;
        modeBadgeText = '영어 → 한국어';
      } else {
        question = word.meaning.join(', ');
        answers = [word.term];
        modeBadgeText = '한국어 → 영어';
      }
      } else {
        // 유사어만 선택했는데 유사어가 없는 경우
        nextQuestion();
        return;
      }
    } else {
      // term과 synonyms를 합친 배열
      const allWords = [word.term, ...word.synonyms];
      // 랜덤으로 하나를 문제로 선택
      const questionIndex = Math.floor(Math.random() * allWords.length);
      question = allWords[questionIndex];
      // 나머지를 정답으로
      answers = allWords.filter((_, index) => index !== questionIndex);
      modeBadgeText = '유사어 (영어 → 영어)';
    }
  }

  // UI 업데이트
  document.getElementById('counter').textContent = `${currentIndex + 1} / ${words.length}`;
  document.getElementById('progress').style.width = `${((currentIndex + 1) / words.length) * 100}%`;
  document.getElementById('mode-badge').textContent = modeBadgeText;
  document.getElementById('question').textContent = question;
  document.getElementById('answer').value = '';
  document.getElementById('answer').disabled = false;
  document.getElementById('result').innerHTML = '';
  document.getElementById('submit-btn').textContent = '확인';
  
  // 입력창에 포커스
  setTimeout(() => {
    const answerInput = document.getElementById('answer');
    if (answerInput) {
      answerInput.focus();
    }
  }, 100);

  // 현재 정답 저장
  quizData.currentAnswers = answers;
  quizData.currentWord = word;
}

function checkAnswer() {
  const userAnswer = document.getElementById('answer').value.trim();
  const { currentAnswers, currentWord } = quizData;

  if (!userAnswer) {
    alert('답을 입력해주세요!');
    return;
  }

  // 모든 가능한 답 확장
  const expandedAnswers = currentAnswers.flatMap(ans => expandAnswers(ans));

  // 정답 체크 (대소문자 무시)
  const isCorrect = expandedAnswers.some(ans => 
    ans.toLowerCase() === userAnswer.toLowerCase()
  );

  // 결과 표시
  const resultDiv = document.getElementById('result');
  if (isCorrect) {
    resultDiv.innerHTML = `
      <div class="result-correct">
        <div class="result-title">
          <svg style="width: 24px; height: 24px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
            <polyline points="22 4 12 14.01 9 11.01"></polyline>
          </svg>
          정답입니다!
        </div>
      </div>
    `;
  } else {
    resultDiv.innerHTML = `
      <div class="result-wrong">
        <div class="result-title">
          <svg style="width: 24px; height: 24px;" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="15" y1="9" x2="9" y2="15"></line>
            <line x1="9" y1="9" x2="15" y2="15"></line>
          </svg>
          틀렸습니다
        </div>
        <div class="result-answer">정답: <strong>${currentAnswers.join(', ')}</strong></div>
      </div>
    `;
    quizData.wrongList.push(currentWord);
  }

  // 버튼을 "다음"으로 변경
  document.getElementById('answer').disabled = true;
  document.getElementById('submit-btn').textContent = '다음';
  
  // 2초 후 자동으로 다음 문제로
  quizData.autoNextTimer = setTimeout(() => {
    quizData.autoNextTimer = null;
    nextQuestion();
  }, 2000);
}

function nextQuestion() {
  // 타이머가 있으면 취소
  if (quizData.autoNextTimer) {
    clearTimeout(quizData.autoNextTimer);
    quizData.autoNextTimer = null;
  }
  
  quizData.currentIndex++;
  showQuestion();
}
