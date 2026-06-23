import { cn } from "@/lib/utils";

const SPARKLE_SPOTS = [
  { top: "12%", left: "15%", delay: "0s", size: "sm" },
  { top: "22%", left: "78%", delay: "0.4s", size: "md" },
  { top: "55%", left: "10%", delay: "0.9s", size: "xs" },
  { top: "68%", left: "62%", delay: "0.2s", size: "sm" },
  { top: "38%", left: "44%", delay: "1.2s", size: "xs" },
  { top: "18%", left: "48%", delay: "0.7s", size: "md" },
  { top: "72%", left: "28%", delay: "1.5s", size: "sm" },
  { top: "48%", left: "86%", delay: "0.5s", size: "xs" },
] as const;

interface ThemeCardSparklesProps {
  isSelected: boolean;
}

const sizeClass = {
  xs: "h-1 w-1",
  sm: "h-1.5 w-1.5",
  md: "h-2 w-2",
};

const ThemeCardSparkles = ({ isSelected }: ThemeCardSparklesProps) => {
  return (
    <div
      className={cn(
        "theme-card-sparkles pointer-events-none absolute inset-0 z-10 opacity-0 transition-opacity duration-300",
        "group-hover:opacity-100",
        isSelected && "opacity-100",
      )}
      aria-hidden
    >
      {SPARKLE_SPOTS.map((spot, index) => (
        <span
          key={index}
          className={cn(
            "theme-card-sparkle absolute rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,0.95)]",
            sizeClass[spot.size],
          )}
          style={{
            top: spot.top,
            left: spot.left,
            animationDelay: spot.delay,
          }}
        />
      ))}
      <span className="theme-card-sparkle theme-card-sparkle-star absolute left-[20%] top-[30%] text-sm text-yellow-100 drop-shadow-[0_0_6px_rgba(254,240,138,0.9)]">
        ✦
      </span>
      <span className="theme-card-sparkle theme-card-sparkle-star absolute right-[18%] top-[24%] text-xs text-white drop-shadow-[0_0_6px_rgba(255,255,255,0.9)]">
        ✧
      </span>
      <span className="theme-card-sparkle theme-card-sparkle-star absolute bottom-[28%] right-[32%] text-sm text-fuchsia-100 drop-shadow-[0_0_8px_rgba(244,114,182,0.9)]">
        ✦
      </span>
    </div>
  );
};

export default ThemeCardSparkles;
