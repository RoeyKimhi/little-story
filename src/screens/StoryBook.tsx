import { Download, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import StoryFlipBook from "@/components/story-book/StoryFlipBook";
import { useCurrentStory } from "@/hooks/useCurrentStory";
import { toStoryBookData } from "@/lib/storyMapper";

const StoryBook = () => {
  const storyResponse = useCurrentStory();

  if (!storyResponse) {
    return null;
  }

  const story = toStoryBookData(storyResponse);

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col items-center py-4">
      <img src="/logo.svg" alt="LittleStory" className="mb-4 h-12 w-12" />
      <h1 className="text-center text-3xl font-black text-violet-600">
        Your Story Book
      </h1>
      <p className="mt-2 text-center text-muted-foreground" dir="rtl">
        {story.title}
      </p>
      <p className="text-center text-sm text-muted-foreground" dir="rtl">
        {story.coverText}
      </p>

      <section className="-mx-4 mt-6 w-[calc(100%+2rem)] rounded-lg border border-border bg-card p-2 shadow-sm md:-mx-6 md:w-[calc(100%+3rem)] md:p-4">
        <StoryFlipBook story={story} />
      </section>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <Button
          type="button"
          size="lg"
          className="gap-2 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 px-8 py-6 text-lg font-semibold text-white hover:from-violet-700 hover:to-purple-700"
        >
          <Download className="size-5" />
          הורדת ספר דיגיטלי
        </Button>
        <Button
          type="button"
          variant="outline"
          size="lg"
          disabled
          className="gap-2 rounded-full px-8 py-6 text-lg"
        >
          <Printer className="size-5" />
          הדפסת ספר פיזי
        </Button>
      </div>
    </div>
  );
};

export default StoryBook;
