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
      { term: "obsolete", meaning: ["쓸모없는","쓸데없는"], synonyms: ["out of date","useless"] },
      { term: "obsolescence", meaning: ["노후화"], synonyms: [] },
      { term: "obliterate", meaning: ["지우다"], synonyms: ["erase"] },
      { term: "malice", meaning: ["악의"], synonyms: [] },
      { term: "corroborate", meaning: ["확증하다"], synonyms: ["support"] },
      { term: "aspiration", meaning: ["포부"], synonyms: [] },
      { term: "inadvertently", meaning: ["실수로","우연히"], synonyms: ["accidentally"] },
      { term: "futile", meaning: ["쓸데없는"<"쓸모없는"], synonyms: ["of no use","in vain"] },
      { term: "surreptitiously", meaning: ["은밀하게"], synonyms: ["secretly"] },
      { term: "immortality", meaning: ["불멸성"], synonyms: [] },
      { term: "nascent", meaning: ["초기의"], synonyms: ["a young","budding"] },
      { term: "hubris", meaning: ["거만"], synonyms: ["arrogance"] },
      { term: "refute", meaning: ["반박하다"], synonyms: ["disprove"] },
      { term: "refutation", meaning: ["논박"], synonyms: [] },
      { term: "reputation", meaning: ["명성"], synonyms: [] },
      { term: "implausible", meaning: ["믿을 수 없는"], synonyms: ["unlikely"] },
      { term: "anthropomorphosis", meaning: ["의인화"], synonyms: [] },
      { term: "admonition", meaning: ["훈계","비판"], synonyms: ["crticism","advice"] },
      { term: "premise", meaning: ["be at odds with","be at odds with"], synonyms: [""] },
      { term: "normatibity", meaning: ["최고선","규범"], synonyms: [] },
      { term: "consensus", meaning: ["동의"], synonyms: ["agreement"] },
      { term: "arbitrary", meaning: ["자의적인"], synonyms: [] },
      { term: "momentous", meaning: ["중요한"], synonyms: ["significant","important"] },
      { term: "inscrutable", meaning: ["신비한"], synonyms: ["mysterious"] },
      { term: "conductive", meaning: ["~에 기여하다"], synonyms: ["good for"] },
      { term: "accede", meaning: ["인정하다"], synonyms: ["agree"] },
      { term: "rejoice", meaning: ["기뻐하다"], synonyms: ["feel joy"] },
      { term: "supersede", meaning: ["대체하다"], synonyms: ["replace"] },
      { term: "preeminance", meaning: ["탁월한"], synonyms: ["excellence"] },
      { term: "progeny", meaning: ["후손"], synonyms: ["offspring"] }
  // 두 번째 단어장
  robotdog: {
    name: "Robot Dog",
    words: [
      { term: "synthetic", meaning: ["합성의", "인조의"], synonyms: ["artificial", "man-made"] },
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
      { term: "hanroro", meaning: ["락스타"], synonyms: [] },
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
