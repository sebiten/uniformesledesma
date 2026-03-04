import type React from "react";
import type { Metadata, Viewport } from "next";
import "./globals.css";
import { Playfair_Display } from "next/font/google";

import Footer from "@/components/Footer";
import Navbar from "@/components/NavBar";
import { ThemeProvider } from "@/components/theme-provider";
import { createClient } from "@/utils/supabase/server";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

// ---------- CONFIGURACIÓN SEO GLOBAL (MARIEL UNIFORMES) ----------

const SITE_NAME = "Mariel Uniformes";
const SITE_DESCRIPTION =
  "Mariel Uniformes: uniformes escolares en Ledesma, Jujuy. Camisas, chombas, pantalones y accesorios. Talles reales y atención personalizada.";
const SITE_URL = "https://marieluniformes.com"; // ✅ cambiá por tu dominio real
const OG_IMAGE = `logomariel.png`; // ✅ ideal 1200x630
const LOGO_IMAGE = `logomariel.png`; // ✅ ideal cuadrado, transparente si podés

export const metadata: Metadata = {

  manifest: "/manifest.webmanifest",
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} | Uniformes escolares en Ledesma`,
    template: `%s | ${SITE_NAME}`,
  },
  applicationName: "Mariel Uniformes",
  appleWebApp: {
    capable: true,
    title: "Mariel Uniformes",
    statusBarStyle: "default",
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "mariel uniformes",
    "uniformes escolares",
    "uniformes ledesma",
    "uniformes jujuy",
    "guardapolvos",
    "camisas escolares",
    "chombas escolares",
    "uniformes colegio",
    "talles reales",
    "envíos",
    "ledasma jujuy", // (si querés corregirlo a "ledesma", mejor)
    "ledesma jujuy",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    title: `${SITE_NAME} | Uniformes escolares en Ledesma, Jujuy`,
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
    locale: "es_AR",
    type: "website",
    images: [
      {
        url: "/logomariel.png",
        width: 1200,
        height: 630,
        alt: `${SITE_NAME} - Uniformes escolares`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} | Uniformes escolares en Ledesma, Jujuy`,
    description: SITE_DESCRIPTION,
    images: [OG_IMAGE],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/big2.png", type: "image/png", sizes: "192x192" },
      { url: "/big3.png", type: "image/png", sizes: "512x512" },

    ],
    apple: [{ url: "/apple-icon.png", sizes: "180x180" }],

  },
  category: "shopping",
};

// Mejor UX/SEO mobile
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#ffffff",
};

// Schema.org — Organization + Store (enfocado a uniformes)
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": ["Organization", "Store"],
  name: SITE_NAME,
  url: SITE_URL,
  logo: LOGO_IMAGE,
  image: OG_IMAGE,
  sameAs: [
    // ✅ poné tus redes reales si las tenés
    // "https://www.instagram.com/marieluniformes",
  ],
  address: {
    "@type": "PostalAddress",
    addressCountry: "AR",
    addressRegion: "Jujuy",
    addressLocality: "Libertador General San Martín", // Ledesma (ciudad)
  },
  contactPoint: [
    {
      "@type": "ContactPoint",
      // ✅ si no querés poner teléfono, borrá telephone
      telephone: "+54-XXX-XXXXXXX",
      contactType: "customer service",
      availableLanguage: ["es"],
      areaServed: "AR",
    },
  ],
};

// ---------- ROOT LAYOUT ----------

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let isAdmin = false;

  if (user?.id) {
    const { data: profileData } = await supabase
      .from("profiles")
      .select("isadmin")
      .eq("id", user.id)
      .single();

    isAdmin = profileData?.isadmin ?? false;
  }

  return (
    <html lang="es-AR" suppressHydrationWarning>
      <body className={`${playfair.variable} font-sans antialiased`}>
        {/* JSON-LD para SEO */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />

        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <Navbar user={user} isAdmin={isAdmin} />

          <main className="flex-1 flex flex-col w-full min-h-screen bg-neutral-50">
            {children}
          </main>

          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}