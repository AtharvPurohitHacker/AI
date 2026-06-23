// api/chat.js
import { GoogleGenAI } from '@google/genai';

export default async function handler(req, res) {
  // Grab the query sent from your HTML frontend
  const { message } = req.body;

  // Pull the API key safely from Vercel's Environment Variables
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-1.5-flash',
      contents: message,
      config: {
        systemInstruction: "You are TR, a brilliant, friendly digital AI assistant operating behind a glowing neon optic grid. Keep your responses short, natural, and punchy (1-2 sentences maximum) so they sound great when read aloud.",
        temperature: 0.7,
      }
    });

    // Send the smart response back to the frontend
    return res.status(200).json({ text: response.text });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
