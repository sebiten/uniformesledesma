"use client";
import { ChevronDown, ShoppingCartIcon } from "lucide-react";
import { Button } from "./ui/button";
import Image from "next/image";
import { SchoolLogosCarousel } from "@/components/SchoolLogosCarousel";

export default function Hero() {
  return (
    <section className="relative w-full min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background: limpio, sobrio */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#F7F8FA] to-[#EFF2F6]" />

      {/* Grid sutil (más “retail” y menos “arty”) */}
      <div
        className="absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            "linear-gradient(to right, #0B1220 1px, transparent 1px), linear-gradient(to bottom, #0B1220 1px, transparent 1px)",
          backgroundSize: "48px 48px",
        }}
      />

      {/* Top glow suave */}
      <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[110%] h-[320px] bg-white/60 blur-3xl rounded-full" />

      <div className="relative z-10 w-full max-w-6xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">
        {/* Left: Copy */}
        <div className="flex flex-col items-start">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 rounded-full border border-[#0B1220]/10 bg-white/60 backdrop-blur px-4 py-2 text-sm text-[#0B1220]/80">
            <span className="h-2 w-2 rounded-full bg-[#0B2A5B]" />
            Uniformes escolares • Calidad y stock
          </div>

          {/* Brand */}
          <h1 className="mt-5 text-4xl md:text-6xl font-semibold tracking-tight text-[#0B1220]">
            mariel<span className="text-[#0B2A5B]">uniformes</span>
          </h1>

          {/* Value prop */}
          <p className="mt-5 text-base md:text-lg leading-relaxed text-[#0B1220]/70 max-w-xl">
            Uniformes para primaria y secundaria. Conjuntos completos, talles
            para todas las edades y materiales resistentes para el uso diario.
          </p>

          {/* Highlights */}
          <div className="mt-6 grid grid-cols-2 gap-3 text-sm text-[#0B1220]/70">
            <div className="rounded-xl border border-[#0B1220]/10 bg-white/60 px-4 py-3">
              ✅ Talles & medidas claras
            </div>
            <div className="rounded-xl border border-[#0B1220]/10 bg-white/60 px-4 py-3">
              ✅ Compra rápida y segura
            </div>
            <div className="rounded-xl border border-[#0B1220]/10 bg-white/60 px-4 py-3">
              ✅ Retiro / envío coordinado
            </div>
            <div className="rounded-xl border border-[#0B1220]/10 bg-white/60 px-4 py-3">
              ✅ Stock actualizado
            </div>
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a href="/tienda" className="group">
              <Button
                className="
                  h-12 px-6 rounded-xl
                  bg-[#0B2A5B] text-white
                  hover:bg-[#0A244D]
                  shadow-[0_10px_24px_rgba(11,42,91,0.25)]
                  transition-all
                "
              >
                <span className="flex items-center gap-2">
                  Ver catálogo
                  <ShoppingCartIcon className="w-5 h-5 transition-transform group-hover:translate-x-0.5" />
                </span>
              </Button>
            </a>

            <a href="/login">
              <Button
                variant="outline"
                className="
                  h-12 px-6 rounded-xl
                  border-[#0B1220]/15 bg-white/70
                  hover:bg-white
                  text-[#0B1220]
                "
              >
                Iniciar sesión
              </Button>
            </a>
          </div>

          {/* Small helper */}
          <p className="mt-4 text-xs text-[#0B1220]/55">
            Tip: si no sabés tu talle, mirá la guía de medidas dentro del
            catálogo.
          </p>

          {/* Scroll indicator */}
          <div className="hidden md:flex mt-10 items-center gap-2 text-[#0B1220]/50">
            <span className="text-xs tracking-widest uppercase">Descubre más</span>
            <ChevronDown size={18} className="animate-bounce" />
          </div>
        </div>

        {/* Right: Image card */}
        <div className="relative rounded-3xl border border-[#0B1220]/10 bg-white/70 backdrop-blur overflow-hidden shadow-[0_18px_60px_rgba(11,18,32,0.12)]">
          <div className="p-4 md:p-6">
            <div className="text-sm text-[#0B1220]/70 mb-3">Colección escolar 2026</div>

            <div className="relative w-full aspect-[4/3] rounded-2xl overflow-hidden border border-[#0B1220]/10 bg-[#F3F6FA]">
              <Image
                src="/hero.png"
                alt="Mariel Uniformes - Uniformes escolares"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 560px"
                priority
              />
            </div>

            {/* NUEVO: franja de logos compacta */}
            <div className="mt-5 rounded-2xl border border-[#0B1220]/10 bg-white/60 p-4">
              <div className="mb-3 text-sm text-[#0B1220]/70">
                Trabajamos con escuelas y colegios
              </div>

              <SchoolLogosCarousel />
            </div>

            <div className="mt-4 flex items-center justify-between">
              <div className="text-sm text-[#0B1220]/70">
                Primaria • Secundaria • Guardapolvos
              </div>
              <div className="text-xs px-3 py-1 rounded-full bg-[#0B2A5B]/10 text-[#0B2A5B] border border-[#0B2A5B]/15">
                Stock
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#EFF2F6] to-transparent" />
    </section>
  );
}