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

  // 箭矢发射时间点（加快节奏）
  const arrowDelays = Array.from({ length: 9 }, (_, i) => (i + 1) * 0.7 * fps);

  // 撞击闪光
  const impactFlashes = Array.from({ length: 9 }, (_, i) => {
    const impactFrame = arrowDelays[i] + 0.4 * fps;
    const flash = interpolate(
      frame,
      [impactFrame, impactFrame + 0.15 * fps],
      [1, 0],
      { extrapolateRight: "clamp", extrapolateLeft: "clamp" }
    );
    return flash;
  });

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

      {/* 撞击闪光 */}
      {impactFlashes.map((flash, i) =>
        flash > 0 && (
          <div
            key={i}
            style={{
              position: "absolute",
              left: sunPositions[i].x - 40,
              top: sunPositions[i].y - 40,
              width: 80,
              height: 80,
              borderRadius: "50%",
              background: "radial-gradient(circle, #FFFFFF 0%, transparent 70%)",
              opacity: flash * 0.6,
            }}
          />
        )
      )}

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
          duration={0.3}
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
        已射落 {Math.min(9, Math.floor(frame / (0.7 * fps)))} 个太阳
      </div>
    </InkEffect>
  );
};
