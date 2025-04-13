import Image from "next/image";
import WeaponsCarousel from "./weapons-carousel";

export default function MeetYourCrewSection() {
  return (
    <section className="flex flex-col items-center my-20 w-full max-md:my-[2rem]">
      <h2 className="flex flex-col max-sm:w-[90%] items-center justify-center px-[10%] max-md:px-[5%] font-titan-one gap-6 mb-6 max-md:gap-2  text-5xl font-medium  text-center max-md:text-4xl text-pretty max-sm:text-2xl">
        <span className="max-w-[35rem]">
          <span className="hidden max-sm:inline-block">"</span>This isn&#39;t
          just a race It&#39;s a <span className="text-yellow">legacy.</span>
        </span>
        <span className="text-red-orange">
          Spin fast. Spin fierce. Spin legendary.
          <span className="hidden max-sm:inline-block">"</span>
        </span>
      </h2>

      <div className="w-full h-[40rem] max-md:h-[30rem] max-sm:h-[18rem] mt-10 max-sm:mt-0 py-10 max-sm:py-4 flex flex-col items-center bg-[linear-gradient(271.64deg,_#F94F26_2.11%,_#932F16_98.68%)]">
        <div className="w-[77%] max-lg:w-[70%] max-md:w-[60%] h-max flex flex-col self-end items-center justify-center  px-[5%]">
          <h4 className="font-comfortaa text-5xl max-md:text-3xl text-center max-sm:text-[1.1rem]">
            MEET YOUR CREW!
          </h4>
          <p className="font-mono text-2xl max-md:text-lg mt-3 text-center max-sm:text-[0.8rem]">
            Every spinner has a story.{" "}
            <span className="font-bold">Every hero</span> has a dream.
          </p>
        </div>
        <div className="relative w-full h-full flex justify-end">
          <Image
            src="/heroes/axel-dash.webp"
            alt="axel dash"
            priority
            width={500}
            height={500}
            className="absolute left-[3%] bottom-[-3.3rem] max-sm:bottom-[-1.7rem] w-[30rem] h-[45rem] max-md:w-[25rem] max-md:h-[35rem] max-sm:w-[13rem] max-sm:h-[21rem] z-10 max-xl:left-[-3rem] max-sm:left-[-2rem]"
          />

          <div className="w-[77%]  max-lg:w-[70%] max-md:w-[60%] h-full mt-5 max-sm:mt-1">
            <WeaponsCarousel />
          </div>
        </div>
      </div>
    </section>
  );
}
