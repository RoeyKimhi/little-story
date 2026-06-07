export interface StoryBookPage {
  pageNumber: number;
  text: string;
  imageUrl: string;
}

export interface StoryBookData {
  title: string;
  coverText: string;
  coverImageUrl: string;
  pages: StoryBookPage[];
}
