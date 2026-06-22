import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface RunnerGameProps {
  className?: string;
}

interface Obstacle {
  x: number;
  width: number;
  height: number;
  passed?: boolean;
}

interface GameSnapshot {
  playerY: number;
  velocityY: number;
  isOnGround: boolean;
  obstacles: Obstacle[];
  groundOffset: number;
  score: number;
  nextObstacleIn: number;
}

type GamePhase = "ready" | "playing" | "gameover";

const GRAVITY = 0.72;
const JUMP_VELOCITY = -11.5;
const GROUND_HEIGHT = 52;
const PLAYER_SIZE = 42;
const PLAYER_X = 76;
const BASE_SPEED = 5.2;

const createInitialState = (width: number): GameSnapshot => ({
  playerY: 0,
  velocityY: 0,
  isOnGround: true,
  obstacles: [],
  groundOffset: 0,
  score: 0,
  nextObstacleIn: width * 0.45,
});

const randomObstacle = () => {
  const height = 28 + Math.random() * 22;
  const width = 18 + Math.random() * 14;
  return { width, height };
};

const drawRoundedRect = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  width: number,
  height: number,
  radius: number,
) => {
  const r = Math.min(radius, width / 2, height / 2);
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.lineTo(x + width - r, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + r);
  ctx.lineTo(x + width, y + height - r);
  ctx.quadraticCurveTo(x + width, y + height, x + width - r, y + height);
  ctx.lineTo(x + r, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - r);
  ctx.lineTo(x, y + r);
  ctx.quadraticCurveTo(x, y, x + r, y);
  ctx.closePath();
};

const drawBunny = (
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  size: number,
) => {
  const bodyY = y - size;

  ctx.fillStyle = "#f472b6";
  drawRoundedRect(ctx, x - size * 0.15, bodyY + size * 0.2, size * 0.3, size * 0.55, 8);
  ctx.fill();

  ctx.fillStyle = "#fb7185";
  ctx.beginPath();
  ctx.ellipse(x, bodyY + size * 0.55, size * 0.38, size * 0.32, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#fda4af";
  ctx.beginPath();
  ctx.ellipse(x - size * 0.18, bodyY + size * 0.08, size * 0.1, size * 0.22, -0.25, 0, Math.PI * 2);
  ctx.ellipse(x + size * 0.18, bodyY + size * 0.08, size * 0.1, size * 0.22, 0.25, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#1e1b4b";
  ctx.beginPath();
  ctx.arc(x + size * 0.12, bodyY + size * 0.48, size * 0.05, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#fff";
  ctx.beginPath();
  ctx.arc(x + size * 0.14, bodyY + size * 0.46, size * 0.018, 0, Math.PI * 2);
  ctx.fill();
};

const drawBookObstacle = (
  ctx: CanvasRenderingContext2D,
  x: number,
  groundY: number,
  obstacle: Obstacle,
) => {
  const baseY = groundY - obstacle.height;

  ctx.fillStyle = "#7c3aed";
  drawRoundedRect(ctx, x, baseY, obstacle.width, obstacle.height, 4);
  ctx.fill();

  ctx.fillStyle = "#a78bfa";
  drawRoundedRect(ctx, x + 3, baseY + 4, obstacle.width - 6, obstacle.height - 8, 3);
  ctx.fill();

  ctx.strokeStyle = "#5b21b6";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x + obstacle.width * 0.35, baseY + 6);
  ctx.lineTo(x + obstacle.width * 0.35, baseY + obstacle.height - 6);
  ctx.stroke();
};

const drawScene = (
  ctx: CanvasRenderingContext2D,
  width: number,
  height: number,
  groundY: number,
  game: GameSnapshot,
) => {
  const sky = ctx.createLinearGradient(0, 0, 0, height);
  sky.addColorStop(0, "#ede9fe");
  sky.addColorStop(1, "#fae8ff");
  ctx.fillStyle = sky;
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = "#ddd6fe";
  ctx.beginPath();
  ctx.ellipse(width * 0.2, height * 0.22, 36, 18, 0, 0, Math.PI * 2);
  ctx.ellipse(width * 0.24, height * 0.2, 28, 14, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#e9d5ff";
  ctx.beginPath();
  ctx.ellipse(width * 0.72, height * 0.16, 30, 15, 0, 0, Math.PI * 2);
  ctx.ellipse(width * 0.76, height * 0.14, 22, 11, 0, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = "#c4b5fd";
  ctx.fillRect(0, groundY, width, GROUND_HEIGHT);

  ctx.strokeStyle = "#a78bfa";
  ctx.lineWidth = 3;
  ctx.beginPath();
  ctx.moveTo(0, groundY);
  ctx.lineTo(width, groundY);
  ctx.stroke();

  ctx.fillStyle = "#ddd6fe";
  for (let x = -game.groundOffset; x < width; x += 40) {
    ctx.fillRect(x, groundY + 14, 20, 4);
  }

  for (const obstacle of game.obstacles) {
    drawBookObstacle(ctx, obstacle.x, groundY, obstacle);
  }

  drawBunny(ctx, PLAYER_X, groundY + game.playerY, PLAYER_SIZE);
};

const RunnerGame = ({ className }: RunnerGameProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<GameSnapshot | null>(null);
  const animationRef = useRef<number | null>(null);
  const dimensionsRef = useRef({ width: 0, height: 0, dpr: 1 });
  const phaseRef = useRef<GamePhase>("ready");
  const onGameOverRef = useRef<(score: number) => void>(() => undefined);

  const [phase, setPhase] = useState<GamePhase>("ready");
  const [score, setScore] = useState(0);
  const [finalScore, setFinalScore] = useState(0);

  const setGamePhase = useCallback((nextPhase: GamePhase) => {
    phaseRef.current = nextPhase;
    setPhase(nextPhase);
  }, []);

  const resetGameState = useCallback(() => {
    const width = dimensionsRef.current.width;
    gameRef.current = createInitialState(width > 0 ? width : 320);
    setScore(0);
    setFinalScore(0);
  }, []);

  const startGame = useCallback(() => {
    resetGameState();
    setGamePhase("playing");
  }, [resetGameState, setGamePhase]);

  const restartGame = useCallback(() => {
    startGame();
  }, [startGame]);

  useEffect(() => {
    onGameOverRef.current = (nextScore: number) => {
      setFinalScore(nextScore);
      setGamePhase("gameover");
    };
  }, [setGamePhase]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;

    if (!canvas || !container) {
      return;
    }

    const ctx = canvas.getContext("2d");

    if (!ctx) {
      return;
    }

    const resize = () => {
      const width = container.clientWidth;
      const height = Math.max(220, Math.min(280, width * 0.42));
      const dpr = window.devicePixelRatio || 1;

      dimensionsRef.current = { width, height, dpr };
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      if (!gameRef.current) {
        gameRef.current = createInitialState(width);
      }
    };

    resize();
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(container);

    const jump = () => {
      if (phaseRef.current !== "playing") {
        return;
      }

      const game = gameRef.current;
      if (!game || !game.isOnGround) {
        return;
      }

      game.velocityY = JUMP_VELOCITY;
      game.isOnGround = false;
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space" || event.code === "ArrowUp") {
        event.preventDefault();
        jump();
      }
    };

    const handleTouchStart = (event: TouchEvent) => {
      event.preventDefault();
      jump();
    };

    const handlePointerDown = (event: PointerEvent) => {
      if (event.pointerType === "touch") {
        return;
      }
      jump();
    };

    window.addEventListener("keydown", handleKeyDown);
    canvas.addEventListener("touchstart", handleTouchStart, { passive: false });
    canvas.addEventListener("pointerdown", handlePointerDown);

    const step = () => {
      const game = gameRef.current;
      const { width, height } = dimensionsRef.current;

      if (!game || width === 0) {
        animationRef.current = window.requestAnimationFrame(step);
        return;
      }

      const groundY = height - GROUND_HEIGHT;

      if (phaseRef.current === "playing") {
        game.velocityY += GRAVITY;
        game.playerY += game.velocityY;

        if (game.playerY >= 0) {
          game.playerY = 0;
          game.velocityY = 0;
          game.isOnGround = true;
        }

        game.groundOffset = (game.groundOffset + BASE_SPEED) % 40;
        game.nextObstacleIn -= BASE_SPEED;

        if (game.nextObstacleIn <= 0) {
          const obstacle = randomObstacle();
          game.obstacles.push({
            x: width + obstacle.width,
            width: obstacle.width,
            height: obstacle.height,
          });
          game.nextObstacleIn = 150 + Math.random() * 160;
        }

        game.obstacles = game.obstacles
          .map((obstacle) => ({ ...obstacle, x: obstacle.x - BASE_SPEED }))
          .filter((obstacle) => obstacle.x + obstacle.width > 0);

        const playerBox = {
          x: PLAYER_X,
          y: groundY - PLAYER_SIZE + game.playerY,
          width: PLAYER_SIZE * 0.7,
          height: PLAYER_SIZE * 0.85,
        };

        for (const obstacle of game.obstacles) {
          const obstacleBox = {
            x: obstacle.x,
            y: groundY - obstacle.height,
            width: obstacle.width,
            height: obstacle.height,
          };

          const isColliding =
            playerBox.x < obstacleBox.x + obstacleBox.width &&
            playerBox.x + playerBox.width > obstacleBox.x &&
            playerBox.y < obstacleBox.y + obstacleBox.height &&
            playerBox.y + playerBox.height > obstacleBox.y;

          if (isColliding) {
            onGameOverRef.current(game.score);
            break;
          }

          if (obstacle.x + obstacle.width < PLAYER_X && !obstacle.passed) {
            obstacle.passed = true;
            game.score += 1;
            setScore(game.score);
          }
        }
      }

      drawScene(ctx, width, height, groundY, game);
      animationRef.current = window.requestAnimationFrame(step);
    };

    animationRef.current = window.requestAnimationFrame(step);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("keydown", handleKeyDown);
      canvas.removeEventListener("touchstart", handleTouchStart);
      canvas.removeEventListener("pointerdown", handlePointerDown);

      if (animationRef.current !== null) {
        window.cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative overflow-hidden rounded-2xl border border-violet-200 bg-white/70 shadow-lg backdrop-blur-sm",
        className,
      )}
    >
      <canvas
        ref={canvasRef}
        className="block w-full touch-manipulation"
        style={{ touchAction: "manipulation" }}
        aria-label="משחק קפיצה בזמן יצירת הסיפור"
        role="img"
      />

      {phase === "ready" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-violet-950/35 px-6 text-center backdrop-blur-[2px]">
          <p dir="rtl" className="text-lg font-bold text-white">
            בזמן שהספר נוצר — בואו נשחק!
          </p>
          <Button
            type="button"
            onClick={startGame}
            dir="rtl"
            className="rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 px-8 py-6 text-lg font-bold text-white hover:from-violet-700 hover:to-fuchsia-600"
          >
            !התחל משחק
          </Button>
        </div>
      )}

      {phase === "gameover" && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-violet-950/45 px-6 text-center backdrop-blur-[2px]">
          <p dir="rtl" className="text-2xl font-black text-white">
            אוי לא! התנגשת!
          </p>
          <p dir="rtl" className="text-base text-violet-100">
            אבל אל דאגה — הספר שלך עדיין נוצר ברקע!
          </p>
          <p dir="rtl" className="text-lg font-semibold text-white">
            צברת <span className="text-fuchsia-200">{finalScore}</span> נקודות!
          </p>
          <Button
            type="button"
            onClick={restartGame}
            dir="rtl"
            className="mt-1 rounded-full bg-gradient-to-r from-violet-600 to-fuchsia-500 px-8 py-6 text-lg font-bold text-white hover:from-violet-700 hover:to-fuchsia-600"
          >
            !התחלה מחדש
          </Button>
        </div>
      )}

      <div
        dir="rtl"
        className="border-t border-violet-100 bg-white/80 px-4 py-2 text-sm text-violet-700"
      >
        ניקוד: <span className="font-bold">{phase === "gameover" ? finalScore : score}</span>
      </div>
    </div>
  );
};

export default RunnerGame;
