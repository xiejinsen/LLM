import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { HouYi } from "../components/HouYi";
import { Mountain } from "../components/Mountain";
import { InkEffect } from "../components/InkEffect";

export const HeroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 镜头缓慢推进（持续变化）
  const zoom = interpolate(
    frame,
    [0, 4 * fps],
    [0.85, 1.02],
    {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    }
  );

  // 文字出现（更快）
  const textOpacity = interpolate(
    frame,
    [0.5 * fps, 1.5 * fps],
    [0, 1],
    {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    }
  );

  // 后羿背后光芒脉动
  const glowPulse = interpolate(
    frame,
    [0, 1 * fps, 2 * fps, 3 * fps],
    [0, 0.3, 0.15, 0.25],
    {
      extrapolateRight: "clamp",
    }
  );

  // 飘浮的尘埃粒子
  const dustParticles = Array.from({ length: 12 }, (_, i) => {
    const cycle = (frame + i * 23) % (3 * fps);
    const yOffset = interpolate(cycle, [0, 3 * fps], [0, -150], {
      extrapolateRight: "clamp",
    });
    const xDrift = Math.sin((frame + i * 37) * 0.015) * 40;
    const opacity = interpolate(cycle, [0, 2 * fps, 3 * fps], [0.4, 0.2, 0], {
      extrapolateRight: "clamp",
    });
    return { i, yOffset, xDrift, opacity };
  });

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

      {/* 后羿背后光芒 */}
      <div
        style={{
          position: "absolute",
          left: 860,
          top: 550,
          width: 200,
          height: 200,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(255,215,0,0.2) 0%, transparent 70%)",
          opacity: glowPulse,
        }}
      />

      {/* 尘埃粒子 */}
      {dustParticles.map((p) => (
        <div
          key={p.i}
          style={{
            position: "absolute",
            left: `${200 + (p.i * 130) % 1520}px`,
            top: `${600 + p.yOffset}px`,
            width: 3,
            height: 3,
            borderRadius: "50%",
            background: "#D2B48C",
            opacity: p.opacity,
            transform: `translateX(${p.xDrift}px)`,
          }}
        />
      ))}

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