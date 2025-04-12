import React, { useState } from 'react';
import ReactMarkdown from "react-markdown";

const Assistant = ({ code, language }) => {
  const [response, setResponse] = useState("");

  const handleAsk = async () => {
    const prompt = `Explain what this ${language} code does, fix any errors, and suggest improvements:\n\n${code}`;
    try {
      const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${import.meta.env.VITE_GEMINI_PRO_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:5173",
          "X-Title": "CodeZen Assistant",
        },
        body: JSON.stringify({
          model: "google/gemini-2.5-pro-exp-03-25:free",
          messages: [
            {
              role: "user",
              content: [
                {
                  type: "text",
                  text: prompt,
                },
              ],
            },
          ],
        }),
      });
  
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error occurred while fetching AI response.');
      }
  
      const data = await response.json();
      console.log("Raw API response:", data); // 🔍 Log here

      const aiMessage = data.choices?.[0]?.message?.content || "No response from AI.";
      setResponse(aiMessage);
    } catch (err) {
      console.error("AI error:", err);
      const errorText = await response.text(); // <- Get raw error
      console.log("Full error response from OpenRouter:", errorText);
      setResponse(`There was an error contacting the AI:\n\n${errorText}`);
    }
    
  };
  

  return (
    <div className="ai-assistant">
      <button onClick={handleAsk}>Ask AI</button>
      <div className="ai-response">
          <h4>AI Response:</h4>
          <ReactMarkdown>{response}</ReactMarkdown>
      </div>
    </div>
  );
};

export default Assistant;