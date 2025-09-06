"use client";
import { useState, useRef } from "react";
import { nanoid } from "@/lib/utils";
import { chatAPI } from "@/lib/api";

/* Backend apparently returns sources: string[] (maybe) */
type RawSource = string | SourceObject;

interface SourceObject {
  title?: string;
  url?: string;
  snippet?: string;
  [k: string]: unknown;
}

export interface ChatMessage {
  id: string;
  role: "user" | "assistant";
  content: string;
  createdAt: Date;
  sources?: SourceObject[];
}

interface ChatAPIResponse {
  answer?: string;
  sources?: RawSource[]; // can be strings or objects
}

function normalizeSources(raw?: RawSource[]): SourceObject[] | undefined {
  if (!raw) return undefined;
  return raw.map((s) => (typeof s === "string" ? { title: s } : s));
}

export function useChat() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  async function send() {
    const question = input.trim();
    if (!question || loading) return;

    const userMsg: ChatMessage = {
      id: nanoid(),
      role: "user",
      content: question,
      createdAt: new Date(),
    };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    if (abortRef.current) abortRef.current.abort();
    const ac = new AbortController();
    abortRef.current = ac;

    try {
      const data: ChatAPIResponse = await chatAPI(question, ac.signal);
      const botMsg: ChatMessage = {
        id: nanoid(),
        role: "assistant",
        content: data.answer?.trim() || "Maaf, belum ada jawaban.",
        createdAt: new Date(),
        sources: normalizeSources(data.sources),
      };
      setMessages((m) => [...m, botMsg]);
    } catch (e: unknown) {
      if (e instanceof DOMException && e.name === "AbortError") return;
      const message =
        e instanceof Error ? e.message : "Terjadi kesalahan tidak diketahui";
      setMessages((m) => [
        ...m,
        {
          id: nanoid(),
          role: "assistant",
          content: `Kesalahan: ${message}`,
          createdAt: new Date(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    if (abortRef.current) abortRef.current.abort();
    setMessages([]);
    setInput("");
    setLoading(false);
  }

  function cancel() {
    if (abortRef.current) abortRef.current.abort();
    setLoading(false);
  }

  return { messages, input, setInput, loading, send, reset, cancel };
}
