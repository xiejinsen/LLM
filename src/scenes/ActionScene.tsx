import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { Sun } from "../components/Sun";
import { HouYi } from "../components/HouYi";
import { Arrow } from "../components/Arrow";
import { Mountain } from "../components/Mountain";
import { InkEffect } from "../components/InkEffect";

export const ActionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 剩余太阳数量（逐渐减少）
  const remainingSuns = Math.max(
    1,
    10 - Math.floor(frame / (1 * fps))
  );

  // 太阳位置（被射中后消失）
  const sunPositions = [
    { x: 300, y: 200 },
    { x: 600, y: 150 },
    { x: 900, y: 180 },
    { x: 1200, y: 160 },
    { x: 1500, y: 190 },
    { x: 400, y: 300 },
    { x: 800, y: 280 },
    { x: 1100, y: 310 },
    { x: 1400, y: 270 },
    { x: 960, y: 120 },
  ];

  // 箭矢发射时间点
  const arrowDelays = Array.from({ length: 9 }, (_, i) => (i + 1) * 0.8 * fps);

  return (
    <InkEffect>
      {/* 背景 */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "linear-gradient(180deg, #FFD700 0%, #87CEEB 50%, #F5F5DC 100%)",
        }}
      />

      {/* 远山 */}
      <Mountain variant="far" y={650} />

      {/* 近山 */}
      <Mountain variant="near" y={750} />

      {/* 后羿 */}
      <HouYi x={200} y={750} scale={1.2} showBow={true} />

      {/* 太阳们 */}
      {sunPositions.map((pos, index) => (
        <Sun
          key={index}
          x={pos.x}
          y={pos.y}
          size={70}
          delay={0}
          isShooting={index < 9 && frame > arrowDelays[index]}
        />
      ))}

      {/* 箭矢 */}
      {arrowDelays.map((delay, index) => (
        <Arrow
          key={index}
          startX={250}
          startY={700}
          endX={sunPositions[index].x}
          endY={sunPositions[index].y}
          delay={delay}
          duration={0.4}
        />
      ))}

      {/* 射日计数 */}
      <div
        style={{
          position: "absolute",
          bottom: 50,
          width: "100%",
          textAlign: "center",
          fontFamily: "'Ma Shan Zheng', cursive",
          fontSize: 36,
          color: "#8B0000",
        }}
      >
        已射落 {Math.min(9, Math.floor(frame / (0.8 * fps)))} 个太阳
      </div>
    </InkEffect>
  );
};
