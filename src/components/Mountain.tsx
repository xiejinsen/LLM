import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";

export const Mountain: React.FC<{
  variant?: "far" | "near";
  y?: number;
}> = ({ variant = "far", y = 600 }) => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 远山颜色较浅，近山颜色较深
  const fillColor = variant === "far" ? "#4a4a4a" : "#2c2c2c";
  const opacity = variant === "far" ? 0.6 : 0.8;

  // 轻微的视差效果
  const parallax = interpolate(
    frame,
    [0, 30 * fps],
    [0, variant === "far" ? -20 : -40],
    {
      extrapolateRight: "clamp",
    }
  );

  return (
    <div
      style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        width: "100%",
        height: "100%",
        transform: `translateX(${parallax}px)`,
      }}
    >
      <svg
        width="1920"
        height="1080"
        viewBox="0 0 1920 1080"
        style={{ position: "absolute", bottom: 0 }}
      >
        {variant === "far" ? (
          // 远山
          <path
            d={`M0 ${y} 
                Q200 ${y - 100} 400 ${y - 50} 
                Q600 ${y - 150} 800 ${y - 80} 
                Q1000 ${y - 180} 1200 ${y - 60} 
                Q1400 ${y - 120} 1600 ${y - 40} 
                Q1800 ${y - 90} 1920 ${y} 
                L1920 1080 L0 1080 Z`}
            fill={fillColor}
            opacity={opacity}
            filter="url(#ink-displacement)"
          />
        ) : (
          // 近山
          <>
            <path
              d={`M0 ${y + 100} 
                  Q300 ${y} 600 ${y + 50} 
                  Q900 ${y - 50} 1200 ${y + 30} 
                  Q1500 ${y - 30} 1920 ${y + 80} 
                  L1920 1080 L0 1080 Z`}
              fill={fillColor}
              opacity={opacity}
              filter="url(#ink-displacement)"
            />
            {/* 树木剪影 */}
            {[200, 500, 800, 1100, 1400, 1700].map((treeX, i) => (
              <path
                key={i}
                d={`M${treeX} ${y + 50} 
                    L${treeX - 15} ${y + 80} 
                    L${treeX + 15} ${y + 80} Z`}
                fill="#1a1a1a"
                opacity={0.7}
              />
            ))}
          </>
        )}
      </svg>
    </div>
  );
};
