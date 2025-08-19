import axios from 'axios';

export interface OllamaModel {
  name: string;
  modified_at: string;
  size: number;
  digest: string;
}

export interface OllamaMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

export interface OllamaChatRequest {
  model: string;
  messages: OllamaMessage[];
  stream?: boolean;
  options?: {
    temperature?: number;
    top_p?: number;
    top_k?: number;
  };
}

export interface OllamaChatResponse {
  model: string;
  created_at: string;
  message: OllamaMessage;
  done: boolean;
}

export class OllamaClient {
  private baseUrl: string;
  private defaultModel: string;

  constructor() {
    this.baseUrl = process.env.NEXT_PUBLIC_OLLAMA_BASE_URL || 'http://localhost:11434';
    this.defaultModel = process.env.NEXT_PUBLIC_OLLAMA_MODEL || 'llama2';
  }

  /**
   * Get list of available models
   */
  async getModels(): Promise<OllamaModel[]> {
    try {
      const response = await axios.get(`${this.baseUrl}/api/tags`);
      return response.data.models || [];
    } catch (error) {
      console.error('Failed to fetch models:', error);
      throw new Error('Failed to connect to Ollama server');
    }
  }

  /**
   * Send chat message to Ollama
   */
  async chat(request: OllamaChatRequest): Promise<OllamaChatResponse> {
    try {
      const response = await axios.post(`${this.baseUrl}/api/chat`, {
        ...request,
        model: request.model || this.defaultModel,
        stream: false, // For now, we'll use non-streaming
      });
      return response.data;
    } catch (error) {
      console.error('Chat request failed:', error);
      throw new Error('Failed to send message to Ollama');
    }
  }

  /**
   * Check if Ollama server is available
   */
  async ping(): Promise<boolean> {
    try {
      await axios.get(`${this.baseUrl}/api/version`);
      return true;
    } catch (error) {
      console.error('Ollama ping failed:', error);
      return false;
    }
  }

  /**
   * Get default model name
   */
  getDefaultModel(): string {
    return this.defaultModel;
  }

  /**
   * Set default model
   */
  setDefaultModel(model: string): void {
    this.defaultModel = model;
  }
}

// Export singleton instance
export const ollamaClient = new OllamaClient();
export default ollamaClient;
