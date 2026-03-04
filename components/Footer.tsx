import Link from "next/link";
import Image from "next/image";
import { Instagram, Facebook, Twitter, MapPin, Phone, InstagramIcon } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-white border-t border-[#0B1220]/10">
      {/* Top subtle divider */}
      <div className="h-px w-full bg-gradient-to-r from-transparent via-[#0B1220]/10 to-transparent" />

      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 relative rounded-xl overflow-hidden border border-[#0B1220]/10 bg-[#F3F6FA]">
                <Image
                  src="/marieluniformes.webp"
                  alt="marieluniformes"
                  fill
                  className="object-cover"
                />
              </div>

              <div className="leading-tight">
                <h3 className="text-lg font-semibold tracking-tight text-[#0B1220]">
                  mariel<span className="text-[#0B2A5B]">uniformes</span>
                </h3>
                <p className="text-xs text-[#0B1220]/55">Uniformes escolares</p>
              </div>
            </div>

            <p className="text-[#0B1220]/65 text-sm leading-relaxed max-w-sm">
              Uniformes para primaria y secundaria. Materiales resistentes, talles
              claros y stock actualizado para comprar rápido y sin vueltas.
            </p>

            <div className="flex items-center gap-2 pt-2">
              <SocialIcon href="https://instagram.com" label="Instagram">
                <Instagram size={18} />
              </SocialIcon>
              <SocialIcon href="https://facebook.com" label="Facebook">
                <Facebook size={18} />
              </SocialIcon>
              <SocialIcon href="https://twitter.com" label="Twitter">
                <Twitter size={18} />
              </SocialIcon>
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-sm font-semibold text-[#0B1220] mb-4">
              Enlaces
            </h4>
            <nav className="grid gap-2">
              <FooterLink href="/">Inicio</FooterLink>
              <FooterLink href="/tienda">Catálogo</FooterLink>
              <FooterLink href="/guia-de-talles">Guía de talles</FooterLink>
              {/* <FooterLink href="/contacto">Contacto</FooterLink> */}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-[#0B1220] mb-4">
              Contacto
            </h4>

            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-[#0B2A5B] mt-0.5" />
                <span className="text-[#0B1220]/65 text-sm">
                  Salta, Salta — Argentina
                </span>
              </div>

              <div className="flex items-start gap-2">
                <Phone className="w-5 h-5 text-[#0B2A5B] mt-0.5" />
                <a
                  href="tel:+543872226885"
                  className="text-[#0B1220]/65 text-sm hover:text-[#0B1220] transition"
                >
                  +54 387 222-6885
                </a>
              </div>

              <div className="flex items-start gap-2">
                <InstagramIcon className="w-5 h-5 text-[#0B2A5B] mt-0.5" />
                <span className="text-[#0B1220]/65 text-sm">@marieluniformes</span>
              </div>
            </div>
          </div>

          {/* Mini info / confianza */}
          <div>
            <h4 className="text-sm font-semibold text-[#0B1220] mb-4">
              Compra segura
            </h4>

            <div className="space-y-3 text-sm text-[#0B1220]/65">
              <div className="rounded-xl border border-[#0B1220]/10 bg-white px-4 py-3">
                ✅ Stock actualizado
              </div>
              <div className="rounded-xl border border-[#0B1220]/10 bg-white px-4 py-3">
                ✅ Guía de talles clara
              </div>
              <div className="rounded-xl border border-[#0B1220]/10 bg-white px-4 py-3">
                ✅ Coordinamos retiro o envío
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-12 pt-6 border-t border-[#0B1220]/10 flex flex-col md:flex-row justify-between items-center gap-3">
          <p className="text-[#0B1220]/55 text-sm">
            © {new Date().getFullYear()} marieluniformes. Todos los derechos reservados.
          </p>

          <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm">
            <FooterLink href="/privacy">Privacidad</FooterLink>
            <FooterLink href="/terms">Términos</FooterLink>
            <FooterLink href="/cookies">Cookies</FooterLink>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* --- helpers --- */

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      className="text-[#0B1220]/65 hover:text-[#0B1220] transition-colors"
    >
      {children}
    </Link>
  );
}

function SocialIcon({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="
        w-9 h-9 flex items-center justify-center rounded-xl
        border border-[#0B1220]/10 bg-white
        text-[#0B1220]/75 hover:text-[#0B1220]
        hover:bg-[#0B1220]/5 transition
      "
    >
      {children}
      <span className="sr-only">{label}</span>
    </Link>
  );
}