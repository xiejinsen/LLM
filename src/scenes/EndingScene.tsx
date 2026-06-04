import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { Sun } from "../components/Sun";
import { Mountain } from "../components/Mountain";
import { InkEffect } from "../components/InkEffect";

export const EndingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 天空变蓝 - 持续深化
  const skyBlue = interpolate(
    frame,
    [0, 4 * fps],
    [0, 1],
    {
      extrapolateRight: "clamp",
    }
  );

  // 植物生长
  const plantGrowth = interpolate(
    frame,
    [0.5 * fps, 3.5 * fps],
    [0, 1],
    {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    }
  );

  // 植物随风摇摆
  const sway = Math.sin(frame * 0.08) * 3;

  // 文字出现（更快）
  const textScale = spring({
    frame: frame - 1.5 * fps,
    fps,
    config: { damping: 200 },
  });

  // 飘落的花瓣
  const petals = Array.from({ length: 8 }, (_, i) => {
    const fall = (frame + i * 20) % (3 * fps);
    const yOffset = interpolate(fall, [0, 3 * fps], [0, 300], {
      extrapolateRight: "clamp",
    });
    const xDrift = Math.sin((frame + i * 41) * 0.03) * 50;
    const opacity = interpolate(fall, [0, 2.5 * fps, 3 * fps], [0.6, 0.4, 0], {
      extrapolateRight: "clamp",
    });
    return { i, yOffset, xDrift, opacity };
  });

  return (
    <InkEffect blurAmount={0.2}>
      {/* 天空渐变 */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: `linear-gradient(180deg, 
            rgb(${135 - skyBlue * 50}, ${206 - skyBlue * 50}, ${235}) 0%, 
            rgb(${245 - skyBlue * 10}, ${245 - skyBlue * 10}, ${220 + skyBlue * 20}) 100%)`,
        }}
      />

      {/* 飘落的花瓣 */}
      {petals.map((p) => (
        <div
          key={p.i}
          style={{
            position: "absolute",
            left: `${200 + (p.i * 180) % 1520}px`,
            top: `${200 + p.yOffset}px`,
            width: 12,
            height: 8,
            borderRadius: "50% 0 50% 0",
            background: "#FFB7C5",
            opacity: p.opacity,
            transform: `translateX(${p.xDrift}px) rotate(${(frame + p.i * 60) % 360}deg)`,
          }}
        />
      ))}

      {/* 唯一的太阳 */}
      <Sun x={960} y={200} size={120} delay={0} />

      {/* 远山 */}
      <Mountain variant="far" y={650} />

      {/* 近山 */}
      <Mountain variant="near" y={750} />

      {/* 流动的河水 */}
      <svg
        width="1920"
        height="1080"
        viewBox="0 0 1920 1080"
        style={{ position: "absolute" }}
      >
        {[0, 300, 600, 900, 1200, 1500, 1800].map((x, i) => (
          <ellipse
            key={i}
            cx={x + Math.sin((frame + i * 50) * 0.03) * 20}
            cy={850 + Math.sin((frame + i * 30) * 0.04) * 5}
            rx={40}
            ry={3}
            fill="#87CEEB"
            opacity={0.3 + Math.sin((frame + i * 20) * 0.05) * 0.1}
          />
        ))}
      </svg>

      {/* 生长的植物 */}
      <svg
        width="1920"
        height="1080"
        viewBox="0 0 1920 1080"
        style={{ position: "absolute" }}
      >
        {[300, 600, 900, 1200, 1500].map((x, i) => (
          <g key={i}>
            {/* 茎 */}
            <line
              x1={x}
              y1={800}
              x2={x + sway}
              y2={800 - 100 * plantGrowth}
              stroke="#228B22"
              strokeWidth="3"
              strokeLinecap="round"
            />
            {/* 叶子 */}
            <ellipse
              cx={x - 15 + sway * 0.5}
              cy={800 - 80 * plantGrowth}
              rx={20 * plantGrowth}
              ry={10 * plantGrowth}
              fill="#32CD32"
              transform={`rotate(${-30 + sway * 0.5} ${x - 15 + sway * 0.5} ${800 - 80 * plantGrowth})`}
            />
            <ellipse
              cx={x + 15 + sway * 0.5}
              cy={800 - 60 * plantGrowth}
              rx={20 * plantGrowth}
              ry={10 * plantGrowth}
              fill="#32CD32"
              transform={`rotate(${30 + sway * 0.5} ${x + 15 + sway * 0.5} ${800 - 60 * plantGrowth})`}
            />
            {/* 花朵 */}
            {(i === 1 || i === 3) && plantGrowth > 0.5 && (
              <circle
                cx={x + sway}
                cy={800 - 105 * plantGrowth}
                r={6 * plantGrowth}
                fill="#FF6B6B"
              />
            )}
          </g>
        ))}
      </svg>

      {/* 结尾文字 */}
      <div
        style={{
          position: "absolute",
          top: 100,
          width: "100%",
          textAlign: "center",
          fontFamily: "'Ma Shan Zheng', cursive",
          fontSize: 56,
          color: "#2c2c2c",
          transform: `scale(${textScale})`,
          textShadow: "2px 2px 4px rgba(255, 215, 0, 0.3)",
        }}
      >
        万物复苏
      </div>

      {/* 印章 */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
          right: 100,
          width: 80,
          height: 80,
          border: "3px solid #8B0000",
          borderRadius: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Ma Shan Zheng', cursive",
          fontSize: 24,
          color: "#8B0000",
          transform: `scale(${textScale}) rotate(-5deg)`,
        }}
      >
        后羿射日
      </div>
    </InkEffect>
  );
};
