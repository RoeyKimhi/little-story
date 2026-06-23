export type GenerationStage =
  | "starting"
  | "story"
  | "prompts"
  | "images"
  | "finalizing"
  | "complete";

export interface GenerationProgressEvent {
  stage: GenerationStage;
  progress: number;
  message: string;
  imageIndex?: number;
  totalImages?: number;
}

export const CREATION_STATUS_MESSAGES = [
  "קוראים את הפרטים על הילד/ה...",
  "כותבים את הסיפור המותאם אישית...",
  "מחשבים את האיורים המושלמים...",
  "מציירים את כריכת הספר...",
  "מוסיפים עמודים לסיפור...",
  "מלטשים את הפרטים האחרונים...",
] as const;

export const CREATION_STATUS_INTERVAL_MS = 5_000;
