// words.js - 단어 데이터베이스

const WORD_SETS = {
  // 첫 번째 단어장
  superintelligence: {
    name: "Superintelligence",
    words: [
      { term: "artificial", meaning: ["인공의", "인위적인"], synonyms: ["synthetic", "man-made"] },
      { term: "intelligence", meaning: ["지능", "지성"], synonyms: ["intellect", "cognition"] },
      { term: "algorithm", meaning: ["알고리즘", "계산법"], synonyms: ["procedure", "formula"] },
      { term: "neural", meaning: ["신경의", "신경망의"], synonyms: [] },
      { term: "network", meaning: ["네트워크", "망"], synonyms: ["system", "web"] },
      { term: "cognitive", meaning: ["인지의", "인식의"], synonyms: ["mental", "intellectual"] },
      { term: "autonomous", meaning: ["자율적인", "자동의"], synonyms: ["independent", "self-governing"] },
      { term: "superintelligence", meaning: ["초지능"], synonyms: [] },
      { term: "machine", meaning: ["기계", "장치"], synonyms: ["device", "apparatus"] },
      { term: "learning", meaning: ["학습", "배움"], synonyms: ["education", "training"] },
      { term: "consciousness", meaning: ["의식"], synonyms: ["awareness", "cognizance"] },
      { term: "sentient", meaning: ["지각이 있는", "감각이 있는"], synonyms: ["conscious", "aware"] },
      { term: "recursive", meaning: ["재귀적인", "순환하는"], synonyms: [] },
      { term: "optimization", meaning: ["최적화"], synonyms: ["improvement", "enhancement"] },
      { term: "exponential", meaning: ["지수적인", "급격한"], synonyms: [] },
      { term: "compute", meaning: ["계산하다"], synonyms: ["calculate", "process"] },
      { term: "data", meaning: ["데이터", "자료"], synonyms: ["information"] },
      { term: "predict", meaning: ["예측하다"], synonyms: ["forecast", "anticipate"] },
      { term: "model", meaning: ["모델", "모형"], synonyms: ["framework", "system"] },
      { term: "simulate", meaning: ["시뮬레이션하다", "모의실험하다"], synonyms: ["emulate", "replicate"] }
    ]
  },
  
  // 두 번째 단어장
  robotdog: {
    name: "Robot Dog",
    words: [
      { term: "robot", meaning: ["로봇"], synonyms: ["automaton", "android"] },
      { term: "canine", meaning: ["개의", "개과의"], synonyms: ["dog"] },
      { term: "mechanical", meaning: ["기계적인", "기계의"], synonyms: ["automatic", "mechanized"] },
      { term: "sensor", meaning: ["센서", "감지기"], synonyms: ["detector"] },
      { term: "actuator", meaning: ["액추에이터", "구동기"], synonyms: [] },
      { term: "locomotion", meaning: ["이동", "운동"], synonyms: ["movement", "motion"] },
      { term: "quadruped", meaning: ["네발동물", "사족보행"], synonyms: [] },
      { term: "companion", meaning: ["동반자", "친구"], synonyms: ["partner", "friend"] },
      { term: "servo", meaning: ["서보", "서보모터"], synonyms: [] },
      { term: "bipedal", meaning: ["이족보행의"], synonyms: [] },
      { term: "humanoid", meaning: ["인간형의"], synonyms: [] },
      { term: "cybernetic", meaning: ["인공두뇌학의", "사이버네틱스의"], synonyms: [] },
      { term: "prototype", meaning: ["시제품", "원형"], synonyms: ["model", "sample"] },
      { term: "dexterity", meaning: ["손재주", "민첩성"], synonyms: ["skill", "agility"] },
      { term: "interface", meaning: ["인터페이스", "접점"], synonyms: [] },
      { term: "mobile", meaning: ["이동식의", "움직이는"], synonyms: ["movable", "portable"] },
      { term: "navigate", meaning: ["탐색하다", "항해하다"], synonyms: ["guide", "steer"] },
      { term: "perceive", meaning: ["인지하다", "감지하다"], synonyms: ["detect", "sense"] },
      { term: "respond", meaning: ["반응하다", "응답하다"], synonyms: ["react", "answer"] },
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
