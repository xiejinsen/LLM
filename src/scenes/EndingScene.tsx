import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { Sun } from "../components/Sun";
import { Mountain } from "../components/Mountain";
import { InkEffect } from "../components/InkEffect";

export const EndingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 天空变蓝
  const skyBlue = interpolate(
    frame,
    [0, 2 * fps],
    [0, 1],
    {
      extrapolateRight: "clamp",
    }
  );

  // 植物生长
  const plantGrowth = interpolate(
    frame,
    [1 * fps, 4 * fps],
    [0, 1],
    {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    }
  );

  // 文字出现
  const textScale = spring({
    frame: frame - 2 * fps,
    fps,
    config: { damping: 200 },
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
            rgb(${245}, ${245}, ${220}) 100%)`,
        }}
      />

      {/* 唯一的太阳 */}
      <Sun x={960} y={200} size={120} delay={0} />

      {/* 远山 */}
      <Mountain variant="far" y={650} />

      {/* 近山 */}
      <Mountain variant="near" y={750} />

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
              x2={x}
              y2={800 - 100 * plantGrowth}
              stroke="#228B22"
              strokeWidth="3"
            />
            {/* 叶子 */}
            <ellipse
              cx={x - 15}
              cy={800 - 80 * plantGrowth}
              rx={20 * plantGrowth}
              ry={10 * plantGrowth}
              fill="#32CD32"
              transform={`rotate(-30 ${x - 15} ${800 - 80 * plantGrowth})`}
            />
            <ellipse
              cx={x + 15}
              cy={800 - 60 * plantGrowth}
              rx={20 * plantGrowth}
              ry={10 * plantGrowth}
              fill="#32CD32"
              transform={`rotate(30 ${x + 15} ${800 - 60 * plantGrowth})`}
            />
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
