import Link from "next/link";
import MainLayout from "@/components/layout/MainLayout";

export default function HomePage() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Konsultasi Kesehatan
              <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Berbasis AI
              </span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
              Dapatkan informasi kesehatan terpercaya dan konsultasi instant
              dengan AI assistant yang telah dilatih oleh data medis
              profesional.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl hover:shadow-xl transition-all duration-300 font-semibold text-lg">
                Mulai Konsultasi
              </button>
              <Link
                href="/penyakit"
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-xl hover:border-blue-600 hover:text-blue-600 transition-all duration-300 font-semibold text-lg"
              >
                Lihat Daftar Penyakit
              </Link>
            </div>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-blue-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-1/2 right-1/4 w-72 h-72 bg-indigo-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-1/4 left-1/3 w-72 h-72 bg-purple-300 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Mengapa Memilih ASKI Health?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Platform kesehatan digital yang menggabungkan kecerdasan buatan
              dengan data medis terpercaya.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: "🤖",
                title: "AI Assistant Canggih",
                description:
                  "Chatbot yang dilatih dengan data medis profesional untuk memberikan informasi yang akurat.",
              },
              {
                icon: "📚",
                title: "Database Komprehensif",
                description:
                  "Koleksi lengkap informasi penyakit, gejala, pengobatan dan pencegahan.",
              },
              {
                icon: "⚡",
                title: "Respon Instant",
                description:
                  "Dapatkan jawaban cepat dan akurat untuk pertanyaan kesehatan Anda kapan saja.",
              },
            ].map((feature, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-2xl p-8 hover:shadow-xl transition-all duration-300"
              >
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Siap untuk Konsultasi?
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
            Mulai percakapan dengan AI assistant kami sekarang dan dapatkan
            informasi kesehatan yang Anda butuhkan.
          </p>
          <button className="bg-white text-blue-600 px-8 py-4 rounded-xl hover:shadow-xl transition-all duration-300 font-semibold text-lg">
            Mulai Chat Sekarang
          </button>
        </div>
      </section>
    </MainLayout>
  );
}
