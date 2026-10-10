import type { Metadata } from "next";
import NavBar from "../components/NavBar";
import GameCatalog from "./GameCatalog";

export const metadata: Metadata = {
  title: "Game Library — Atlas Game Shop",
  description: "Browse every game available through Atlas Tools.",
};

export default function GamesPage() {
  return (
    <div className="min-h-screen">
      <NavBar />
      <main className="container mx-auto px-4 md:px-6 pt-28 pb-24">
        <GameCatalog />
      </main>
    </div>
  );
}
