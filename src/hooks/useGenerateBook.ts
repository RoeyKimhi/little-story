import { useMutation } from "@tanstack/react-query";
import { generateBook } from "@/services/bookService";

export const useGenerateBook = () => {
  return useMutation({
    mutationFn: generateBook,
  });
};
