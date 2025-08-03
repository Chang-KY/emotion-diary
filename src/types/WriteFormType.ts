import type {ShareScopeType} from "@/constants/ShareScopes.tsx";

export type WriteFormType = {
  content: string;
  emotionType: string;
  date: Date;
  shareScope: ShareScopeType;
  image_url?: string | null;
  id?: string;
};