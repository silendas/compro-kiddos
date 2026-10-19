"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { hero1, hero2, hero3 } from "@asset/hero";

import "swiper/css";
import "swiper/css/pagination";

const sliderImages = [
  { img: hero1, alt: "Bimbel Kiddos Zone - Kelas Belajar Ceria di Bogor" },
  { img: hero2, alt: "Metode Belajar Interaktif PraCalis dan Calistung" },
  { img: hero3, alt: "Bimbingan Belajar Berkualitas untuk Siswa TK dan SD" },
];

export default function HeroSlider() {
  return (
    <div className="w-full relative aspect-[2834/1220] overflow-hidden">
      <Swiper
        spaceBetween={0}
        centeredSlides={true}
        autoplay={{ delay: 4500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        modules={[Autoplay, Pagination]}
        className="w-full h-full"
      >
        {sliderImages.map((slide, index) => (
          <SwiperSlide key={index} className="relative w-full h-full">
            <Image
              src={slide.img}
              alt={slide.alt}
              fill
              priority={index === 0}
              className="w-full h-full object-cover"
              sizes="100vw"
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
