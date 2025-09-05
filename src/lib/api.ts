export interface ChatBackendResponse {
  answer: string; // sesuai backend (bukan reply)
  sources: string[];
}

const BASE = process.env.NEXT_PUBLIC_API_BASE;

export async function chatAPI(
  message: string,
  signal?: AbortSignal
): Promise<ChatBackendResponse> {
  if (!BASE) throw new Error("NEXT_PUBLIC_API_BASE belum diset");

  const res = await fetch(`${BASE}/api/chat`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message }),
    signal,
  });

  const text = await res.text();
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}: ${text.slice(0, 200)}`);
  }

  try {
    return JSON.parse(text);
  } catch {
    throw new Error("Response bukan JSON");
  }
}
