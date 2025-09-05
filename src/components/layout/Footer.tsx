export function Footer() {
  return (
    <footer className="mt-16 border-t bg-neutral-50">
      <div className="max-w-6xl mx-auto px-4 py-8 text-xs text-neutral-500 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} ASKI. Edukasi kesehatan.</p>
        <p>
          Informasi bukan pengganti diagnosis. Hubungi dokter untuk keputusan
          medis.
        </p>
      </div>
    </footer>
  );
}
