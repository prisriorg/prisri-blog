import type { Link } from "../types";

export const SITE = {
  title: "PriSri Blog",
  description: "Welcome to PriSri Blog, where you can read about the latest news and articles on technology, programming, lifestyle, productivity, health, and finance.",
  author: "Priyansh Srivastava",
  organization:"PriSri",
  authorUrl: "https://prisri.org",
  url: "https://prisri.org",
  github: "https://github.com/Mrahmani71/astro-news",
  locale: "en-US",
  dir: "ltr",
  charset: "UTF-8",
  basePath: "/",
  postsPerPage: 10,
};

export const NAVIGATION_LINKS: Link[] = [
  {
    href: "/categories/technology",
    text: "Technology",
  },
  {
    href: "/categories/programming",
    text: "Programming",
  },
  
];

export const OTHER_LINKS: Link[] = [
  {
    href: "/about",
    text: "About us",
  },
  {
    href: "/authors",
    text: "Authors",
  },
  {
    href: "/contact",
    text: "Contact",
  },
  {
    href: "/dmca",
    text: "DMCA",
  },
  {
    href: "/privacy",
    text: "Privacy",
  },
  {
    href: "/terms",
    text: "Terms",
  },
  {
    href: "/disclaimer",
    text: "Disclaimer",
  },
  {
    href: "/rss.xml",
    text: "RSS",
  },
  {
    href: "/sitemap-index.xml",
    text: "Sitemap",
  },
];

export const SOCIAL_LINKS: Link[] = [
  {
    href: "https://github.com/prisriorg",
    text: "GitHub",
    icon: "github",
  },
  {
    href: "https://t.me/prisri_org",
    text: "Telegram",
    icon: "telegram",
  },
  {
    href: "https://x.com/Priyans09664673",
    text: "Twitter",
    icon: "newTwitter",
  },
  {
    href: "https://www.facebook.com",
    text: "Facebook",
    icon: "facebook",
  },
];
