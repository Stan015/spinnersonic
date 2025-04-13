"use client";

import Slider from "react-slick";
import heroes from "@/lib/data/heroes.json";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function LegendsCarousel() {
  const heroesData = heroes.heroes;

  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 5000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 2024,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 6,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
    ],
  };

  return (
    <div className="overflow-hidden pt-20">
      <Slider {...settings} className="">
        {heroesData.map((hero) => (
          <div key={hero.id} className="w-max flex justify-center items-center">
            <Image
              width={200}
              height={200}
              src={hero.image}
              alt={hero.name}
              className="object-center  w-[15rem] h-[15rem] max-lg:w-[10rem] max-lg:h-[10rem] max-sm:w-[8rem] max-sm:h-[8rem] shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out mx-auto"
            />
            <div className="w-full h-[6rem] max-sm:h-[4.5rem] bg-[#F94F26] flex items-center justify-center">
              <p className="font-bold text-[0.6rem] font-comix-loud uppercase text-center max-sm:text-[0.4rem]">
                {hero.name}
              </p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
