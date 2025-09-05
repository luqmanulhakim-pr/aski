"use client";
import { useState, useRef } from "react";
import { nanoid } from "@/lib/utils";
import type { ChatMessage } from "@/types";
import { chatAPI } from "@/lib/api";

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
    };
    setMessages((m) => [...m, userMsg]);
    setInput("");
    setLoading(true);

    if (abortRef.current) abortRef.current.abort();
    const ac = new AbortController();
    abortRef.current = ac;

    try {
      const data = await chatAPI(question, ac.signal);
      const botMsg: ChatMessage = {
        id: nanoid(),
        role: "assistant",
        content: data.answer || "Maaf, belum ada jawaban.", // answer bukan reply
        sources: data.sources,
      } as any;
      setMessages((m) => [...m, botMsg]);
    } catch (e: any) {
      if (e.name === "AbortError") return;
      console.error("Chat error:", e);
      setMessages((m) => [
        ...m,
        {
          id: nanoid(),
          role: "assistant",
          content: `Kesalahan: ${e.message || "tidak diketahui"}`,
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

  return { messages, input, setInput, loading, send, reset };
}
