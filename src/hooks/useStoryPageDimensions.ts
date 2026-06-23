import { useEffect, useRef, useState } from "react";
import {
  DEFAULT_STORY_PAGE_SIZE,
  storyPageHeight,
} from "@/lib/storyPageDimensions";

export const useStoryPageDimensions = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState(DEFAULT_STORY_PAGE_SIZE);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) {
      return;
    }

    const update = () => {
      const width = Math.max(1, Math.floor(node.clientWidth));
      setSize({
        width,
        height: storyPageHeight(width),
      });
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return { containerRef, ...size };
};
