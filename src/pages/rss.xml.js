import rss from "@astrojs/rss";
import { posts } from "../queries/posts";
import { SITE_TITLE, SITE_DESCRIPTION } from "../consts";

export async function GET(context) {
  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: context.site,
    items: posts.map((post) => ({
      ...post.data,
      link: `/blog/${post.slug}/`,
    })),
  });
}
