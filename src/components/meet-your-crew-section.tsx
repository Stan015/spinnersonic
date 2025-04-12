import Image from "next/image";
import WeaponsCarousel from "./weapons-carousel";
import Button from "./ui/button";

export default function MeetYourCrewSection() {
  return (
    <section className="flex flex-col items-center my-20 w-full">
      <h2 className="font-titan-one text-5xl font-medium text-center mb-6 max-w-[35rem]">
        This isn&#39;t just a race It&#39;s a{" "}
        <span className="text-yellow">legacy.</span>
      </h2>
      <h3 className="font-titan-one text-red-orange text-4xl mb-8">
        Spin fast. Spin fierce. Spin legendary.
      </h3>

      <div className="w-full h-[40rem] mt-10 py-10 flex flex-col items-center bg-[linear-gradient(271.64deg,_#F94F26_2.11%,_#932F16_98.68%)]">
        <div className="w-full h-max flex flex-col items-center justify-center">
          <h4 className="font-comfortaa text-5xl">MEET YOUR CREW!</h4>
          <p className="font-mono text-2xl mt-3">
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
            className="absolute left-[3%] bottom-[-3.3rem] w-[30rem] h-[45rem] z-10"
          />

          <div className="w-[77%] h-full mt-5">
            <WeaponsCarousel />
          </div>
        </div>
      </div>
    </section>
  );
}
