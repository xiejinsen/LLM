import { Composition } from "remotion";

export const RemotionRoot = () => {
  return (
    <Composition
      id="HouYiSheRi"
      component={() => <div>后羿射日</div>}
      durationInFrames={900}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
