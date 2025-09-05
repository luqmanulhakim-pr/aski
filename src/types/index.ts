export interface PostFrontmatter {
  title: string;
  slug: string;
  description?: string;
  gejala?: string[];
  penyebab?: string[];
  obat?: string[];
  pencegahan?: string[];
  tags?: string[];
  updated?: string;
}

export interface Post extends PostFrontmatter {
  content: string;
  raw: string;
  excerpt: string;
  readingTimeMinutes: number;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  sources?: string[];
}
