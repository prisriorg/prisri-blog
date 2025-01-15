import type { APIRoute } from "astro";
export const prerender = false;

export const GET: APIRoute = (context) => {
  const { params, redirect} = context;
  const { id } = params;
  const link = "https://game.prisri.org/link/" + id;
  return redirect(link, 307);
};