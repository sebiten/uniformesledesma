"use client";

import * as React from "react";
import Image from "next/image";
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

const schools = [
  { name: "Escuela Normal", src: "/schools/ig1.png" },
  { name: "Santa Teresita", src: "/schools/ig2.png" },
  { name: "Belgrano", src: "/schools/ig3.png" },
  { name: "San Martín", src: "/schools/ig4.png" },
  { name: "Colegio X", src: "/schools/ig1.png" },
];

const items = [...schools, ...schools, ...schools];

export function SchoolLogosCarousel() {
  const autoplay = React.useRef(
    Autoplay({ delay: 2400, stopOnInteraction: false, stopOnMouseEnter: true })
  );

  return (
    <div className="relative">
      {/* Fade edges */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-8 bg-gradient-to-r from-white/60 to-transparent z-10" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-8 bg-gradient-to-l from-white/60 to-transparent z-10" />

      <Carousel
        plugins={[autoplay.current]}
        opts={{ align: "start", loop: true, dragFree: true }}
        className="w-full"
        onMouseEnter={autoplay.current.stop}
        onMouseLeave={autoplay.current.reset}
      >
        <CarouselContent className="-ml-2">
          {items.map((s, i) => (
            <CarouselItem
              key={`${s.name}-${i}`}
              className="pl-2 basis-1/3 sm:basis-1/4 md:basis-1/5"
            >
              <div className="h-14 md:h-16 rounded-xl border border-[#0B1220]/10 bg-white/70 flex items-center justify-center px-3">
                <div className="relative h-9 md:h-10 w-full">
                  <Image
                    src={s.src}
                    alt={s.name}
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 33vw, (max-width: 1024px) 20vw, 160px"
                  />
                </div>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="hidden md:flex -left-4 border-[#0B1220]/10 bg-white/80 hover:bg-white" />
        <CarouselNext className="hidden md:flex -right-4 border-[#0B1220]/10 bg-white/80 hover:bg-white" />
      </Carousel>
    </div>
  );
}