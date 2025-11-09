// main.js - 메인 페이지 스크립트

function startQuiz() {
  const wordSet = document.getElementById('wordSet').value;
  const modeEnKo = document.getElementById('mode-enko').checked;
  const modeKoEn = document.getElementById('mode-koen').checked;

  if (!modeEnKo && !modeKoEn) {
    alert('최소 하나의 모드를 선택해주세요!');
    return;
  }

  // 설정 저장
  localStorage.setItem('wordSet', wordSet);
  
  let mode;
  if (modeEnKo && modeKoEn) {
    mode = 'mixed';
  } else if (modeEnKo) {
    mode = 'en-ko';
  } else {
    mode = 'ko-en';
  }
  localStorage.setItem('mode', mode);

  // 퀴즈 페이지로 이동
  location.href = 'quiz.html';
}

function startStudy() {
  const wordSet = document.getElementById('wordSet').value;
  localStorage.setItem('wordSet', wordSet);
  location.href = 'study.html';
}
