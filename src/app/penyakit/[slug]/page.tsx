import { fetchPenyakitDetail, type PenyakitDetail } from "@/lib/utils";
import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import MainLayout from "@/components/layout/MainLayout";
import HeroImage from "@/components/ui/HeroImage";
import ChatButton from "@/components/ui/ChatButton";

interface Props {
  params: Promise<{ slug: string }>;
}

// Add interface for metadata structure
interface PenyakitMetadata {
  gejala?: string[];
  penyebab?: string[];
  obat?: string[];
  pencegahan?: string[];
  [key: string]: unknown;
}

export default async function PenyakitDetailPage({ params }: Props) {
  const { slug } = await params;
  let penyakit: PenyakitDetail;

  try {
    penyakit = await fetchPenyakitDetail(slug);
  } catch (error) {
    console.error("Error fetching penyakit detail:", error);
    return notFound();
  }

  const metadata = (penyakit.metadata as PenyakitMetadata) || {};

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
        <div className="container mx-auto px-4 max-w-6xl">
          {/* Back Button */}
          <Link
            href="/penyakit"
            className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-8 transition-colors group"
          >
            <svg
              className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 19l-7-7 7-7"
              />
            </svg>
            Kembali ke Daftar Penyakit
          </Link>

          {/* Main Article Card */}
          <article className="bg-white rounded-3xl shadow-xl overflow-hidden">
            {/* Hero Section with Image */}
            <HeroImage
              src={penyakit.image_url}
              alt={penyakit.title}
              title={penyakit.title}
              excerpt={penyakit.excerpt}
            />

            {/* Content Section */}
            <div className="p-8 md:p-12">
              {/* Quick Stats - Fixed with safe access */}
              {metadata && Object.keys(metadata).length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 -mt-4">
                  {metadata.gejala && Array.isArray(metadata.gejala) && (
                    <div className="bg-red-50 rounded-xl p-4 text-center border border-red-100">
                      <div className="text-red-600 font-bold text-lg">
                        {metadata.gejala.length}
                      </div>
                      <div className="text-red-500 text-sm">Gejala</div>
                    </div>
                  )}
                  {metadata.penyebab && Array.isArray(metadata.penyebab) && (
                    <div className="bg-orange-50 rounded-xl p-4 text-center border border-orange-100">
                      <div className="text-orange-600 font-bold text-lg">
                        {metadata.penyebab.length}
                      </div>
                      <div className="text-orange-500 text-sm">Penyebab</div>
                    </div>
                  )}
                  {metadata.obat && Array.isArray(metadata.obat) && (
                    <div className="bg-green-50 rounded-xl p-4 text-center border border-green-100">
                      <div className="text-green-600 font-bold text-lg">
                        {metadata.obat.length}
                      </div>
                      <div className="text-green-500 text-sm">Pengobatan</div>
                    </div>
                  )}
                  {metadata.pencegahan &&
                    Array.isArray(metadata.pencegahan) && (
                      <div className="bg-blue-50 rounded-xl p-4 text-center border border-blue-100">
                        <div className="text-blue-600 font-bold text-lg">
                          {metadata.pencegahan.length}
                        </div>
                        <div className="text-blue-500 text-sm">Pencegahan</div>
                      </div>
                    )}
                </div>
              )}

              {/* Main Content */}
              {penyakit.content && (
                <div className="prose prose-lg prose-blue max-w-none mb-12">
                  <ReactMarkdown
                    remarkPlugins={[remarkGfm]}
                    components={{
                      h1: ({ children }) => (
                        <h1 className="text-3xl font-bold text-gray-900 mb-6 mt-8 border-b border-gray-200 pb-3">
                          {children}
                        </h1>
                      ),
                      h2: ({ children }) => (
                        <h2 className="text-2xl font-bold text-gray-800 mb-4 mt-6">
                          {children}
                        </h2>
                      ),
                      h3: ({ children }) => (
                        <h3 className="text-xl font-semibold text-gray-700 mb-3 mt-5">
                          {children}
                        </h3>
                      ),
                      p: ({ children }) => (
                        <p className="text-gray-600 leading-relaxed mb-4">
                          {children}
                        </p>
                      ),
                      ul: ({ children }) => (
                        <ul className="list-disc list-inside space-y-2 mb-4 text-gray-600">
                          {children}
                        </ul>
                      ),
                      ol: ({ children }) => (
                        <ol className="list-decimal list-inside space-y-2 mb-4 text-gray-600">
                          {children}
                        </ol>
                      ),
                      li: ({ children }) => (
                        <li className="ml-2">{children}</li>
                      ),
                      blockquote: ({ children }) => (
                        <blockquote className="border-l-4 border-blue-500 bg-blue-50 p-4 italic text-blue-800 rounded-r-lg my-4">
                          {children}
                        </blockquote>
                      ),
                    }}
                  >
                    {penyakit.content}
                  </ReactMarkdown>
                </div>
              )}

              {/* Metadata Information Cards - Fixed with safe access */}
              {Object.keys(metadata).length > 0 && (
                <div className="border-t border-gray-200 pt-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
                    Informasi Detail
                  </h2>

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Gejala - Fixed with proper checks */}
                    {metadata.gejala &&
                      Array.isArray(metadata.gejala) &&
                      metadata.gejala.length > 0 && (
                        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl p-8 border border-red-200 hover:shadow-lg transition-shadow">
                          <div className="flex items-center mb-6">
                            <div className="w-12 h-12 bg-red-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                              <svg
                                className="w-6 h-6 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-red-800">
                              Gejala
                            </h3>
                          </div>
                          <ul className="space-y-3">
                            {metadata.gejala.map(
                              (gejala: string, index: number) => (
                                <li key={index} className="flex items-start">
                                  <span className="w-2 h-2 bg-red-500 rounded-full mt-2.5 mr-3 flex-shrink-0"></span>
                                  <span className="text-red-800 leading-relaxed">
                                    {gejala}
                                  </span>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      )}

                    {/* Penyebab - Fixed with proper checks */}
                    {metadata.penyebab &&
                      Array.isArray(metadata.penyebab) &&
                      metadata.penyebab.length > 0 && (
                        <div className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-2xl p-8 border border-orange-200 hover:shadow-lg transition-shadow">
                          <div className="flex items-center mb-6">
                            <div className="w-12 h-12 bg-orange-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                              <svg
                                className="w-6 h-6 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                              </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-orange-800">
                              Penyebab
                            </h3>
                          </div>
                          <ul className="space-y-3">
                            {metadata.penyebab.map(
                              (penyebab: string, index: number) => (
                                <li key={index} className="flex items-start">
                                  <span className="w-2 h-2 bg-orange-500 rounded-full mt-2.5 mr-3 flex-shrink-0"></span>
                                  <span className="text-orange-800 leading-relaxed">
                                    {penyebab}
                                  </span>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      )}

                    {/* Pengobatan - Fixed with proper checks */}
                    {metadata.obat &&
                      Array.isArray(metadata.obat) &&
                      metadata.obat.length > 0 && (
                        <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 border border-green-200 hover:shadow-lg transition-shadow">
                          <div className="flex items-center mb-6">
                            <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                              <svg
                                className="w-6 h-6 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 7.172V5L8 4z"
                                />
                              </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-green-800">
                              Pengobatan
                            </h3>
                          </div>
                          <ul className="space-y-3">
                            {metadata.obat.map(
                              (obat: string, index: number) => (
                                <li key={index} className="flex items-start">
                                  <span className="w-2 h-2 bg-green-500 rounded-full mt-2.5 mr-3 flex-shrink-0"></span>
                                  <span className="text-green-800 leading-relaxed">
                                    {obat}
                                  </span>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      )}

                    {/* Pencegahan - Fixed with proper checks */}
                    {metadata.pencegahan &&
                      Array.isArray(metadata.pencegahan) &&
                      metadata.pencegahan.length > 0 && (
                        <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 border border-blue-200 hover:shadow-lg transition-shadow">
                          <div className="flex items-center mb-6">
                            <div className="w-12 h-12 bg-blue-500 rounded-xl flex items-center justify-center mr-4 shadow-lg">
                              <svg
                                className="w-6 h-6 text-white"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
                                />
                              </svg>
                            </div>
                            <h3 className="text-2xl font-bold text-blue-800">
                              Pencegahan
                            </h3>
                          </div>
                          <ul className="space-y-3">
                            {metadata.pencegahan.map(
                              (pencegahan: string, index: number) => (
                                <li key={index} className="flex items-start">
                                  <span className="w-2 h-2 bg-blue-500 rounded-full mt-2.5 mr-3 flex-shrink-0"></span>
                                  <span className="text-blue-800 leading-relaxed">
                                    {pencegahan}
                                  </span>
                                </li>
                              )
                            )}
                          </ul>
                        </div>
                      )}
                  </div>
                </div>
              )}

              {/* Quick Actions */}
              <div className="mt-12 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 border border-blue-100">
                <h3 className="text-xl font-bold text-gray-900 mb-4 text-center">
                  Butuh Informasi Lebih Lanjut?
                </h3>
                <div className="grid md:grid-cols-3 gap-4 text-center">
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="text-blue-600 text-2xl mb-2">🤖</div>
                    <div className="text-sm font-medium text-gray-700">
                      AI Assistant
                    </div>
                    <div className="text-xs text-gray-500">Tanya langsung</div>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="text-green-600 text-2xl mb-2">👨‍⚕️</div>
                    <div className="text-sm font-medium text-gray-700">
                      Konsultasi Dokter
                    </div>
                    <div className="text-xs text-gray-500">
                      Diagnosis akurat
                    </div>
                  </div>
                  <div className="bg-white rounded-xl p-4 shadow-sm">
                    <div className="text-orange-600 text-2xl mb-2">📚</div>
                    <div className="text-sm font-medium text-gray-700">
                      Artikel Terkait
                    </div>
                    <div className="text-xs text-gray-500">
                      Baca lebih banyak
                    </div>
                  </div>
                </div>
              </div>

              {/* Medical Disclaimer */}
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 border-l-4 border-yellow-400 rounded-r-2xl p-6 mt-8">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <svg
                      className="h-6 w-6 text-yellow-600 mt-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div className="ml-4">
                    <h4 className="text-lg font-semibold text-yellow-800 mb-2">
                      ⚠️ Perhatian Medis
                    </h4>
                    <p className="text-yellow-700 leading-relaxed">
                      Informasi yang disajikan di halaman ini bersifat edukatif
                      dan tidak menggantikan konsultasi medis profesional.
                      Selalu konsultasikan dengan dokter atau tenaga kesehatan
                      yang berkompeten untuk diagnosis yang akurat, rencana
                      pengobatan yang tepat, dan nasihat medis yang sesuai
                      dengan kondisi kesehatan Anda.
                    </p>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-8 border-t border-gray-200">
                <Link
                  href="/penyakit"
                  className="flex-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-center py-4 px-6 rounded-xl hover:shadow-lg transition-all duration-300 font-semibold"
                >
                  🏠 Lihat Penyakit Lainnya
                </Link>
                <ChatButton
                  message={`Saya ingin tahu lebih lanjut tentang ${penyakit.title}`}
                />
              </div>
            </div>
          </article>
        </div>
      </div>
    </MainLayout>
  );
}
