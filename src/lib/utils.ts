export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
}

export function nanoid(size = 12) {
  const chars =
    "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let id = "";
  const arr = crypto.getRandomValues(new Uint32Array(size));
  for (let i = 0; i < size; i++) {
    id += chars[arr[i] % chars.length];
  }
  return id;
}

// Update interface dengan nama yang konsisten
export interface PenyakitItem {
  slug: string;
  title: string;
  excerpt?: string;
  metadata?: Record<string, unknown>;
  image_url?: string;
  created_at?: string;
  updated_at?: string;
}

// Alias untuk backward compatibility
export type PenyakitListItem = PenyakitItem;

export interface PenyakitDetail extends PenyakitItem {
  content?: string;
}

const API_BASE = process.env.NEXT_PUBLIC_API_BASE;

async function jsonFetch<T>(url: string): Promise<T> {
  const r = await fetch(url, { cache: "no-store" });
  if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
  return r.json();
}

// Update return type
export function fetchPenyakitList(): Promise<PenyakitItem[]> {
  return jsonFetch<PenyakitItem[]>(`${API_BASE}/api/posts`);
}

export async function fetchPenyakitDetail(
  slug: string
): Promise<PenyakitDetail> {
  try {
    const response = await fetch(`${API_BASE}/api/posts/${slug}`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: PenyakitDetail = await response.json();
    return data;
  } catch (error: unknown) {
    console.error("Error fetching penyakit detail:", error);
    throw error;
  }
}

// Helper function untuk mendapatkan image URL atau fallback
export function getImageUrl(imageUrl?: string, slug?: string): string {
  // Jika ada image_url dari database S3, gunakan itu
  if (imageUrl && imageUrl.trim() !== "") {
    return imageUrl;
  }

  // Fallback ke placeholder image berdasarkan kategori
  const placeholderImages: Record<string, string> = {
    "demam-berdarah":
      "https://via.placeholder.com/800x400/EF4444/ffffff?text=Demam+Berdarah",
    hipertensi:
      "https://via.placeholder.com/800x400/F59E0B/ffffff?text=Hipertensi",
    tipes: "https://via.placeholder.com/800x400/10B981/ffffff?text=Tipes",
    influenza:
      "https://via.placeholder.com/800x400/3B82F6/ffffff?text=Influenza",
    "diabetes-melitus":
      "https://via.placeholder.com/800x400/8B5CF6/ffffff?text=Diabetes",
    asma: "https://via.placeholder.com/800x400/F97316/ffffff?text=Asma",
  };

  return (
    placeholderImages[slug || ""] ||
    "https://via.placeholder.com/800x400/6B7280/ffffff?text=Info+Kesehatan"
  );
}
