import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";
import type { Post, PostFrontmatter } from "@/types";

const CONTENT_DIR = path.join(process.cwd(), "content", "penyakit");

function ensureDir() {
  if (!fs.existsSync(CONTENT_DIR)) fs.mkdirSync(CONTENT_DIR, { recursive: true });
}

export function getPostSlugs(): string[] {
  ensureDir();
  return fs
    .readdirSync(CONTENT_DIR)
    .filter(f => f.endsWith(".md") || f.endsWith(".mdx"));
}

function readingTime(src: string) {
  const words = src.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / 200));
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  ensureDir();
  const filename = getPostSlugs().find(f => f.replace(/\.(md|mdx)$/, "") === slug);
  if (!filename) return null;
  const full = path.join(CONTENT_DIR, filename);
  const raw = fs.readFileSync(full, "utf-8");
  const { data, content } = matter(raw);
  const fm = data as PostFrontmatter;
  fm.slug = fm.slug || slug;
  const processed = await remark().use(html).process(content);
  const excerpt =
    content.split("\n").find(l => l.trim())?.slice(0, 180) || fm.description || "";
  return {
    ...(fm as PostFrontmatter),
    content: processed.toString(),
    raw: content,
    excerpt,
    readingTimeMinutes: readingTime(content),
  };
}

export async function getAllPosts(): Promise<Post[]> {
  const slugs = getPostSlugs().map(s => s.replace(/\.(md|mdx)$/, ""));
  const posts = await Promise.all(slugs.map(getPostBySlug));
  return posts
    .filter((p): p is Post => !!p)
    .sort(
      (a, b) =>
        (b.updated || "").localeCompare(a.updated || "") ||
        a.title.localeCompare(b.title)
    );
}