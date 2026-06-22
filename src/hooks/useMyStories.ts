import { useQuery } from "@tanstack/react-query";
import { getMyStories } from "@/services/storyHistoryService";

export const useMyStories = () => {
  return useQuery({
    queryKey: ["my-stories"],
    queryFn: getMyStories,
  });
};
