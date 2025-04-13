import Marquee from "react-fast-marquee";

export default function GameModes() {
  return (
    <section className="w-full h-[10rem] px-[10%] py-10  max-sm:px-[5%] max-sm:py-3 bg-[linear-gradient(271.64deg,_#F94F26_2.11%,_#932F16_98.68%)] flex items-center justify-between">
      <h2 className="font-comfortaa text-3xl font-bold max-sm:text-2xl">
        GAME MODES
      </h2>
      <div className="w-[70%] space-y-2">
        {/* First row: scrolls from right to left */}
        <Marquee direction="left" gradient={false} speed={50}>
          <div className="flex space-x-8">
            <p className="text-xl font-bold">SPIN RACE</p>
            <p className="text-xl font-bold">FREE MODE</p>
            <p className="text-xl font-bold">RPM CHASER</p>
            <p className="text-xl font-bold">SLOW MOTION</p>
          </div>
        </Marquee>
        {/* Second row: scrolls from left to right */}
        <Marquee direction="right" gradient={false} speed={50}>
          <div className="flex space-x-8">
            <p className="text-xl font-bold">RPM CHASER</p>
            <p className="text-xl font-bold">SLOW MOTION</p>
            <p className="text-xl font-bold">RACE A FRIEND</p>
            <p className="text-xl font-bold">ENDLESS RACER</p>
          </div>
        </Marquee>
        {/* Third row: scrolls from right to left */}
        <Marquee direction="left" gradient={false} speed={50}>
          <div className="flex space-x-8">
            <p className="text-xl font-bold">RACE A FRIEND</p>
            <p className="text-xl font-bold">ENDLESS RACER</p>
            <p className="text-xl font-bold">RPM CHASER</p>
            <p className="text-xl font-bold">SLOW MOTION</p>
          </div>
        </Marquee>{" "}
      </div>
    </section>
  );
}
