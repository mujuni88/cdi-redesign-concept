import { SiteHeader } from "@/components/site/SiteHeader";
import { Hero } from "@/components/home/Hero";
import { Outcomes } from "@/components/home/Outcomes";
import { IdenticalRowsDemo } from "@/components/home/IdenticalRowsDemo";
import { DiscoveryRows } from "@/components/home/DiscoveryRows";
import { Applications, FeaturedLesson } from "@/components/home/Applications";
import {
  HowItWorks,
  Instructor,
  StartFree,
  SiteFooter,
} from "@/components/home/Story";

export default function HomePage() {
  return (
    <>
      <SiteHeader />
      <main id="main">
        {/* 1 — hook: the argument, performed rather than asserted */}
        <Hero />
        {/* 2 — outcome, in the learner's voice */}
        <Outcomes />
        {/* 3 — interactive demonstration, before anything is asked for */}
        <IdenticalRowsDemo />
        {/* 4 — discovery */}
        <DiscoveryRows />
        {/* 5 — real-world applications */}
        <Applications />
        {/* 6 — featured lesson */}
        <FeaturedLesson />
        {/* 7 — how the learning experience works */}
        <HowItWorks />
        {/* 8 — instructor credibility */}
        <Instructor />
        {/* 9 + 10 — free starting point, and what costs money */}
        <StartFree />
      </main>
      <SiteFooter />
    </>
  );
}
