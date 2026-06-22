import type { UseFormRegister, FieldErrors } from "react-hook-form";
import { CUSTOM_THEME_ID } from "@/data/storyThemes";
import { cn } from "@/lib/utils";
import type { StoryFormData } from "@/types/storyForm";

interface CustomThemeInputProps {
  register: UseFormRegister<StoryFormData>;
  errors: FieldErrors<StoryFormData>;
}

const CustomThemeInput = ({ register, errors }: CustomThemeInputProps) => {
  return (
    <div
      className={cn(
        "overflow-hidden rounded-2xl border-2 border-violet-300 bg-gradient-to-br",
        "from-violet-50 via-fuchsia-50 to-cyan-50 p-5 shadow-lg shadow-violet-200/50",
        "ring-1 ring-violet-200/80",
      )}
    >
      <label htmlFor="customTheme" className="block">
        <span dir="rtl" className="text-base font-bold text-violet-800">
          מה הנושא של הסיפור שלכם?
        </span>
        <span dir="rtl" className="mt-1 block text-sm text-violet-600/90">
          לדוגמה: טיול לסבתא, חבר חדש בגן, או הרפתקה עם הכלב
        </span>
      </label>

      <textarea
        id="customTheme"
        dir="rtl"
        rows={4}
        placeholder="כתבו כאן את הנושא האישי שלכם..."
        className={cn(
          "mt-4 w-full resize-none rounded-xl border-2 border-violet-200 bg-white/90 px-4 py-3",
          "text-right text-base text-foreground placeholder:text-muted-foreground/70",
          "shadow-inner transition focus:border-violet-400 focus:outline-none focus:ring-2 focus:ring-violet-300/50",
          errors.customTheme && "border-red-400 focus:border-red-400 focus:ring-red-200",
        )}
        {...register("customTheme", {
          validate: (value, formValues) => {
            if (formValues.theme !== CUSTOM_THEME_ID) {
              return true;
            }

            const trimmed = value?.trim() ?? "";
            if (trimmed.length < 3) {
              return "נא לכתוב נושא באורך של לפחות 3 תווים";
            }

            if (trimmed.length > 200) {
              return "הנושא ארוך מדי (מקסימום 200 תווים)";
            }

            return true;
          },
        })}
      />

      {errors.customTheme && (
        <p dir="rtl" className="mt-2 text-xs text-red-500">
          {errors.customTheme.message}
        </p>
      )}
    </div>
  );
};

export default CustomThemeInput;
