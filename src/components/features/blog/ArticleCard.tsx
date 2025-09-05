import Link from "next/link";
import type { Post } from "@/types";

export default function ArticleCard({ post }: { post: Post }) {
  return (
    <article className="group border rounded-lg bg-white p-4 flex flex-col gap-3 shadow-sm hover:shadow-md transition">
      <div className="space-y-1">
        <h2 className="text-lg font-semibold leading-tight">
          <Link href={`/penyakit/${post.slug}`} className="group-hover:text-blue-600">
            {post.title}
          </Link>
        </h2>
        <p className="text-xs text-neutral-500">{post.readingTimeMinutes} mnt baca</p>
      </div>
      <p className="text-sm text-neutral-600 line-clamp-3">
        {post.description || post.excerpt}
      </p>
      <div className="flex flex-wrap gap-2 mt-auto">
        {post.tags?.slice(0, 4).map(tag => (
          <span
            key={tag}
            className="text-[10px] uppercase tracking-wide bg-neutral-100 px-2 py-1 rounded"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  );
}