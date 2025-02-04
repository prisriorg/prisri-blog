import type { APIRoute } from "astro";

export const prerender = false;
export const GET: APIRoute = (context) => {
  const { redirect } = context;
  const links = [
    "https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://prisri.org/&ved=2ahUKEwitpZ3u-Z2LAxWASWwGHSd4HVYQFnoECAYQAQ&sqi=2&usg=AOvVaw2kPSvG2eHQdpQAB7v7geyk",
    "https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://prisri.org/blog/china-demand-for-russian-specialists-has-increased-sixfold/&ved=2ahUKEwjvwb2thp6LAxVGxzgGHXTgI1A4HhAWegQIGhAB&usg=AOvVaw3Uueu6ZxXbFbNDqdd6owco",
    "https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://prisri.org/blog/how-to-protect-money-from-devaluation-and-default/&ved=2ahUKEwjj_8PChp6LAxX9zDgGHYWgDJY4KBAWegQIHRAB&usg=AOvVaw0Z0UVme7ddPDX7yHDQK6fn",
    "https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://prisri.org/blog/deepseek-how-to-use-a-chinese-neural-network-in-russian/&ved=2ahUKEwi87Yvq7qqLAxUEk1YBHej2A8o4ChAWegQICBAB&sqi=2&usg=AOvVaw106d6HNnRtjFqgyYZWRfJf",
  ];
  const link = links[Math.floor(Math.random() * links.length)];
  return redirect(link, 307);
};
