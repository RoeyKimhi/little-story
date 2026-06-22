import type { InputHTMLAttributes } from "react";
import type { StoryTheme } from "@/data/storyThemes";
import { cn } from "@/lib/utils";
import ThemeCardSparkles from "./ThemeCardSparkles";
import ThemeIllustration from "./theme-scenes/ThemeIllustration";

interface ThemeCardProps {
  theme: StoryTheme;
  isSelected: boolean;
  registerProps: InputHTMLAttributes<HTMLInputElement>;
}

const ThemeCard = ({ theme, isSelected, registerProps }: ThemeCardProps) => {
  return (
    <label
      className={cn(
        "group relative flex cursor-pointer flex-col overflow-hidden rounded-2xl border-2 bg-white shadow-sm transition-all duration-300",
        "hover:-translate-y-1.5 hover:border-violet-300",
        "hover:shadow-[0_10px_40px_rgba(139,92,246,0.35),0_0_0_1px_rgba(167,139,250,0.3)]",
        isSelected
          ? cn(
              "theme-card-selected -translate-y-1 border-violet-400",
              "shadow-[0_12px_48px_rgba(139,92,246,0.5),0_0_0_1px_rgba(167,139,250,0.5)]",
              "ring-2 ring-violet-400/70 ring-offset-2",
              theme.ring,
            )
          : "border-border",
      )}
    >
      <input type="radio" className="hidden" {...registerProps} />

      <div className="relative h-36 overflow-hidden">
        <ThemeIllustration themeId={theme.id} isSelected={isSelected} />

        <div
          className={cn(
            "theme-card-shimmer pointer-events-none absolute inset-0 z-[5] opacity-0 transition-opacity duration-300",
            "group-hover:opacity-100",
            isSelected && "opacity-100",
          )}
          aria-hidden
        />

        <div
          className={cn(
            "theme-card-glow pointer-events-none absolute inset-0 z-[4] opacity-0 transition-opacity duration-300",
            "group-hover:opacity-100",
            isSelected && "opacity-100",
          )}
          aria-hidden
        />

        <ThemeCardSparkles isSelected={isSelected} />

        {isSelected && (
          <div className="absolute right-3 top-3 z-20 rounded-full bg-white/95 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide text-violet-600 shadow-[0_0_12px_rgba(167,139,250,0.8)]">
            Selected
          </div>
        )}
      </div>

      <div
        className={cn(
          "relative z-10 bg-white px-4 py-3 transition-colors duration-300",
          "group-hover:bg-violet-50/50",
          isSelected && "bg-violet-50/70",
        )}
      >
        <p
          className={cn(
            "font-bold text-foreground transition-colors group-hover:text-violet-700",
            isSelected && "text-violet-700",
          )}
        >
          {theme.title}
        </p>
        <p className="mt-0.5 text-xs text-muted-foreground">{theme.description}</p>
      </div>
    </label>
  );
};

export default ThemeCard;
