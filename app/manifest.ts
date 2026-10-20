import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@data/siteConfig";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Bimbel Kiddos Zone Bogor",
    short_name: "Kiddos Zone",
    description: SITE_CONFIG.description,
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#f59e0b",
    icons: [
      {
        src: "/assets/Logo_Kiddos.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/assets/Logo_Kiddos.webp",
        sizes: "512x512",
        type: "image/webp",
      },
    ],
  };
}
