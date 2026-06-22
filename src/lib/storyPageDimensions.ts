/** Matches FAL `landscape_4_3` and the large image in /story */
export const STORY_PAGE_ASPECT_RATIO = 4 / 3;

export const storyPageHeight = (width: number) =>
  Math.round(width / STORY_PAGE_ASPECT_RATIO);

export const DEFAULT_STORY_PAGE_WIDTH = 480;

export const DEFAULT_STORY_PAGE_SIZE = {
  width: DEFAULT_STORY_PAGE_WIDTH,
  height: storyPageHeight(DEFAULT_STORY_PAGE_WIDTH),
};
