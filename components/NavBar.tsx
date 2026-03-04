"use client";

import type React from "react";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { signOutAction } from "@/app/actions";
import { Button } from "./ui/button";
import { Menu, X, User, LogOut, ChevronDown } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { CartIcon } from "./CartIcon";

interface NavbarProps {
  user: any | null;
  isAdmin?: boolean;
}

export default function Navbar({ user, isAdmin }: NavbarProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={[
        "sticky top-0 z-50 w-full transition-all duration-300",
        isScrolled
          ? "bg-white/80 backdrop-blur-md border-b border-[#0B1220]/10 shadow-[0_10px_30px_rgba(11,18,32,0.08)]"
          : "bg-white border-b border-transparent",
      ].join(" ")}
    >
      {/* Top strip (sobrio) */}
      <div className="bg-[#0B2A5B] text-white py-2 text-xs md:text-sm px-4 md:px-6">
        <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center gap-1">
          <p className="opacity-95">
            Uniformes escolares • Temporada 2026
          </p>
          <div className="flex items-center">
            <span className="font-medium">Tel:</span>
            <a
              href="tel:+543872226885"
              className="ml-1 underline-offset-4 hover:underline opacity-95"
            >
              +54 387 222-6885
            </a>
          </div>
        </div>
      </div>

      {/* Main Nav */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 rounded-md text-[#0B1220] hover:bg-[#0B1220]/5 transition"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Abrir menú"
          >
            {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Logo */}
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 md:w-14 md:h-14 relative rounded-xl overflow-hidden border border-[#0B1220]/10 bg-[#F3F6FA]">
              <Image
                src="/mariellogo.png"
                alt="marieluniformes"
                fill
                className="object-cover"
                priority
              />
            </div>

            <div className="leading-tight hidden sm:block">
              <div className="text-[15px] md:text-base font-semibold tracking-tight text-[#0B1220]">
                mariel<span className="text-[#0B2A5B]">uniformes</span>
              </div>
              <div className="text-[11px] md:text-xs text-[#0B1220]/55">
                Uniformes escolares
              </div>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            <NavLink href="/">Inicio</NavLink>
            <NavLink href="/tienda">Catálogo</NavLink>
            <NavLink href="/guia-de-talles">Guía de talles</NavLink>
            {isAdmin && <NavLink href="/admin">Admin</NavLink>}
          </nav>

          {/* Right Side */}
          <div className="flex items-center gap-2 md:gap-3">
            <CartIcon />

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger
                  className="
                    inline-flex items-center gap-2 h-10 px-3 rounded-xl
                    bg-white/70 hover:bg-white
                    border border-[#0B1220]/10
                    text-[#0B1220] font-medium
                    shadow-sm transition
                  "
                >
                  <span className="hidden sm:inline-block max-w-[140px] truncate">
                    {user.email?.split("@")[0]}
                  </span>
                  <ChevronDown size={16} className="text-[#0B1220]/70" />
                </DropdownMenuTrigger>

                <DropdownMenuContent
                  align="end"
                  className="w-60 bg-white border border-[#0B1220]/10 shadow-[0_18px_50px_rgba(11,18,32,0.12)]"
                >
                  <div className="px-3 py-2 text-sm font-medium text-[#0B1220] border-b border-[#0B1220]/10">
                    <p className="truncate">{user.email}</p>
                  </div>

                  <DropdownMenuItem asChild>
                    <Link
                      href="/perfil"
                      className="flex items-center text-[#0B1220]/80 hover:text-[#0B1220]"
                    >
                      <User className="mr-2 h-4 w-4" />
                      Mi perfil
                    </Link>
                  </DropdownMenuItem>

                  <DropdownMenuSeparator className="bg-[#0B1220]/10" />

                  <DropdownMenuItem asChild>
                    <form action={signOutAction} className="w-full">
                      <button className="flex items-center w-full text-[#0B1220]/80 hover:text-[#0B1220]">
                        <LogOut className="mr-2 h-4 w-4" />
                        Cerrar sesión
                      </button>
                    </form>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <div className="hidden sm:flex items-center gap-2">
                <Button
                  asChild
                  size="sm"
                  variant="ghost"
                  className="text-[#0B1220]/80 hover:text-[#0B1220] hover:bg-[#0B1220]/5"
                >
                  <Link href="/login">Iniciar sesión</Link>
                </Button>

                <Button
                  asChild
                  className="
                    h-10 rounded-xl px-4
                    bg-[#0B2A5B] hover:bg-[#0A244D]
                    text-white
                    shadow-[0_10px_24px_rgba(11,42,91,0.25)]
                  "
                >
                  <Link href="/sign-up">Crear cuenta</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t border-[#0B1220]/10 shadow-[0_18px_50px_rgba(11,18,32,0.10)] animate-in fade-in slide-in-from-top-2">
          <div className="container mx-auto px-4 py-4">
            <nav className="flex flex-col gap-2">
              <MobileNav href="/" onClick={() => setIsMenuOpen(false)}>
                Inicio
              </MobileNav>
              <MobileNav href="/tienda" onClick={() => setIsMenuOpen(false)}>
                Catálogo
              </MobileNav>
              <MobileNav
                href="/guia-de-talles"
                onClick={() => setIsMenuOpen(false)}
              >
                Guía de talles
              </MobileNav>

              {isAdmin && (
                <MobileNav href="/admin" onClick={() => setIsMenuOpen(false)}>
                  Admin
                </MobileNav>
              )}

              {!user && (
                <>
                  <div className="h-px bg-[#0B1220]/10 my-2" />
                  <MobileNav href="/login" onClick={() => setIsMenuOpen(false)}>
                    Iniciar sesión
                  </MobileNav>
                  <MobileNav href="/sign-up" onClick={() => setIsMenuOpen(false)}>
                    Crear cuenta
                  </MobileNav>
                </>
              )}

              {user && (
                <>
                  <div className="h-px bg-[#0B1220]/10 my-2" />
                  <div className="px-3 py-2 text-sm text-[#0B1220] font-medium truncate">
                    {user.email}
                  </div>

                  <MobileNav href="/perfil" onClick={() => setIsMenuOpen(false)}>
                    <User className="mr-2 h-4 w-4" />
                    Mi perfil
                  </MobileNav>

                  <form action={signOutAction} className="w-full mt-1">
                    <button className="w-full flex items-center px-3 py-2 text-[#0B1220]/80 hover:bg-[#0B1220]/5 rounded-xl">
                      <LogOut className="mr-2 h-4 w-4" /> Cerrar sesión
                    </button>
                  </form>
                </>
              )}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}

/* --- Subcomponents --- */

function NavLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="
        px-3 py-2 rounded-xl text-sm font-medium
        text-[#0B1220]/75 hover:text-[#0B1220]
        hover:bg-[#0B1220]/5 transition
      "
    >
      {children}
    </Link>
  );
}

function MobileNav({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className="
        flex items-center px-3 py-2 rounded-xl text-sm
        text-[#0B1220]/80 hover:text-[#0B1220]
        hover:bg-[#0B1220]/5 transition
      "
    >
      {children}
    </Link>
  );
}