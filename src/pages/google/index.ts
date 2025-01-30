import type { APIRoute } from "astro";

export const prerender = false;
export const GET: APIRoute = (context) => {
  const { redirect } = context;
  const links = [
    "https://www.google.com/url?sa=t&source=web&rct=j&opi=89978449&url=https://prisri.org/&ved=2ahUKEwitpZ3u-Z2LAxWASWwGHSd4HVYQFnoECAYQAQ&sqi=2&usg=AOvVaw2kPSvG2eHQdpQAB7v7geyk",
  ];
  const link = links[Math.floor(Math.random() * links.length)];
  return redirect(link, 307);
};
