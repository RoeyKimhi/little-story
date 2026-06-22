import { apiClient } from "./api";
import type { StoryPage } from "./bookService";

export interface StoredStory {
  id: string;
  childName: string;
  createdAt: string;
  title: string;
  coverText: string;
  coverImageUrl: string;
  pages: StoryPage[];
}

interface MyStoriesResponse {
  stories: StoredStory[];
}

export const getMyStories = async (): Promise<StoredStory[]> => {
  const response = await apiClient.get<MyStoriesResponse>("/api/stories");
  return response.data?.stories ?? [];
};
