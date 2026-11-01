/**
 * 下载 Pexels 免费图库照片并统一转为黑白 WebP（全站单色视觉）。
 * 用法：node scripts/fetch-photos.mjs
 * 图片来源：Pexels（免费授权，可商用，无需署名）。
 * ★ 标注 [REPLACE] 的文件建议日后用本人真实照片覆盖同名文件。
 */
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const OUT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../public/images");

/** [pexels 照片 ID, 输出文件名, 最大宽度] */
const MAP = [
  // 成果卡封面（4 张）
  ["3520692", "award-01.webp", 1600],   // 省赛：黑白 PCB 星空焊点
  ["37340089", "award-02.webp", 1600],  // 市一等奖：双手焊接
  ["9242887", "award-03.webp", 1600],   // 市三等奖：多人协作测板
  ["37340084", "award-04.webp", 1600],  // 科技创新：工坊接线（★REPLACE：换《电磁力拖把》实物照）
  // 详情页配图（8 张）
  ["2105927", "award-01-a.webp", 1400], // CPU 针脚微距
  ["5806812", "award-01-b.webp", 1400], // 数字万用表
  ["9242896", "award-02-a.webp", 1400], // 焊接烟雾特写
  ["40068137", "award-02-b.webp", 1400],// 二极管焊点微距
  ["18471536", "award-03-a.webp", 1400],// 机电实训台
  ["35673122", "award-03-b.webp", 1400],// 元器件平铺
  ["35686432", "award-04-a.webp", 1400],// 传感器模块
  ["33694016", "award-04-b.webp", 1400],// 端子排检测
  // About 区（2 张）
  ["35155421", "about-main.webp", 1400],// 电子实验台（★REPLACE：换本人工位照）
  ["3665442", "about-small.webp", 1200],// 芯片微距
];

await mkdir(OUT_DIR, { recursive: true });

for (const [id, out, width] of MAP) {
  const url = `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=${width}`;
  const res = await fetch(url);
  if (!res.ok) {
    console.error(`✗ ${id} HTTP ${res.status}`);
    continue;
  }
  const buf = Buffer.from(await res.arrayBuffer());
  const output = path.join(OUT_DIR, out);
  await sharp(buf)
    .resize({ width, withoutEnlargement: true })
    .grayscale()          // 统一黑白
    .linear(1.05, -6)     // 轻提对比度，贴合高对比版式
    .webp({ quality: 82 })
    .toFile(output);
  console.log(`✓ ${id} -> ${out} (${(buf.length / 1024).toFixed(0)}KB 源)`);
}

console.log(`\n完成，共 ${MAP.length} 张输出到 ${OUT_DIR}`);
