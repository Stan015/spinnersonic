"use client";

import React, { useRef, useState } from "react";
import { weapons } from "@/lib/data/weapons.json";
import Image from "next/image";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider, { Settings } from "react-slick";
import Button from "./ui/button";
import cn from "../utils/cn";

export default function WeaponsCarousel() {
  const sliderRef = useRef<Slider | null>(null);
  const [rotate, setRotate] = useState(false);

  const settings: Settings = {
    dots: false,
    infinite: true,
    speed: 800,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    cssEase: "linear",
    // Before the slide changes, start the rotation.
    beforeChange: () => setRotate(true),
    // After the slide has changed, reset the rotation flag.
    afterChange: () => setRotate(false),
  };

  return (
    <div className="overflow-hidden w-full h-full">
      <Slider ref={sliderRef} {...settings}>
        {weapons.map((weapon) => (
          <div
            key={weapon.id}
            className="w-max flex justify-center items-center"
          >
            <Image
              width={200}
              height={200}
              src={weapon.image}
              alt={weapon.name}
              className={cn(
                "w-[15rem] h-[15rem] object-cover transform transition-transform duration-800 ease-in-out",
                rotate ? "rotate-360" : "",
              )}
            />
          </div>
        ))}
      </Slider>
      <div className="w-full flex items-center justify-center gap-6 mt-4">
        <button
          type="button"
          aria-label="previous"
          className="bg-yellow text-black font-semibold p-2 rounded-[0.9rem] cursor-pointer"
          onClick={() => sliderRef.current?.slickPrev()}
        >
          <svg
            className="cursor-pointer"
            width="20"
            height="20"
            viewBox="0 0 8 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M7.30078 8.41211L3.01367 5.76562L7.30078 3.34375V0.599609L0.708984 4.67188V6.76172L7.30078 11.1465V8.41211Z"
              fill="black"
            />
          </svg>
        </button>
        <button
          type="button"
          aria-label="next"
          className="bg-yellow text-black font-semibold p-2 rounded-[0.9rem] cursor-pointer"
          onClick={() => sliderRef.current?.slickNext()}
        >
          <svg
            className="cursor-pointer"
            width="20"
            height="20"
            viewBox="0 0 8 12"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0.699219 8.41211L4.98633 5.76562L0.699219 3.34375V0.599609L7.29102 4.67188V6.76172L0.699219 11.1465V8.41211Z"
              fill="black"
            />
          </svg>
        </button>
      </div>
      <div className="w-full flex justify-center">
        <Button className="w-[15rem] font-extrabold text-2xl p-3 mt-10">
          DOWNLOAD NOW
        </Button>
      </div>
    </div>
  );
}
