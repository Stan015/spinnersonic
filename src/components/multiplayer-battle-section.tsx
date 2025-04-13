import Image from "next/image";
import PlaySpinGame from "./play-spin-game";

export default function MultiplayerBattleSection() {
  return (
    <section
      className="flex flex-col items-center py-20 w-full max-md:py-10"
      id="multiplayer-section"
    >
      <h2 className="font-comfortaa text-5xl font-medium leading-15 text-center mb-6 max-w-[35rem] flex flex-col items-center">
        MULTIPLAYER
        <span className="text-[#F24C25]">BATTLES</span>
      </h2>
      <h3 className="font-titan-one text-red-orange text-4xl mb-8 max-lg:hidden">
        Spin Hard or Go Home
      </h3>

      <div className="relative w-full h-[40rem] mt-10 py-10 max-md:py-3 max-md:mt-5 flex flex-col items-center overflow max-lg:h-[70rem] max-sm:h-[58rem] overflow-x-clip">
        <Image
          src="/heroes/gizmo-grip.webp"
          alt="axel dash"
          priority
          width={500}
          height={500}
          className="absolute left-[3%] max-xl:left-[-3rem] bottom-[-3.3rem] w-[30rem] h-[45rem] max-lg:w-[25rem] max-lg:h-[35rem] z-10 max-sm:w-[15rem] max-sm:h-[24rem]"
        />

        <div className="w-full max-lg:mb-5">
          <PlaySpinGame />
        </div>

        <h3 className="font-titan-one text-red-orange text-4xl w-[8rem] absolute bottom-[10%] text-center mb-8 lg:hidden max-sm:text-2xl max-sm:w-[5rem] max-sm:bottom-[4%]">
          Spin Hard or Go Home
        </h3>

        <Image
          src="/heroes/axel-dash.webp"
          alt="axel dash"
          priority
          width={500}
          height={500}
          className="absolute right-[3%] max-xl:right-[-3rem]  bottom-[-3.3rem] w-[30rem] h-[45rem] z-10 transform scale-x-[-1]  max-lg:w-[25rem] max-lg:h-[35rem] max-sm:w-[15rem] max-sm:h-[24rem]"
        />
      </div>
    </section>
  );
}
