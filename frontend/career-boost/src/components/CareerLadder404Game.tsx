import React, { useEffect, useRef, useState } from "react";

/**
 * CareerLadder404Game
 * A lightweight, no-deps runner game inspired by Chrome's Dino.
 * Pixel-style canvas rendering. Perfect for a 404 page focused on careers/interviews.
 *
 * Usage:
 *   <CareerLadder404Game onScore={(s) => console.log(s)} height={220} />
 */
export default function CareerLadder404Game({
  height = 220,
  onScore,
  accent = "#16a34a", // tailwind green-600
  bg = "#0b1020",
  fg = "#ffffff",
  ground = "#26324a",
  obstacle = "#ef4444",
  collectible = "#f59e0b",
}: {
  height?: number;
  onScore?: (score: number) => void;
  accent?: string;
  bg?: string;
  fg?: string;
  ground?: string;
  obstacle?: string;
  collectible?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const [ready, setReady] = useState(false);
  const [running, setRunning] = useState(false);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const [high, setHigh] = useState<number>(() => {
    const k = localStorage.getItem("careerRunnerHighScore");
    return k ? Number(k) : 0;
  });

  // Game state
  const stateRef = useRef({
    t: 0,
    speed: 3.2, // base speed (px/frame)
    groundY: 0, // set in resize
    player: {
      x: 34,
      y: 0, // dynamic
      w: 20,
      h: 26,
      vy: 0,
      onGround: true,
      legTick: 0,
    },
    clouds: [] as { x: number; y: number; w: number }[],
    buildings: [] as { x: number; y: number; w: number; h: number }[],
    floorTiles: [] as { x: number; w: number }[],
    obstacles: [] as { x: number; w: number; h: number; type: string }[],
    collectibles: [] as { x: number; y: number; r: number }[],
    spawnCooldown: 0,
    coinCooldown: 120,
  });

  // Resize canvas to container width while keeping fixed height
  useEffect(() => {
    function fit() {
      const canvas = canvasRef.current;
      const wrap = containerRef.current;
      if (!canvas || !wrap) return;
      const width = Math.max(320, Math.floor(wrap.clientWidth));
      canvas.width = width * devicePixelRatio;
      canvas.height = height * devicePixelRatio;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      const s = stateRef.current;
      s.groundY = Math.floor(height * 0.78);
      ensureBackdrop(width);
      setReady(true);
      // Draw initial frame
      const ctx = canvas.getContext("2d");
      if (ctx) draw(ctx);
    }

    const ro = new ResizeObserver(fit);
    if (containerRef.current) ro.observe(containerRef.current);
    fit();
    return () => {
      ro.disconnect();
    };
  }, [height]);

  // Input handlers
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ([" ", "Spacebar", "ArrowUp", "w", "W"].includes(e.key)) {
        e.preventDefault();
        jump();
      } else if (["Enter"].includes(e.key)) {
        if (gameOver) restart();
      } else if (["p", "P"].includes(e.key)) {
        setRunning((r) => !r);
      }
    };

    const onPointer = () => jump();

    window.addEventListener("keydown", onKey);
    window.addEventListener("pointerdown", onPointer);

    const onBlur = () => setRunning(false);
    const onFocus = () => !gameOver && setRunning(true);
    window.addEventListener("blur", onBlur);
    window.addEventListener("focus", onFocus);

    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("pointerdown", onPointer);
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("focus", onFocus);
    };
  }, [gameOver]);

  // Game loop
  useEffect(() => {
    if (!ready) return;
    setRunning(true);
    const loop = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext("2d");
      if (!ctx) return;

      if (running && !gameOver) {
        update();
        draw(ctx);
      } else {
        // Draw paused frame to keep UI overlays fresh
        draw(ctx);
      }

      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ready, running, gameOver]);

  function restart() {
    const s = stateRef.current;
    s.t = 0;
    s.speed = 3.2;
    s.player.y = 0;
    s.player.vy = 0;
    s.player.onGround = true;
    s.player.legTick = 0;
    s.obstacles = [];
    s.collectibles = [];
    s.spawnCooldown = 0;
    s.coinCooldown = 120;
    setScore(0);
    setGameOver(false);
    setRunning(true);
  }

  function jump() {
    if (gameOver) {
      restart();
      return;
    }
    setRunning(true);
    const s = stateRef.current;
    const p = s.player;
    if (p.onGround) {
      p.vy = -7.2; // jump velocity
      p.onGround = false;
    }
  }

  function ensureBackdrop(width: number) {
    const s = stateRef.current;
    if (s.buildings.length === 0) {
      // Pre-fill buildings and floor tiles to cover the screen
      let x = 0;
      while (x < width * 2) {
        const bw = 30 + Math.random() * 30;
        const bh = 30 + Math.random() * 60;
        s.buildings.push({ x, y: s.groundY - bh, w: bw, h: bh });
        x += bw + 12 + Math.random() * 20;
      }
      let fx = 0;
      while (fx < width * 3) {
        const fw = 20 + Math.floor(Math.random() * 20);
        s.floorTiles.push({ x: fx, w: fw });
        fx += fw;
      }
      // clouds
      for (let i = 0; i < 5; i++) {
        s.clouds.push({ x: Math.random() * width, y: 20 + Math.random() * 60, w: 30 + Math.random() * 40 });
      }
    }
  }

  function update() {
    const canvas = canvasRef.current!;
    const width = canvas.width / devicePixelRatio;
    const s = stateRef.current;
    s.t++;

    // Increase speed gradually
    s.speed += 0.0009; // subtle ramp

    // Player physics
    const p = s.player;
    const gravity = 0.35;
    if (!p.onGround) {
      p.vy += gravity;
      p.y += p.vy;
      if (p.y + p.h >= s.groundY) {
        p.y = s.groundY - p.h;
        p.vy = 0;
        p.onGround = true;
      }
    } else {
      // small run animation
      p.legTick++;
    }

    // Move parallax background
    for (const c of s.clouds) {
      c.x -= s.speed * 0.3;
    }
    if (s.clouds.length && s.clouds[0].x + s.clouds[0].w < -20) {
      const c = s.clouds.shift()!;
      c.x = width + Math.random() * 80;
      c.y = 20 + Math.random() * 60;
      c.w = 30 + Math.random() * 40;
      s.clouds.push(c);
    }

    for (const b of s.buildings) b.x -= s.speed * 0.6;
    while (s.buildings.length && s.buildings[0].x + s.buildings[0].w < -10) {
      s.buildings.shift();
      const bw = 30 + Math.random() * 30;
      const bh = 30 + Math.random() * 60;
      const lastX = s.buildings.length ? s.buildings[s.buildings.length - 1].x + s.buildings[s.buildings.length - 1].w : width;
      s.buildings.push({ x: lastX + 12 + Math.random() * 20, y: s.groundY - bh, w: bw, h: bh });
    }

    for (const f of s.floorTiles) f.x -= s.speed;
    while (s.floorTiles.length && s.floorTiles[0].x + s.floorTiles[0].w < 0) {
      const first = s.floorTiles.shift()!;
      const lastX = s.floorTiles.length ? s.floorTiles[s.floorTiles.length - 1].x + s.floorTiles[s.floorTiles.length - 1].w : width;
      first.x = lastX;
      first.w = 20 + Math.floor(Math.random() * 20);
      s.floorTiles.push(first);
    }

    // Spawn obstacles ("career blockers")
    if (s.spawnCooldown <= 0) {
      const types = [
        { h: 18, w: 16, name: "bug" },
        { h: 26, w: 14, name: "meeting" },
        { h: 20, w: 24, name: "deadline" },
      ];
      const t = types[Math.floor(Math.random() * types.length)];
      s.obstacles.push({ x: width + 10, w: t.w, h: t.h, type: t.name });
      s.spawnCooldown = 70 + Math.floor(Math.random() * 80) - Math.min(60, Math.floor(s.speed * 6));
    } else {
      s.spawnCooldown--;
    }

    for (const o of s.obstacles) o.x -= s.speed;
    while (s.obstacles.length && s.obstacles[0].x + s.obstacles[0].w < -10) {
      s.obstacles.shift();
      setScore((v) => {
        const nv = v + 5;
        onScore?.(nv);
        return nv;
      });
    }

    // Spawn collectibles ("certs")
    if (s.coinCooldown <= 0) {
      const y = s.groundY - (30 + Math.random() * 40);
      s.collectibles.push({ x: width + 10, y, r: 4 });
      s.coinCooldown = 140 + Math.floor(Math.random() * 120);
    } else {
      s.coinCooldown--;
    }

    for (const c of s.collectibles) c.x -= s.speed;
    while (s.collectibles.length && s.collectibles[0].x + s.collectibles[0].r < -10) {
      s.collectibles.shift();
    }

    // Collisions
    const px = p.x, py = p.y, pw = p.w, ph = p.h;
    for (const o of s.obstacles) {
      if (rectsOverlap(px, py, pw, ph, o.x, s.groundY - o.h, o.w, o.h)) {
        // game over
        setGameOver(true);
        setRunning(false);
        setHigh((hPrev) => {
          const newHigh = Math.max(hPrev, score);
          localStorage.setItem("careerRunnerHighScore", String(newHigh));
          return newHigh;
        });
        break;
      }
    }

    // Collect certs
    for (let i = s.collectibles.length - 1; i >= 0; i--) {
      const c = s.collectibles[i];
      if (rectsOverlap(px, py, pw, ph, c.x - c.r, c.y - c.r, c.r * 2, c.r * 2)) {
        s.collectibles.splice(i, 1);
        setScore((v) => {
          const nv = v + 10;
          onScore?.(nv);
          return nv;
        });
      }
    }

    // Passive score over time
    if (s.t % 12 === 0) {
      setScore((v) => {
        const nv = v + 1;
        onScore?.(nv);
        return nv;
      });
    }
  }

  function draw(ctx: CanvasRenderingContext2D) {
    const canvas = ctx.canvas;
    const width = canvas.width / devicePixelRatio;
    const heightPx = canvas.height / devicePixelRatio;
    const s = stateRef.current;
    // Clear
    ctx.save();
    ctx.scale(devicePixelRatio, devicePixelRatio);
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, width, heightPx);

    // Stars / dots (subtle)
    ctx.globalAlpha = 0.08;
    for (let i = 0; i < 40; i++) {
      ctx.fillStyle = fg;
      const x = (i * 97.3 + s.t * 0.2) % width;
      const y = (i * 53.7) % (heightPx * 0.5);
      ctx.fillRect(x, y, 1, 1);
    }
    ctx.globalAlpha = 1;

    // Buildings (skyline)
    ctx.fillStyle = shade(ground, -20);
    for (const b of s.buildings) {
      rect(ctx, b.x, b.y, b.w, b.h);
      // windows
      ctx.fillStyle = shade(ground, 20);
      for (let wy = b.y + 4; wy < b.y + b.h - 4; wy += 8) {
        for (let wx = b.x + 3; wx < b.x + b.w - 3; wx += 8) {
          if (Math.random() < 0.2) rect(ctx, wx, wy, 2, 2);
        }
      }
      ctx.fillStyle = shade(ground, -20);
    }

    // Ground
    ctx.fillStyle = ground;
    rect(ctx, 0, s.groundY, width, 4);
    // floor tiles
    ctx.fillStyle = shade(ground, 20);
    for (const f of s.floorTiles) rect(ctx, f.x, s.groundY + 4, f.w - 2, 3);

    // Ladder motif on left (career ladder)
    drawLadder(ctx, 6, s.groundY - 64, 20, 64, fg);

    // Player (candidate)
    drawPlayer(ctx, s.player, s.groundY, accent, fg);

    // Obstacles
    for (const o of s.obstacles) drawObstacle(ctx, o, s.groundY, obstacle, fg);

    // Collectibles (certs)
    for (const c of s.collectibles) drawCoin(ctx, c.x, c.y, collectible, fg);

    // HUD
    ctx.fillStyle = fg;
    ctx.font = "12px monospace";
    ctx.textBaseline = "top";
    ctx.fillText(`Score: ${score.toString().padStart(5, "0")}`, width - 130, 8);
    ctx.fillText(`Best:  ${high.toString().padStart(5, "0")}`, width - 130, 24);

    // 404 label
    ctx.globalAlpha = 0.12;
    ctx.font = "bold 80px monospace";
    ctx.fillText("404", 14, 10);
    ctx.globalAlpha = 1;

    if (!running && !gameOver) {
      overlay(ctx, width, heightPx, "Paused — press P to resume");
    }

    if (!running && !gameOver && score === 0) {
      overlay(ctx, width, heightPx, "Tap / Space / ↑ to Jump");
    }

    if (gameOver) {
      overlay(ctx, width, heightPx, "Game Over — press Space to retry");
      // small caption
      ctx.fillStyle = fg;
      ctx.font = "10px monospace";
      ctx.textAlign = "center";
      ctx.fillText("Tip: Collect certs ⭐ and dodge blockers!", width / 2, heightPx / 2 + 36);
      ctx.textAlign = "left";
    }

    ctx.restore();
  }

  return (
    <div
      ref={containerRef}
      className="w-full max-w-3xl mx-auto p-4 rounded-2xl bg-zinc-900/40 ring-1 ring-white/10 shadow-xl"
      role="application"
      aria-label="Career Ladder Runner game"
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-sm md:text-base font-semibold text-white/90">Career Ladder Runner</span>
          <span className="text-xs text-white/60">(404 mini‑game)</span>
        </div>
        <div className="text-xs text-white/60">Space/↑ to jump • P to pause</div>
      </div>
      <canvas ref={canvasRef} className="rounded-xl bg-black/50 w-full h-auto select-none touch-none" />
    </div>
  );
}

// ===== Helpers =====
function rect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number) {
  ctx.fillRect(Math.round(x), Math.round(y), Math.round(w), Math.round(h));
}

function rectsOverlap(ax: number, ay: number, aw: number, ah: number, bx: number, by: number, bw: number, bh: number) {
  return ax < bx + bw && ax + aw > bx && ay < by + bh && ay + ah > by;
}

function drawPlayer(
  ctx: CanvasRenderingContext2D,
  p: { x: number; y: number; w: number; h: number; legTick: number; onGround: boolean },
  groundY: number,
  color: string,
  fg: string
) {
  // Body
  ctx.fillStyle = color;
  rect(ctx, p.x, groundY - p.h - p.y, p.w, p.h);
  // Head
  ctx.fillStyle = fg;
  rect(ctx, p.x + 6, groundY - p.h - p.y - 8, 8, 8);
  // Eyes
  ctx.fillStyle = "#000";
  rect(ctx, p.x + 8, groundY - p.h - p.y - 5, 2, 2);

  // Legs animation
  ctx.fillStyle = color;
  const step = p.onGround ? ((p.legTick >> 2) % 2 === 0 ? -2 : 2) : 0;
  rect(ctx, p.x + 2, groundY - p.y, 4, 6 + step);
  rect(ctx, p.x + p.w - 6, groundY - p.y, 4, 6 - step);
}

function drawObstacle(
  ctx: CanvasRenderingContext2D,
  o: { x: number; w: number; h: number; type: string },
  groundY: number,
  color: string,
  fg: string
) {
  ctx.fillStyle = color;
  rect(ctx, o.x, groundY - o.h, o.w, o.h);
  // tiny label icon
  ctx.fillStyle = fg;
  if (o.type === "bug") {
    rect(ctx, o.x + 4, groundY - o.h + 6, 2, 2);
    rect(ctx, o.x + o.w - 6, groundY - o.h + 6, 2, 2);
  } else if (o.type === "meeting") {
    rect(ctx, o.x + 3, groundY - o.h + 3, o.w - 6, 2);
  } else if (o.type === "deadline") {
    rect(ctx, o.x + 3, groundY - o.h + 3, o.w - 6, 2);
    rect(ctx, o.x + 3, groundY - 6, o.w - 6, 2);
  }
}

function drawCoin(ctx: CanvasRenderingContext2D, x: number, y: number, color: string, fg: string) {
  ctx.fillStyle = color;
  rect(ctx, x - 3, y - 3, 6, 6);
  ctx.fillStyle = fg;
  rect(ctx, x - 1, y - 2, 2, 4); // little sparkle
}

function overlay(ctx: CanvasRenderingContext2D, width: number, height: number, text: string) {
  ctx.fillStyle = "rgba(0,0,0,0.45)";
  rect(ctx, 0, 0, width, height);
  ctx.fillStyle = "#fff";
  ctx.font = "14px monospace";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(text, width / 2, height / 2);
  ctx.textAlign = "left";
}

function drawLadder(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, fg: string) {
  ctx.fillStyle = fg;
  // rails
  rect(ctx, x, y, 3, h);
  rect(ctx, x + w - 3, y, 3, h);
  // rungs
  for (let ry = y + 6; ry < y + h - 4; ry += 10) {
    rect(ctx, x + 2, ry, w - 4, 2);
  }
}

function shade(hex: string, amt = 20) {
  // crude hex shade: accepts #rrggbb
  const c = hex.replace("#", "");
  const num = parseInt(c, 16);
  const r = Math.min(255, Math.max(0, (num >> 16) + amt));
  const g = Math.min(255, Math.max(0, ((num >> 8) & 0xff) + amt));
  const b = Math.min(255, Math.max(0, (num & 0xff) + amt));
  return `#${((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)}`;
}
