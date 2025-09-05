"use client";
import { useState, useEffect, useCallback } from "react";
import ChatWindow from "./ChatWindow";
import { cn } from "@/lib/utils";

export default function FloatingChat() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("aski_chat_open");
    if (saved === "1") setOpen(true);
  }, []);

  useEffect(() => {
    localStorage.setItem("aski_chat_open", open ? "1" : "0");
  }, [open]);

  const escHandler = useCallback((e: KeyboardEvent) => {
    if (e.key === "Escape") setOpen(false);
  }, []);

  useEffect(() => {
    window.addEventListener("keydown", escHandler);
    return () => window.removeEventListener("keydown", escHandler);
  }, [escHandler]);

  if (!open) {
    return (
      <button
        aria-label="Buka Chatbot ASKI"
        onClick={() => setOpen(true)}
        className="fixed z-50 bottom-6 right-6 w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-2xl shadow-2xl hover:shadow-blue-500/25 hover:scale-105 transition-all duration-300 flex items-center justify-center group"
      >
        <svg
          className="w-7 h-7 group-hover:scale-110 transition-transform"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
          />
        </svg>

        {/* Pulse animation */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 animate-ping opacity-20"></div>
      </button>
    );
  }

  return (
    <div className="fixed z-50 bottom-6 right-6 w-[380px] md:w-[420px]">
      <div className="relative rounded-3xl shadow-2xl ring-1 ring-black/5 bg-white overflow-hidden backdrop-blur-sm">
        {/* Close Button - Dipindah ke atas ChatWindow */}
        <div className="absolute -top-2 -right-2 z-10">
          <button
            onClick={() => setOpen(false)}
            aria-label="Tutup chat"
            className="w-8 h-8 rounded-full bg-white text-gray-500 hover:text-gray-700 hover:bg-gray-50 shadow-lg border border-gray-200 transition-all duration-200 flex items-center justify-center text-sm font-bold"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>
        <ChatWindow compact />
      </div>
    </div>
  );
}
