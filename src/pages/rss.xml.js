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
      content: sanitizeHtml(parser.render(article.body), {
        allowedTags: sanitizeHtml.defaults.allowedTags.concat(['img'])
      }),
      ...article.data,
      link: `/blog/${article.id}/`,
    })),
  });
}