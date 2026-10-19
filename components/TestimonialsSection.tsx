"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { FaStar, FaQuoteLeft, FaWhatsapp } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";

import { TESTIMONIALS_DATA, TestimonialItem } from "@data/testimonials";
import { getTestimonials } from "@lib/testimonialService";
import { SITE_CONFIG } from "@data/siteConfig";

import "swiper/css";
import "swiper/css/pagination";

export default function TestimonialsSection() {
  const [testimonials, setTestimonials] = useState<TestimonialItem[]>(TESTIMONIALS_DATA);

  useEffect(() => {
    getTestimonials()
      .then((data) => {
        if (data && data.length > 0) {
          setTestimonials(data);
        }
      })
      .catch((err) => console.warn("Memuat testimoni Firestore fallback:", err));
  }, []);

  const whatsappReviewUrl = `https://wa.me/${SITE_CONFIG.contact.whatsappNumber}?text=${encodeURIComponent(
    "Halo Admin Bimbel Kiddos Zone, saya ingin membagikan testimoni / review mengenai pengalaman belajar ananda di Kiddos Zone:"
  )}`;

  return (
    <section
      id="testimoni"
      className="w-full py-14 md:py-20 bg-gradient-to-b from-white via-pink-50/30 to-white scroll-mt-24 relative overflow-hidden"
      aria-label="Testimoni Orang Tua dan Siswa Bimbel Kiddos Zone"
    >
      {/* Background soft decorative bubbles */}
      <div className="absolute top-10 left-5 w-40 h-40 bg-pink-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-5 w-56 h-56 bg-teal-200/40 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 md:px-8 relative z-10">
        {/* Section Header with exact styling from user image */}
        <div className="text-center max-w-2xl mx-auto mb-10 md:mb-14">
          <h2 className="text-3xl md:text-5xl font-black baloo tracking-tight leading-tight">
            <span className="text-teal-500">Cerita dari </span>
            <span className="text-pink-500">Orang Tua &amp; Siswa</span>
          </h2>
          <p className="mt-3 text-base md:text-lg text-gray-600 font-sans leading-relaxed">
            Pengalaman nyata ayah &amp; bunda yang telah mempercayakan bimbingan
            belajar putra-putrinya di <strong>Bimbel Kiddos Zone Bogor</strong>.
          </p>
        </div>

        {/* Testimonials Slider */}
        <div className="w-full pb-10">
          <Swiper
            spaceBetween={24}
            autoplay={{
              delay: 4500,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            pagination={{
              clickable: true,
              dynamicBullets: true,
            }}
            breakpoints={{
              320: {
                slidesPerView: 1,
                spaceBetween: 16,
              },
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              1024: {
                slidesPerView: 3,
                spaceBetween: 24,
              },
            }}
            modules={[Autoplay, Pagination]}
            className="w-full !pb-12"
          >
            {testimonials.map((item) => (
              <SwiperSlide key={item.id} className="h-auto">
                <div className="h-full bg-white rounded-3xl p-7 md:p-8 border border-pink-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between text-center relative group">
                  {/* Subtle top quote decoration */}
                  <div className="absolute top-4 right-5 text-pink-100 group-hover:text-pink-200 transition">
                    <FaQuoteLeft className="text-3xl" />
                  </div>

                  <div>
                    {/* Circular Avatar with pink ring matching the mockup */}
                    <div className="relative w-24 h-24 mx-auto mb-5 rounded-full p-1 bg-gradient-to-tr from-pink-300 via-rose-200 to-pink-100 ring-4 ring-pink-50 flex items-center justify-center shadow-sm">
                      {item.avatar ? (
                        <div className="relative w-full h-full rounded-full overflow-hidden">
                          <Image
                            src={item.avatar}
                            alt={`Foto testimoni ${item.name}`}
                            fill
                            className="object-cover"
                          />
                        </div>
                      ) : (
                        <div
                          className={`w-full h-full rounded-full bg-gradient-to-br ${
                            item.avatarBg || "from-pink-400 to-rose-400"
                          } flex items-center justify-center text-white font-extrabold text-2xl shadow-inner baloo`}
                        >
                          {item.name
                            .split(" ")
                            .map((n) => n[0])
                            .slice(0, 2)
                            .join("")}
                        </div>
                      )}
                    </div>

                    {/* Testimonial Quote Text */}
                    <p className="text-gray-700 text-base md:text-[17px] leading-relaxed font-sans font-normal mb-5">
                      {item.content}
                    </p>
                  </div>

                  {/* Rating Stars & Author Info */}
                  <div className="pt-4 border-t border-gray-100">
                    {/* Stars */}
                    <div className="flex justify-center gap-1 text-amber-400 text-lg mb-2">
                      {[...Array(item.rating)].map((_, i) => (
                        <FaStar key={i} />
                      ))}
                    </div>

                    {/* Author Name */}
                    <h3 className="text-lg md:text-xl font-bold text-gray-900 baloo leading-snug">
                      {item.name}
                    </h3>

                    {/* Author Subtitle */}
                    <p className="text-xs md:text-sm text-gray-500 font-medium font-sans mt-0.5">
                      {item.role}
                    </p>

                    {/* Program tag */}
                    {item.program && (
                      <span className="inline-block mt-3 px-3 py-0.5 bg-pink-50 text-pink-600 rounded-full text-xs font-semibold">
                        {item.program}
                      </span>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Friendly CTA Box: Tidak perlu login, orang tua bisa kirim via WhatsApp */}
        <div className="mt-6 max-w-xl mx-auto bg-white/80 backdrop-blur-sm border border-teal-100 rounded-2xl p-4 md:p-6 text-center shadow-sm">
          <p className="text-sm md:text-base text-gray-700 font-medium">
            Ingin berbagi pengalaman belajar ananda di Kiddos Zone?
          </p>
          <a
            href={whatsappReviewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-3 inline-flex items-center gap-2 bg-gradient-to-r from-teal-500 to-emerald-500 text-white text-sm md:text-base font-bold px-5 py-2.5 rounded-full shadow hover:opacity-95 transition"
            aria-label="Kirim testimoni via WhatsApp"
          >
            <FaWhatsapp className="text-lg" />
            Kirim Cerita &amp; Ulasan via WhatsApp
          </a>
        </div>
      </div>
    </section>
  );
}
