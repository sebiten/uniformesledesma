// app/manifest.ts
import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Mariel Uniformes",
    short_name: "Mariel",
    description:
      "Uniformes escolares en Ledesma, Jujuy. Camisas, chombas, pantalones y accesorios.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#1E3A8A",
    lang: "es-AR",
    icons: [
      {
        src: "/big2.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/big3.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}