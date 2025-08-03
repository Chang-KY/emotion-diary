import {emotions} from "@/constants/emotions";

type EmotionDiary = {
  date: Date;
  emotionType: string;
};

type ChartData = {
  name: string;  // 긍정 / 중립 / 부정
  score: number; // 횟수
};

export const getDonutChartData = (diaries: EmotionDiary[]): ChartData[] => {
  // 감정 그룹 초기화
  const counts: Record<string, number> = {
    긍정: 0,
    중립: 0,
    부정: 0,
  };

  for (const diary of diaries) {
    const found = emotions.find(e => e.type === diary.emotionType);
    if (!found) continue;

    // 감정 타입 점수를 기준으로 그룹 분류
    const group = found.score > 0 ? '긍정' : found.score < 0 ? '부정' : '중립';
    counts[group]++;
  }

  return [
    {name: '긍정', score: counts['긍정']},
    {name: '중립', score: counts['중립']},
    {name: '부정', score: counts['부정']},
  ];
};
