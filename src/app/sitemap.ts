// src/app/sitemap.ts
import type { MetadataRoute } from "next";
import { publishedProjects } from "@/data/projects";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: site.url, lastModified: new Date() },
    ...publishedProjects.map((p) => ({
      url: `${site.url}/projects/${p.slug}`,
      lastModified: new Date(),
    })),
  ];
}
