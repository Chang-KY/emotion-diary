import {emotions} from "@/constants/emotions";

export const getEmotionInfo = (type: string) => {
  return emotions.find((e) => e.type === type);
};
