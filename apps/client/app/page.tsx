import Footer from "@/components/global/Footer";
import { LampDemo } from "@/components/global/LampComponent";
import Navbar from "@/components/global/Navbar";
import { HeroScrollDemo } from "@/components/global/ScrollComponent";

export default function Home() {
  return (
    <main>
      <Navbar/>
      <HeroScrollDemo/>
      <LampDemo/>
      <Footer/>
    </main>
  );
}
