import rss from "@astrojs/rss";
import { SITE } from "../config";
import { getCollection } from "astro:content";
import sanitizeHtml from 'sanitize-html';
import MarkdownIt from 'markdown-it';
const parser = new MarkdownIt();


export async function GET(context) {
  const articles = await getCollection("articles");
  return rss({
    title: SITE.title,
    description: SITE.description,
    site: context.site,
    items: articles.map((article) => ({
      title: article.data.title,
      pubDate: article.data.publishedTime,
      description: article.data.description,
      content: sanitizeHtml(parser.render(post.body), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img'])
      }),
      ...post.data,
      link: `/blog/${article.id}/`,
    })),
  });
}

// export function GET(context) {
//   return rss({
//     items: blog.map((post) => ({
//       title: post.data.title,
//       pubDate: post.data.pubDate,
//       description: post.data.description,
//       // Compute RSS link from post `id`
//       // This example assumes all posts are rendered as `/blog/[id]` routes
//       link: `/blog/${post.id}/`,
//       categories: post.data.categories,
//     })),
//     // (optional) inject custom xml
//     customData: `<language>en-us</language>`,
//   });
// }
