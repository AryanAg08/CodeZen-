import React, { useState } from 'react';
import ReactMarkdown from "react-markdown";

const Assistant = ({ code, language }) => {
  const [chatHistory, setChatHistory] = useState([]);
  const [option, setOption] = useState("Explain");
  const [loading, setLoading] = useState(false);

  const promptMap = {
    "Explain": `Explain what this ${language} code does:\n\n${code}`,
    "Find Error": `Find any errors in this ${language} code:\n\n${code}`,
    "Fix Error": `Fix the following ${language} code:\n\n${code}`,
    "Suggest Improvements": `Suggest improvements for this ${language} code:\n\n${code}`
  };

  const handleAsk = async () => {
    const prompt = promptMap[option];
    setLoading(true);
    
    try {
      const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${import.meta.env.VITE_DEEPSEEK_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:5173",
          "X-Title": "CodeZen Assistant",
        },
        body: JSON.stringify({
          model: "deepseek/deepseek-chat-v3-0324:free",
          messages: [{ role: "user", content: [{ type: "text", text: prompt }] }],
        }),
      });

      const data = await res.json();
      const aiMessage = data.choices?.[0]?.message?.content || "No response from AI.";

      setChatHistory(prev => [...prev, { user: option, ai: aiMessage }]);
    } catch (err) {
      setChatHistory(prev => [...prev, { user: option, ai: `Error: ${err.message}` }]);
    }

    setLoading(false);
  };

  return (
    <div className="ai-assistant">
      <div className="ai-controls">
        <select value={option} onChange={(e) => setOption(e.target.value)}>
          <option>Explain</option>
          <option>Find Error</option>
          <option>Fix Error</option>
          <option>Suggest Improvements</option>
        </select>
        <button onClick={handleAsk} disabled={loading}>
          {loading ? "Thinking..." : "Ask AI"}
        </button>
      </div>

      <div className="chat-history">
        {chatHistory.map((chat, idx) => (
          <div key={idx} className="chat-bubble">
            <div className="user-msg"><strong>You:</strong> {chat.user}</div>
            <div className="ai-msg"><ReactMarkdown>{chat.ai}</ReactMarkdown></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Assistant;
