import { SITE } from "../config";
import { getCollection } from "astro:content";

export async function GET(context) {
  const articles = await getCollection("articles");
  return new Response(
    JSON.stringify({
      version: "https://jsonfeed.org/version/1",
      home_page_url: context.site,
      title: SITE.title,
      description: SITE.description,
      site: context.site,
      items: articles.map((article) => ({
        guid: context.site + `/blog/${article.id}/`,
        url: context.site + `/blog/${article.id}/`,
        title: article.data.title,
        content_html: article.data.body,
        summary: article.data.description,
        date_published: article.data.publishedTime,
      })),
    })
  );
}
