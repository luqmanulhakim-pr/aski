import { fetchPenyakitDetail, type PenyakitDetail } from "@/lib/utils";
import { notFound } from "next/navigation";
import Link from "next/link";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface Props {
  params: { slug: string };
}

export default async function PenyakitDetailPage({ params }: Props) {
  let penyakit: PenyakitDetail;

  try {
    penyakit = await fetchPenyakitDetail(params.slug);
  } catch (error) {
    return notFound();
  }

  const metadata = penyakit.metadata || {};

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <Link
        href="/penyakit"
        className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-6"
      >
        ← Kembali ke Daftar Penyakit
      </Link>

      <article className="prose prose-lg max-w-none">
        <h1>{penyakit.title}</h1>

        {penyakit.excerpt && (
          <div className="not-prose bg-gray-50 p-4 rounded-lg mb-6">
            <p className="text-gray-700 italic">{penyakit.excerpt}</p>
          </div>
        )}

        {penyakit.content && (
          <ReactMarkdown remarkPlugins={[remarkGfm]}>
            {penyakit.content}
          </ReactMarkdown>
        )}
      </article>

      {/* Metadata Section */}
      {Object.keys(metadata).length > 0 && (
        <div className="mt-8 border-t pt-8">
          <div className="grid md:grid-cols-2 gap-6">
            {metadata.gejala && (
              <div>
                <h3 className="font-semibold text-lg mb-3">Gejala</h3>
                <ul className="list-disc list-inside space-y-1">
                  {metadata.gejala.map((gejala: string, index: number) => (
                    <li key={index} className="text-gray-700">
                      {gejala}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {metadata.penyebab && (
              <div>
                <h3 className="font-semibold text-lg mb-3">Penyebab</h3>
                <ul className="list-disc list-inside space-y-1">
                  {metadata.penyebab.map((penyebab: string, index: number) => (
                    <li key={index} className="text-gray-700">
                      {penyebab}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {metadata.obat && (
              <div>
                <h3 className="font-semibold text-lg mb-3">Pengobatan</h3>
                <ul className="list-disc list-inside space-y-1">
                  {metadata.obat.map((obat: string, index: number) => (
                    <li key={index} className="text-gray-700">
                      {obat}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {metadata.pencegahan && (
              <div>
                <h3 className="font-semibold text-lg mb-3">Pencegahan</h3>
                <ul className="list-disc list-inside space-y-1">
                  {metadata.pencegahan.map(
                    (pencegahan: string, index: number) => (
                      <li key={index} className="text-gray-700">
                        {pencegahan}
                      </li>
                    )
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
