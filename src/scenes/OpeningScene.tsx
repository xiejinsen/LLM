import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { Sun } from "../components/Sun";
import { Mountain } from "../components/Mountain";
import { InkEffect } from "../components/InkEffect";

export const OpeningScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 持续热浪效果 - 三角波振荡
  const heatWave = interpolate(
    frame,
    [0, 1 * fps, 2 * fps, 3 * fps, 4 * fps, 5 * fps],
    [0, 4, -4, 3, -3, 0],
    {
      extrapolateRight: "clamp",
    }
  );

  // 飘浮的灰烬/热浪粒子
  const particles = Array.from({ length: 15 }, (_, i) => {
    const cycle = (frame + i * 17) % (4 * fps);
    const yOffset = interpolate(cycle, [0, 4 * fps], [0, -200], {
      extrapolateRight: "clamp",
    });
    const xDrift = Math.sin((frame + i * 31) * 0.02) * 30;
    const opacity = interpolate(cycle, [0, 3 * fps, 4 * fps], [0.6, 0.3, 0], {
      extrapolateRight: "clamp",
    });
    return { i, yOffset, xDrift, opacity };
  });

  // 十个太阳的位置（弧形排列）
  const sunPositions = [
    { x: 960, y: 150 },  // 中间
    { x: 760, y: 180 },
    { x: 1160, y: 180 },
    { x: 560, y: 220 },
    { x: 1360, y: 220 },
    { x: 360, y: 280 },
    { x: 1560, y: 280 },
    { x: 200, y: 360 },
    { x: 1720, y: 360 },
    { x: 960, y: 100 },
  ];

  return (
    <InkEffect>
      {/* 天空渐变 */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "linear-gradient(180deg, #FFD700 0%, #FFA500 30%, #FF8C00 60%, #8B0000 100%)",
          opacity: 0.8,
        }}
      />

      {/* 飘浮的灰烬粒子 */}
      {particles.map((p) => (
        <div
          key={p.i}
          style={{
            position: "absolute",
            left: `${200 + (p.i * 110) % 1520}px`,
            top: `${500 + p.yOffset}px`,
            width: 4,
            height: 4,
            borderRadius: "50%",
            background: "#FFA500",
            opacity: p.opacity,
            transform: `translateX(${p.xDrift}px)`,
          }}
        />
      ))}

      {/* 十个太阳 */}
      {sunPositions.map((pos, index) => (
        <Sun
          key={index}
          x={pos.x}
          y={pos.y}
          size={60 + (index === 0 ? 20 : 0)}
          delay={index * 5}
        />
      ))}

      {/* 远山 */}
      <Mountain variant="far" y={650} />

      {/* 近山 */}
      <Mountain variant="near" y={750} />

      {/* 干裂的大地 */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: "30%",
          background: "linear-gradient(180deg, #8B4513 0%, #654321 100%)",
          transform: `translateY(${heatWave}px)`,
        }}
      >
        {/* 裂纹 */}
        <svg width="100%" height="100%" viewBox="0 0 1920 324">
          {[...Array(20)].map((_, i) => (
            <path
              key={i}
              d={`M${100 * i} 0 L${100 * i + 50} ${50 + (i * 37) % 100}`}
              stroke="#2c2c2c"
              strokeWidth="2"
              fill="none"
              opacity={0.6}
            />
          ))}
        </svg>
      </div>

      {/* 文字标题 */}
      <div
        style={{
          position: "absolute",
          top: 50,
          width: "100%",
          textAlign: "center",
          fontFamily: "'Ma Shan Zheng', cursive",
          fontSize: 48,
          color: "#2c2c2c",
          textShadow: "2px 2px 4px rgba(255, 215, 0, 0.5)",
        }}
      >
        十日并出
      </div>
    </InkEffect>
  );
};
