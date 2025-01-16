import { SITE } from "../config";
import { getCollection } from "astro:content";

export async function GET(context) {
  const articles = await getCollection("articles");
  return new Response(JSON.stringify({
    title: SITE.title,
    description: SITE.description,
    site: context.site,
    items: articles.map((article) => ({
      title: article.data.title,
      pubDate: article.data.publishedTime,
      description: article.data.description,
      link: `/blog/${article.id}/`,
    })),
  }));
}