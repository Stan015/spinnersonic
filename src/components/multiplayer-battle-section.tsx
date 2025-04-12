import Image from "next/image";
import PlaySpinGame from "./play-spin-game";

export default function MultiplayerBattleSection() {
  return (
    <section className="flex flex-col items-center my-20 w-full">
      <h2 className="font-comfortaa text-5xl font-medium leading-15 text-center mb-6 max-w-[35rem] flex flex-col items-center">
        MULTIPLAYER
        <span className="text-[#F24C25]">BATTLES</span>
      </h2>
      <h3 className="font-titan-one text-red-orange text-4xl mb-8">
        Spin Hard or Go Home
      </h3>

      <div className="relative w-full h-[40rem] mt-10 py-10 flex flex-col items-center">
        <Image
          src="/heroes/gizmo-grip.webp"
          alt="axel dash"
          priority
          width={500}
          height={500}
          className="absolute left-[3%] bottom-[-3.3rem] w-[30rem] h-[45rem] z-10"
        />

        <div className="w-full">
          <PlaySpinGame />
        </div>

        <Image
          src="/heroes/axel-dash.webp"
          alt="axel dash"
          priority
          width={500}
          height={500}
          className="absolute right-[3%] bottom-[-3.3rem] w-[30rem] h-[45rem] z-10 transform scale-x-[-1]"
        />
      </div>
    </section>
  );
}
