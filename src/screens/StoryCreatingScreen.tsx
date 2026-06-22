import { useCallback, useEffect, useRef, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Sparkles } from "lucide-react";
import RunnerGame from "@/components/story-creating/RunnerGame";
import { getApiErrorMessage } from "@/lib/apiError";
import {
  CREATION_STATUS_INTERVAL_MS,
  CREATION_STATUS_MESSAGES,
} from "@/lib/createStoryStatus";
import { saveCurrentStory } from "@/lib/storySession";
import { getOrStartBookGeneration, subscribeGenerationProgress } from "@/services/bookStreamService";
import type { CreateStoryLocationState } from "@/types/createStory";

const StoryCreatingScreen = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { payload } = (location.state as CreateStoryLocationState) ?? {};
  const isMountedRef = useRef(true);

  const [statusIndex, setStatusIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const statusMessage = CREATION_STATUS_MESSAGES[statusIndex];

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setStatusIndex((current) => (current + 1) % CREATION_STATUS_MESSAGES.length);
    }, CREATION_STATUS_INTERVAL_MS);

    return () => window.clearInterval(intervalId);
  }, []);

  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (!payload) {
      navigate("/create", { replace: true });
      return;
    }

    const unsubscribe = subscribeGenerationProgress((event) => {
      if (!isMountedRef.current) {
        return;
      }

      setProgress(event.progress);
    });

    getOrStartBookGeneration(payload)
      .then((storyData) => {
        if (!isMountedRef.current) {
          return;
        }

        saveCurrentStory(storyData);
        navigate("/story", { state: { story: storyData }, replace: true });
      })
      .catch((error) => {
        if (!isMountedRef.current) {
          return;
        }

        console.error("Error generating story:", error);
        navigate("/create", {
          replace: true,
          state: { error: getApiErrorMessage(error) },
        });
      });

    return unsubscribe;
  }, [navigate, payload]);

  const handleBeforeUnload = useCallback((event: BeforeUnloadEvent) => {
    event.preventDefault();
    event.returnValue = "";
  }, []);

  useEffect(() => {
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [handleBeforeUnload]);

  if (!payload) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-gradient-to-b from-violet-50 via-purple-50 to-fuchsia-100 px-4 py-8">
      <div className="flex w-full max-w-2xl flex-col items-center gap-6 text-center">
        <div className="flex items-center gap-2 text-violet-600">
          <Sparkles className="size-6 animate-pulse" aria-hidden="true" />
          <h1 className="text-2xl font-black sm:text-3xl">
            יוצרים את הספר של {payload.childName}
          </h1>
          <Sparkles className="size-6 animate-pulse" aria-hidden="true" />
        </div>

        <p
          dir="rtl"
          className="min-h-[1.5rem] text-base text-muted-foreground transition-opacity duration-500 sm:text-lg"
          aria-live="polite"
        >
          {statusMessage}
        </p>

        <div className="w-full max-w-md space-y-2">
          <div className="h-2 overflow-hidden rounded-full bg-violet-200/80">
            <div
              className="h-full rounded-full bg-gradient-to-r from-violet-500 via-purple-500 to-fuchsia-500 transition-all duration-700 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
          <p dir="rtl" className="text-xs text-muted-foreground">
            זה יכול לקחת כמה דקות — אל תסגרו את הדף
          </p>
        </div>

        <RunnerGame className="w-full" />

        <p dir="rtl" className="text-sm text-muted-foreground">
          לחצו רווח או על המסך כדי לקפוץ מעל המכשולים
        </p>
      </div>
    </div>
  );
};

export default StoryCreatingScreen;
