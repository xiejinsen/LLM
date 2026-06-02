import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";

export const Arrow: React.FC<{
  startX: number;
  startY: number;
  endX: number;
  endY: number;
  delay?: number;
  duration?: number;
}> = ({ startX, startY, endX, endY, delay = 0, duration = 0.5 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 箭矢飞行进度
  const progress = interpolate(
    frame,
    [delay, delay + duration * fps],
    [0, 1],
    {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    }
  );

  // 当前位置
  const currentX = interpolate(progress, [0, 1], [startX, endX]);
  const currentY = interpolate(progress, [0, 1], [startY, endY]);

  // 旋转角度
  const angle = Math.atan2(endY - startY, endX - startX) * (180 / Math.PI);

  // 可见性
  const opacity = progress > 0 && progress < 1 ? 1 : 0;

  return (
    <div
      style={{
        position: "absolute",
        left: currentX - 30,
        top: currentY - 5,
        width: 60,
        height: 10,
        transform: `rotate(${angle}deg)`,
        opacity,
      }}
    >
      <svg width="60" height="10" viewBox="0 0 60 10">
        {/* 箭杆 */}
        <line x1="0" y1="5" x2="50" y2="5" stroke="#8B4513" strokeWidth="2" />
        {/* 箭头 */}
        <polygon points="50,0 60,5 50,10" fill="#2c2c2c" />
        {/* 箭羽 */}
        <polygon points="0,2 10,5 0,8" fill="#FFFFFF" />
      </svg>
    </div>
  );
};
