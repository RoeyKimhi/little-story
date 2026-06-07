import type { StoryResponse } from "@/services/bookService";
import type { StoryBookData } from "@/types/storyBook";

export const toStoryBookData = (story: StoryResponse): StoryBookData => ({
  title: story.title,
  coverText: story.coverText,
  coverImageUrl: story.coverImageUrl,
  pages: story.pages,
});
