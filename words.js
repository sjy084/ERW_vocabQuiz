// words.js - 단어 데이터베이스
// 여기에 단어를 추가/수정하세요!

const WORD_SETS = {
  basic: {
    name: "기초 영단어",
    words: [
      { term: "apple", meaning: ["사과"], synonyms: [] },
      { term: "book", meaning: ["책"], synonyms: [] },
      { term: "computer", meaning: ["컴퓨터"], synonyms: [] },
      { term: "dog", meaning: ["개"], synonyms: ["puppy", "hound"] },
      { term: "elephant", meaning: ["코끼리"], synonyms: [] },
      { term: "flower", meaning: ["꽃"], synonyms: ["blossom", "bloom"] },
      { term: "house", meaning: ["집"], synonyms: ["home", "residence"] },
      { term: "pen", meaning: ["펜", "볼펜"], synonyms: [] },
      { term: "water", meaning: ["물"], synonyms: [] },
      { term: "tree", meaning: ["나무"], synonyms: [] }
    ]
  },
  intermediate: {
    name: "중급 영단어",
    words: [
      { term: "accomplish", meaning: ["성취하다", "달성하다"], synonyms: ["achieve", "complete", "fulfill"] },
      { term: "beneficial", meaning: ["유익한", "이로운"], synonyms: ["helpful", "advantageous", "useful"] },
      { term: "circumstances", meaning: ["상황", "환경"], synonyms: ["situation", "condition"] },
      { term: "distinguish", meaning: ["구별하다", "식별하다"], synonyms: ["differentiate", "discern"] },
      { term: "efficient", meaning: ["효율적인"], synonyms: ["effective", "productive"] },
      { term: "fundamental", meaning: ["기본적인", "근본적인"], synonyms: ["basic", "essential"] },
      { term: "generous", meaning: ["관대한", "후한"], synonyms: ["kind", "charitable"] },
      { term: "hypothesis", meaning: ["가설"], synonyms: ["theory", "assumption"] },
      { term: "inevitable", meaning: ["불가피한", "피할 수 없는"], synonyms: ["unavoidable", "certain"] },
      { term: "legitimate", meaning: ["합법적인", "정당한"], synonyms: ["legal", "valid"] }
    ]
  },
  advanced: {
    name: "고급 영단어",
    words: [
      { term: "ambiguous", meaning: ["모호한", "애매한"], synonyms: ["unclear", "vague", "obscure"] },
      { term: "compassion", meaning: ["연민", "동정심"], synonyms: ["sympathy", "empathy", "mercy"] },
      { term: "deteriorate", meaning: ["악화되다", "퇴화하다"], synonyms: ["decline", "worsen", "degrade"] },
      { term: "eloquent", meaning: ["웅변의", "설득력 있는"], synonyms: ["articulate", "fluent", "persuasive"] },
      { term: "meticulous", meaning: ["꼼꼼한", "세심한"], synonyms: ["careful", "thorough", "precise"] },
      { term: "perpetual", meaning: ["영구적인", "끊임없는"], synonyms: ["eternal", "endless", "constant"] },
      { term: "scrutinize", meaning: ["면밀히 조사하다", "자세히 살피다"], synonyms: ["examine", "inspect", "analyze"] },
      { term: "tenacious", meaning: ["집요한", "끈질긴"], synonyms: ["persistent", "determined", "stubborn"] },
      { term: "ubiquitous", meaning: ["어디에나 있는", "편재하는"], synonyms: ["omnipresent", "widespread"] },
      { term: "vindicate", meaning: ["정당화하다", "무죄를 입증하다"], synonyms: ["justify", "defend", "exonerate"] }
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
