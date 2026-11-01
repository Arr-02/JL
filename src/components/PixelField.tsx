import type { CSSProperties } from "react";

/**
 * About 黑区像素方块层（复刻 Element 模板机制）：
 * - 方块 absolute 锚定在 300vh 全高上，随文档流匀速上移，从被 sticky 钉住的文字上方穿过
 * - 尺寸 × 透明度双分级伪造景深：大+亮=近景（opacity 1），小+暗=远景（≈0.15）
 * - 非 blend 反相：纯白方块、z-index 高于文本层，直接遮挡字母
 * - CSS bob 微漂浮 ±18px，时长随尺寸 6s+s*0.2，负 delay 错开相位
 * 坐标手写固定（避免随机刷新跳动 / 聚集压住标题）
 */
const PIXELS: readonly (readonly [number, number, number, number])[] = [
  // [x%, y%, size px, opacity] —— 大亮近景
  [8, 10, 36, 1],
  [70, 6, 32, 1],
  [88, 22, 40, 1],
  [18, 38, 30, 1],
  [55, 55, 34, 1],
  [30, 82, 38, 1],
  [80, 68, 28, 1],
  // 中灰中景
  [15, 4, 18, 0.4],
  [42, 12, 14, 0.4],
  [62, 18, 22, 0.4],
  [93, 40, 16, 0.4],
  [6, 52, 20, 0.4],
  [35, 60, 12, 0.4],
  [72, 48, 18, 0.4],
  [25, 68, 14, 0.4],
  [50, 78, 22, 0.4],
  [66, 88, 16, 0.4],
  [10, 90, 18, 0.4],
  [90, 84, 12, 0.4],
  // 小暗远景
  [20, 16, 8, 0.15],
  [48, 6, 6, 0.15],
  [76, 12, 10, 0.15],
  [95, 10, 6, 0.15],
  [4, 30, 8, 0.15],
  [58, 34, 6, 0.15],
  [85, 46, 8, 0.15],
  [12, 64, 6, 0.15],
  [44, 70, 10, 0.15],
  [68, 74, 6, 0.15],
  [38, 92, 8, 0.15],
  [78, 94, 6, 0.15],
];

/** 白区的独立黑色方块集合（较稀疏，靠上半部，与黑区白方块在转场交界处共存） */
const PIXELS_BLACK: readonly (readonly [number, number, number, number])[] = [
  [6, 12, 30, 1],
  [26, 6, 8, 0.15],
  [44, 18, 16, 0.4],
  [63, 8, 36, 1],
  [82, 16, 10, 0.15],
  [93, 34, 20, 0.4],
  [12, 42, 12, 0.4],
  [35, 55, 6, 0.15],
  [74, 62, 24, 1],
  [55, 80, 8, 0.15],
  [20, 76, 14, 0.4],
  [88, 88, 6, 0.15],
];

type PixelFieldProps = {
  /** white：黑区白方块（默认）；black：白区黑方块 */
  tone?: "white" | "black";
};

export default function PixelField({ tone = "white" }: PixelFieldProps) {
  const list = tone === "black" ? PIXELS_BLACK : PIXELS;
  return (
    <div
      className={`pixels${tone === "black" ? " pixels--black" : ""}`}
      aria-hidden="true"
    >
      {list.map(([x, y, s, o], i) => {
        const d = 6 + s * 0.2;
        return (
          <i
            key={i}
            style={
              {
                "--x": `${x}%`,
                "--y": `${y}%`,
                "--s": `${s}px`,
                "--o": o,
                "--bd": `${d}s`,
                "--bdel": `${-((i * 0.9) % d)}s`,
              } as CSSProperties
            }
          />
        );
      })}
    </div>
  );
}
