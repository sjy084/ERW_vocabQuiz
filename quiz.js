// quiz.js - 퀴즈 페이지 스크립트

let quizData = {
  words: [],
  mode: 'en-ko',
  currentIndex: 0,
  wrongList: []
};

// 페이지 로드 시 초기화
window.addEventListener('DOMContentLoaded', () => {
  console.log('페이지 로드됨');
  
  const wordSetKey = localStorage.getItem('wordSet');
  const mode = localStorage.getItem('mode');

  if (!wordSetKey || !mode || !WORD_SETS[wordSetKey]) {
    alert('설정값이 없습니다. 처음 화면으로 이동합니다.');
    location.href = 'index.html';
    return;
  }

  const wordSet = WORD_SETS[wordSetKey];
  quizData.words = [...wordSet.words].sort(() => Math.random() - 0.5);
  quizData.mode = mode;
  quizData.currentIndex = 0;
  quizData.wrongList = [];

  showQuestion();

  // 확인 버튼 클릭 이벤트
  const submitBtn = document.getElementById('submit-btn');
  console.log('버튼 찾음:', submitBtn);
  
  submitBtn.addEventListener('click', () => {
    console.log('버튼 클릭됨, 텍스트:', submitBtn.textContent);
    if (submitBtn.textContent === '확인') {
      checkAnswer();
    } else {
      nextQuestion();
    }
  });

  // Enter 키 이벤트
  document.getElementById('answer').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      console.log('엔터 키 눌림');
      if (submitBtn.textContent === '확인') {
        checkAnswer();
      } else {
        nextQuestion();
      }
    }
  });
});

function showQuestion() {
  console.log('showQuestion 호출됨, 인덱스:', quizData.currentIndex);
  
  const { words, mode, currentIndex } = quizData;

  if (currentIndex >= words.length) {
    // 퀴즈 완료
    localStorage.setItem('totalCount', words.length);
    localStorage.setItem('wrongCount', quizData.wrongList.length);
    localStorage.setItem('wrongList', JSON.stringify(quizData.wrongList));
    location.href = 'result.html';
    return;
  }

  const word = words[currentIndex];
  
  // 현재 모드 결정
  let currentMode = mode;
  if (mode === 'mixed') {
    currentMode = Math.random() < 0.5 ? 'en-ko' : 'ko-en';
  }

  // 문제와 정답 설정
  let question, answers;
  if (currentMode === 'en-ko') {
    question = word.term;
    answers = word.meaning;
  } else {
    question = word.meaning.join(', ');
    answers = [word.term];
  }

  // UI 업데이트
  document.getElementById('counter').textContent = `${currentIndex + 1} / ${words.length}`;
  document.getElementById('progress').style.width = `${((currentIndex + 1) / words.length) * 100}%`;
  document.getElementById('mode-badge').textContent = currentMode === 'en-ko' ? '영어 → 한국어' : '한국어 → 영어';
  document.getElementById('question').textContent = question;
  document.getElementById('answer').value = '';
  document.getElementById('answer').disabled = false;
  document.getElementById('result').innerHTML = '';
  document.getElementById('submit-btn').textContent = '확인';
  
  // 입력창에 포커스
  setTimeout(() => document.getElementById('answer').focus(), 0);

  // 현재 정답 저장
  quizData.currentAnswers = answers;
  quizData.currentWord = word;
}

function checkAnswer() {
  console.log('checkAnswer 호출됨');
  
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

  console.log('정답 여부:', isCorrect);

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
  setTimeout(() => {
    nextQuestion();
  }, 2000);
}

function nextQuestion() {
  console.log('nextQuestion 호출됨');
  quizData.currentIndex++;
  showQuestion();
}
