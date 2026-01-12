import type { Metadata } from "next";
import { Navbar } from "@/components/landing/navbar";
import { Footer } from "@/components/landing/footer";
import { DocsSidebar } from "@/components/docs/docs-sidebar";
import Hyperspeed from "@/components/Hyperspeed";

export const metadata: Metadata = {
    title: "Uses | MAF - Model Application Firewall",
    description: "Documentation for integrating and using MAF in your applications.",
};

export default function DocsLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-background flex flex-col">
            <div className="fixed inset-0 -z-50 h-screen w-full opacity-30 pointer-events-none">
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

            <Navbar />

            <div className="container mx-auto flex-1 flex gap-12 px-6 pt-24 pb-12">
                <DocsSidebar />
                <main className="flex-1 w-full min-w-0">
                    {children}
                </main>
            </div>

            <Footer />
        </div>
    );
}
