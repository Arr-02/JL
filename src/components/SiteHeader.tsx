import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "motion/react";
import {
  NAV_ITEMS,
  RESUME_AS_HOME,
  RESUME_NAV_ITEMS,
  scrollToSection,
  scrollToTop,
} from "../lib/scroll";
import { getLenis } from "../lib/lenis";

export default function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [active, setActive] = useState<string | null>(null);
  const [dotX, setDotX] = useState<number | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const btnRefs = useRef<Map<string, HTMLButtonElement>>(new Map());
  const navigate = useNavigate();
  const location = useLocation();
  const isHome = location.pathname === "/";
  // 开关：简历页作为主页时顶栏跳转简历区块，否则沿用原 Home 导航
  const navItems = RESUME_AS_HOME ? RESUME_NAV_ITEMS : NAV_ITEMS;

  // scroll-spy：区块经过视口中线时高亮对应导航
  useEffect(() => {
    if (!isHome) {
      setActive(null);
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-50% 0px -50% 0px" }
    );
    navItems.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [isHome, navItems]);

  // 圆点位置：当前按钮中心（recalc on resize / active 变化）
  const updateDot = useCallback(() => {
    if (!active) {
      setDotX(null);
      return;
    }
    const btn = btnRefs.current.get(active);
    if (!btn) {
      setDotX(null);
      return;
    }
    setDotX(btn.offsetLeft + btn.offsetWidth / 2 - 2);
  }, [active]);

  useEffect(() => {
    updateDot();
    window.addEventListener("resize", updateDot);
    return () => window.removeEventListener("resize", updateDot);
  }, [updateDot]);

  // 菜单打开时锁定滚动（Lenis + 原生兜底）+ Escape 关闭
  useEffect(() => {
    const lenis = getLenis();
    if (menuOpen) {
      lenis?.stop();
      document.body.style.overflow = "hidden";
    } else {
      lenis?.start();
      document.body.style.overflow = "";
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      lenis?.start();
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  const goSection = (id: string) => {
    setMenuOpen(false);
    // 菜单打开时 Lenis 处于 stop 状态，scrollTo 会被其内部直接忽略——先恢复再滚动
    getLenis()?.start();
    if (!isHome) {
      navigate("/", { state: { scrollTo: id } });
    } else {
      scrollToSection(id);
    }
  };

  const goHome = () => {
    setMenuOpen(false);
    if (!isHome) navigate("/");
    else scrollToTop();
  };

  return (
    <>
      <header className="site-header">
        <div className="container site-header__inner">
          <button className="site-header__logo" onClick={goHome} aria-label="回到首页">
            张家福<sup>®</sup>
          </button>

          <nav className="site-header__nav" ref={navRef} aria-label="主导航">
            {navItems.map((item, i) => (
              <button
                key={item.id}
                ref={(el) => {
                  if (el) btnRefs.current.set(item.id, el);
                  else btnRefs.current.delete(item.id);
                }}
                className={active === item.id ? "is-active" : ""}
                onClick={() => goSection(item.id)}
              >
                <sup>0{i + 1}</sup>
                {item.label}
              </button>
            ))}
            <span
              className="site-header__dot"
              aria-hidden="true"
              style={{
                transform: dotX == null ? "none" : `translateX(${dotX}px)`,
                opacity: dotX == null ? 0 : 1,
              }}
            />
          </nav>

          <button
            className={`site-header__burger ${menuOpen ? "is-open" : ""}`}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "关闭菜单" : "打开菜单"}
            aria-expanded={menuOpen}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            onClick={(e) => {
              // 点击面板外空白处关闭
              if (e.target === e.currentTarget) setMenuOpen(false);
            }}
          >
            <motion.div
              className="mobile-menu__panel"
              initial={{ y: -10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -10, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeOut" }}
            >
              <small>导航 MENU</small>
              {navItems.map((item, i) => (
                <button key={item.id} onClick={() => goSection(item.id)}>
                  <sup>0{i + 1}</sup>
                  {item.label}
                </button>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
