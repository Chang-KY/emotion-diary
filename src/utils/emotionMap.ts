import {emotions} from "@/constants/emotions.ts";

export const emotionEmojiMap = emotions.reduce((acc, item) => {
  acc[item.type] = item.emoji;
  return acc;
}, {} as Record<string, string>);

export const emotionEmojiLabelMap = emotions.reduce((acc, item) => {
  acc[item.type] = item.label;
  return acc;
}, {} as Record<string, string>);