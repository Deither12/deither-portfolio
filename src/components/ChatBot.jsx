// src/components/ChatBot.jsx
import { useState, useRef, useEffect } from "react";

const SUGGESTIONS = [
  "👋 Who is Deither?",
  "🛠️ Tech stack",
  "📂 Projects",
  "📬 Contact",
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState([]);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      setMessages([
        {
          role: "bot",
          text: "Hey there! 👋 I'm Deither's AI assistant. Ask me about his skills, projects, or how to get in touch!",
        },
      ]);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  async function sendMessage(text) {
    if (!text.trim() || isLoading) return;

    const userMsg = { role: "user", text };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    const newHistory = [...history, { role: "user", content: text }];
    setHistory(newHistory);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: newHistory }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        setMessages((prev) => [
          ...prev,
          { role: "bot", text: "Oops! Something went wrong. Please try again." },
        ]);
      } else {
        setMessages((prev) => [...prev, { role: "bot", text: data.reply }]);
        setHistory((prev) => [...prev, { role: "assistant", content: data.reply }]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "I'm having trouble connecting. Please try again!" },
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen((o) => !o)}
        aria-label={isOpen ? "Close chat" : "Open chat"}
        style={{
          position: "fixed",
          bottom: "28px",
          right: "28px",
          zIndex: 9999,
          width: "56px",
          height: "56px",
          borderRadius: "50%",
          background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
          border: "none",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          boxShadow: "0 4px 24px rgba(99,102,241,0.45)",
          transition: "transform 0.2s ease, box-shadow 0.2s ease",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
        onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
      >
        {isOpen ? (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>

      {/* Chat Window */}
      <div
        style={{
          position: "fixed",
          bottom: "96px",
          right: "28px",
          zIndex: 9998,
          width: "360px",
          maxHeight: "520px",
          borderRadius: "20px",
          background: "#0f0f13",
          border: "1px solid rgba(255,255,255,0.08)",
          boxShadow: "0 24px 64px rgba(0,0,0,0.6), 0 0 0 1px rgba(99,102,241,0.15)",
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          fontFamily: "'Syne', sans-serif",
          transform: isOpen ? "translateY(0) scale(1)" : "translateY(16px) scale(0.97)",
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? "all" : "none",
          transition: "transform 0.25s cubic-bezier(0.34,1.56,0.64,1), opacity 0.2s ease",
        }}
      >
        {/* Header */}
        <div style={{
          padding: "16px 18px",
          background: "linear-gradient(135deg, rgba(99,102,241,0.15), rgba(139,92,246,0.1))",
          borderBottom: "1px solid rgba(255,255,255,0.06)",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}>
          <div style={{
            width: "34px", height: "34px", borderRadius: "50%",
            background: "linear-gradient(135deg, #6366f1, #8b5cf6)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: "16px", flexShrink: 0,
          }}>🤖</div>
          <div>
            <div style={{ margin: 0, fontSize: "14px", fontWeight: 700, color: "#f1f1f5", letterSpacing: "0.02em" }}>
              Deither's AI
            </div>
            <div style={{ fontSize: "11px", color: "#6b7280", fontFamily: "monospace", marginTop: "2px" }}>
              <span style={{
                display: "inline-block", width: "7px", height: "7px",
                background: "#22c55e", borderRadius: "50%", marginRight: "4px",
                boxShadow: "0 0 6px #22c55e", verticalAlign: "middle",
              }} />
              online · ask me anything
            </div>
          </div>
        </div>

        {/* Messages */}
        <div style={{
          flex: 1, overflowY: "auto", padding: "16px",
          display: "flex", flexDirection: "column", gap: "10px",
        }}>
          {messages.map((msg, i) => (
            <div key={i} style={{
              maxWidth: "82%",
              padding: "10px 14px",
              borderRadius: "14px",
              fontSize: "13.5px",
              lineHeight: 1.55,
              alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
              background: msg.role === "user"
                ? "linear-gradient(135deg, #6366f1, #7c3aed)"
                : "rgba(255,255,255,0.05)",
              color: msg.role === "user" ? "#fff" : "#d1d5db",
              border: msg.role === "bot" ? "1px solid rgba(255,255,255,0.06)" : "none",
              borderBottomRightRadius: msg.role === "user" ? "4px" : "14px",
              borderBottomLeftRadius: msg.role === "bot" ? "4px" : "14px",
            }}>
              {msg.text}
            </div>
          ))}

          {/* Typing indicator */}
          {isLoading && (
            <div style={{
              alignSelf: "flex-start", display: "flex", alignItems: "center", gap: "5px",
              padding: "12px 16px", background: "rgba(255,255,255,0.05)",
              borderRadius: "14px", borderBottomLeftRadius: "4px",
              border: "1px solid rgba(255,255,255,0.06)",
            }}>
              {[0, 0.2, 0.4].map((delay, i) => (
                <span key={i} style={{
                  width: "6px", height: "6px", background: "#6366f1",
                  borderRadius: "50%", display: "inline-block",
                  animation: `bounce 1.2s ${delay}s infinite`,
                }} />
              ))}
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestion Chips */}
        {messages.length <= 1 && (
          <div style={{ padding: "0 16px 10px", display: "flex", gap: "6px", flexWrap: "wrap" }}>
            {SUGGESTIONS.map((s) => (
              <button key={s} onClick={() => sendMessage(s.replace(/^[^\w]+/, "").trim())}
                style={{
                  padding: "5px 10px", borderRadius: "20px",
                  border: "1px solid rgba(99,102,241,0.35)",
                  background: "rgba(99,102,241,0.08)", color: "#a5b4fc",
                  fontSize: "11.5px", cursor: "pointer",
                  fontFamily: "'Syne', sans-serif",
                }}
              >{s}</button>
            ))}
          </div>
        )}

        {/* Input Row */}
        <div style={{
          padding: "12px 14px", borderTop: "1px solid rgba(255,255,255,0.06)",
          display: "flex", gap: "8px", alignItems: "center",
          background: "rgba(0,0,0,0.3)",
        }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
            disabled={isLoading}
            placeholder="Ask something..."
            maxLength={300}
            style={{
              flex: 1, background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)", borderRadius: "10px",
              padding: "9px 12px", color: "#f1f1f5", fontSize: "13px",
              fontFamily: "'Syne', sans-serif", outline: "none",
            }}
          />
          <button
            onClick={() => sendMessage(input)}
            disabled={isLoading || !input.trim()}
            style={{
              width: "36px", height: "36px", borderRadius: "10px",
              background: "linear-gradient(135deg, #6366f1, #7c3aed)",
              border: "none", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
              opacity: isLoading || !input.trim() ? 0.4 : 1,
              transition: "opacity 0.15s",
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13" />
              <polygon points="22 2 15 22 11 13 2 9 22 2" />
            </svg>
          </button>
        </div>
      </div>

      {/* Bounce animation keyframes */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700&display=swap');
        @keyframes bounce {
          0%, 60%, 100% { transform: translateY(0); }
          30% { transform: translateY(-5px); }
        }
      `}</style>
    </>
  );
}
