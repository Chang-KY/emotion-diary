export const getEvaluation = (score: number) => {
  if (score >= 15) return '이번 달은 아주 긍정적인 달이었어요!';
  if (score >= 5) return '이번 달은 꽤 괜찮았어요.';
  if (score >= -5) return '이번 달은 그럭저럭이었어요.';
  return '이번 달은 힘든 시간이 많았네요.';
};
