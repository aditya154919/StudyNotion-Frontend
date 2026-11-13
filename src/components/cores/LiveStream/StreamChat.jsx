import { useEffect, useRef, useState } from "react";
import { useChat } from "@livekit/components-react";
import toast from "react-hot-toast";

const StreamChat = () => {
  const { chatMessages, send, isSending } = useChat();
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages.length]);

  const sendMessage = async (event) => {
    event.preventDefault();
    const text = message.trim();
    if (!text || isSending) return;
    try {
      await send(text);
      setMessage("");
    } catch (error) {
      console.error("Could not send live chat message:", error);
      toast.error("Message could not be sent. Please try again.");
    }
  };

  return (
    <aside className="flex h-[420px] min-h-0 flex-col overflow-hidden rounded-xl border border-[#2C333F] bg-[#161D29] text-[#F1F2FF] lg:h-[min(76vh,760px)]">
      <div className="border-b border-[#2C333F] px-4 py-3">
        <h2 className="font-semibold">Live chat</h2>
        <p className="text-xs text-[#838894]">Messages are visible to everyone in this room.</p>
      </div>
      <div
        aria-live="polite"
        className="flex-1 space-y-3 overflow-y-auto p-4"
      >
        {chatMessages.length === 0 && (
          <p className="py-8 text-center text-sm text-[#838894]">
            Say hello to your class.
          </p>
        )}
        {chatMessages.map((chatMessage) => (
          <article
            key={chatMessage.id}
            className="rounded-lg bg-[#202938] px-3 py-2"
          >
            <div className="flex items-center justify-between gap-2">
              <span className="truncate text-sm font-semibold text-[#FFD60A]">
                {chatMessage.from?.name ||
                  chatMessage.from?.identity ||
                  "Participant"}
              </span>
              <time className="shrink-0 text-[11px] text-[#838894]">
                {new Date(chatMessage.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </time>
            </div>
            <p className="mt-1 break-words text-sm">{chatMessage.message}</p>
          </article>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <form
        onSubmit={sendMessage}
        className="flex gap-2 border-t border-[#2C333F] p-3"
      >
        <input
          aria-label="Write a chat message"
          maxLength={500}
          value={message}
          onChange={(event) => setMessage(event.target.value)}
          placeholder="Write a message..."
          className="min-w-0 flex-1 rounded-lg border border-[#424854] bg-[#0f1724] px-3 py-2 text-sm outline-none focus:border-[#FFD60A]"
        />
        <button
          type="submit"
          disabled={!message.trim() || isSending}
          className="rounded-lg bg-[#FFD60A] px-4 py-2 text-sm font-bold text-[#161D29] disabled:cursor-not-allowed disabled:opacity-50"
        >
          Send
        </button>
      </form>
    </aside>
  );
};

export default StreamChat;
