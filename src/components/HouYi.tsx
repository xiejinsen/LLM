import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";

export const HouYi: React.FC<{
  x?: number;
  y?: number;
  scale?: number;
  showBow?: boolean;
}> = ({ x = 960, y = 700, scale = 1, showBow = false }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 人物出现动画
  const entrance = spring({
    frame,
    fps,
    config: { damping: 200 },
  });

  // 拉弓动画
  const bowPull = showBow
    ? interpolate(
        frame,
        [2 * fps, 3 * fps],
        [0, 1],
        {
          extrapolateRight: "clamp",
          extrapolateLeft: "clamp",
        }
      )
    : 0;

  return (
    <div
      style={{
        position: "absolute",
        left: x - 100 * scale,
        top: y - 200 * scale,
        width: 200 * scale,
        height: 200 * scale,
        transform: `scale(${entrance * scale})`,
        transformOrigin: "center bottom",
      }}
    >
      <svg width="200" height="200" viewBox="0 0 200 200">
        {/* 身体 */}
        <path
          d="M100 80 L80 150 L120 150 Z"
          fill="#8B0000"
          stroke="#2c2c2c"
          strokeWidth="2"
        />
        {/* 头部 */}
        <circle cx="100" cy="60" r="25" fill="#deb887" stroke="#2c2c2c" strokeWidth="2" />
        {/* 头发 */}
        <path
          d="M75 55 Q100 30 125 55"
          fill="#1a1a1a"
          stroke="#1a1a1a"
          strokeWidth="2"
        />
        {/* 手臂 */}
        <path
          d={`M80 100 L${40 - bowPull * 20} ${90 - bowPull * 10}`}
          stroke="#deb887"
          strokeWidth="8"
          strokeLinecap="round"
        />
        <path
          d={`M120 100 L${160 + bowPull * 20} ${90 - bowPull * 10}`}
          stroke="#deb887"
          strokeWidth="8"
          strokeLinecap="round"
        />
        {/* 弓 */}
        {showBow && (
          <>
            <path
              d={`M${160 + bowPull * 20} ${60 - bowPull * 10} 
                  Q${180 + bowPull * 10} ${90} 
                  ${160 + bowPull * 20} ${120 + bowPull * 10}`}
              fill="none"
              stroke="#8B4513"
              strokeWidth="3"
            />
            {/* 弦 */}
            <line
              x1={160 + bowPull * 20}
              y1={60 - bowPull * 10}
              x2={160 + bowPull * 20}
              y2={120 + bowPull * 10}
              stroke="#2c2c2c"
              strokeWidth="1"
            />
          </>
        )}
        {/* 腿 */}
        <path d="M85 150 L70 190" stroke="#2c2c2c" strokeWidth="6" strokeLinecap="round" />
        <path d="M115 150 L130 190" stroke="#2c2c2c" strokeWidth="6" strokeLinecap="round" />
      </svg>
    </div>
  );
};
