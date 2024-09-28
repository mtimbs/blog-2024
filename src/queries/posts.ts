import { getCollection, type CollectionEntry } from "astro:content";

export const posts: CollectionEntry<"blog">[] = (
  await getCollection("blog", ({ data }) => data.status === "published")
).sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf());
