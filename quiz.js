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
  
  // 유사어 모드만 선택된 경우, 유사어가 있는 단어만 필터링
  if (quizData.modes.length === 1 && quizData.modes[0] === 'synonym') {
    quizData.words = quizData.words.filter(word => word.synonyms && word.synonyms.length > 0);
    
    if (quizData.words.length === 0) {
      alert('유사어가 있는 단어가 없습니다. 다른 모드를 선택해주세요.');
      location.href = 'index.html';
      return;
    }
  }
  
  quizData.currentIndex = 0;
  quizData.wrongList = [];
