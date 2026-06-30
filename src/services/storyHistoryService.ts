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

export interface UpdateStoryPayload {
  title?: string;
  coverText?: string;
  pages?: { pageNumber: number; text: string }[];
}

export const getMyStories = async (): Promise<StoredStory[]> => {
  const response = await apiClient.get<MyStoriesResponse>("/api/stories");
  return response.data?.stories ?? [];
};

export const updateStory = async (
  id: string,
  payload: UpdateStoryPayload,
): Promise<StoredStory> => {
  const response = await apiClient.patch<{ story: StoredStory }>(
    `/api/stories/${id}`,
    payload,
  );
  return response.data.story;
};
