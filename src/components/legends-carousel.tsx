"use client";

import Slider from "react-slick";
import { heroes } from "@/lib/data/heroes.json";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function LegendsCarousel() {
  const settings = {
    dots: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    speed: 3000,
    autoplaySpeed: 5000,
    cssEase: "linear",
    responsive: [
      {
        breakpoint: 2024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 5,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };

  return (
    <div className="overflow-hidden pt-20">
      <Slider {...settings} className="">
        {heroes.map((hero) => (
          <div key={hero.id} className="w-max flex justify-center items-center">
            <Image
              width={200}
              height={200}
              src={hero.image}
              alt={hero.name}
              className="object-center  w-[15rem] h-[15rem] shadow-lg hover:scale-105 transition-transform duration-300 ease-in-out mx-auto"
            />
            <div className="w-full h-[6rem] bg-[#F94F26] flex items-center justify-center">
              <p className="font-bold text-[0.6rem] font-comix-loud uppercase">{hero.name}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
}
