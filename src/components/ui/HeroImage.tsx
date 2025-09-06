"use client";

import Image from "next/image";
import { useState } from "react";

interface HeroImageProps {
  src?: string;
  alt: string;
  title: string;
  excerpt?: string;
}

export default function HeroImage({
  src,
  alt,
  title,
  excerpt,
}: HeroImageProps) {
  const [imageError, setImageError] = useState(false);

  return (
    <div className="relative h-80 md:h-96 bg-gradient-to-r from-blue-600 to-indigo-600">
      {src && !imageError ? (
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover"
          priority
          sizes="100vw"
          onError={() => setImageError(true)}
        />
      ) : (
        <div className="w-full h-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center">
          <svg
            className="w-20 h-20 text-white/30"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1}
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </div>
      )}

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>

      {/* Title Section */}
      <div className="absolute bottom-8 left-8 right-8 text-white">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
          {title}
        </h1>
        {excerpt && (
          <p className="text-xl md:text-2xl opacity-90 max-w-3xl leading-relaxed drop-shadow">
            {excerpt}
          </p>
        )}
      </div>
    </div>
  );
}
