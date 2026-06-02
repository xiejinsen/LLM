import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { HouYi } from "../components/HouYi";
import { Mountain } from "../components/Mountain";
import { InkEffect } from "../components/InkEffect";

export const HeroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 镜头从远到近的效果
  const zoom = interpolate(
    frame,
    [0, 2 * fps],
    [0.8, 1],
    {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    }
  );

  // 文字出现
  const textOpacity = interpolate(
    frame,
    [1 * fps, 2 * fps],
    [0, 1],
    {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    }
  );

  return (
    <InkEffect>
      {/* 背景 */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "linear-gradient(180deg, #87CEEB 0%, #F5F5DC 100%)",
          transform: `scale(${zoom})`,
          transformOrigin: "center center",
        }}
      />

      {/* 远山 */}
      <Mountain variant="far" y={600} />

      {/* 近山 */}
      <Mountain variant="near" y={700} />

      {/* 后羿人物 */}
      <HouYi x={960} y={750} scale={1.5} showBow={true} />

      {/* 英雄登场文字 */}
      <div
        style={{
          position: "absolute",
          top: 100,
          width: "100%",
          textAlign: "center",
          fontFamily: "'Ma Shan Zheng', cursive",
          fontSize: 64,
          color: "#8B0000",
          opacity: textOpacity,
          textShadow: "2px 2px 4px rgba(0, 0, 0, 0.3)",
        }}
      >
        后羿登场
      </div>
    </InkEffect>
  );
};