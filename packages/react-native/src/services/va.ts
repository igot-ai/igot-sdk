import { api } from '../api';
import { getConfig } from '../config';
import { API_URLS } from '../constants';
import { Builder, SendPrompt, SessionResponse } from '../types';
import EventSource from 'react-native-sse';

export class VAService {
  config = getConfig();
  apiKey = this.config.apiKey;
  apiSecret = this.config.apiSecret;

  public async getContextInfo(): Promise<Builder> {
    return await api.get(`${API_URLS.BUILDER_CONTEXT}/${this.apiSecret}`);
  }

  public async createSession(): Promise<SessionResponse> {
    return await api.post(`${API_URLS.CHAT}/${this.apiSecret}`);
  }

  public async sendPrompt({ session, prompt }: SendPrompt): Promise<null> {
    return await api.post(`${API_URLS.CHAT_PROMPT}/${session}`, { prompt });
  }

  public listenToSession(session: string) {
    const timestamp = parseInt((new Date().getTime() / 1000).toString());
    return new EventSource(
      `${API_URLS.SSE_LISTENER}/${session}?time=${timestamp}`
    );
  }
}

export const vaService = new VAService();
