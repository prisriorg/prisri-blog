import rss from "@astrojs/rss";
import { SITE } from "../config";

export function GET(context) {
  const blog = [
    {
      id: "hello-world",
      data: {
        title: "Hello, World!",
        pubDate: "2022-01-01",
        description: "Welcome to my new blog!",
        categories: ["stars", "space"],
      },
    },
    {
      id: "hello-astro",
      data: {
        title: "Hello, Astro!",
        pubDate: "2022-01-02",
        description: "Astro is awesome!",
        categories: ["stars", "space"],
      },
    },
  ];

  return rss({
    // `<title>` field in output xml
    title: SITE.title,
    // `<description>` field in output xml
    description: SITE.description,
    // Pull in your project "site" from the endpoint context
    // https://docs.astro.build/en/reference/api-reference/#site
    site: context.site,
    // Array of `<item>`s in output xml
    // See "Generating items" section for examples using content collections and glob imports
    items: blog.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      // Compute RSS link from post `id`
      // This example assumes all posts are rendered as `/blog/[id]` routes
      link: `/blog/${post.id}/`,
      categories: post.data.categories,
    })),
    // (optional) inject custom xml
    customData: `<language>en-us</language>`,
  });
}
