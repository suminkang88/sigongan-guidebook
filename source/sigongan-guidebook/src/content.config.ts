import { defineCollection } from "astro:content";
import { glob } from "astro/loaders";
import { z } from "astro/zod";
const guide = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/guide" }),
  schema: z.object({
    key: z.string(),
    title: z.string(),
    description: z.string(),
    order: z.number(),
    category: z.enum(["basics", "content", "operations"]),
    route: z.string(),
    reviewedAt: z.string(),
    sources: z.array(z.object({ title: z.string(), url: z.string() })),
    sections: z.array(
      z.object({ id: z.string(), title: z.string(), depth: z.number() }),
    ),
  }),
});
export const collections = { guide };
