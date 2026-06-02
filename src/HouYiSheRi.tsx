import React from "react";
import { Sequence, useVideoConfig } from "remotion";
import { OpeningScene } from "./scenes/OpeningScene";
import { HeroScene } from "./scenes/HeroScene";
import { ActionScene } from "./scenes/ActionScene";
import { EndingScene } from "./scenes/EndingScene";

export const HouYiSheRi: React.FC = () => {
  const { fps } = useVideoConfig();

  // 场景时长配置（秒）
  const sceneDurations = {
    opening: 8,    // 0-8秒
    hero: 7,       // 8-15秒
    action: 10,    // 15-25秒
    ending: 5,     // 25-30秒
  };

  return (
    <div style={{ width: "100%", height: "100%", position: "relative" }}>
      {/* 场景1：十日并出 */}
      <Sequence
        from={0}
        durationInFrames={sceneDurations.opening * fps}
      >
        <OpeningScene />
      </Sequence>

      {/* 场景2：后羿登场 */}
      <Sequence
        from={sceneDurations.opening * fps}
        durationInFrames={sceneDurations.hero * fps}
      >
        <HeroScene />
      </Sequence>

      {/* 场景3：射日 */}
      <Sequence
        from={(sceneDurations.opening + sceneDurations.hero) * fps}
        durationInFrames={sceneDurations.action * fps}
      >
        <ActionScene />
      </Sequence>

      {/* 场景4：万物复苏 */}
      <Sequence
        from={(sceneDurations.opening + sceneDurations.hero + sceneDurations.action) * fps}
        durationInFrames={sceneDurations.ending * fps}
      >
        <EndingScene />
      </Sequence>
    </div>
  );
};
