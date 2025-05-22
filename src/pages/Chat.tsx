import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

// Basic city extraction using regex for demo
function extractCity(query: string): string | null {
  const match = query.match(/(?:weather in|in) ([a-zA-Z\s]+)/i);
  if (match && match[1]) {
    // Remove trailing question mark or period
    return match[1].trim().replace(/[?.]$/, "");
  }
  return null;
}

const Chat = () => {
  const [messages, setMessages] = useState<{ sender: "user" | "ai"; text: string; city?: string }[]>([]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = input.trim();
    setMessages((msgs) => [...msgs, { sender: "user", text: userMsg }]);
    setInput("");

    // Simulate AI response
    setTimeout(() => {
      const city = extractCity(userMsg);
      if (city) {
        setMessages((msgs) => [
          ...msgs,
          {
            sender: "ai",
            text: `You can view ${city}'s weather here.`,
            city,
          },
        ]);
      } else {
        setMessages((msgs) => [
          ...msgs,
          {
            sender: "ai",
            text: "Sorry, I couldn't find a city in your message. Try asking e.g. 'What's the weather in Paris?'",
          },
        ]);
      }
    }, 600);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[url('/images/hero-bg.jpg')] to-blue-400 p-4">
      <div className="w-full z-10 max-w-md bg-white rounded shadow-lg flex flex-col h-[500px]">
        <div className="flex items-center p-4 border-b border-[#efefef] ">
          <button
            onClick={() => navigate(-1)}
            className="text-blue-600 hover:underline text-sm flex items-center gap-1"
            aria-label="Go back"
          >
            <span className="ri-arrow-left-line text-lg" /> Back
          </button>
          <div className="flex-1 text-center font-semibold text-gray-700">Chat</div>
        </div>
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {messages.length === 0 && (
            <div className="text-gray-400 text-center mt-10">Ask me about the weather in any city!</div>
          )}
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}>
              <div className={`rounded px-4 py-2 max-w-[80%] ${msg.sender === "user" ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}>
                {msg.text}
                {msg.sender === "ai" && msg.city && (
                  <div className="mt-1">
                    <Link to={`/weather/${encodeURIComponent(msg.city)}`} className="text-blue-600 underline text-sm">View {msg.city} weather</Link>
                  </div>
                )}
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSend} className="flex p-3 border-t border-t-[#efefef] gap-2">
          <input
            type="text"
            className="flex-1 border border-[#efefef] rounded px-3 py-2 focus:outline-none"
            placeholder="Type your message..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            autoFocus
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">Send</button>
        </form>
      </div>
       <div className="bg-black/40 fixed top-0 left-0 z-0 w-full h-screen"></div>
    </div>
  );
};

export default Chat;