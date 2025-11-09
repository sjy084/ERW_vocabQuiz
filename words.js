// words.js - 단어 데이터베이스

const WORD_SETS = {
  // 첫 번째 단어장
  superintelligence: {
    name: "Superintelligence",
    words: [
      { term: "existentialism", meaning: ["실존주의"], synonyms: [] },
      { term: "bring about", meaning: ["유발하다"], synonyms: ["cause"] },
      { term: "catastrophe", meaning: ["위기"], synonyms: ["crisis"] },
      { term: "contend", meaning: ["주장하다"], synonyms: ["argue"] },
      { term: "mutual", meaning: ["공동의"], synonyms: ["common"] },
      { term: "vulnerability", meaning: ["취약성"], synonyms: [] },
      { term: "constitute", meaning: ["구성하다"], synonyms: [] },
      { term: "seminal", meaning: ["영향력 있는"], synonyms: ["strongly influential"] },
      { term: "disseminate", meaning: ["생각을 퍼뜨리다"], synonyms: [] },
      { term: "concede", meaning: ["인정하다"], synonyms: ["admit","agree"] },
      { term: "emergence", meaning: ["등장","창발"], synonyms: [] },
      { term: "emergency", meaning: ["비상"], synonyms: [] },
      { term: "salient", meaning: ["현저한","중요한"], synonyms: ["prominent"] },
      { term: "saliency", meaning: ["현저성"], synonyms: [] },
      { term: "indifferent", meaning: ["무관심한"], synonyms: ["unconcerned"] },
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
