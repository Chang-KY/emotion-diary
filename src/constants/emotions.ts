export const CATEGORY = {
  POSITIVE: 'positive',
  NEUTRAL: 'neutral',
  NEGATIVE: 'negative',
} as const;

export type CategoryType = typeof CATEGORY[keyof typeof CATEGORY];

export const emotions = [
  // 긍정적인 감정 -> +2 or +1
  {type: 'happy', emoji: '😊', label: '행복해요', score: 2, category: CATEGORY.POSITIVE},
  {type: 'excited', emoji: '🤩', label: '신나요', score: 2, category: CATEGORY.POSITIVE},
  {type: 'grateful', emoji: '🙏', label: '감사해요', score: 2, category: CATEGORY.POSITIVE},
  {type: 'relieved', emoji: '😌', label: '안도해요', score: 1, category: CATEGORY.POSITIVE},
  {type: 'proud', emoji: '😎', label: '뿌듯해요', score: 1, category: CATEGORY.POSITIVE},
  {type: 'love', emoji: '❤️', label: '사랑해요', score: 2, category: CATEGORY.POSITIVE},
  {type: 'satisfied', emoji: '😋', label: '만족해요', score: 2, category: CATEGORY.POSITIVE},
  {type: 'peaceful', emoji: '😇', label: '평온해요', score: 2, category: CATEGORY.POSITIVE},
  {type: 'blessed', emoji: '🌟', label: '축복받은 느낌', score: 2, category: CATEGORY.POSITIVE},
  {type: 'fun', emoji: '😂', label: '재밌어요', score: 2, category: CATEGORY.POSITIVE},
  {type: 'calm', emoji: '🧘', label: '차분해요', score: 1, category: CATEGORY.POSITIVE},
  {type: 'hopeful', emoji: '🌈', label: '희망적이에요', score: 2, category: CATEGORY.POSITIVE},
  {type: 'motivated', emoji: '💪', label: '의욕 넘쳐요', score: 2, category: CATEGORY.POSITIVE},
  {type: 'focused', emoji: '🎯', label: '집중돼요', score: 1, category: CATEGORY.POSITIVE},

  // 중립/혼란 감정 -> 점수를 0점 혹은 -1 점까지
  {type: 'neutral', emoji: '😐', label: '그저 그래요', score: 0, category: CATEGORY.NEUTRAL},
  {type: 'confused', emoji: '😕', label: '혼란스러워요', score: -1, category: CATEGORY.NEUTRAL},
  {type: 'tired', emoji: '😴', label: '피곤해요', score: -1, category: CATEGORY.NEUTRAL},
  {type: 'bored', emoji: '🥱', label: '심심해요', score: -1, category: CATEGORY.NEUTRAL},
  {type: 'indifferent', emoji: '😶', label: '무덤덤해요', score: 0, category: CATEGORY.NEUTRAL},
  {type: 'distracted', emoji: '🙃', label: '산만해요', score: -1, category: CATEGORY.NEUTRAL},
  {type: 'blank', emoji: '😵‍💫', label: '멍해요', score: -1, category: CATEGORY.NEUTRAL},
  {type: 'lazy', emoji: '😪', label: '귀찮아요', score: -1, category: CATEGORY.NEUTRAL},
  {type: 'overwhelmed', emoji: '😩', label: '벅차요', score: -1, category: CATEGORY.NEUTRAL},

  // 부정적인 감정 -> -2
  {type: 'sad', emoji: '😔', label: '슬퍼요', score: -2, category: CATEGORY.NEGATIVE},
  {type: 'angry', emoji: '😡', label: '화가 나요', score: -2, category: CATEGORY.NEGATIVE},
  {type: 'crying', emoji: '😭', label: '눈물나요', score: -2, category: CATEGORY.NEGATIVE},
  {type: 'guilty', emoji: '😓', label: '죄책감 들어요', score: -2, category: CATEGORY.NEGATIVE},
  {type: 'frustrated', emoji: '😤', label: '답답해요', score: -1, category: CATEGORY.NEGATIVE},
  {type: 'anxious', emoji: '😰', label: '불안해요', score: -1, category: CATEGORY.NEGATIVE},
  {type: 'worried', emoji: '😟', label: '걱정돼요', score: -1, category: CATEGORY.NEGATIVE},
  {type: 'scared', emoji: '😱', label: '무서워요', score: -2, category: CATEGORY.NEGATIVE},
  {type: 'lonely', emoji: '🥺', label: '외로워요', score: -2, category: CATEGORY.NEGATIVE},
  {type: 'jealous', emoji: '😒', label: '질투나요', score: -2, category: CATEGORY.NEGATIVE},
  {type: 'ashamed', emoji: '😳', label: '부끄러워요', score: -2, category: CATEGORY.NEGATIVE},
  {type: 'worthless', emoji: '🙁', label: '무가치하게 느낌', score: -2, category: CATEGORY.NEGATIVE},
  {type: 'regretful', emoji: '🤦‍♂️', label: '후회돼요', score: -2, category: CATEGORY.NEGATIVE},
];
