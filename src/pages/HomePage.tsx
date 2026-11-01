import { motion } from "motion/react";
import HeroSection from "../sections/HeroSection";
import FeaturedWork from "../sections/FeaturedWork";
import AboutIntro from "../sections/AboutIntro";
import AboutSection from "../sections/AboutSection";
import ExperienceSection from "../sections/ExperienceSection";
import SkillsetSection from "../sections/SkillsetSection";
import ContactSection from "../sections/ContactSection";

export default function HomePage() {
  return (
    <motion.main
      className="page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35, ease: "easeOut" }}
    >
      <HeroSection />
      <FeaturedWork />
      <AboutIntro />
      <AboutSection />
      <ExperienceSection />
      <SkillsetSection />
      <ContactSection />
    </motion.main>
  );
}
