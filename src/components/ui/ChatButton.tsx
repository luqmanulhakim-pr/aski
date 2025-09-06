"use client";

interface ChatButtonProps {
  message: string;
  className?: string;
}

export default function ChatButton({
  message,
  className = "",
}: ChatButtonProps) {
  const handleClick = () => {
    // Trigger chat window dengan pertanyaan tentang penyakit ini
    const event = new CustomEvent("openChatWithMessage", {
      detail: message,
    });
    window.dispatchEvent(event);
  };

  return (
    <button
      onClick={handleClick}
      className={`flex-1 border-2 border-blue-600 text-blue-600 text-center py-4 px-6 rounded-xl hover:bg-blue-50 transition-all duration-300 font-semibold ${className}`}
    >
      🤖 Tanya AI Assistant
    </button>
  );
}
