import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronLeft, ChevronRight, BookOpen } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCurrentStory } from "@/hooks/useCurrentStory";
import { clearCurrentStory } from "@/lib/storySession";
import StoryText from "@/components/story-book/StoryText";

const StoryDisplay = () => {
  const navigate = useNavigate();
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const story = useCurrentStory();

  if (!story) {
    return null;
  }

  const currentPage = story.pages[currentPageIndex];
  const totalPages = story.pages.length;

  const handlePrevious = () => {
    if (currentPageIndex > 0) {
      setCurrentPageIndex(currentPageIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentPageIndex < totalPages - 1) {
      setCurrentPageIndex(currentPageIndex + 1);
    }
  };

  return (
    <div className="space-y-8 py-4">
      <div className="text-center">
        <img
          src="/logo.svg"
          alt="LittleStory"
          className="mx-auto mb-4 h-12 w-12"
        />
        <h1 className="text-4xl font-black text-violet-600">Edit Your Story</h1>
        <p className="mt-2 text-lg text-muted-foreground" dir="rtl">
          {story.title}
        </p>
        <p className="text-sm text-muted-foreground" dir="rtl">
          {story.coverText}
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-6 lg:gap-8">
        <div className="flex flex-col gap-4 lg:col-span-1">
          <p className="text-xs font-semibold text-muted-foreground">
            All Pages:
          </p>
          <div className="space-y-3">
            {story.pages.map((page, index) => (
              <button
                key={page.pageNumber}
                type="button"
                onClick={() => setCurrentPageIndex(index)}
                className={`relative w-full overflow-hidden rounded-lg border-2 transition ${
                  currentPageIndex === index
                    ? "border-violet-600 shadow-lg"
                    : "border-border hover:border-violet-400"
                }`}
              >
                <img
                  src={page.imageUrl}
                  alt={`Page ${page.pageNumber}`}
                  className="aspect-video w-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 font-semibold text-white">
                  Page {page.pageNumber}
                </div>
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-5">
          <section className="space-y-6 rounded-lg border border-border bg-card p-4 shadow-sm md:p-6">
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Page {currentPageIndex + 1} of {totalPages}
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={handlePrevious}
                  disabled={currentPageIndex === 0}
                  className="rounded-full p-2 hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <ChevronLeft className="h-6 w-6" />
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  disabled={currentPageIndex === totalPages - 1}
                  className="rounded-full p-2 hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
                >
                  <ChevronRight className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="aspect-[4/3] overflow-hidden rounded-xl border border-border">
              <img
                key={currentPage.pageNumber}
                src={currentPage.imageUrl}
                alt={`Page ${currentPage.pageNumber}`}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="rounded-lg border border-border bg-white p-6 md:p-8">
              <StoryText text={currentPage.text} />
            </div>
          </section>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-center gap-4">
        <Button
          onClick={() => navigate("/book", { state: { story } })}
          size="lg"
          className="gap-2 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 px-8 py-6 text-lg font-semibold text-white hover:from-violet-700 hover:to-purple-700"
        >
          <BookOpen className="size-5" />
          Read Your Book
        </Button>
        <Button
          onClick={() => {
            clearCurrentStory();
            navigate("/create");
          }}
          variant="outline"
          size="lg"
          className="rounded-full px-8 py-6 text-lg"
        >
          Create Another Story
        </Button>
      </div>
    </div>
  );
};

export default StoryDisplay;
