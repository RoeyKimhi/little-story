import type { CSSProperties, ReactNode, SVGProps } from "react";
import { cn } from "@/lib/utils";

export const Sparkle = ({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) => (
  <span
    className={cn(
      "theme-sparkle absolute block h-1.5 w-1.5 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.9)]",
      className,
    )}
    style={style}
  />
);

export const SceneBackdrop = ({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) => <div className={cn("absolute inset-0", className)}>{children}</div>;

export const WaveLayers = ({
  className,
  colors = ["text-cyan-200/90", "text-teal-300/85", "text-sky-500"],
}: {
  className?: string;
  colors?: [string, string, string];
}) => (
  <div className={cn("absolute inset-x-0 bottom-0", className)}>
    <svg
      className={cn("theme-wave-layer absolute bottom-10 left-0 h-14 w-[200%]", colors[0])}
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path fill="currentColor" d="M0,70 C200,30 400,95 600,60 C800,25 1000,90 1200,55 L1200,120 L0,120 Z" />
    </svg>
    <svg
      className={cn(
        "theme-wave-layer theme-wave-layer-slow absolute bottom-5 left-0 h-16 w-[200%]",
        colors[1],
      )}
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path fill="currentColor" d="M0,82 C180,48 380,100 600,72 C820,44 1020,96 1200,68 L1200,120 L0,120 Z" />
    </svg>
    <svg
      className={cn(
        "theme-wave-layer theme-wave-layer-fast absolute bottom-0 left-0 h-12 w-[200%]",
        colors[2],
      )}
      viewBox="0 0 1200 120"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path fill="currentColor" d="M0,90 C220,58 420,108 600,82 C780,56 980,106 1200,78 L1200,120 L0,120 Z" />
    </svg>
  </div>
);

export const Sun = ({ className }: { className?: string }) => (
  <div className={cn("theme-sun absolute", className)}>
    <div className="relative h-11 w-11">
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-yellow-200 to-amber-400 shadow-[0_0_28px_rgba(251,191,36,0.85)]" />
      {[0, 45, 90, 135].map((deg) => (
        <span
          key={deg}
          className="absolute left-1/2 top-1/2 h-5 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-yellow-200/80"
          style={{ transform: `translate(-50%, -50%) rotate(${deg}deg) translateY(-130%)` }}
        />
      ))}
    </div>
  </div>
);

export const Cloud = ({ className }: { className?: string }) => (
  <svg
    className={cn("absolute opacity-90", className)}
    viewBox="0 0 80 32"
    aria-hidden
  >
    <ellipse cx="24" cy="20" rx="18" ry="12" fill="white" fillOpacity="0.95" />
    <ellipse cx="42" cy="16" rx="22" ry="14" fill="white" fillOpacity="0.95" />
    <ellipse cx="58" cy="21" rx="16" ry="11" fill="white" fillOpacity="0.95" />
  </svg>
);

export const StarDot = ({
  className,
  style,
  size = 3,
}: {
  className?: string;
  style?: CSSProperties;
  size?: number;
}) => (
  <span
    className={cn("theme-sparkle absolute rounded-full bg-white", className)}
    style={{ width: size, height: size, ...style }}
  />
);

type SvgProps = SVGProps<SVGSVGElement>;

export const FishSvg = ({ className, ...props }: SvgProps) => (
  <svg className={cn("theme-fish absolute", className)} viewBox="0 0 64 40" aria-hidden {...props}>
    <ellipse cx="28" cy="20" rx="22" ry="14" fill="#38bdf8" />
    <polygon points="50,20 64,8 64,32" fill="#0ea5e9" />
    <circle cx="18" cy="17" r="2.5" fill="#1e3a8a" />
    <ellipse cx="30" cy="24" rx="8" ry="3" fill="#7dd3fc" opacity="0.7" />
    <path d="M8 14 Q14 20 8 26" stroke="#0284c7" strokeWidth="2" fill="none" />
  </svg>
);

export const JellyfishSvg = ({ className, ...props }: SvgProps) => (
  <svg className={cn("theme-float theme-float-delayed absolute", className)} viewBox="0 0 40 52" aria-hidden {...props}>
    <ellipse cx="20" cy="14" rx="16" ry="12" fill="#c4b5fd" opacity="0.85" />
    <path d="M10 18 Q8 32 12 48 M16 18 Q16 34 15 50 M20 18 Q22 36 20 50 M24 18 Q26 34 25 48 M30 18 Q32 32 28 48" stroke="#a78bfa" strokeWidth="2" fill="none" strokeLinecap="round" />
  </svg>
);

export const CoralSvg = ({ className, ...props }: SvgProps) => (
  <svg className={cn("absolute", className)} viewBox="0 0 48 36" aria-hidden {...props}>
    <path d="M8 36 Q4 20 12 8 Q16 22 14 36 Z" fill="#fb7185" />
    <path d="M22 36 Q18 18 26 6 Q30 20 28 36 Z" fill="#f472b6" />
    <path d="M36 36 Q32 22 40 12 Q44 24 42 36 Z" fill="#fda4af" />
  </svg>
);

export const TreeSvg = ({
  className,
  variant = "left",
}: {
  className?: string;
  variant?: "left" | "center" | "right";
}) => {
  const greens =
    variant === "center"
      ? ["#166534", "#15803d", "#22c55e"]
      : variant === "right"
        ? ["#14532d", "#166534", "#16a34a"]
        : ["#15803d", "#22c55e", "#4ade80"];

  return (
    <svg className={cn("theme-tree absolute", className)} viewBox="0 0 56 80" aria-hidden>
      <rect x="24" y="52" width="8" height="22" rx="2" fill="#92400e" />
      <circle cx="28" cy="42" r="18" fill={greens[0]} />
      <circle cx="20" cy="30" r="14" fill={greens[1]} />
      <circle cx="36" cy="28" r="13" fill={greens[2]} />
      <circle cx="28" cy="18" r="11" fill={greens[1]} />
    </svg>
  );
};

export const MushroomSvg = ({ className }: { className?: string }) => (
  <svg className={cn("absolute", className)} viewBox="0 0 28 30" aria-hidden>
    <rect x="11" y="16" width="6" height="12" rx="2" fill="#fef3c7" />
    <ellipse cx="14" cy="14" rx="12" ry="10" fill="#ef4444" />
    <circle cx="10" cy="12" r="2" fill="white" opacity="0.85" />
    <circle cx="17" cy="10" r="1.5" fill="white" opacity="0.85" />
    <circle cx="14" cy="16" r="1.5" fill="white" opacity="0.85" />
  </svg>
);

export const ButterflySvg = ({ className }: { className?: string }) => (
  <svg className={cn("theme-float absolute", className)} viewBox="0 0 40 32" aria-hidden>
    <ellipse cx="12" cy="14" rx="10" ry="12" fill="#f9a8d4" opacity="0.9" />
    <ellipse cx="28" cy="14" rx="10" ry="12" fill="#c084fc" opacity="0.9" />
    <ellipse cx="20" cy="16" rx="2.5" ry="10" fill="#4c1d95" />
  </svg>
);

export const WandSvg = ({ className }: { className?: string }) => (
  <svg className={cn("theme-wand absolute", className)} viewBox="0 0 48 80" aria-hidden>
    <rect x="20" y="24" width="8" height="48" rx="3" fill="#fcd34d" transform="rotate(-18 24 48)" />
    <polygon points="18,8 30,8 36,22 24,30 12,22" fill="#e879f9" />
    <circle cx="24" cy="18" r="4" fill="white" opacity="0.8" />
    <path d="M8 6 L12 10 M38 4 L34 8 M40 28 L36 24" stroke="#fef08a" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const RocketSvg = ({ className }: { className?: string }) => (
  <svg className={cn("theme-rocket absolute", className)} viewBox="0 0 56 88" aria-hidden>
    <ellipse cx="28" cy="78" rx="10" ry="6" fill="#f97316" className="theme-rocket-flame" opacity="0.8" />
    <path d="M28 8 L42 52 L36 56 L36 68 L20 68 L20 56 L14 52 Z" fill="#e2e8f0" />
    <circle cx="28" cy="36" r="8" fill="#38bdf8" opacity="0.85" />
    <path d="M14 52 L6 64 L14 60 Z" fill="#f43f5e" />
    <path d="M42 52 L50 64 L42 60 Z" fill="#f43f5e" />
  </svg>
);

export const PlanetSvg = ({ className }: { className?: string }) => (
  <div className={cn("theme-planet absolute", className)}>
    <div className="relative h-14 w-14">
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-orange-300 via-rose-400 to-purple-500 shadow-[inset_-6px_-6px_12px_rgba(0,0,0,0.35)]" />
      <div className="absolute left-1/2 top-1/2 h-16 w-6 -translate-x-1/2 -translate-y-1/2 rotate-[65deg] rounded-full border-2 border-violet-200/50" />
    </div>
  </div>
);

export const CastleSvg = ({ className }: { className?: string }) => (
  <svg className={cn("absolute", className)} viewBox="0 0 120 72" aria-hidden>
    <rect x="8" y="34" width="24" height="38" fill="#a8a29e" />
    <rect x="44" y="18" width="32" height="54" fill="#d6d3d1" />
    <rect x="88" y="30" width="24" height="42" fill="#a8a29e" />
    <rect x="14" y="26" width="12" height="12" fill="#a8a29e" />
    <rect x="94" y="22" width="12" height="12" fill="#a8a29e" />
    <polygon points="50,18 60,4 70,18" fill="#fb7185" />
    <polygon points="18,26 20,18 26,26" fill="#fb7185" />
    <polygon points="98,22 100,14 106,22" fill="#fb7185" />
    <rect x="54" y="44" width="12" height="16" rx="6" fill="#57534e" />
    <rect x="14" y="44" width="8" height="10" fill="#7dd3fc" opacity="0.8" />
    <rect x="94" y="40" width="8" height="10" fill="#7dd3fc" opacity="0.8" />
    <path d="M72 10 L88 10 L88 18 L72 18 Z" fill="#ef4444" className="theme-flag" />
  </svg>
);

export const DinoSvg = ({ className }: { className?: string }) => (
  <svg className={cn("theme-dino absolute", className)} viewBox="0 0 100 72" aria-hidden>
    <ellipse cx="42" cy="48" rx="28" ry="18" fill="#65a30d" />
    <ellipse cx="62" cy="34" rx="16" ry="14" fill="#84cc16" />
    <circle cx="68" cy="28" r="2.5" fill="#1e293b" />
    <path d="M14 48 Q4 40 8 28 Q16 34 14 48" fill="#4d7c0f" />
    <path d="M30 58 L30 68 M50 58 L50 68 M66 56 L66 68" stroke="#3f6212" strokeWidth="4" strokeLinecap="round" />
    <path d="M78 30 Q92 24 96 34 Q88 38 78 30" fill="#65a30d" />
  </svg>
);

export const VolcanoSvg = ({ className }: { className?: string }) => (
  <svg className={cn("absolute", className)} viewBox="0 0 56 48" aria-hidden>
    <polygon points="28,6 52,44 4,44" fill="#57534e" />
    <polygon points="28,6 38,20 18,20" fill="#78716c" />
    <ellipse cx="28" cy="8" rx="6" ry="4" fill="#fb923c" className="theme-volcano-glow" />
    <path d="M24 8 Q28 0 32 8" stroke="#fde047" strokeWidth="2" fill="none" opacity="0.8" />
  </svg>
);

export const ShipSvg = ({ className }: { className?: string }) => (
  <svg className={cn("theme-ship absolute", className)} viewBox="0 0 100 72" aria-hidden>
    <path d="M10 48 Q50 62 90 48 L82 56 Q50 68 18 56 Z" fill="#92400e" />
    <rect x="44" y="10" width="6" height="42" fill="#78350f" />
    <polygon points="50,10 78,38 50,38" fill="#f8fafc" />
    <polygon points="50,18 30,36 50,36" fill="#ef4444" />
    <circle cx="50" cy="8" r="4" fill="#1e293b" />
    <rect x="20" y="44" width="60" height="8" rx="2" fill="#a16207" />
  </svg>
);

export const TreasureSvg = ({ className }: { className?: string }) => (
  <svg className={cn("theme-treasure absolute", className)} viewBox="0 0 40 32" aria-hidden>
    <rect x="4" y="14" width="32" height="16" rx="3" fill="#b45309" />
    <path d="M4 18 Q20 8 36 18" fill="#d97706" />
    <rect x="4" y="18" width="32" height="4" fill="#fbbf24" />
    <polygon points="18,20 20,14 22,20" fill="#22d3ee" />
    <polygon points="24,21 26,15 28,21" fill="#a78bfa" />
  </svg>
);

export const CrownSvg = ({ className }: { className?: string }) => (
  <svg className={cn("theme-crown absolute", className)} viewBox="0 0 72 48" aria-hidden>
    <path d="M8 38 L12 16 L24 28 L36 10 L48 28 L60 16 L64 38 Z" fill="#fbbf24" />
    <rect x="8" y="36" width="56" height="10" rx="2" fill="#f59e0b" />
    <circle cx="12" cy="16" r="4" fill="#f472b6" />
    <circle cx="36" cy="10" r="5" fill="#e879f9" />
    <circle cx="60" cy="16" r="4" fill="#38bdf8" />
  </svg>
);

export const HeroSvg = ({ className }: { className?: string }) => (
  <svg className={cn("theme-hero absolute", className)} viewBox="0 0 64 80" aria-hidden>
    <path d="M48 8 Q56 30 40 44 Q52 50 44 72 L36 72 Q38 52 32 44 Q20 36 24 12 Z" fill="#ef4444" opacity="0.95" />
    <circle cx="30" cy="22" r="10" fill="#fde68a" />
    <rect x="22" y="32" width="16" height="22" rx="4" fill="#2563eb" />
    <path d="M18 36 L10 48 M46 36 L54 30" stroke="#fde68a" strokeWidth="4" strokeLinecap="round" />
  </svg>
);

export const LightningSvg = ({
  className,
  style,
}: {
  className?: string;
  style?: CSSProperties;
}) => (
  <svg className={cn("theme-zap absolute", className)} viewBox="0 0 32 48" style={style} aria-hidden>
    <polygon points="18,0 6,26 14,26 10,48 28,18 18,18" fill="#fde047" />
  </svg>
);

export const MountainSvg = ({
  className,
  snow = false,
}: {
  className?: string;
  snow?: boolean;
}) => (
  <svg className={cn("theme-mountain absolute", className)} viewBox="0 0 80 56" aria-hidden>
    <polygon points="40,4 78,54 2,54" fill={snow ? "#78716c" : "#a8a29e"} />
    {snow && <polygon points="40,4 54,28 26,28" fill="white" opacity="0.9" />}
  </svg>
);

export const CompassSvg = ({ className }: { className?: string }) => (
  <svg className={cn("theme-compass absolute", className)} viewBox="0 0 56 56" aria-hidden>
    <circle cx="28" cy="28" r="24" fill="#fef3c7" stroke="#d97706" strokeWidth="3" />
    <polygon points="28,10 32,28 28,46 24,28" fill="#ef4444" />
    <polygon points="28,10 32,28 28,28 24,28" fill="#3b82f6" />
    <circle cx="28" cy="28" r="4" fill="#d97706" />
  </svg>
);

export const KidsSvg = ({ className }: { className?: string }) => (
  <svg className={cn("absolute", className)} viewBox="0 0 100 64" aria-hidden>
    <circle cx="30" cy="18" r="10" fill="#fde68a" />
    <path d="M18 30 Q30 26 42 30 L42 52 Q30 58 18 52 Z" fill="#38bdf8" />
    <circle cx="70" cy="18" r="10" fill="#fbcfe8" />
    <path d="M58 30 Q70 26 82 30 L82 52 Q70 58 58 52 Z" fill="#f472b6" />
    <path d="M40 38 Q50 34 60 38" stroke="#f43f5e" strokeWidth="3" fill="none" strokeLinecap="round" />
  </svg>
);

export const HeartSvg = ({ className, fill = "#fb7185" }: { className?: string; fill?: string }) => (
  <svg className={cn("theme-heart absolute", className)} viewBox="0 0 32 28" aria-hidden>
    <path
      d="M16 26 C6 16 0 10 6 4 C10 0 16 4 16 8 C16 4 22 0 26 4 C32 10 26 16 16 26 Z"
      fill={fill}
    />
  </svg>
);

export const BookSvg = ({ className }: { className?: string }) => (
  <svg className={cn("theme-float absolute", className)} viewBox="0 0 64 48" aria-hidden>
    <path d="M6 8 Q32 2 58 8 L58 40 Q32 46 6 40 Z" fill="#c4b5fd" />
    <path d="M32 8 L32 40" stroke="#8b5cf6" strokeWidth="2" />
    <rect x="12" y="16" width="14" height="2" rx="1" fill="white" opacity="0.7" />
    <rect x="12" y="22" width="10" height="2" rx="1" fill="white" opacity="0.7" />
    <rect x="36" y="16" width="14" height="2" rx="1" fill="white" opacity="0.7" />
    <rect x="36" y="22" width="10" height="2" rx="1" fill="white" opacity="0.7" />
  </svg>
);

export const PencilSvg = ({ className }: { className?: string }) => (
  <svg className={cn("theme-float theme-float-delayed absolute", className)} viewBox="0 0 48 48" aria-hidden>
    <rect x="18" y="8" width="12" height="28" rx="2" fill="#fbbf24" transform="rotate(24 24 24)" />
    <polygon points="30,8 36,14 30,20" fill="#fde68a" transform="rotate(24 24 24)" />
    <polygon points="18,32 24,38 18,44" fill="#f472b6" transform="rotate(24 24 24)" />
  </svg>
);

export const Bubble = ({
  className,
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
}) => {
  const sizeClass = { sm: "h-2 w-2", md: "h-3 w-3", lg: "h-4 w-4" }[size];
  return (
    <span
      className={cn(
        "theme-bubble absolute rounded-full border border-white/40 bg-white/35 shadow-[inset_0_0_4px_rgba(255,255,255,0.6)]",
        sizeClass,
        className,
      )}
    />
  );
};
