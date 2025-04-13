import LegendsCarousel from "./legends-carousel";

export default function LegendsSection() {
  return (
    <section className="my-[4rem] max-sm:my-8">
      <div className="px-[10%] max-md:px-[5%] flex flex-col items-center">
        <h2 className="mb-6 font-medium text-4xl max-sm:text-lg font-comfortaa text-center text-pretty">
          LEGENDS AREN&#39;T BORN, THEY&#39;RE{" "}
          <span className="text-[#FB5521]">SPUN</span>
        </h2>
        <p className="text-center text-pretty text-[1.2rem] max-sm:text-base w-[80%] max-md:w-full">
          In the world of Spinnersonic, every hero carries a spark — speed,
          power, heart, and a hunger to win. Choose your champion from a roster
          of unstoppable racers, fearless commanders, tech wizards, and
          out-of-this-world dreamers. Each one armed with their own moves, their
          own style, and a destiny waiting to be written.
        </p>
      </div>
      <LegendsCarousel />
    </section>
  );
}
