# 元素 · ELEMENT — 视觉设计师作品集

参考 [Element Framer 模板](https://element-template.framer.website/) 的公开页面结构与视觉风格，
用 **React + TypeScript + Vite + Motion + Lenis** 复刻的黑白双色创意个人作品集网站。内容为中文演示文案。

## 环境要求

- Node.js ≥ 18
- npm ≥ 9

## 快速开始

```bash
npm install        # 安装依赖
npm run dev        # 启动开发服务器（默认 http://localhost:5173）
npm run build      # 生产构建（输出到 dist/）
npm run preview    # 预览生产构建
```

## 目录结构

```text
src/
├── components/      # SiteHeader（blend 反相导航）/ WipeTransition（阶梯转场）
│                    # GlassShapes / PixelField / ProjectCard / SectionHeading / Reveal / ParallaxImage
├── sections/        # Hero / FeaturedWork / AboutIntro / About / Experience / Skillset / Contact
├── pages/           # HomePage / ProjectPage
├── lib/             # lenis.ts（平滑滚动单例）/ scroll.ts / useMediaQuery.ts
├── data/projects.ts # 6 个项目的全部内容与图片映射
├── styles/          # tokens.css（黑白双色变量）/ global.css / animations.css
└── App.tsx          # 路由与页面转场（AnimatePresence）
public/images/       # 19 张 WebP 图片（由 scripts/convert-images.mjs 生成）
```

## 功能与动效

- 严格黑白双色视觉体系（#000 ↔ #fafafa），grotesque 字体 + bracket 微标签 + 1px 发丝线
- 黑 Hero → 白精选作品 → 黑 About 大字区 → 白详情/经历/技能 → 黑 Contact 页脚的双色面板结构
- 区块间 5 列阶梯柱状 scrub 转场（中间列领先，移动端 3 列，`useScroll` + `useTransform`）
- Lenis 平滑滚动（lerp 0.1），锚点导航与回顶均经 Lenis，`prefers-reduced-motion` 下退化原生
- 顶栏 `mix-blend-mode: difference` 随背景黑白自动反相；导航 scroll-spy 圆点滑动（IntersectionObserver）
- Hero 大标题按行 overflow 入场（stagger 100ms，ease `cubic-bezier(0.16,1,0.3,1)`）
- CSS 渐变 + clip-path 绘制的磨砂玻璃几何体（Hero / Contact 两组漂浮装饰，无 WebGL）
- About 黑区白色像素方块 `difference` 混合 + CSS drift 漂移
- 精选作品 6 卡片 55% 宽左右交错排布，悬停图片缩放（仅精确指针设备）
- 技能清单 4 格描边卡片左右错位，卡名按行遮罩浮现
- Contact 页脚 21vw 超大裁切字「保持联系」
- 6 个独立项目详情页（Hash 路由），含背景、目标、过程、画廊、成果、下一项目导航
- 页面转场淡入淡出（`AnimatePresence mode="wait"`），全站尊重 `prefers-reduced-motion`

## 图片说明

`public/images/` 下的图片由素材库压缩转换而来（WebP，最长边 1400–1800px）。
如需替换为自己的作品图：直接替换同名文件，或修改 `src/data/projects.ts` 中的路径后，
将新图放入 `public/images/` 即可。重新从原始素材生成可运行 `npm run convert:images`
（需先修改 `scripts/convert-images.mjs` 中的 `SRC_DIR` 与映射表）。

## 内容说明

- 客户名称、联系方式与「关键成果」数据均为**演示用途的示例数据**，非真实商业案例。
- 人物形象与姓名「林一」为虚构的设计师人设，请在正式使用前替换为真实内容。
