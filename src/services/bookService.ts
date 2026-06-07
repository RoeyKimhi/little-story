import { apiClient } from "./api";

export interface StoryPage {
  pageNumber: number;
  text: string;
  imageUrl: string;
}

export interface StoryResponse {
  message: string;
  receivedImage: boolean;
  title: string;
  coverText: string;
  coverImageUrl: string;
  pages: StoryPage[];
}

export interface GenerateBookPayload {
  childName: string;
  childAge: string;
  childGender: string;
  theme: string;
  image: File;
}

export const generateBook = async (
  payload: GenerateBookPayload,
): Promise<StoryResponse> => {
  const formData = new FormData();
  formData.append("childName", payload.childName);
  formData.append("childAge", payload.childAge);
  formData.append("childGender", payload.childGender);
  formData.append("theme", payload.theme);
  formData.append("image", payload.image);

  const response = await apiClient.post<StoryResponse>(
    "/api/ai/generate-book",
    formData,
    {
      // Sequential FAL image generation can take several minutes.
      timeout: 600_000,
    },
  );

  const story = response.data;

  if (!story?.pages?.length) {
    throw new Error("השרת החזיר ספר ללא עמודים");
  }

  return story;
};
