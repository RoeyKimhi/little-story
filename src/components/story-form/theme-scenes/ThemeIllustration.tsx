import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import {
  BookSvg,
  Bubble,
  ButterflySvg,
  CastleSvg,
  Cloud,
  CompassSvg,
  CoralSvg,
  CrownSvg,
  DinoSvg,
  FishSvg,
  HeartSvg,
  HeroSvg,
  JellyfishSvg,
  KidsSvg,
  LightningSvg,
  MountainSvg,
  MushroomSvg,
  PencilSvg,
  PlanetSvg,
  RocketSvg,
  SceneBackdrop,
  ShipSvg,
  Sparkle,
  StarDot,
  Sun,
  TreasureSvg,
  TreeSvg,
  VolcanoSvg,
  WandSvg,
  WaveLayers,
} from "./themeSceneParts";

interface ThemeIllustrationProps {
  themeId: string;
  isSelected?: boolean;
  className?: string;
}

const OceanScene = () => (
  <>
    <SceneBackdrop className="bg-gradient-to-b from-sky-300 via-cyan-300 to-blue-600" />
    <Sun className="right-5 top-3" />
    <Cloud className="left-4 top-5 h-8 w-20" />
    <Cloud className="right-16 top-10 h-6 w-16 opacity-70" />
    <StarDot className="left-[20%] top-[18%] opacity-60" size={2} />
    <StarDot className="left-[35%] top-[12%] opacity-50" size={2} />
    <CoralSvg className="bottom-14 left-3 h-9 w-12" />
    <CoralSvg className="bottom-12 right-4 h-7 w-10 opacity-80" />
    <FishSvg className="bottom-16 right-[22%] h-8 w-14" />
    <FishSvg className="bottom-20 left-[18%] h-6 w-10 scale-x-[-1] opacity-80" />
    <JellyfishSvg className="bottom-24 right-[12%] h-12 w-9 opacity-75" />
    <Bubble className="bottom-12 left-[28%]" />
    <Bubble className="theme-bubble-delayed bottom-16 left-[38%]" size="sm" />
    <Bubble className="bottom-20 left-[15%]" size="lg" />
    <WaveLayers />
  </>
);

const ForestScene = () => (
  <>
    <SceneBackdrop className="bg-gradient-to-b from-sky-300 via-emerald-200 to-green-700" />
    <Sun className="right-4 top-2 scale-90 opacity-90" />
    <Cloud className="left-6 top-4 h-7 w-18" />
    <div className="absolute bottom-0 left-0 right-0 h-[55%] bg-gradient-to-t from-green-800 via-green-600 to-transparent" />
    <div className="absolute bottom-8 left-0 right-0 h-4 rounded-t-[100%] bg-green-500/80" />
    <TreeSvg variant="left" className="bottom-4 left-1 h-20 w-14" />
    <TreeSvg variant="center" className="bottom-2 left-1/2 h-24 w-16 -translate-x-1/2" />
    <TreeSvg variant="right" className="bottom-5 right-2 h-[4.5rem] w-[3.25rem]" />
    <MushroomSvg className="bottom-10 left-[38%] h-7 w-7" />
    <MushroomSvg className="bottom-9 right-[30%] h-6 w-6 scale-90" />
    <ButterflySvg className="left-[22%] top-[28%] h-7 w-9" />
    <ButterflySvg className="theme-float-delayed right-[18%] top-[22%] h-6 w-8 opacity-80" />
    <Sparkle className="left-[55%] top-[20%] bg-lime-100" />
  </>
);

const MagicalScene = () => (
  <>
    <SceneBackdrop className="bg-gradient-to-br from-violet-500 via-purple-600 to-fuchsia-700" />
    <div className="absolute left-1/2 top-4 h-16 w-16 -translate-x-1/2 rounded-full bg-violet-300/30 blur-xl" />
    <StarDot className="left-[10%] top-[15%]" />
    <StarDot className="left-[78%] top-[12%]" style={{ animationDelay: "0.4s" }} />
    <StarDot className="left-[62%] top-[28%]" style={{ animationDelay: "0.9s" }} />
    <Sparkle className="left-[20%] top-[24%]" />
    <Sparkle className="left-[72%] top-[20%]" style={{ animationDelay: "0.5s" }} />
    <Sparkle className="left-[48%] top-[36%]" style={{ animationDelay: "1s" }} />
    <Sparkle className="left-[85%] top-[42%]" style={{ animationDelay: "0.2s" }} />
    <WandSvg className="bottom-6 left-1/2 h-20 w-12 -translate-x-1/2" />
    <div className="theme-magic-trail absolute bottom-16 left-1/2 h-20 w-20 -translate-x-1/2 rounded-full bg-fuchsia-300/20 blur-md" />
  </>
);

const SpaceScene = () => (
  <>
    <SceneBackdrop className="bg-gradient-to-b from-indigo-950 via-violet-950 to-slate-950" />
    {[
      ["12%", "18%"],
      ["28%", "32%"],
      ["45%", "12%"],
      ["68%", "24%"],
      ["82%", "16%"],
      ["55%", "42%"],
      ["22%", "48%"],
      ["90%", "38%"],
    ].map(([left, top], i) => (
      <StarDot
        key={`${left}-${top}`}
        className="bg-white"
        style={{ left, top, animationDelay: `${i * 0.25}s` }}
        size={i % 3 === 0 ? 3 : 2}
      />
    ))}
    <PlanetSvg className="right-4 top-3" />
    <div className="absolute left-6 top-8 h-8 w-14 rotate-12 rounded-full bg-indigo-400/20 blur-sm" />
    <RocketSvg className="bottom-6 left-1/2 h-24 w-16 -translate-x-1/2" />
    <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-indigo-600/25 to-transparent" />
  </>
);

const CastleScene = () => (
  <>
    <SceneBackdrop className="bg-gradient-to-b from-sky-400 via-rose-100 to-amber-100" />
    <Sun className="left-4 top-3 scale-75" />
    <Cloud className="right-6 top-6 h-8 w-20" />
    <Cloud className="left-[30%] top-8 h-6 w-14 opacity-80" />
    <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-emerald-600 to-emerald-400" />
    <CastleSvg className="bottom-6 left-1/2 h-20 w-32 -translate-x-1/2" />
    <Sparkle className="bottom-[42%] left-[18%] bg-amber-100" />
    <Sparkle className="bottom-[48%] right-[20%] bg-rose-100" style={{ animationDelay: "0.6s" }} />
  </>
);

const DinoScene = () => (
  <>
    <SceneBackdrop className="bg-gradient-to-b from-sky-400 via-lime-200 to-amber-200" />
    <Sun className="right-5 top-2 scale-90" />
    <Cloud className="left-5 top-5 h-7 w-16" />
    <div className="absolute bottom-0 left-0 right-0 h-14 bg-gradient-to-t from-lime-700 to-lime-500" />
    <VolcanoSvg className="right-4 top-6 h-12 w-14" />
    <TreeSvg variant="right" className="bottom-5 left-3 h-16 w-11 scale-75 opacity-90" />
    <DinoSvg className="bottom-7 left-1/2 h-20 w-28 -translate-x-1/2" />
    <Sparkle className="bottom-[45%] left-[20%] bg-yellow-100" />
  </>
);

const PirateScene = () => (
  <>
    <SceneBackdrop className="bg-gradient-to-b from-amber-300 via-sky-500 to-cyan-900" />
    <Sun className="left-5 top-2 scale-75 opacity-90" />
    <Cloud className="right-8 top-5 h-7 w-16" />
    <div className="absolute bottom-10 right-6 h-8 w-12 rounded-full bg-amber-200/80" />
    <div className="absolute bottom-10 right-5 h-5 w-4 rounded-full bg-lime-500" />
    <ShipSvg className="theme-rock bottom-10 left-1/2 h-20 w-28 -translate-x-1/2" />
    <TreasureSvg className="bottom-14 right-6 h-8 w-10" />
    <WaveLayers colors={["text-sky-500/70", "text-cyan-700/80", "text-teal-900"]} />
  </>
);

const PrincessScene = () => (
  <>
    <SceneBackdrop className="bg-gradient-to-br from-pink-200 via-rose-200 to-fuchsia-400" />
    <Sparkle className="left-[18%] top-[22%] bg-pink-100" />
    <Sparkle className="left-[72%] top-[18%] bg-white" style={{ animationDelay: "0.5s" }} />
    <Sparkle className="left-[48%] top-[12%] bg-fuchsia-100" style={{ animationDelay: "1s" }} />
    <StarDot className="left-[30%] top-[30%] bg-rose-200" size={3} />
    <StarDot className="right-[25%] top-[26%] bg-white" size={2} />
    <div className="absolute bottom-0 left-1/2 h-12 w-28 -translate-x-1/2 rounded-t-[100%] bg-white/35" />
    <CastleSvg className="bottom-8 left-1/2 h-14 w-24 -translate-x-1/2 opacity-40" />
    <CrownSvg className="bottom-10 left-1/2 h-12 w-20 -translate-x-1/2" />
    <HeartSvg className="bottom-[46%] left-[20%] h-5 w-6 fill-[#f472b6]" />
    <HeartSvg className="theme-heart-delayed bottom-[42%] right-[18%] h-4 w-5 fill-[#fb7185]" />
  </>
);

const SuperheroScene = () => (
  <>
    <SceneBackdrop className="bg-gradient-to-br from-blue-700 via-indigo-900 to-rose-700" />
    <StarDot className="left-[15%] top-[20%]" />
    <StarDot className="right-[20%] top-[15%]" style={{ animationDelay: "0.5s" }} />
    <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center gap-1.5 px-3 pb-1">
      {[8, 12, 10, 16, 11, 14].map((h, i) => (
        <div
          key={i}
          className="w-5 rounded-t-sm bg-slate-950/75"
          style={{ height: `${h * 4}px` }}
        />
      ))}
    </div>
    <div className="absolute bottom-12 left-0 right-0 h-8 bg-gradient-to-t from-yellow-400/20 to-transparent" />
    <LightningSvg className="right-5 top-6 h-10 w-7" />
    <LightningSvg className="theme-zap left-4 top-10 h-7 w-5 opacity-70" style={{ animationDelay: "0.4s" }} />
    <HeroSvg className="bottom-8 left-1/2 h-24 w-16 -translate-x-1/2" />
  </>
);

const AdventureScene = () => (
  <>
    <SceneBackdrop className="bg-gradient-to-b from-sky-400 via-amber-200 to-orange-300" />
    <Sun className="right-4 top-2" />
    <Cloud className="left-5 top-5 h-7 w-16" />
    <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-amber-800 via-lime-600 to-transparent" />
    <MountainSvg snow className="bottom-8 left-2 h-14 w-20" />
    <MountainSvg className="bottom-7 right-4 h-12 w-16 opacity-90" />
    <MountainSvg snow className="bottom-6 left-[38%] h-10 w-14 opacity-80" />
    <div className="absolute bottom-9 left-1/2 h-1 w-20 -translate-x-1/2 rounded-full bg-amber-900/30" />
    <CompassSvg className="bottom-10 left-1/2 h-14 w-14 -translate-x-1/2" />
  </>
);

const FriendshipScene = () => (
  <>
    <SceneBackdrop className="bg-gradient-to-br from-cyan-100 via-sky-200 to-teal-300" />
    <Cloud className="left-4 top-4 h-7 w-16" />
    <Cloud className="right-6 top-7 h-6 w-14 opacity-80" />
    <div className="absolute left-4 right-4 top-[38%] h-1 rounded-full bg-white/40" />
    <HeartSvg className="left-[22%] top-[24%] h-6 w-7 fill-[#fb7185]" />
    <HeartSvg className="theme-heart-delayed right-[20%] top-[28%] h-5 w-6 fill-[#fbbf24]" />
    <HeartSvg className="left-[48%] top-[18%] h-4 w-5 fill-[#f472b6] opacity-80" />
    <KidsSvg className="bottom-6 left-1/2 h-16 w-28 -translate-x-1/2" />
    <Sparkle className="bottom-[50%] left-[15%] bg-rose-100" />
    <Sparkle className="bottom-[48%] right-[14%] bg-sky-100" style={{ animationDelay: "0.7s" }} />
  </>
);

const CustomThemeScene = () => (
  <>
    <SceneBackdrop className="bg-gradient-to-br from-violet-300 via-fuchsia-300 to-cyan-300" />
    <Sparkle className="left-[14%] top-[18%] bg-white" />
    <Sparkle className="left-[70%] top-[16%] bg-yellow-100" style={{ animationDelay: "0.4s" }} />
    <Sparkle className="left-[42%] top-[38%] bg-pink-100" style={{ animationDelay: "0.9s" }} />
    <StarDot className="left-[58%] top-[22%] bg-white" />
    <BookSvg className="bottom-10 left-[32%] h-12 w-16" />
    <PencilSvg className="bottom-14 right-[28%] h-10 w-10" />
    <div className="theme-float absolute bottom-8 right-[18%] flex h-9 w-9 items-center justify-center rounded-full bg-yellow-200/90 text-lg shadow-md">
      💡
    </div>
    <div className="absolute bottom-0 left-0 right-0 h-8 bg-white/20" />
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
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />
      <div
        className={cn(
          "pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300",
          "bg-[radial-gradient(circle_at_50%_25%,rgba(255,255,255,0.4),transparent_58%)]",
          "group-hover:opacity-100",
          isSelected && "opacity-100",
        )}
        aria-hidden
      />
    </div>
  );
};

export default ThemeIllustration;
