import { splitStorySentences } from "@/lib/storyText";
import { cn } from "@/lib/utils";

interface StoryTextProps {
  text: string;
  className?: string;
  sentenceClassName?: string;
}

const StoryText = ({ text, className, sentenceClassName }: StoryTextProps) => {
  const sentences = splitStorySentences(text);

  return (
    <div className={cn("flex flex-col gap-4 text-right", className)}>
      {sentences.map((sentence, index) => (
        <p
          key={`${index}-${sentence}`}
          dir="rtl"
          className={cn(
            "text-base font-medium leading-relaxed text-gray-800 md:text-lg",
            sentenceClassName,
          )}
        >
          {sentence}
        </p>
      ))}
    </div>
  );
};

export default StoryText;
