import { useEffect, useMemo } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  isValidStory,
  loadCurrentStory,
  saveCurrentStory,
} from "@/lib/storySession";
import type { StoryResponse } from "@/services/bookService";

export const useCurrentStory = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const story = useMemo(() => {
    const fromState = location.state?.story as StoryResponse | undefined;

    if (isValidStory(fromState)) {
      return fromState!;
    }

    return loadCurrentStory();
  }, [location.state]);

  useEffect(() => {
    if (!isValidStory(story)) {
      navigate("/create", { replace: true });
      return;
    }

    saveCurrentStory(story!);
  }, [story, navigate]);

  return isValidStory(story) ? story : null;
};
