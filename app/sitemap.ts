import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://mirai-pi.vercel.app/",
      lastModified: new Date(),
    },
    {
      url: "https://mirai-pi.vercel.app/about",
      lastModified: new Date(),
    },
    {
      url: "https://mirai-pi.vercel.app/privacy-policy",
      lastModified: new Date(),
    },
    {
      url: "https://mirai-pi.vercel.app/terms",
      lastModified: new Date(),
    },
  ];
}