"use client";
import { useChat } from "@/hooks/chat";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

interface Props {
  compact?: boolean;
}

export default function ChatWindow({ compact }: Props) {
  const { messages, input, setInput, loading, send, reset } = useChat();

  return (
    <div className="bg-white flex flex-col h-[520px] rounded-3xl overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-sm">ASKI Health Assistant</h3>
            <p className="text-xs text-blue-100">AI Kesehatan Terpercaya</p>
          </div>
        </div>
        <Button
          variant="ghost"
          size="xs"
          onClick={reset}
          disabled={loading}
          className="text-white hover:bg-white/20 border-white/30"
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
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
        </Button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-gray-50 to-white">
        {messages.map((m) => (
          <div key={m.id} className="flex flex-col space-y-2">
            <div
              className={`flex ${
                m.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-[80%] px-4 py-3 rounded-2xl text-sm ${
                  m.role === "user"
                    ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white ml-auto"
                    : "bg-white border border-gray-200 shadow-sm"
                }`}
              >
                <div className="flex items-center space-x-2 mb-1">
                  {m.role === "assistant" && (
                    <div className="w-5 h-5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                      <span className="text-[10px] text-white font-bold">
                        A
                      </span>
                    </div>
                  )}
                  <span
                    className={`text-xs font-medium ${
                      m.role === "user" ? "text-blue-100" : "text-gray-600"
                    }`}
                  >
                    {m.role === "user" ? "Anda" : "ASKI"}
                  </span>
                </div>
                <div className="whitespace-pre-wrap leading-relaxed">
                  {m.content}
                </div>

                {/* Sources */}
                {m.role === "assistant" && (m as any).sources?.length > 0 && (
                  <div className="mt-2 pt-2 border-t border-gray-100">
                    <div className="text-xs text-gray-500">
                      <span className="font-medium">Sumber:</span>{" "}
                      {(m as any).sources
                        .map((s: string) => s.split(":").pop())
                        .join(", ")}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}

        {loading && (
          <div className="flex justify-start">
            <div className="bg-white border border-gray-200 shadow-sm rounded-2xl px-4 py-3 max-w-[80%]">
              <div className="flex items-center space-x-2">
                <div className="w-5 h-5 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center">
                  <span className="text-[10px] text-white font-bold">A</span>
                </div>
                <div className="flex space-x-1">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.1s" }}
                  ></div>
                  <div
                    className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"
                    style={{ animationDelay: "0.2s" }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        )}

        {!messages.length && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-blue-600"
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
            </div>
            <h4 className="font-medium text-gray-900 mb-2">Halo! Saya ASKI</h4>
            <p className="text-sm text-gray-600 mb-4">
              Asisten kesehatan AI yang siap membantu Anda
            </p>
            <div className="bg-blue-50 rounded-xl p-4 text-left">
              <p className="text-xs text-blue-700 font-medium mb-2">
                Contoh pertanyaan:
              </p>
              <ul className="text-xs text-blue-600 space-y-1">
                <li>• "Saya demam tinggi dan nyeri sendi"</li>
                <li>• "Apa gejala diabetes?"</li>
                <li>• "Cara mencegah hipertensi"</li>
              </ul>
            </div>
          </div>
        )}
      </div>

      {/* Input Form */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          send();
        }}
        className="p-4 bg-white border-t border-gray-100"
      >
        <div className="flex gap-3">
          <div className="flex-1 relative">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ketik pertanyaan kesehatan Anda..."
              disabled={loading}
              className="pr-12 rounded-xl border-gray-200 focus:border-blue-500 focus:ring-blue-500"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:shadow-lg transition-all duration-200 flex items-center justify-center"
            >
              {loading ? (
                <svg
                  className="w-4 h-4 animate-spin"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
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
                    d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {!compact && (
          <p className="text-[10px] text-gray-500 mt-2 text-center">
            💡 Informasi ini bersifat edukatif. Konsultasikan dengan dokter
            untuk diagnosis yang akurat.
          </p>
        )}
      </form>
    </div>
  );
}
