// words.js - 단어 데이터베이스
// 여기에 단어를 추가/수정하세요!

const WORD_SETS = {
  basic: {
    name: "기초 영단어",
    words: [
      { term: "apple", meaning: ["사과"] },
      { term: "book", meaning: ["책"] },
      { term: "computer", meaning: ["컴퓨터"] },
      { term: "dog", meaning: ["개"] },
      { term: "elephant", meaning: ["코끼리"] },
      { term: "flower", meaning: ["꽃"] },
      { term: "house", meaning: ["집"] },
      { term: "pen", meaning: ["펜", "볼펜"] },
      { term: "water", meaning: ["물"] },
      { term: "tree", meaning: ["나무"] }
    ]
  },
  intermediate: {
    name: "중급 영단어",
    words: [
      { term: "accomplish", meaning: ["성취하다", "달성하다"] },
      { term: "beneficial", meaning: ["유익한", "이로운"] },
      { term: "circumstances", meaning: ["상황", "환경"] },
      { term: "distinguish", meaning: ["구별하다", "식별하다"] },
      { term: "efficient", meaning: ["효율적인"] },
      { term: "fundamental", meaning: ["기본적인", "근본적인"] },
      { term: "generous", meaning: ["관대한", "후한"] },
      { term: "hypothesis", meaning: ["가설"] },
      { term: "inevitable", meaning: ["불가피한", "피할 수 없는"] },
      { term: "legitimate", meaning: ["합법적인", "정당한"] }
    ]
  },
  advanced: {
    name: "고급 영단어",
    words: [
      { term: "ambiguous", meaning: ["모호한", "애매한"] },
      { term: "compassion", meaning: ["연민", "동정심"] },
      { term: "deteriorate", meaning: ["악화되다", "퇴화하다"] },
      { term: "eloquent", meaning: ["웅변의", "설득력 있는"] },
      { term: "meticulous", meaning: ["꼼꼼한", "세심한"] },
      { term: "perpetual", meaning: ["영구적인", "끊임없는"] },
      { term: "scrutinize", meaning: ["면밀히 조사하다", "자세히 살피다"] },
      { term: "tenacious", meaning: ["집요한", "끈질긴"] },
      { term: "ubiquitous", meaning: ["어디에나 있는", "편재하는"] },
      { term: "vindicate", meaning: ["정당화하다", "무죄를 입증하다"] }
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
