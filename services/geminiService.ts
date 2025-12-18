import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { SYSTEM_INSTRUCTION } from '../constants';

// Lazy-initialize the Gemini client to prevent crashes when API key is missing
let ai: GoogleGenAI | null = null;

const getAI = (): GoogleGenAI | null => {
  if (ai) return ai;

  const apiKey = process.env.API_KEY || process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.warn("Gemini API Key not configured. Chat functionality will be limited.");
    return null;
  }

  try {
    ai = new GoogleGenAI({ apiKey });
    return ai;
  } catch (error) {
    console.error("Failed to initialize Gemini AI:", error);
    return null;
  }
};

/**
 * Sends a message to the Gemini model and returns the text response.
 * Uses the Chat API for context preservation.
 */
export const sendMessageToGemini = async (
  message: string,
  history: { role: string; text: string }[]
): Promise<string> => {
  const client = getAI();

  if (!client) {
    return "> API_KEY not configured.\n> Chat functionality is currently offline.\n> Please set your GEMINI_API_KEY in the environment.";
  }

  try {
    const chatHistory = history.map(msg => ({
      role: msg.role,
      parts: [{ text: msg.text }],
    }));

    const chat = client.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
      history: chatHistory
    });

    const result: GenerateContentResponse = await chat.sendMessage({
      message: message
    });

    return result.text || "I'm sorry, I couldn't generate a response at this time.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm currently having trouble connecting to my brain. Please try again later.";
  }
};
