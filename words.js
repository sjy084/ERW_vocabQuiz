// words.js - 단어 데이터베이스

const WORD_SETS = {
  // 첫 번째 단어장
  superintelligence: {
    name: "Superintelligence",
    words: [
      { term: "simulate", meaning: ["시뮬레이션하다", "모의실험하다"], synonyms: ["emulate", "replicate"] }
    ]
  },
  
  // 두 번째 단어장
  robotdog: {
    name: "Robot Dog",
    words: [
      { term: "synthetic", meaning: ["합성의", "인조의"], synonyms: ["artificial", "man-made"] }
    ]
  }
};

function expandAnswers(answer) {
  const results = [answer.trim()];
  const noParen = answer.replace(/\(.*?\)/g, "").trim();
  if (noParen !== answer) results.push(noParen);
  const keepInside = answer.replace(/[()]/g, "").trim();
  if (keepInside !== answer) results.push(keepInside);
  return [...new Set(results)];
}
