import type { APIRoute } from "astro";

export const GET: APIRoute = ({ params, redirect }) => {
  const { id } = params;

  const link = "https://example.com/" + id;

  return redirect(link, 307);
};
