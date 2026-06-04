import React from "react";
import { Sequence, useVideoConfig } from "remotion";
import { OpeningScene } from "./scenes/OpeningScene";
import { HeroScene } from "./scenes/HeroScene";
import { ActionScene } from "./scenes/ActionScene";
import { EndingScene } from "./scenes/EndingScene";

export const HouYiSheRi: React.FC = () => {
  const { fps } = useVideoConfig();

  // 场景时长配置（秒）- 缩短空白段落
  const sceneDurations = {
    opening: 6,    // 0-6秒
    hero: 4,       // 6-10秒
    action: 8,     // 10-18秒
    ending: 4,     // 18-22秒
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
