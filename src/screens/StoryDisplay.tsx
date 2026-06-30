import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ChevronLeft, ChevronRight, BookOpen, Pencil, Save, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCurrentStory } from "@/hooks/useCurrentStory";
import { useUpdateStory } from "@/hooks/useUpdateStory";
import { clearCurrentStory, saveCurrentStory } from "@/lib/storySession";
import StoryText from "@/components/story-book/StoryText";
import type { StoryResponse } from "@/services/bookService";

const getSaveErrorMessage = (error: unknown): string => {
  if (
    axios.isAxiosError(error) &&
    typeof error.response?.data?.error === "string"
  ) {
    return error.response.data.error;
  }

  return "Couldn't save your changes. Please try again.";
};

const StoryDisplay = () => {
  const navigate = useNavigate();
  const story = useCurrentStory();
  const updateMutation = useUpdateStory();

  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const [displayStory, setDisplayStory] = useState<StoryResponse | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [draftTitle, setDraftTitle] = useState("");
  const [draftCoverText, setDraftCoverText] = useState("");
  const [draftPageTexts, setDraftPageTexts] = useState<Record<number, string>>(
    {},
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    setDisplayStory(story);
    setIsEditing(false);
    setErrorMessage(null);
  }, [story]);

  const activeStory = displayStory ?? story;

  if (!activeStory) {
    return null;
  }

  const currentPage = activeStory.pages[currentPageIndex];
  const totalPages = activeStory.pages.length;
  const canEdit = Boolean(activeStory.id);

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

  const handleStartEdit = () => {
    setDraftTitle(activeStory.title);
    setDraftCoverText(activeStory.coverText);
    setDraftPageTexts(
      Object.fromEntries(
        activeStory.pages.map((page) => [page.pageNumber, page.text]),
      ),
    );
    setErrorMessage(null);
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setErrorMessage(null);
  };

  const handleSave = async () => {
    if (!activeStory.id) {
      return;
    }

    const pages = activeStory.pages.map((page) => ({
      pageNumber: page.pageNumber,
      text: draftPageTexts[page.pageNumber] ?? page.text,
    }));

    try {
      const updated = await updateMutation.mutateAsync({
        id: activeStory.id,
        payload: {
          title: draftTitle.trim(),
          coverText: draftCoverText.trim(),
          pages,
        },
      });

      const nextStory: StoryResponse = {
        ...activeStory,
        title: updated.title,
        coverText: updated.coverText,
        pages: updated.pages,
      };

      setDisplayStory(nextStory);
      saveCurrentStory(nextStory);
      setIsEditing(false);
      setErrorMessage(null);
    } catch (error) {
      setErrorMessage(getSaveErrorMessage(error));
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

        {isEditing ? (
          <div className="mx-auto mt-4 flex max-w-xl flex-col gap-3">
            <input
              type="text"
              dir="rtl"
              value={draftTitle}
              onChange={(event) => setDraftTitle(event.target.value)}
              placeholder="כותרת הספר"
              className="rounded-lg border border-border bg-white px-4 py-2 text-center text-lg font-bold text-foreground outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-200"
            />
            <textarea
              dir="rtl"
              value={draftCoverText}
              onChange={(event) => setDraftCoverText(event.target.value)}
              placeholder="טקסט הכריכה"
              rows={2}
              className="resize-none rounded-lg border border-border bg-white px-4 py-2 text-center text-sm text-muted-foreground outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-200"
            />
          </div>
        ) : (
          <>
            <p className="mt-2 text-lg text-muted-foreground" dir="rtl">
              {activeStory.title}
            </p>
            <p className="text-sm text-muted-foreground" dir="rtl">
              {activeStory.coverText}
            </p>
          </>
        )}
      </div>

      <div className="grid gap-6 lg:grid-cols-6 lg:gap-8">
        <div className="flex flex-col gap-4 lg:col-span-1">
          <p className="text-xs font-semibold text-muted-foreground">
            All Pages:
          </p>
          <div className="space-y-3">
            {activeStory.pages.map((page, index) => (
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
              {isEditing ? (
                <textarea
                  dir="rtl"
                  value={draftPageTexts[currentPage.pageNumber] ?? ""}
                  onChange={(event) =>
                    setDraftPageTexts((current) => ({
                      ...current,
                      [currentPage.pageNumber]: event.target.value,
                    }))
                  }
                  rows={6}
                  className="w-full resize-y rounded-lg border border-border bg-white px-4 py-3 text-right text-base font-medium leading-relaxed text-gray-800 outline-none focus:border-violet-400 focus:ring-2 focus:ring-violet-200 md:text-lg"
                />
              ) : (
                <StoryText text={currentPage.text} />
              )}
            </div>
          </section>
        </div>
      </div>

      {errorMessage && (
        <div
          role="alert"
          dir="rtl"
          className="mx-auto max-w-xl rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-center text-sm text-destructive"
        >
          {errorMessage}
        </div>
      )}

      <div className="flex flex-wrap items-center justify-center gap-4">
        {isEditing ? (
          <>
            <Button
              onClick={handleSave}
              disabled={updateMutation.isPending}
              size="lg"
              className="gap-2 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 px-8 py-6 text-lg font-semibold text-white hover:from-violet-700 hover:to-purple-700"
            >
              <Save className="size-5" />
              {updateMutation.isPending ? "Saving..." : "Save Changes"}
            </Button>
            <Button
              onClick={handleCancelEdit}
              disabled={updateMutation.isPending}
              variant="outline"
              size="lg"
              className="gap-2 rounded-full px-8 py-6 text-lg"
            >
              <X className="size-5" />
              Cancel
            </Button>
          </>
        ) : (
          <>
            {canEdit && (
              <Button
                onClick={handleStartEdit}
                size="lg"
                className="gap-2 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 px-8 py-6 text-lg font-semibold text-white hover:from-violet-700 hover:to-purple-700"
              >
                <Pencil className="size-5" />
                Edit Story
              </Button>
            )}
            <Button
              onClick={() => navigate("/book", { state: { story: activeStory } })}
              size="lg"
              variant={canEdit ? "outline" : "default"}
              className={
                canEdit
                  ? "gap-2 rounded-full px-8 py-6 text-lg"
                  : "gap-2 rounded-full bg-gradient-to-r from-violet-600 to-purple-600 px-8 py-6 text-lg font-semibold text-white hover:from-violet-700 hover:to-purple-700"
              }
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
          </>
        )}
      </div>
    </div>
  );
};

export default StoryDisplay;
