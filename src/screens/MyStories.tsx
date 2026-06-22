import { useNavigate } from "react-router-dom";
import { BookOpen, Library } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMyStories } from "@/hooks/useMyStories";
import type { StoredStory } from "@/services/storyHistoryService";

const formatCreatedAt = (createdAt: string): string => {
  const date = new Date(createdAt);

  if (Number.isNaN(date.getTime())) {
    return "";
  }

  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

const MyStories = () => {
  const navigate = useNavigate();
  const { data: stories, isLoading, isError, refetch } = useMyStories();

  const handleOpenStory = (story: StoredStory) => {
    navigate("/story", { state: { story } });
  };

  if (isLoading) {
    return (
      <div className="flex min-h-[40vh] items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading your stories...</p>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 text-center">
        <p className="text-sm text-destructive">
          We couldn't load your stories. Please try again.
        </p>
        <Button
          type="button"
          variant="outline"
          className="rounded-full"
          onClick={() => refetch()}
        >
          Retry
        </Button>
      </div>
    );
  }

  if (!stories || stories.length === 0) {
    return (
      <div className="flex min-h-[40vh] flex-col items-center justify-center gap-4 text-center">
        <Library className="size-12 text-violet-400" />
        <div>
          <h1 className="text-2xl font-black text-violet-600">My Stories</h1>
          <p className="mt-2 text-sm text-muted-foreground">
            You haven't created any stories yet.
          </p>
        </div>
        <Button
          type="button"
          className="gap-2 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 px-6 py-5 text-base font-semibold text-white hover:from-violet-700 hover:to-purple-700"
          onClick={() => navigate("/create")}
        >
          <BookOpen className="size-5" />
          Create Your First Story
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-8 py-4">
      <div className="text-center">
        <h1 className="text-4xl font-black text-violet-600">My Stories</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Your latest created stories
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {stories.map((story) => {
          const createdAtLabel = formatCreatedAt(story.createdAt);

          return (
            <button
              key={story.id}
              type="button"
              onClick={() => handleOpenStory(story)}
              className="group flex cursor-pointer flex-col overflow-hidden rounded-xl border border-border bg-card text-left shadow-sm transition hover:border-violet-400 hover:shadow-lg"
            >
              <div className="overflow-hidden">
                <img
                  src={story.coverImageUrl}
                  alt={story.title}
                  className="aspect-video w-full object-cover transition group-hover:scale-105"
                />
              </div>
              <div className="flex flex-1 flex-col gap-2 p-4">
                <h2
                  dir="rtl"
                  className="text-right text-lg font-bold text-foreground"
                >
                  {story.title}
                </h2>
                {story.coverText && (
                  <p
                    dir="rtl"
                    className="line-clamp-2 text-right text-sm text-muted-foreground"
                  >
                    {story.coverText}
                  </p>
                )}
                {createdAtLabel && (
                  <p className="mt-auto pt-2 text-xs text-muted-foreground">
                    {createdAtLabel}
                  </p>
                )}
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default MyStories;
