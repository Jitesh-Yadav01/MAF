import { Navbar } from "@/components/landing/navbar";
import { Hero } from "@/components/landing/hero";
import { WhyMaf } from "@/components/landing/why-maf";
import { CoreCapabilities } from "@/components/landing/core-capabilities";
import { CodePreview } from "@/components/landing/code-preview";
import { Security } from "@/components/landing/security";

import { FAQ } from "@/components/landing/faq";
import { CTA } from "@/components/landing/cta";
import { Footer } from "@/components/landing/footer";
import { Preloader } from "@/components/ui/preloader";
import Hyperspeed from "@/components/Hyperspeed";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col selection:bg-primary/20">
      <div className="fixed inset-0 -z-50 h-screen w-full">
        <Hyperspeed
          effectOptions={{
            distortion: 'turbulentDistortion',
            length: 400,
            roadWidth: 10,
            islandWidth: 2,
            lanesPerRoad: 4,
            fov: 90,
            fovSpeedUp: 150,
            speedUp: 2,
            carLightsFade: 0.4,
            totalSideLightSticks: 20,
            lightPairsPerRoadWay: 40,
            shoulderLinesWidthPercentage: 0.05,
            brokenLinesWidthPercentage: 0.1,
            brokenLinesLengthPercentage: 0.5,
            lightStickWidth: [0.12, 0.5],
            lightStickHeight: [1.3, 1.7],
            movingAwaySpeed: [60, 80],
            movingCloserSpeed: [-120, -160],
            carLightsLength: [400 * 0.03, 400 * 0.2],
            carLightsRadius: [0.05, 0.14],
            carWidthPercentage: [0.3, 0.5],
            carShiftX: [-0.8, 0.8],
            carFloorSeparation: [0, 5],
            colors: {
              roadColor: 0x080808,
              islandColor: 0x0a0a0a,
              background: 0x000000,
              shoulderLines: 0xFFFFFF,
              brokenLines: 0xFFFFFF,
              leftCars: [0xD856BF, 0x6750A2, 0xC247AC],
              rightCars: [0x03B3C3, 0x0E5EA5, 0x324555],
              sticks: 0x03B3C3,
            }
          }}
        />
      </div>
      <Preloader />
      <Navbar />
      <Hero />

      <div className="relative z-10 bg-background">
        <WhyMaf />
        <CoreCapabilities />
        <CodePreview />
        <Security />
        <FAQ />
        <CTA />
        <Footer />
      </div>
    </main>
  );
}
