import { api } from '../api';
import { getConfig } from '../config';
import { API_URLS } from '../constants';
import { SendPrompt, SessionResponse } from '../types';

export class VAService {
  config = getConfig();
  apiKey = this.config.apiKey;
  apiSecret = this.config.apiSecret;

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
