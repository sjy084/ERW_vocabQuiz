// study.js - 단어장 페이지 스크립트

window.addEventListener('DOMContentLoaded', () => {
  const wordSetKey = localStorage.getItem('wordSet');

  if (!wordSetKey || !WORD_SETS[wordSetKey]) {
    alert('단어장 정보가 없습니다. 처음 화면으로 이동합니다.');
    location.href = 'index.html';
    return;
  }

  const wordSet = WORD_SETS[wordSetKey];
  
  // 제목 업데이트
  document.getElementById('study-title').textContent = wordSet.name;

  // 단어 테이블 생성
  const tbody = document.getElementById('word-list');
  wordSet.words.forEach(word => {
    const tr = document.createElement('tr');
    
    // 유사어가 있으면 표시
    let synonymText = '';
    if (word.synonyms && word.synonyms.length > 0) {
      synonymText = `<br><span style="color: #059669; font-size: 0.9rem;">유사어: ${word.synonyms.join(', ')}</span>`;
    }
    
    tr.innerHTML = `
      <td>${word.term}${synonymText}</td>
      <td>${word.meaning.join(', ')}</td>
    `;
    tbody.appendChild(tr);
  });
});
