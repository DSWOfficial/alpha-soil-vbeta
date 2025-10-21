import React, { useState, useRef, useEffect } from "react";

export default function ChatBox({ messages, onSend }) {
  const [input, setInput] = useState("");
  const chatRef = useRef();

  const handleSend = () => {
    onSend(input);
    setInput("");
  };

  useEffect(() => {
    chatRef.current.scrollTop = chatRef.current.scrollHeight;
  }, [messages]);

  return (
    <div className="chat-container">
      <h1>Alpha Soil AI 🌱</h1>
      <h4>Your AI assistant for soil & crops</h4>
      <div id="chat" ref={chatRef}>
        {messages.map((m, i) => (
          <div key={i} className={`message ${m.sender}`}>
            {m.text}
          </div>
        ))}
      </div>
      <div className="input-area">
        <input 
          id="message" 
          placeholder="Type a message..." 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          onKeyDown={(e) => e.key === "Enter" && handleSend()}
        />
        <button id="send" onClick={handleSend}>Send</button>
      </div>
    </div>
  );
}
