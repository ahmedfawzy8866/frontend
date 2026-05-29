import { GoogleGenerativeAI } from "@google/generative-ai";
import { instrumentAgent } from "../arize";

/**
 * Sierra AI — DIRECT GOOGLE AI STUDIO INTEGRATION
 * This service bypasses the local OpenClaw proxy and communicates directly with Gemini.
 */

const API_KEY = process.env.GOOGLE_AI_API_KEY || "";
const genAI = new GoogleGenerativeAI(API_KEY);

export type GeminiModel = "gemini-1.5-flash" | "gemini-1.5-pro";

export interface ChatOptions {
  model?: string;
  temperature?: number;
  maxOutputTokens?: number;
  tools?: any[];
}

export const GoogleAIService = {
  /**
   * Generates a text response using the selected Gemini model.
   * Auto-instrumented for Arize Phoenix observability.
   */
  async generateContent(
    agentName: string,
    stage: string,
    prompt: { system?: string; user: string | any[] },
    options: { model?: GeminiModel; temperature?: number; jsonMode?: boolean } = {}
  ) {
    if (!API_KEY) {
      throw new Error("GOOGLE_AI_API_KEY is not configured. Direct AI Studio integration disabled.");
    }

    const modelName = options.model || "gemini-1.5-flash";
    const model = genAI.getGenerativeModel({
      model: modelName,
      generationConfig: {
        temperature: options.temperature ?? 0.1,
        responseMimeType: options.jsonMode ? "application/json" : "text/plain",
      },
      systemInstruction: prompt.system,
    });

    return instrumentAgent(agentName, stage, "AI_STUDIO_DIRECT", async () => {
      console.log(`📡 [GoogleAI] Direct Call: ${agentName}:${stage} using ${modelName}`);
      
      const result = await model.generateContent(prompt.user);
      const response = await result.response;
      const text = response.text();

      return text;
    });
  },

  /**
   * OpenAI-compatible wrapper for legacy services still expecting the 'choices' format.
   */
  async chatCompletions(
    agentId: string,
    unitName: string,
    messages: Array<{ role: string; content: string }>,
    options: ChatOptions = {}
  ) {
    return instrumentAgent(agentId, unitName, JSON.stringify(messages), async () => {
      const modelName = options.model || 'gemini-1.5-flash';
      // Gemini 1.5 doesn't use generic tools format, we need to map to its expectation if provided
      const model = genAI.getGenerativeModel({ 
        model: modelName,
        tools: options.tools ? [{ functionDeclarations: options.tools }] : undefined
      });

      const chat = model.startChat({
        history: messages.slice(0, -1).map(m => ({
          role: m.role === 'assistant' ? 'model' : 'user',
          parts: [{ text: m.content }]
        })),
        generationConfig: {
          temperature: options.temperature ?? 0.7,
          maxOutputTokens: options.maxOutputTokens ?? 2048,
        },
      });

      const lastMessage = messages[messages.length - 1].content;
      const result = await chat.sendMessage(lastMessage);
      const response = await result.response;
      const text = response.text();
      
      const functionCalls = response.candidates?.[0].content.parts.filter(p => p.functionCall);

      return {
        choices: [
          {
            message: {
              role: 'assistant',
              content: text,
              tool_calls: functionCalls?.map(fc => ({
                id: fc.functionCall?.name, // Use name as ID for simplicity
                type: 'function',
                function: {
                  name: fc.functionCall?.name,
                  arguments: JSON.stringify(fc.functionCall?.args)
                }
              }))
            }
          }
        ]
      };
    });
  }
};
