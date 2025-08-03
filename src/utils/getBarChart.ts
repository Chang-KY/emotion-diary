import { emotions } from "@/constants/emotions";

type EmotionDiary = {
  date: Date;
  emotionType: string;
};

const getScoreFromEmotion = (emotionType: string): number => {
  const found = emotions.find(e => e.type === emotionType);
  return found?.score ?? 0;
};

// 감정 일기 배열을 날짜 + 점수 형태로 변환
export const getBarChartData = (diaries: EmotionDiary[]) => {
  return diaries.map(diary => ({
    name: diary.date.getDate() + '일',
    score: getScoreFromEmotion(diary.emotionType),
  }));
};
