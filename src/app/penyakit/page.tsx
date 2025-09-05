import { fetchPenyakitList, type PenyakitListItem } from "@/lib/utils";
import Link from "next/link";
import MainLayout from "@/components/layout/MainLayout";

export const revalidate = 0;

export default async function PenyakitPage() {
  let penyakitList: PenyakitListItem[] = [];
  let error = "";

  try {
    console.log("Attempting to fetch penyakit list...");
    penyakitList = await fetchPenyakitList();
    console.log("Successfully fetched:", penyakitList.length, "items");
  } catch (e: any) {
    error = `Gagal memuat data penyakit: ${e.message}`;
    console.error("Fetch error in page:", e);
  }

  return (
    <MainLayout>
      <div className="min-h-screen py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Daftar{" "}
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Penyakit
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Jelajahi koleksi lengkap informasi penyakit, gejala, dan
              pengobatan yang telah dikurasi oleh profesional medis.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <input
                type="text"
                placeholder="Cari penyakit..."
                className="w-full px-6 py-4 text-lg border-2 border-gray-200 rounded-2xl focus:border-blue-500 focus:outline-none transition-colors"
              />
              <div className="absolute right-4 top-1/2 transform -translate-y-1/2">
                <svg
                  className="w-6 h-6 text-gray-400"
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
            </div>
          </div>

          {error ? (
            <div className="max-w-4xl mx-auto">
              <div className="bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-500 rounded-2xl p-8">
                <div className="flex items-center mb-4">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-6 w-6 text-red-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <h2 className="ml-3 text-xl font-semibold text-red-800">
                    Oops! Terjadi Kesalahan
                  </h2>
                </div>
                <p className="text-red-700 mb-6">{error}</p>
                <div className="bg-white rounded-lg p-4">
                  <p className="text-sm text-red-600 font-medium mb-2">
                    Pastikan:
                  </p>
                  <ul className="text-sm text-red-600 space-y-1">
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-red-400 rounded-full mr-2"></span>
                      Backend FastAPI berjalan di http://localhost:8000
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-red-400 rounded-full mr-2"></span>
                      Environment variable NEXT_PUBLIC_API_BASE sudah diset
                    </li>
                    <li className="flex items-center">
                      <span className="w-2 h-2 bg-red-400 rounded-full mr-2"></span>
                      Endpoint /api/posts tersedia di backend
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          ) : penyakitList.length === 0 ? (
            <div className="text-center">
              <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-12 max-w-2xl mx-auto">
                <div className="text-6xl mb-4">🏥</div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">
                  Belum Ada Data
                </h2>
                <p className="text-gray-600">
                  Data penyakit sedang dalam proses pengumpulan. Silakan coba
                  lagi nanti.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {penyakitList.map((item) => {
                const tags = item.metadata?.tags || [];
                return (
                  <Link
                    key={item.slug}
                    href={`/penyakit/${item.slug}`}
                    className="group bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300 border border-gray-100 hover:border-blue-200"
                  >
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-indigo-100 rounded-xl flex items-center justify-center group-hover:from-blue-200 group-hover:to-indigo-200 transition-colors">
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
                      <svg
                        className="w-5 h-5 text-gray-400 group-hover:text-blue-600 transition-colors"
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

                    <h2 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-blue-600 transition-colors">
                      {item.title}
                    </h2>
                    <p className="text-gray-600 text-sm mb-6 line-clamp-3 leading-relaxed">
                      {item.excerpt}
                    </p>

                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {tags.slice(0, 3).map((tag: string) => (
                          <span
                            key={tag}
                            className="px-3 py-1 bg-blue-50 text-blue-700 text-xs rounded-full font-medium"
                          >
                            {tag}
                          </span>
                        ))}
                        {tags.length > 3 && (
                          <span className="px-3 py-1 bg-gray-50 text-gray-500 text-xs rounded-full font-medium">
                            +{tags.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
