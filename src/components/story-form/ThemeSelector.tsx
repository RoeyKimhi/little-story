import type {
  UseFormRegister,
  UseFormWatch,
  FieldErrors,
} from "react-hook-form";
import { CUSTOM_THEME_ID, STORY_THEMES } from "@/data/storyThemes";
import type { StoryFormData } from "@/types/storyForm";
import CustomThemeInput from "./CustomThemeInput";
import ThemeCard from "./ThemeCard";

interface ThemeSelectorProps {
  register: UseFormRegister<StoryFormData>;
  watch: UseFormWatch<StoryFormData>;
  errors: FieldErrors<StoryFormData>;
}

const ThemeSelector = ({ register, watch, errors }: ThemeSelectorProps) => {
  const selectedTheme = watch("theme");
  const isCustomSelected = selectedTheme === CUSTOM_THEME_ID;

  return (
    <div className="space-y-6">
      <div className="text-center md:text-left">
        <h3 className="text-2xl font-bold">Choose Theme</h3>
        <p className="mt-2 text-muted-foreground">
          Pick a magical world for your story
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {STORY_THEMES.map((themeOption) => (
          <ThemeCard
            key={themeOption.id}
            theme={themeOption}
            isSelected={selectedTheme === themeOption.id}
            registerProps={{
              ...register("theme", { required: "Theme is required" }),
              value: themeOption.id,
            }}
          />
        ))}

        {isCustomSelected && (
          <div className="animate-in fade-in slide-in-from-top-2 duration-300 sm:col-span-2 lg:col-span-3">
            <CustomThemeInput register={register} errors={errors} />
          </div>
        )}
      </div>

      {errors.theme && (
        <p className="text-center text-xs text-red-500 md:text-left">
          Theme is required
        </p>
      )}
    </div>
  );
};

export default ThemeSelector;
