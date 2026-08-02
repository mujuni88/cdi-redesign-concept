import { SiteHeader } from "@/components/site/SiteHeader";
import { CinematicHero } from "@/components/home/CinematicHero";
import { Marquee, Billboard, DomainGrid } from "@/components/home/Billboard";
import { ArtRows } from "@/components/home/ArtRows";
import { IdenticalRowsDemo } from "@/components/home/IdenticalRowsDemo";
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
        {/* 1 — the hook: a volcano plot assembling itself */}
        <CinematicHero />
        {/* 2 — ambient strip of what's actually covered */}
        <Marquee />
        {/* 3 — Netflix rows, each card fronted by real generated chart art */}
        <ArtRows />
        {/* 4 — billboard for the featured lesson */}
        <Billboard />
        {/* 5 — play it right now, before anything is asked for */}
        <IdenticalRowsDemo />
        {/* 6 — the domains, each with its own chart */}
        <DomainGrid />
        {/* 7 — how the learning model works */}
        <HowItWorks />
        {/* 8 — instructor credibility */}
        <Instructor />
        {/* 9 + 10 — free tier, and what costs money */}
        <StartFree />
      </main>
      <SiteFooter />
    </>
  );
}
