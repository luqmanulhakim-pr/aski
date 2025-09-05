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

// Update interface sesuai backend
export interface PenyakitListItem {
  slug: string;
  title: string;
  excerpt?: string;
  metadata?: any;
  created_at?: string;
  updated_at?: string;
}

export interface PenyakitDetail extends PenyakitListItem {
  content?: string;
}

const API = process.env.NEXT_PUBLIC_API_BASE;

async function jsonFetch<T>(url: string): Promise<T> {
  const r = await fetch(url, { cache: "no-store" });
  if (!r.ok) throw new Error(`${r.status} ${r.statusText}`);
  return r.json();
}

// Update endpoint sesuai backend (/api/posts)
export function fetchPenyakitList(): Promise<PenyakitListItem[]> {
  return jsonFetch<PenyakitListItem[]>(`${API}/api/posts`);
}

export function fetchPenyakitDetail(slug: string): Promise<PenyakitDetail> {
  return jsonFetch<PenyakitDetail>(`${API}/api/posts/${slug}`);
}
