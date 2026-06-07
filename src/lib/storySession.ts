import type { StoryResponse } from "@/services/bookService";

export const CURRENT_STORY_KEY = "littlestory_current_story";

export const saveCurrentStory = (story: StoryResponse) => {
  try {
    sessionStorage.setItem(CURRENT_STORY_KEY, JSON.stringify(story));
  } catch (error) {
    console.warn("Could not persist story to sessionStorage:", error);
  }
};

export const loadCurrentStory = (): StoryResponse | null => {
  const raw = sessionStorage.getItem(CURRENT_STORY_KEY);

  if (!raw) {
    return null;
  }

  try {
    const story = JSON.parse(raw) as StoryResponse;

    if (!story?.pages?.length) {
      return null;
    }

    return story;
  } catch {
    sessionStorage.removeItem(CURRENT_STORY_KEY);
    return null;
  }
};

export const clearCurrentStory = () => {
  sessionStorage.removeItem(CURRENT_STORY_KEY);
};

export const isValidStory = (story: StoryResponse | null | undefined) =>
  Boolean(story?.pages?.length);
