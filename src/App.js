import React, { useState } from "react";
import axios from "axios";
import "./index.css";

function App() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMsg = { role: "user", content: input };
    const updatedMessages = [...messages, userMsg];
    setMessages(updatedMessages);
    setInput("");
    setLoading(true);

    try {
      const response = await axios.post("https://gitagpt-backend-d8ov.onrender.com/chat", {
        messages: updatedMessages,
      });
      const assistantMsg = {
        role: "assistant",
        content: response.data.reply,
      };
      setMessages([...updatedMessages, assistantMsg]);
    } catch (error) {
      console.error("Error sending message:", error);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 to-purple-100 flex flex-col items-center p-4">
    <img
        src="/krishnaGPT.png"
        alt="Krishna"
        className="absolute left-0 top-0 h-full w-[430px] object-cover opacity-80 z-0"
      />
      <img
        src="/arjunGpt.jpg"
        alt="Arjuna"
        className="absolute right-0 top-0 h-full w-[430px] object-cover opacity-80 z-1"
      />
      <div className="text-3xl font-semibold mb-4">🕉️ Krishna GPT</div>
      <div className="bg-white rounded-xl shadow-md w-full max-w-2xl flex flex-col p-4 space-y-2 h-[70vh] overflow-y-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`p-2 rounded-xl max-w-[80%] whitespace-pre-line ${
              msg.role === "user"
                ? "bg-blue-100 self-end text-right"
                : "bg-yellow-100 self-start"
            }`}
          >
            {msg.content}
          </div>
        ))}
        {loading && (
          <div className="text-sm italic text-gray-400">
            Krishna is thinking...
          </div>
        )}
      </div>
      <div className="flex mt-4 w-full max-w-2xl">
        <input
          className="flex-1 p-2 rounded-l-xl border border-gray-300"
          placeholder="Ask your question, Parth..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          className="bg-indigo-600 text-white px-4 rounded-r-xl"
          onClick={sendMessage}
        >
          Send
        </button>
      </div>
    </div>
  );
}

export default App;
