"use client";

import { useState } from "react";
import { useTranslation } from "react-i18next";
import "../i18n";

export default function Home() {
  const { t, i18n } = useTranslation();
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>(
    []
  );
  const [message, setMessage] = useState<string>("");

  const sendMessage = async () => {
    if (message.trim()) {
      const response = await fetch("http://98.83.154.24:5001/message", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message }),
      });

      const data = await response.json();

      setMessages(data.messages);
      setMessage("");
    }
  };

  return (
    <div className="w-full h-full flex justify-center items-center flex-col main-container">
      <div className="w-full h-full flex flex-col items-center justify-center bg-gray-100 chat-container">
        <div className="w-full flex items-center justify-center bg-white pt-5 border-b border-gray-300 shadow-[0_8px_16px_-4px_rgba(0,0,0,0.2)] mb-10 header-main">
          <div className="w-[700px] flex text-2xl text-[#1a1a1a] font-bold justify-between items-center mb-4 header-container">
            <h1>{t("chatTitle")}</h1>
            <div className="space-x-3 language-button">
              <button
                className="btn btn-primary text-xl font-normal"
                onClick={() => i18n.changeLanguage("ko")}
              >
                한국어
              </button>
              <button
                className="btn btn-primary text-xl font-normal"
                onClick={() => i18n.changeLanguage("en")}
              >
                English
              </button>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center rounded-xl mb-5 shadow-lg chat-box">
          <div className="w-[700px] min-h-[650px] h-[16rem] overflow-auto p-8 rounded-md shadow-sm bg-white message-container">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex message-row ${
                  msg.sender === "bot"
                    ? "flex justify-start chat-start"
                    : "flex justify-end chat-end"
                } mb-3`}
              >
                <p
                  className={`relative p-3 text-white message-bubble ${
                    msg.sender === "bot"
                      ? "relative bg-[#1a1a1a] text-white p-[10px] px-[25px] rounded-[20px_20px_20px_0] max-w-[60%] mb-[10px] inline-block bot-message"
                      : "relative bg-[#4a00ff] text-white p-[10px] px-[25px] rounded-[20px_20px_0_20px] max-w-[60%] mb-[10px] inline-block user-message"
                  } max-w-[60%]`}
                >
                  {msg.text}
                </p>
              </div>
            ))}
          </div>

          <div className="flex w-full p-4 input-container">
            <input
              type="text"
              className="flex-1 p-4 rounded-l-[10px] border border-[#8a8585] outline-none transition duration-300 bg-white text-black focus:border-[#9a98a2] focus:ring-4 focus:ring-[#75747933] input-box"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t("placeholder")}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  sendMessage();
                }
              }}
            />
            <button
              className="bg-[#4a00ff] text-white px-4 py-2 rounded-r-lg border-none send-button"
              onClick={sendMessage}
            >
              {t("sendMessage")}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
