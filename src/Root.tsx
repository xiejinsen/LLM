import React from "react";
import { Composition } from "remotion";
import { HouYiSheRi } from "./HouYiSheRi";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="HouYiSheRi"
      component={HouYiSheRi}
      durationInFrames={660}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
