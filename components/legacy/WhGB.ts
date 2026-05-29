import { OllamaChatMessage, OllamaTool } from "./ollama-stream";

// ── Ollama /api/chat request types ──────────────────────────────────────────
export interface OllamaChatRequest {
  model: string;
  messages: OllamaChatMessage[];
  stream: boolean;
  tools?: OllamaTool[];
  options?: Record<string, unknown>;
}
