import Image from "next/image";
import Button from "./ui/button";

export default function Hero() {
  return (
    <section className="h-[45rem] flex flex-col items-center bg-[linear-gradient(96.2deg,_#FF5722_5.22%,_#99240B_99.44%)] relative  mt-[4rem]">
      <div className="h-[60%] w-full flex items-end flex-col pt-10 pr-[10%]">
        <div className="w-max flex flex-col gap-4 items-center">
        <h1 className="font-comix-loud text-[2.75rem] text-[#FFD94D]">WELCOME TO SPINNERSONIC!</h1>
        <p className="font-titan-one text-5xl max-w-[40rem] text-center">Race, Spin and Soar to Glory</p>
        </div>
      </div>

      <Image src="/img-hero.webp" alt="hero image" priority width={500} height={500} className="absolute left-[3%] bottom-[-3.3rem] w-[36rem] h-[54rem]" />

      <div className="bg-[#FF842A] w-full h-[7rem] z-10 py-6 px-[10%] text-xl space-y-1">
        <p>
          <span className="font-bold">Spinnersonic</span> is a fast-paced action game where your spinner is your
          hero.
        </p>
        <p>
          Race against others, customize your style, unlock wild characters, and
          become the ultimate spin champion.
        </p>
      </div>

      <div className="flex items-center gap-[2rem] mt-10 self-end pr-[10%]">
        <Button className="w-[15rem] font-extrabold text-2xl p-3" loadingText="Loading..."> 
          PLAY NOW
        </Button>
        <Button className="w-[15rem] font-extrabold text-2xl p-3 " loadingText="Loading...">MEET THE HEROES </Button>
      </div>
    </section>
  );
}
