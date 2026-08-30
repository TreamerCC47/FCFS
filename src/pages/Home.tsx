import { lazy, Suspense } from "react";
import { Navbar } from "../components/layout/Navbar";
import { Hero } from "../components/sections/Hero";

const HomeBelowFold = lazy(() =>
  import("../components/sections/HomeBelowFold").then((module) => ({
    default: module.HomeBelowFold,
  })),
);

export default function Home() {
  return (
    <main className="min-h-screen bg-background font-sans">
      <Navbar />
      <Hero />

      <Suspense fallback={null}>
        <HomeBelowFold />
      </Suspense>
    </main>
  );
}