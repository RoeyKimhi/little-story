import HTMLFlipBook from "react-pageflip-rtl";
import type { StoryBookData } from "@/types/storyBook";
import FlipPage from "./FlipPage";

interface StoryFlipBookProps {
  story: StoryBookData;
  width?: number;
  height?: number;
}

const StoryFlipBook = ({
  story,
  width = 400,
  height = 560,
}: StoryFlipBookProps) => {
  return (
    <div className="flex flex-col items-center gap-4">
      <HTMLFlipBook
        width={width}
        height={height}
        size="stretch"
        minWidth={280}
        maxWidth={500}
        minHeight={400}
        maxHeight={700}
        rtl={true}
        showCover={true}
        mobileScrollSupport={true}
        drawShadow={true}
        flippingTime={800}
        usePortrait={true}
        className="story-flip-book"
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
              className="flex h-full w-full flex-col justify-center bg-white px-8 py-10"
            >
              <p className="text-right text-base leading-loose text-gray-800 md:text-lg">
                {page.text}
              </p>
              <span className="mt-8 text-left text-xs text-muted-foreground">
                {page.pageNumber}
              </span>
            </div>
          </FlipPage>,
        ])}

        {/* Back cover */}
        <FlipPage hard>
          <div
            dir="rtl"
            className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-br from-violet-600 via-purple-600 to-fuchsia-500 px-8 text-center text-white"
          >
            <img src="/logo.svg" alt="LittleStory" className="mb-6 h-16 w-16" />
            <p className="text-3xl font-black">הסוף</p>
            <p className="mt-4 text-sm text-white/90">תודה שקראתם את הסיפור</p>
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
