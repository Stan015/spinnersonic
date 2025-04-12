import Hero from "@/components/hero";
import LegendsSection from "@/components/legends-section";
import MeetYourCrewSection from "@/components/meet-your-crew-section";
import MultiplayerBattleSection from "@/components/multiplayer-battle-section";

export default function Home() {
  return (
    <main>
      <Hero />
      <LegendsSection />
      <MeetYourCrewSection />
      <MultiplayerBattleSection />
    </main>
  );
}
