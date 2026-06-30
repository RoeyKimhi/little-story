import HTMLFlipBook from "react-pageflip-rtl";
import { useStoryPageDimensions } from "@/hooks/useStoryPageDimensions";
import { storyPageHeight } from "@/lib/storyPageDimensions";
import type { StoryBookData } from "@/types/storyBook";
import FlipPage from "./FlipPage";
import StoryText from "./StoryText";

interface StoryFlipBookProps {
  story: StoryBookData;
}

const StoryFlipBook = ({ story }: StoryFlipBookProps) => {
  const { containerRef, width, height } = useStoryPageDimensions();

  return (
    <div
      ref={containerRef}
      className="flex w-full flex-col items-center gap-4"
    >
      <HTMLFlipBook
        width={width}
        height={height}
        size="stretch"
        minWidth={280}
        maxWidth={width}
        minHeight={storyPageHeight(280)}
        maxHeight={height}
        rtl={true}
        showCover={true}
        mobileScrollSupport={true}
        drawShadow={true}
        flippingTime={800}
        usePortrait={false}
        className="story-flip-book w-full"
      >
        {/* Front cover */}
        <FlipPage hard>
          <div className="relative h-full w-full">
            <img
              src={story.coverImageUrl}
              alt={story.title}
              className="h-full w-full object-cover"
            />
            <div
              dir="rtl"
              className="absolute inset-0 flex flex-col items-center justify-end bg-gradient-to-t from-violet-900/80 via-violet-900/20 to-transparent px-6 pb-10 text-center text-white"
            >
              <h2 className="text-2xl font-black leading-tight">{story.title}</h2>
              <p className="mt-3 text-sm text-white/90">{story.coverText}</p>
            </div>
          </div>
        </FlipPage>

        {/* Story pages: image then text for each segment */}
        {story.pages.flatMap((page) => [
          <FlipPage key={`img-${page.pageNumber}`}>
            <img
              src={page.imageUrl}
              alt={`איור עמוד ${page.pageNumber}`}
              className="h-full w-full object-cover"
            />
          </FlipPage>,
          <FlipPage key={`text-${page.pageNumber}`}>
            <div
              dir="rtl"
              className="flex h-full w-full flex-col items-center justify-center bg-white px-6 py-8 text-center md:px-10 md:py-10"
            >
              <StoryText
                text={page.text}
                className="items-center text-center"
                sentenceClassName="text-center"
              />
              <span className="mt-8 text-xs text-muted-foreground">
                {page.pageNumber}
              </span>
            </div>
          </FlipPage>,
        ])}

        {/* Minimal closing page (keeps the spreads aligned, no blank page) */}
        <FlipPage hard>
          <div
            dir="rtl"
            className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-violet-50 via-white to-fuchsia-50 px-8 text-center"
          >
            <img
              src="/logo.svg"
              alt="LittleStory"
              className="mb-4 h-12 w-12 opacity-80"
            />
            <p className="text-sm font-semibold text-violet-400">LittleStory</p>
          </div>
        </FlipPage>
      </HTMLFlipBook>

      <p className="max-w-md text-center text-sm text-muted-foreground" dir="rtl">
        דפדפו מימין לשמאל — גררו את פינת הדף או לחצו על צד הספר.
      </p>
    </div>
  );
};

export default StoryFlipBook;
