import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateStory } from "@/services/storyHistoryService";
import type { UpdateStoryPayload } from "@/services/storyHistoryService";

export const useUpdateStory = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: UpdateStoryPayload }) =>
      updateStory(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["my-stories"] });
    },
  });
};
