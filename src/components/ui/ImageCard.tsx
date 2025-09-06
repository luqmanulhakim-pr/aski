"use client";

import Image from "next/image";
import { useState } from "react";

interface ImageCardProps {
  src: string;
  alt: string;
  title: string;
  excerpt?: string;
  tags?: string[];
  slug: string;
}

export default function ImageCard({
  src,
  alt,
  title,
  excerpt,
  tags,
  slug,
}: ImageCardProps) {
  return (
    <div className="w-full h-full flex flex-col">
      <div className="relative w-full h-40 overflow-hidden">
        {/* gunakan <img> biasa jika belum pakai next/image terkonfigurasi */}
        <img
          src={src || "/placeholder.png"}
          alt={alt}
          className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
        />
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h4 className="font-semibold text-gray-900 mb-2 line-clamp-1">
          {title}
        </h4>
        {excerpt && (
          <p className="text-sm text-gray-600 mb-3 line-clamp-2">{excerpt}</p>
        )}
        {tags && tags.length > 0 && (
          <div className="mt-auto flex flex-wrap gap-1">
            {tags.slice(0, 3).map((t) => (
              <span
                key={t}
                className="text-[10px] px-2 py-0.5 bg-blue-100 text-blue-600 rounded-full"
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
