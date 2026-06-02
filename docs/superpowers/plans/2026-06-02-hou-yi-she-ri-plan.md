# 后羿射日演示视频实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 创建一个30秒的中国风水墨风格"后羿射日"演示视频，使用 Remotion 框架实现。

**Architecture:** 使用纯 CSS/SVG 动画实现水墨风格，通过 Remotion 的 Sequence 组件控制四个场景的切换。每个场景独立组件，共享水墨效果组件。

**Tech Stack:** Remotion, React, TypeScript, SVG, CSS

---

## 文件结构

```
src/
├── Root.tsx              # 入口，定义 Composition
├── HouYiSheRi.tsx        # 主组件，控制场景切换
├── scenes/
│   ├── OpeningScene.tsx   # 场景1：十日并出
│   ├── HeroScene.tsx      # 场景2：后羿登场
│   ├── ActionScene.tsx    # 场景3：射日
│   └── EndingScene.tsx    # 场景4：万物复苏
├── components/
│   ├── Sun.tsx            # 太阳组件
│   ├── Mountain.tsx       # 山水组件
│   ├── HouYi.tsx          # 后羿人物组件
│   ├── Arrow.tsx          # 箭矢组件
│   └── InkEffect.tsx      # 水墨效果组件
└── styles/
    └── ink.css            # 水墨风格样式
```

---

### Task 1: 项目初始化

**Files:**
- Create: `package.json`
- Create: `tsconfig.json`
- Create: `remotion.config.ts`
- Create: `src/index.ts`

- [ ] **Step 1: 创建 package.json**

```json
{
  "name": "hou-yi-she-ri",
  "version": "1.0.0",
  "description": "后羿射日演示视频",
  "scripts": {
    "start": "remotion studio",
    "build": "remotion render HouYiSheRi out/hou-yi-she-ri.mp4",
    "upgrade": "remotion upgrade"
  },
  "dependencies": {
    "@remotion/cli": "4.0.0",
    "@remotion/google-fonts": "4.0.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "remotion": "4.0.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "typescript": "^5.0.0"
  }
}
```

- [ ] **Step 2: 创建 tsconfig.json**

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "commonjs",
    "jsx": "react-jsx",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "outDir": "./dist",
    "rootDir": "./src"
  },
  "include": ["src/**/*"],
  "exclude": ["node_modules"]
}
```

- [ ] **Step 3: 创建 remotion.config.ts**

```typescript
import { Config } from "@remotion/cli/config";

Config.setVideoImageFormat("jpeg");
Config.setOverwriteOutput(true);
```

- [ ] **Step 4: 创建 src/index.ts**

```typescript
import { registerRoot } from "remotion";
import { RemotionRoot } from "./Root";

registerRoot(RemotionRoot);
```

- [ ] **Step 5: 安装依赖**

Run: `npm install`
Expected: 依赖安装成功

- [ ] **Step 6: 验证项目启动**

Run: `npm start`
Expected: Remotion Studio 启动成功

---

### Task 2: 水墨效果组件

**Files:**
- Create: `src/components/InkEffect.tsx`
- Create: `src/styles/ink.css`

- [ ] **Step 1: 创建 ink.css**

```css
/* 水墨风格基础样式 */
.ink-background {
  background: linear-gradient(135deg, #f5f5dc 0%, #faebd7 100%);
  min-height: 100vh;
}

.ink-text {
  font-family: 'Ma Shan Zheng', cursive;
  color: #2c2c2c;
}

/* 水墨晕染效果 */
.ink-blur {
  filter: blur(0.5px);
}

/* 墨迹纹理 */
.ink-texture {
  position: relative;
}

.ink-texture::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
  opacity: 0.1;
  pointer-events: none;
}
```

- [ ] **Step 2: 创建 InkEffect.tsx**

```tsx
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

  return (
    <div
      className="ink-background ink-texture"
      style={{
        filter: `blur(${blur}px)`,
        width: "100%",
        height: "100%",
        position: "relative",
      }}
    >
      {children}
    </div>
  );
};
```

- [ ] **Step 3: 创建 SVG 滤镜定义**

在 `InkEffect.tsx` 中添加 SVG 滤镜：

```tsx
// 在组件返回的 JSX 中添加 SVG 滤镜定义
return (
  <div
    className="ink-background ink-texture"
    style={{
      filter: `blur(${blur}px)`,
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
```

- [ ] **Step 4: 提交代码**

```bash
git add src/components/InkEffect.tsx src/styles/ink.css
git commit -m "feat: 添加水墨效果组件"
```

---

### Task 3: 太阳组件

**Files:**
- Create: `src/components/Sun.tsx`

- [ ] **Step 1: 创建 Sun.tsx**

```tsx
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
```

- [ ] **Step 2: 提交代码**

```bash
git add src/components/Sun.tsx
git commit -m "feat: 添加太阳组件"
```

---

### Task 4: 山水组件

**Files:**
- Create: `src/components/Mountain.tsx`

- [ ] **Step 1: 创建 Mountain.tsx**

```tsx
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
```

- [ ] **Step 2: 提交代码**

```bash
git add src/components/Mountain.tsx
git commit -m "feat: 添加山水组件"
```

---

### Task 5: 后羿人物组件

**Files:**
- Create: `src/components/HouYi.tsx`

- [ ] **Step 1: 创建 HouYi.tsx**

```tsx
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
```

- [ ] **Step 2: 提交代码**

```bash
git add src/components/HouYi.tsx
git commit -m "feat: 添加后羿人物组件"
```

---

### Task 6: 箭矢组件

**Files:**
- Create: `src/components/Arrow.tsx`

- [ ] **Step 1: 创建 Arrow.tsx**

```tsx
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
```

- [ ] **Step 2: 提交代码**

```bash
git add src/components/Arrow.tsx
git commit -m "feat: 添加箭矢组件"
```

---

### Task 7: 场景1 - 十日并出

**Files:**
- Create: `src/scenes/OpeningScene.tsx`

- [ ] **Step 1: 创建 OpeningScene.tsx**

```tsx
import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { Sun } from "../components/Sun";
import { Mountain } from "../components/Mountain";
import { InkEffect } from "../components/InkEffect";

export const OpeningScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 热浪效果
  const heatWave = interpolate(
    frame,
    [0, 2 * fps, 4 * fps, 6 * fps],
    [0, 5, -5, 0],
    {
      extrapolateRight: "clamp",
    }
  );

  // 十个太阳的位置（弧形排列）
  const sunPositions = [
    { x: 960, y: 150 },  // 中间
    { x: 760, y: 180 },
    { x: 1160, y: 180 },
    { x: 560, y: 220 },
    { x: 1360, y: 220 },
    { x: 360, y: 280 },
    { x: 1560, y: 280 },
    { x: 200, y: 360 },
    { x: 1720, y: 360 },
    { x: 960, y: 100 },
  ];

  return (
    <InkEffect>
      {/* 天空渐变 */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "linear-gradient(180deg, #FFD700 0%, #FFA500 30%, #FF8C00 60%, #8B0000 100%)",
          opacity: 0.8,
        }}
      />

      {/* 十个太阳 */}
      {sunPositions.map((pos, index) => (
        <Sun
          key={index}
          x={pos.x}
          y={pos.y}
          size={60 + (index === 0 ? 20 : 0)}
          delay={index * 5}
        />
      ))}

      {/* 远山 */}
      <Mountain variant="far" y={650} />

      {/* 近山 */}
      <Mountain variant="near" y={750} />

      {/* 干裂的大地 */}
      <div
        style={{
          position: "absolute",
          bottom: 0,
          width: "100%",
          height: "30%",
          background: "linear-gradient(180deg, #8B4513 0%, #654321 100%)",
          transform: `translateY(${heatWave}px)`,
        }}
      >
        {/* 裂纹 */}
        <svg width="100%" height="100%" viewBox="0 0 1920 324">
          {[...Array(20)].map((_, i) => (
            <path
              key={i}
              d={`M${100 * i} 0 L${100 * i + 50} ${50 + Math.random() * 100}`}
              stroke="#2c2c2c"
              strokeWidth="2"
              fill="none"
              opacity={0.6}
            />
          ))}
        </svg>
      </div>

      {/* 文字标题 */}
      <div
        style={{
          position: "absolute",
          top: 50,
          width: "100%",
          textAlign: "center",
          fontFamily: "'Ma Shan Zheng', cursive",
          fontSize: 48,
          color: "#2c2c2c",
          textShadow: "2px 2px 4px rgba(255, 215, 0, 0.5)",
        }}
      >
        十日并出
      </div>
    </InkEffect>
  );
};
```

- [ ] **Step 2: 提交代码**

```bash
git add src/scenes/OpeningScene.tsx
git commit -m "feat: 添加场景1 - 十日并出"
```

---

### Task 8: 场景2 - 后羿登场

**Files:**
- Create: `src/scenes/HeroScene.tsx`

- [ ] **Step 1: 创建 HeroScene.tsx**

```tsx
import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { HouYi } from "../components/HouYi";
import { Mountain } from "../components/Mountain";
import { InkEffect } from "../components/InkEffect";

export const HeroScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 镜头从远到近的效果
  const zoom = interpolate(
    frame,
    [0, 2 * fps],
    [0.8, 1],
    {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    }
  );

  // 文字出现
  const textOpacity = interpolate(
    frame,
    [1 * fps, 2 * fps],
    [0, 1],
    {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    }
  );

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
```

- [ ] **Step 2: 提交代码**

```bash
git add src/scenes/HeroScene.tsx
git commit -m "feat: 添加场景2 - 后羿登场"
```

---

### Task 9: 场景3 - 射日

**Files:**
- Create: `src/scenes/ActionScene.tsx`

- [ ] **Step 1: 创建 ActionScene.tsx**

```tsx
import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate } from "remotion";
import { Sun } from "../components/Sun";
import { HouYi } from "../components/HouYi";
import { Arrow } from "../components/Arrow";
import { Mountain } from "../components/Mountain";
import { InkEffect } from "../components/InkEffect";

export const ActionScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 剩余太阳数量（逐渐减少）
  const remainingSuns = Math.max(
    1,
    10 - Math.floor(frame / (1 * fps))
  );

  // 太阳位置（被射中后消失）
  const sunPositions = [
    { x: 300, y: 200 },
    { x: 600, y: 150 },
    { x: 900, y: 180 },
    { x: 1200, y: 160 },
    { x: 1500, y: 190 },
    { x: 400, y: 300 },
    { x: 800, y: 280 },
    { x: 1100, y: 310 },
    { x: 1400, y: 270 },
    { x: 960, y: 120 },
  ];

  // 箭矢发射时间点
  const arrowDelays = Array.from({ length: 9 }, (_, i) => (i + 1) * 0.8 * fps);

  return (
    <InkEffect>
      {/* 背景 */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "linear-gradient(180deg, #FFD700 0%, #87CEEB 50%, #F5F5DC 100%)",
        }}
      />

      {/* 远山 */}
      <Mountain variant="far" y={650} />

      {/* 近山 */}
      <Mountain variant="near" y={750} />

      {/* 后羿 */}
      <HouYi x={200} y={750} scale={1.2} showBow={true} />

      {/* 太阳们 */}
      {sunPositions.map((pos, index) => (
        <Sun
          key={index}
          x={pos.x}
          y={pos.y}
          size={70}
          delay={0}
          isShooting={index < 9 && frame > arrowDelays[index]}
        />
      ))}

      {/* 箭矢 */}
      {arrowDelays.map((delay, index) => (
        <Arrow
          key={index}
          startX={250}
          startY={700}
          endX={sunPositions[index].x}
          endY={sunPositions[index].y}
          delay={delay}
          duration={0.4}
        />
      ))}

      {/* 射日计数 */}
      <div
        style={{
          position: "absolute",
          bottom: 50,
          width: "100%",
          textAlign: "center",
          fontFamily: "'Ma Shan Zheng', cursive",
          fontSize: 36,
          color: "#8B0000",
        }}
      >
        已射落 {Math.min(9, Math.floor(frame / (0.8 * fps)))} 个太阳
      </div>
    </InkEffect>
  );
};
```

- [ ] **Step 2: 提交代码**

```bash
git add src/scenes/ActionScene.tsx
git commit -m "feat: 添加场景3 - 射日"
```

---

### Task 10: 场景4 - 万物复苏

**Files:**
- Create: `src/scenes/EndingScene.tsx`

- [ ] **Step 1: 创建 EndingScene.tsx**

```tsx
import React from "react";
import { useCurrentFrame, useVideoConfig, interpolate, spring } from "remotion";
import { Sun } from "../components/Sun";
import { Mountain } from "../components/Mountain";
import { InkEffect } from "../components/InkEffect";

export const EndingScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 天空变蓝
  const skyBlue = interpolate(
    frame,
    [0, 2 * fps],
    [0, 1],
    {
      extrapolateRight: "clamp",
    }
  );

  // 植物生长
  const plantGrowth = interpolate(
    frame,
    [1 * fps, 4 * fps],
    [0, 1],
    {
      extrapolateRight: "clamp",
      extrapolateLeft: "clamp",
    }
  );

  // 文字出现
  const textScale = spring({
    frame: frame - 2 * fps,
    fps,
    config: { damping: 200 },
  });

  return (
    <InkEffect blurAmount={0.2}>
      {/* 天空渐变 */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: `linear-gradient(180deg, 
            rgb(${135 - skyBlue * 50}, ${206 - skyBlue * 50}, ${235}) 0%, 
            rgb(${245}, ${245}, ${220}) 100%)`,
        }}
      />

      {/* 唯一的太阳 */}
      <Sun x={960} y={200} size={120} delay={0} />

      {/* 远山 */}
      <Mountain variant="far" y={650} />

      {/* 近山 */}
      <Mountain variant="near" y={750} />

      {/* 生长的植物 */}
      <svg
        width="1920"
        height="1080"
        viewBox="0 0 1920 1080"
        style={{ position: "absolute" }}
      >
        {[300, 600, 900, 1200, 1500].map((x, i) => (
          <g key={i}>
            {/* 茎 */}
            <line
              x1={x}
              y1={800}
              x2={x}
              y2={800 - 100 * plantGrowth}
              stroke="#228B22"
              strokeWidth="3"
            />
            {/* 叶子 */}
            <ellipse
              cx={x - 15}
              cy={800 - 80 * plantGrowth}
              rx={20 * plantGrowth}
              ry={10 * plantGrowth}
              fill="#32CD32"
              transform={`rotate(-30 ${x - 15} ${800 - 80 * plantGrowth})`}
            />
            <ellipse
              cx={x + 15}
              cy={800 - 60 * plantGrowth}
              rx={20 * plantGrowth}
              ry={10 * plantGrowth}
              fill="#32CD32"
              transform={`rotate(30 ${x + 15} ${800 - 60 * plantGrowth})`}
            />
          </g>
        ))}
      </svg>

      {/* 结尾文字 */}
      <div
        style={{
          position: "absolute",
          top: 100,
          width: "100%",
          textAlign: "center",
          fontFamily: "'Ma Shan Zheng', cursive",
          fontSize: 56,
          color: "#2c2c2c",
          transform: `scale(${textScale})`,
          textShadow: "2px 2px 4px rgba(255, 215, 0, 0.3)",
        }}
      >
        万物复苏
      </div>

      {/* 印章 */}
      <div
        style={{
          position: "absolute",
          bottom: 100,
          right: 100,
          width: 80,
          height: 80,
          border: "3px solid #8B0000",
          borderRadius: 8,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "'Ma Shan Zheng', cursive",
          fontSize: 24,
          color: "#8B0000",
          transform: `scale(${textScale}) rotate(-5deg)`,
        }}
      >
        后羿射日
      </div>
    </InkEffect>
  );
};
```

- [ ] **Step 2: 提交代码**

```bash
git add src/scenes/EndingScene.tsx
git commit -m "feat: 添加场景4 - 万物复苏"
```

---

### Task 11: 主组件与入口

**Files:**
- Create: `src/HouYiSheRi.tsx`
- Create: `src/Root.tsx`

- [ ] **Step 1: 创建 HouYiSheRi.tsx**

```tsx
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
```

- [ ] **Step 2: 创建 Root.tsx**

```tsx
import React from "react";
import { Composition } from "remotion";
import { HouYiSheRi } from "./HouYiSheRi";

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="HouYiSheRi"
      component={HouYiSheRi}
      durationInFrames={900}
      fps={30}
      width={1920}
      height={1080}
    />
  );
};
```

- [ ] **Step 3: 提交代码**

```bash
git add src/HouYiSheRi.tsx src/Root.tsx
git commit -m "feat: 添加主组件和入口"
```

---

### Task 12: 集成测试

**Files:**
- Test: `npm start`

- [ ] **Step 1: 启动 Remotion Studio**

Run: `npm start`
Expected: Remotion Studio 启动，显示四个场景

- [ ] **Step 2: 预览完整视频**

在 Remotion Studio 中预览完整视频，检查：
1. 四个场景是否正确切换
2. 水墨效果是否清晰可辨
3. 动画是否流畅
4. 故事叙事是否清晰

- [ ] **Step 3: 渲染视频**

Run: `npm run build`
Expected: 视频渲染成功，输出到 `out/hou-yi-she-ri.mp4`

- [ ] **Step 4: 检查输出文件**

检查视频文件：
1. 时长是否为30秒
2. 分辨率是否为1920x1080
3. 画面质量是否符合预期

- [ ] **Step 5: 最终提交**

```bash
git add .
git commit -m "feat: 完成后羿射日演示视频"
```

---

## 自检清单

1. **规格覆盖**：所有规格要求都已实现
   - ✅ 30秒短视频
   - ✅ 水墨风格
   - ✅ 四个场景
   - ✅ 教育科普用途

2. **占位符扫描**：无 TBD、TODO 或占位符

3. **类型一致性**：所有组件类型和属性名称一致

4. **风险控制**：如果效果不佳，可切换到方案 B 或 C
