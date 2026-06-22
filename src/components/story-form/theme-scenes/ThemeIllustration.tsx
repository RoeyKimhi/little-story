import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ThemeIllustrationProps {
  themeId: string;
  isSelected?: boolean;
  className?: string;
}

const Sparkle = ({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) => (
  <span
    className={cn("theme-sparkle absolute block h-1.5 w-1.5 rounded-full bg-white", className)}
    style={style}
  />
);

const OceanScene = () => (
  <>
    <div className="absolute inset-0 bg-gradient-to-b from-sky-200 via-cyan-300 to-blue-500" />
    <div className="theme-sun absolute right-4 top-3 h-10 w-10 rounded-full bg-yellow-200 shadow-[0_0_24px_rgba(254,240,138,0.9)]" />
    <svg
      className="theme-wave-layer absolute bottom-8 left-0 h-16 w-[200%] text-cyan-200/80"
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path
        fill="currentColor"
        d="M0,64 C150,100 350,20 600,64 C850,108 1050,28 1200,64 L1200,120 L0,120 Z"
      />
    </svg>
    <svg
      className="theme-wave-layer theme-wave-layer-slow absolute bottom-4 left-0 h-20 w-[200%] text-teal-300/90"
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path
        fill="currentColor"
        d="M0,80 C200,40 400,100 600,72 C800,44 1000,96 1200,72 L1200,120 L0,120 Z"
      />
    </svg>
    <svg
      className="theme-wave-layer theme-wave-layer-fast absolute bottom-0 left-0 h-14 w-[200%] text-sky-400"
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path
        fill="currentColor"
        d="M0,88 C180,56 360,104 600,80 C840,56 1020,104 1200,80 L1200,120 L0,120 Z"
      />
    </svg>
    <div className="theme-bubble absolute bottom-10 left-8 h-3 w-3 rounded-full bg-white/50" />
    <div className="theme-bubble theme-bubble-delayed absolute bottom-16 left-16 h-2 w-2 rounded-full bg-white/40" />
    <div className="theme-fish absolute bottom-12 right-10 text-2xl opacity-80">🐠</div>
  </>
);

const ForestScene = () => (
  <>
    <div className="absolute inset-0 bg-gradient-to-b from-sky-200 via-emerald-200 to-green-600" />
    <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-green-700 to-emerald-500" />
    <div className="theme-tree absolute bottom-6 left-4 h-16 w-10 rounded-t-full bg-green-800" />
    <div className="theme-tree theme-tree-delayed absolute bottom-8 left-14 h-20 w-12 rounded-t-full bg-green-700" />
    <div className="theme-tree absolute bottom-5 right-8 h-18 w-11 rounded-t-full bg-green-800" />
    <div className="theme-leaf absolute left-1/3 top-8 text-lg">🍃</div>
    <div className="theme-leaf theme-leaf-delayed absolute right-1/4 top-12 text-sm">🍃</div>
    <div className="theme-bird absolute right-6 top-8 text-xl">🐦</div>
  </>
);

const MagicalScene = () => (
  <>
    <div className="absolute inset-0 bg-gradient-to-br from-violet-400 via-purple-500 to-fuchsia-600" />
    <Sparkle className="left-[18%] top-[22%]" style={{ animationDelay: "0s" }} />
    <Sparkle className="left-[72%] top-[18%]" style={{ animationDelay: "0.6s" }} />
    <Sparkle className="left-[48%] top-[38%]" style={{ animationDelay: "1.1s" }} />
    <Sparkle className="left-[82%] top-[48%]" style={{ animationDelay: "0.3s" }} />
    <div className="theme-wand absolute bottom-8 left-1/2 -translate-x-1/2 text-4xl">🪄</div>
    <div className="theme-float absolute bottom-14 left-8 text-2xl">✨</div>
    <div className="theme-float theme-float-delayed absolute bottom-16 right-8 text-xl">🌟</div>
  </>
);

const SpaceScene = () => (
  <>
    <div className="absolute inset-0 bg-gradient-to-b from-indigo-950 via-violet-950 to-black" />
    <Sparkle className="left-[12%] top-[20%] bg-white/90" style={{ animationDelay: "0.2s" }} />
    <Sparkle className="left-[55%] top-[15%] bg-white/80" style={{ animationDelay: "0.8s" }} />
    <Sparkle className="left-[78%] top-[35%] bg-white/70" style={{ animationDelay: "1.4s" }} />
    <div className="theme-planet absolute right-6 top-6 h-10 w-10 rounded-full bg-gradient-to-br from-orange-300 to-rose-400 shadow-[inset_-4px_-4px_8px_rgba(0,0,0,0.35)]" />
    <div className="theme-rocket absolute bottom-8 left-1/2 -translate-x-1/2 text-4xl">🚀</div>
    <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-indigo-500/30 to-transparent" />
  </>
);

const CastleScene = () => (
  <>
    <div className="absolute inset-0 bg-gradient-to-b from-sky-300 via-amber-100 to-stone-300" />
    <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-emerald-600 to-emerald-400" />
    <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 items-end gap-1">
      <div className="h-10 w-8 bg-stone-500" />
      <div className="relative h-16 w-14 bg-stone-400">
        <div className="absolute -top-3 left-1/2 h-4 w-4 -translate-x-1/2 rotate-45 bg-rose-400" />
      </div>
      <div className="h-12 w-9 bg-stone-500" />
    </div>
    <div className="theme-flag absolute bottom-16 left-[58%] text-sm">🚩</div>
  </>
);

const DinoScene = () => (
  <>
    <div className="absolute inset-0 bg-gradient-to-b from-sky-300 via-lime-200 to-amber-300" />
    <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-lime-600 to-lime-400" />
    <div className="theme-dino absolute bottom-8 left-1/2 -translate-x-1/2 text-5xl">🦕</div>
    <div className="absolute right-5 top-8 text-2xl opacity-80">🌋</div>
    <div className="theme-palm absolute bottom-10 left-6 text-2xl">🌴</div>
  </>
);

const PirateScene = () => (
  <>
    <div className="absolute inset-0 bg-gradient-to-b from-amber-200 via-sky-500 to-cyan-800" />
    <svg
      className="theme-wave-layer absolute bottom-0 left-0 h-12 w-[200%] text-sky-600/80"
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path fill="currentColor" d="M0,72 C300,40 600,96 1200,64 L1200,120 L0,120 Z" />
    </svg>
    <div className="theme-ship absolute bottom-10 left-1/2 -translate-x-1/2 text-4xl">🏴‍☠️</div>
    <div className="theme-treasure absolute bottom-14 right-8 text-xl">💎</div>
  </>
);

const PrincessScene = () => (
  <>
    <div className="absolute inset-0 bg-gradient-to-br from-pink-200 via-rose-200 to-fuchsia-300" />
    <Sparkle className="left-[20%] top-[25%] bg-pink-100" />
    <Sparkle className="left-[70%] top-[20%] bg-white" style={{ animationDelay: "0.7s" }} />
    <div className="theme-crown absolute bottom-10 left-1/2 -translate-x-1/2 text-4xl">👑</div>
    <div className="absolute bottom-0 left-1/2 h-10 w-24 -translate-x-1/2 rounded-t-full bg-white/30" />
  </>
);

const SuperheroScene = () => (
  <>
    <div className="absolute inset-0 bg-gradient-to-br from-blue-700 via-indigo-800 to-red-700" />
    <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center gap-1 px-4 pb-2 opacity-70">
      <div className="h-8 w-5 bg-slate-900/80" />
      <div className="h-12 w-6 bg-slate-900/80" />
      <div className="h-10 w-5 bg-slate-900/80" />
      <div className="h-14 w-7 bg-slate-900/80" />
    </div>
    <div className="theme-hero absolute bottom-10 left-1/2 -translate-x-1/2 text-4xl">🦸</div>
    <div className="theme-zap absolute right-6 top-8 text-2xl">⚡</div>
  </>
);

const AdventureScene = () => (
  <>
    <div className="absolute inset-0 bg-gradient-to-b from-sky-300 via-amber-200 to-orange-300" />
    <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-amber-700 to-lime-500" />
    <div className="theme-mountain absolute bottom-8 left-6 h-0 w-0 border-b-[48px] border-l-[34px] border-r-[34px] border-b-stone-500 border-l-transparent border-r-transparent opacity-90" />
    <div className="theme-mountain absolute bottom-8 right-10 h-0 w-0 border-b-[36px] border-l-[28px] border-r-[28px] border-b-stone-600 border-l-transparent border-r-transparent opacity-80" />
    <div className="theme-compass absolute bottom-12 left-1/2 -translate-x-1/2 text-3xl">🧭</div>
  </>
);

const FriendshipScene = () => (
  <>
    <div className="absolute inset-0 bg-gradient-to-br from-cyan-100 via-sky-200 to-teal-200" />
    <div className="theme-heart absolute left-[28%] top-[30%] text-2xl text-rose-400">❤️</div>
    <div className="theme-heart theme-heart-delayed absolute right-[28%] top-[34%] text-xl text-pink-400">💛</div>
    <div className="absolute bottom-8 left-1/2 flex -translate-x-1/2 gap-3 text-3xl">
      <span className="theme-wave-hand">🧒</span>
      <span className="theme-wave-hand theme-wave-hand-delayed">👧</span>
    </div>
  </>
);

const CustomThemeScene = () => (
  <>
    <div className="absolute inset-0 bg-gradient-to-br from-violet-300 via-fuchsia-300 to-cyan-300" />
    <Sparkle className="left-[15%] top-[20%] bg-white" />
    <Sparkle className="left-[68%] top-[18%] bg-yellow-100" style={{ animationDelay: "0.5s" }} />
    <Sparkle className="left-[42%] top-[42%] bg-pink-100" style={{ animationDelay: "1s" }} />
    <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1">
      <div className="theme-float rounded-xl bg-white/85 px-4 py-2 text-2xl shadow-md">✏️</div>
      <div className="h-1 w-16 rounded-full bg-white/70" />
      <div className="h-1 w-12 rounded-full bg-white/50" />
    </div>
    <div className="theme-float theme-float-delayed absolute right-8 top-10 text-xl">💡</div>
    <div className="theme-float absolute left-8 top-12 text-lg">✨</div>
  </>
);

const SCENES: Record<string, () => ReactNode> = {
  "adventure-quest": AdventureScene,
  "friendship-tale": FriendshipScene,
  "magical-world": MagicalScene,
  "space-explorer": SpaceScene,
  "ocean-adventure": OceanScene,
  "forest-journey": ForestScene,
  "castle-kingdom": CastleScene,
  "dinosaur-discovery": DinoScene,
  "pirate-adventure": PirateScene,
  "princess-tale": PrincessScene,
  "superhero-story": SuperheroScene,
  "custom-theme": CustomThemeScene,
};

const ThemeIllustration = ({
  themeId,
  isSelected = false,
  className,
}: ThemeIllustrationProps) => {
  const Scene = SCENES[themeId] ?? MagicalScene;

  return (
    <div
      className={cn(
        "relative h-full w-full overflow-hidden transition-all duration-300",
        "group-hover:brightness-110 group-hover:saturate-125",
        isSelected && "theme-scene-selected brightness-110 saturate-125",
        className,
      )}
    >
      <Scene />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
      <div
        className={cn(
          "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300",
          "bg-[radial-gradient(circle_at_50%_20%,rgba(255,255,255,0.35),transparent_55%)]",
          "group-hover:opacity-100",
          isSelected && "opacity-100",
        )}
        aria-hidden
      />
    </div>
  );
};

export default ThemeIllustration;
