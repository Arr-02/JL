import { useEffect } from "react";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "motion/react";
import SiteHeader from "./components/SiteHeader";
import HomePage from "./pages/HomePage";
import ProjectPage from "./pages/ProjectPage";
import { scrollToSection, scrollToTop } from "./lib/scroll";

export default function App() {
  const location = useLocation();

  // 路由变化时回到顶部；带 state.scrollTo 时滚动到指定锚点
  useEffect(() => {
    const target = (location.state as { scrollTo?: string } | null)?.scrollTo;
    if (target) {
      const timer = window.setTimeout(() => scrollToSection(target), 80);
      return () => window.clearTimeout(timer);
    }
    scrollToTop(true);
  }, [location.pathname, location.state]);

  return (
    <>
      <SiteHeader />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/work/:slug" element={<ProjectPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AnimatePresence>
    </>
  );
}
