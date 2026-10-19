import { MetadataRoute } from "next";
import { SITE_CONFIG } from "@data/siteConfig";
import { db } from "@lib/firebase";
import { collection, getDocs } from "firebase/firestore";
export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = SITE_CONFIG.url;

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/program-les`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/tentang-kami`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/artikel`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/galeri`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
  ];

  try {
    const snapshot = await getDocs(collection(db, "artikel"));
    const articleRoutes: MetadataRoute.Sitemap = snapshot.docs.map((docSnap) => {
      const data = docSnap.data();
      const lastModified = data?.createdAt?.seconds
        ? new Date(data.createdAt.seconds * 1000)
        : new Date();

      return {
        url: `${baseUrl}/artikel/${docSnap.id}`,
        lastModified,
        changeFrequency: "weekly" as const,
        priority: 0.6,
      };
    });

    return [...staticRoutes, ...articleRoutes];
  } catch (err) {
    console.error("Error generating dynamic article sitemap:", err);
    return staticRoutes;
  }
}
