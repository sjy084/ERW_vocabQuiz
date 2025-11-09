// words.js - 단어 데이터베이스

const WORD_SETS = {
  // 첫 번째 단어장
  superintelligence: {
    name: "Superintelligence",
    words: [
      { term: "simulate", meaning: ["시뮬레이션하다", "모의실험하다"], synonyms: ["emulate", "replicate"] },
      { term: "simulate1", meaning: ["시뮬레이션하다", "모의실험하다"], synonyms: ["emulate", "replicate"] },
      { term: "simulate2", meaning: ["시뮬레이션하다", "모의실험하다"], synonyms: ["emulate", "replicate"] },
      { term: "simulate3", meaning: ["시뮬레이션하다", "모의실험하다"], synonyms: ["emulate", "replicate"] },
      { term: "simulate4", meaning: ["시뮬레이션하다", "모의실험하다"], synonyms: ["emulate", "replicate"] },
      { term: "simulate5", meaning: ["시뮬레이션하다", "모의실험하다"], synonyms: ["emulate", "replicate"] },
      { term: "simulate6", meaning: ["시뮬레이션하다", "모의실험하다"], synonyms: ["emulate", "replicate"] },
      { term: "simulate7", meaning: ["시뮬레이션하다", "모의실험하다"], synonyms: ["emulate", "replicate"] },
      { term: "simulate8", meaning: ["시뮬레이션하다", "모의실험하다"], synonyms: ["emulate", "replicate"] },
      { term: "simulate9", meaning: ["시뮬레이션하다", "모의실험하다"], synonyms: ["emulate", "replicate"] },
      { term: "simulate0", meaning: ["시뮬레이션하다", "모의실험하다"], synonyms: ["emulate", "replicate"] },
      { term: "simulate11", meaning: ["시뮬레이션하다", "모의실험하다"], synonyms: ["emulate", "replicate"] },
      { term: "simulate12", meaning: ["시뮬레이션하다", "모의실험하다"], synonyms: ["emulate", "replicate"] },
      { term: "simulate13", meaning: ["시뮬레이션하다", "모의실험하다"], synonyms: ["emulate", "replicate"] },
      { term: "simulate14", meaning: ["시뮬레이션하다", "모의실험하다"], synonyms: ["emulate", "replicate"] }
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
