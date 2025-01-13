import { execSync } from "child_process";
import { statSync } from "fs";
import getReadingTime from 'reading-time';
import { toString } from 'mdast-util-to-string';
export function modifiedTime() {
  return function (_, file) {
    const filepath = file.history[0];
    const result = execSync(`git log -1 --pretty="format:%cI" "${filepath}"`);
    if (result.toString().length > 0 || result.toString() === "") {
      const result = statSync(filepath);
      file.data.astro.frontmatter.lastModified = result.mtime.toISOString();
    } else {
      file.data.astro.frontmatter.lastModified = result.toString();
    }
  };
}
export function readingTime() {
  return function (tree, { data }) {
    const textOnPage = toString(tree);
    const readingTime = getReadingTime(textOnPage, { wordsPerMinute: 180 });
    // readingTime.text will give us minutes read as a friendly string,
    // i.e. "3 min read"
    data.astro.frontmatter.minutesRead = readingTime.text;
  };
}