"use client";

import { useState } from "react";
import Link from "next/link";
import ImageCard from "@/components/ui/ImageCard";
import { type PenyakitItem } from "@/lib/utils";

interface PenyakitSearchProps {
  penyakitList: PenyakitItem[];
}

export default function PenyakitSearch({ penyakitList }: PenyakitSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredPenyakit = penyakitList.filter(
    (item: PenyakitItem) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (item.excerpt &&
        item.excerpt.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <>
      {/* Search Bar */}
      <div className="max-w-2xl mx-auto mb-12">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="block w-full pl-10 pr-3 py-4 border border-gray-300 rounded-2xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent text-lg shadow-lg"
            placeholder="Cari penyakit... (contoh: demam, hipertensi, diabetes)"
          />
        </div>

        {/* Search Results Info */}
        {searchTerm && (
          <div className="mt-4 text-center">
            <p className="text-gray-600">
              Menampilkan{" "}
              <span className="font-semibold text-blue-600">
                {filteredPenyakit.length}
              </span>{" "}
              hasil untuk{" "}
              <span className="text-gray-800">&ldquo;{searchTerm}&rdquo;</span>
            </p>
          </div>
        )}
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">
                {penyakitList.length}
              </h3>
              <p className="text-gray-600">Total Penyakit</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">
                Terpercaya
              </h3>
              <p className="text-gray-600">Informasi Medis</p>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg">
              <svg
                className="w-6 h-6 text-purple-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                />
              </svg>
            </div>
            <div className="ml-4">
              <h3 className="text-lg font-semibold text-gray-900">24/7</h3>
              <p className="text-gray-600">Akses Informasi</p>
            </div>
          </div>
        </div>
      </div>

      {/* Penyakit Grid */}
      {filteredPenyakit.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPenyakit.map((item) => (
            <Link
              key={item.slug}
              href={`/penyakit/${item.slug}`}
              className="group bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:border-blue-200 hover:-translate-y-1"
            >
              <ImageCard
                src={item.image_url || ""}
                alt={item.title}
                title={item.title}
                excerpt={item.excerpt}
                slug={item.slug}
              />

              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                  {item.title}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
                  {item.excerpt || "Tidak ada deskripsi tersedia."}
                </p>

                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>Baca selengkapnya</span>
                  <svg
                    className="w-4 h-4 group-hover:text-blue-600 transform group-hover:translate-x-1 transition-all"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="max-w-md mx-auto">
            <svg
              className="w-16 h-16 text-gray-400 mx-auto mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              Tidak ditemukan
            </h3>
            <p className="text-gray-600">
              Tidak ada penyakit yang cocok dengan pencarian{" "}
              <span className="font-semibold">&ldquo;{searchTerm}&rdquo;</span>.
              Coba gunakan kata kunci yang berbeda.
            </p>
          </div>
        </div>
      )}

      {/* Call to Action */}
      <div className="mt-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-3xl p-8 md:p-12 text-white text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Butuh Konsultasi Medis?
        </h2>
        <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
          Informasi di website ini bersifat edukatif. Untuk diagnosis dan
          pengobatan yang tepat, konsultasikan dengan dokter atau tenaga
          kesehatan profesional.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-colors">
            🤖 Tanya AI Assistant
          </button>
          <button className="border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-blue-600 transition-colors">
            📞 Hubungi Dokter
          </button>
        </div>
      </div>
    </>
  );
}
