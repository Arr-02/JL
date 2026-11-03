import { getLenis } from "./lenis";

/** 平滑滚动到页面锚点（经 Lenis，reduced-motion 时退化原生） */
export function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const lenis = getLenis();
  if (lenis) {
    // offset 让目标区块避开固定顶栏（原生兜底走 CSS scroll-margin-top）
    lenis.scrollTo(el, { duration: 1.4, offset: -96 });
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

/** 站点开关：true = 简历页作为主页（原 HomePage 及其顶栏导航保留代码，置 false 可整体切回） */
export const RESUME_AS_HOME = true;

export type SectionId = "work" | "about" | "experience" | "skillset" | "contact";

/** 简历页顶栏导航（RESUME_AS_HOME 时使用，id 对应 ResumePage 各区块锚点） */
export const RESUME_NAV_ITEMS: { id: string; label: string }[] = [
  { id: "education", label: "教育" },
  { id: "projects", label: "项目" },
  { id: "awards", label: "获奖" },
  { id: "certificates", label: "证书" },
  { id: "skills", label: "技能" },
  { id: "profile", label: "评价" },
];

/** 顶栏导航（scroll-spy 监听同组锚点；id 沿用 work 保持锚点与路由不变） */
export const NAV_ITEMS: { id: SectionId; label: string }[] = [
  { id: "work", label: "竞赛" },
  { id: "about", label: "关于" },
  { id: "contact", label: "联系" },
];
