import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import "../styles/ink.css";

export const InkEffect: React.FC<{
  children: React.ReactNode;
  blurAmount?: number;
}> = ({ children, blurAmount = 0.5 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 动态模糊效果，模拟墨迹晕染
  const blur = interpolate(
    frame,
    [0, 2 * fps],
    [blurAmount + 1, blurAmount],
    {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    }
  );

  // 持续的细微墨迹呼吸
  const inkBreathe = Math.sin(frame * 0.03) * 0.15;

  return (
    <div
      className="ink-background ink-texture"
      style={{
        filter: `blur(${blur + inkBreathe}px) url(#ink-displacement)`,
        width: "100%",
        height: "100%",
        position: "relative",
      }}
    >
      <svg width="0" height="0" style={{ position: "absolute" }}>
        <defs>
          <filter id="ink-displacement">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.01"
              numOctaves="3"
              result="noise"
            />
            <feDisplacementMap
              in="SourceGraphic"
              in2="noise"
              scale="10"
              xChannelSelector="R"
              yChannelSelector="G"
            />
          </filter>
        </defs>
      </svg>
      {children}
    </div>
  );
};