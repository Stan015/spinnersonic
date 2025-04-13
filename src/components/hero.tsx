import Image from "next/image";
import Button from "./ui/button";

export default function Hero() {
  return (
    <section className="h-[45rem] max-sm:h-[40rem] flex flex-col items-center bg-[linear-gradient(96.2deg,_#FF5722_5.22%,_#99240B_99.44%)] relative  mt-[4rem] max-md:mt-[2rem]">
      <div className="h-[60%] w-full flex items-end flex-col pt-10 pr-[10%] max-lg:pr-[5%] max-md:p-[5%] relative">
        <div className="w-max max-md:w-full flex flex-col gap-4 items-center">
          <h1 className="font-comix-loud text-[1.7rem] lg:text-[2rem] [@media(min-width:1441px)]:text-[2.75rem] text-[#FFD94D] max-md:mx-auto text-center max-md:text-[1.2rem] max-sm:text-[0.8rem]">
            WELCOME TO SPINNERSONIC!
          </h1>
          <p className="font-titan-one text-5xl max-w-[40rem] text-center max-lg:text-4xl max-lg:absolute max-lg:top-1/2 max-lg:right-[5%] max-lg:w-[25rem] max-md:w-[14rem] max-sm:text-xl max-sm:w-[8rem] max-sm:top-[40%]">
            Race, Spin and Soar to Glory
          </p>
        </div>
      </div>

      <Image
        src="/img-hero.webp"
        alt="hero image"
        priority
        width={500}
        height={500}
        className="absolute left-[3%] bottom-[-3.3rem] w-[36rem] h-[54rem] max-xl:w-[30rem] max-xl:h-[45rem] [@media(min-width:1330px)]:left-0 max-lg:-left-6 max-md:w-[27rem] max-sm:h-[30rem] max-sm:w-[18rem] max-sm:bottom-[8rem]"
      />

      <div className="bg-[#FF842A] w-full h-[7rem] z-10 py-6 px-[10%] text-xl space-y-1 max-xl:h-auto max-xl:text-lg max-md:py-4 max-md:px-[5%] max-md:leading-tight max-md:space-y-4 text-pretty max-sm:text-[0.9rem]">
        <p>
          <span className="font-bold">Spinnersonic</span> is a fast-paced action
          game where your spinner is your hero.
        </p>
        <p>
          Race against others, customize your style, unlock wild characters, and
          become the ultimate spin champion.
        </p>
      </div>

      <div className="flex items-center gap-[2rem] mt-10 self-end pr-[10%] z-10 max-md:px-[5%] max-md:gap-[1rem] max-md:w-full max-md:justify-center max-sm:flex-col max-sm:mb-[2rem]">
        <Button
          className="w-[15rem] font-extrabold text-2xl p-3"
          loadingText="Loading..."
        >
          PLAY NOW
        </Button>
        <Button
          className="w-[15rem] font-extrabold text-2xl p-3  text-nowrap"
          loadingText="Loading..."
        >
          MEET THE HEROES
        </Button>
      </div>
    </section>
  );
}
