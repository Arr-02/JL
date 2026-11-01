import { getLenis } from "./lenis";

/** 平滑滚动到页面锚点（经 Lenis，reduced-motion 时退化原生） */
export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(el, { duration: 1.4 });
  } else {
    el.scrollIntoView({ block: "start" });
  }
}

/** 回到顶部 */
export function scrollToTop(immediate = false) {
  const lenis = getLenis();
  if (lenis) {
    lenis.scrollTo(0, immediate ? { immediate: true } : { duration: 1.4 });
  } else {
    window.scrollTo(0, 0);
  }
}

export type SectionId = "work" | "about" | "experience" | "skillset" | "contact";

/** 顶栏导航（scroll-spy 监听同组锚点；id 沿用 work 保持锚点与路由不变） */
export const NAV_ITEMS: { id: SectionId; label: string }[] = [
  { id: "work", label: "竞赛" },
  { id: "about", label: "关于" },
  { id: "contact", label: "联系" },
];
