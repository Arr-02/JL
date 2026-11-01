/**
 * 一次性图片转换脚本：从素材库读取原图，压缩为 WebP 输出到 public/images。
 * 用法：npm run convert:images
 */
import { mkdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import sharp from "sharp";

const SRC_DIR = "D:\\图片\\图片\\pixiv";
const OUT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../public/images");

/** [源文件, 输出名, 最大宽度] */
const MAP = [
  ["001.png", "work-01.webp", 1600],
  ["010.jpg", "work-01-a.webp", 1400],
  ["140.jpg", "work-01-b.webp", 1400],
  ["005.jpg", "work-02.webp", 1600],
  ["043.png", "work-02-a.webp", 1600],
  ["052.jpg", "work-02-b.webp", 1400],
  ["025.jpg", "work-03.webp", 1600],
  ["020.jpg", "work-03-a.webp", 1400],
  ["065.jpg", "work-03-b.webp", 1400],
  ["030.jpg", "work-04.webp", 1600],
  ["070.png", "work-04-a.webp", 1400],
  ["100.png", "work-04-b.webp", 1400],
  ["060.jpg", "work-05.webp", 1600],
  ["120.jpg", "work-05-a.webp", 1400],
  ["021.jpg", "work-05-b.webp", 1400],
  ["180.jpg", "work-06.webp", 1800],
  ["033.png", "work-06-a.webp", 1400],
  ["160.jpg", "work-06-b.webp", 1400],
  ["040.png", "about-portrait.webp", 1200],
];

await mkdir(OUT_DIR, { recursive: true });

for (const [src, out, width] of MAP) {
  const input = path.join(SRC_DIR, src);
  const output = path.join(OUT_DIR, out);
  await sharp(input)
    .resize({ width, withoutEnlargement: true })
    .webp({ quality: 82 })
    .toFile(output);
  console.log(`✓ ${src} -> ${out}`);
}

console.log(`\n完成，共 ${MAP.length} 张图片输出到 ${OUT_DIR}`);
