import CustomCursor from "@/components/CustomCursor";
import GlobalEngine from "@/components/GlobalEngine";
import GSAPInitializer from "@/components/GSAPInitializer";
import Navbar from "@/components/Navbar";
import HUD from "@/components/HUD";
import Loader from "@/components/Loader";

import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Expertise from "@/components/sections/Expertise";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Consulting from "@/components/sections/Consulting";
import HumanSide from "@/components/sections/HumanSide";
import Experimental from "@/components/sections/Experimental";
import Contact from "@/components/sections/Contact";

export default function Home() {
  return (
    <>
      <CustomCursor />
      <GlobalEngine />
      <GSAPInitializer />
      
      <div id="grain"></div>
      
      <Loader />
      <Navbar />
      
      <Hero />
      <About />
      <Expertise />
      <Projects />
      <Experience />
      <Consulting />
      <HumanSide />
      <Experimental />
      <Contact />
      
      <HUD />
    </>
  );
}
