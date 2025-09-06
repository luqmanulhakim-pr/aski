import { fetchPenyakitList, type PenyakitItem } from "@/lib/utils";
import MainLayout from "@/components/layout/MainLayout";
import PenyakitSearch from "@/components/features/penyakit/PenyakitSearch";

export const revalidate = 0;

export default async function PenyakitPage() {
  let penyakit: PenyakitItem[] = [];

  try {
    penyakit = await fetchPenyakitList();
  } catch (error) {
    console.error("Error fetching penyakit:", error);
  }

  return (
    <MainLayout>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 py-8">
        <div className="container mx-auto px-4 max-w-7xl">
          {/* Header Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center bg-blue-100 text-blue-800 text-sm font-medium px-4 py-2 rounded-full mb-6">
              <svg
                className="w-4 h-4 mr-2"
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
              Informasi Kesehatan Terpercaya
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Daftar Penyakit
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Temukan informasi lengkap mengenai berbagai penyakit, gejala,
              penyebab, pengobatan, dan cara pencegahan. Dapatkan pengetahuan
              kesehatan yang akurat dan mudah dipahami.
            </p>
          </div>

          {/* Search Component - Client Component */}
          <PenyakitSearch penyakitList={penyakit} />
        </div>
      </div>
    </MainLayout>
  );
}
