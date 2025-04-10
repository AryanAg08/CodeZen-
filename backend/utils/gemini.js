const { GoogleGenerativeAI } = require('@google/generative-ai');
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || "AIzaSyBxOVLD9IsvDXhgGRh7NfWck0ukjnAOxKM"); // set this in .env

async function getGeminiSuggestion(prompt) {
  const model = genAI.getGenerativeModel({ model: 'gemini-2.0-flash' });

  try {
    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini error:", error.message);
    return null;
  }
}

module.exports = getGeminiSuggestion;
