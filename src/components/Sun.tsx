import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

export const Sun: React.FC<{
  x: number;
  y: number;
  size?: number;
  delay?: number;
  isShooting?: boolean;
}> = ({ x, y, size = 80, delay = 0, isShooting = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 太阳出现动画
  const entrance = spring({
    frame: frame - delay,
    fps,
    config: { damping: 200 },
  });

  // 太阳光芒旋转
  const rotation = interpolate(frame, [0, 10 * fps], [0, 360], {
    extrapolateRight: "extend",
  });

  // 射中时的缩放效果
  const shootScale = isShooting
    ? interpolate(
        frame,
        [delay, delay + 0.5 * fps, delay + 1 * fps],
        [1, 1.5, 0],
        {
          extrapolateRight: "clamp",
          extrapolateLeft: "clamp",
        }
      )
    : 1;

  const scale = entrance * shootScale;

  return (
    <div
      style={{
        position: "absolute",
        left: x - size / 2,
        top: y - size / 2,
        width: size,
        height: size,
        transform: `scale(${scale}) rotate(${rotation}deg)`,
        transformOrigin: "center center",
      }}
    >
      {/* 太阳光芒 */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        style={{ position: "absolute" }}
      >
        {[...Array(12)].map((_, i) => (
          <line
            key={i}
            x1="50"
            y1="10"
            x2="50"
            y2="20"
            stroke="#FFD700"
            strokeWidth="2"
            transform={`rotate(${i * 30} 50 50)`}
          />
        ))}
      </svg>
      {/* 太阳主体 */}
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: "20%",
          width: "60%",
          height: "60%",
          borderRadius: "50%",
          background:
            "radial-gradient(circle, #FFD700 0%, #FFA500 50%, #FF8C00 100%)",
          boxShadow: "0 0 30px #FFD700, 0 0 60px #FFA500",
        }}
      />
    </div>
  );
};
