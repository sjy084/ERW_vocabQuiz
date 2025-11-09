// words.js - 단어 데이터베이스
// 여기에 단어를 추가/수정하세요!

const WORD_SETS = {
  superintelligence: {
    name: "superintelligence",
    words: [
      { term: "apple", meaning: ["사과"], synonyms: [] },
      { term: "tree", meaning: ["나무"], synonyms: [] }
    ]
  },
  robotdog: {
    name: "Robot Dog",
    words: [
      { term: "accomplish", meaning: ["성취하다", "달성하다"], synonyms: ["achieve", "complete", "fulfill"] },
      { term: "legitimate", meaning: ["합법적인", "정당한"], synonyms: ["legal", "valid"] }
    ]
  }
};

// 답안 확장 함수 (괄호 처리)
function expandAnswers(answer) {
  const results = [answer.trim()];
  const noParen = answer.replace(/\(.*?\)/g, "").trim();
  if (noParen !== answer) results.push(noParen);
  const keepInside = answer.replace(/[()]/g, "").trim();
  if (keepInside !== answer) results.push(keepInside);
  return [...new Set(results)];
}
