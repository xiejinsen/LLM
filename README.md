# 后羿射日 - Hou Yi Shoots the Suns

基于 [Remotion](https://remotion.dev) 构建的动画视频项目，使用 React 编程方式制作后羿射日的神话故事演示视频。

## 技术栈

- **Remotion 4.0.0** - 视频渲染框架
- **React 18** - UI 组件库
- **TypeScript** - 类型安全
- **Google Fonts** - 中文字体支持

## 快速开始

```bash
# 安装依赖
npm install

# 启动 Remotion Studio 进行预览和编辑
npm start

# 渲染最终视频
npm run build
```

## 项目结构

```
src/
├── components/        # 可复用组件（太阳、弓箭、山水等）
├── scenes/            # 各场景（十日并出、射日、万物复苏等）
├── styles/            # 全局样式
├── HouYiSheRi.tsx     # 主组合组件
├── Root.tsx           # Remotion 根组件
└── index.ts           # 入口文件
```

## 场景

1. **OpeningScene** - 十日并出，大地干裂
2. **HeroScene** - 后羿登场
3. **Scene3** - 弯弓射日
4. **EndingScene** - 万物复苏

## 构建

渲染后的视频输出至 `out/hou-yi-she-ri.mp4`。
