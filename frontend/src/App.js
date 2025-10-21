import React, { useState } from "react";
import ChatBox from "./ChatBox";
import { fetchAI } from "./api";
import "./index.css";

function App() {
  const [messages, setMessages] = useState([]);

  const sendMessage = async (msg) => {
    if (!msg) return;
    const userMsg = { text: msg, sender: "user" };
    setMessages((prev) => [...prev, userMsg]);

    const aiText = await fetchAI(msg);
    const aiMsg = { text: aiText, sender: "ai" };
    setMessages((prev) => [...prev, aiMsg]);
  };

  return (
    <div className="app-container">
      <ChatBox messages={messages} onSend={sendMessage} />
      {/* QR Codes */}
      <a id="donation-qr" href="https://your-donation-link.com" target="_blank">
        <img src="/donation-qr.png" alt="Donate"/>
        <p>Donate</p>
      </a>

      <a id="more-qr" href="https://your-more-link.com" target="_blank">
        <img src="/more-qr.png" alt="More"/>
        <p>More</p>
      </a>

      <footer>Alpha Soil AI © Dinula Wijasinghe</footer>
    </div>
  );
}

export default App;
