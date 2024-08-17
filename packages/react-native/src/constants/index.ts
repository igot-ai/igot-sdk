const BASE_API_URL = process.env.IGOT_AI_API_URL || 'https://stag-x.igot.app';

export const API_URLS = {
  BASE_API_URL,
  AUTHOR_PROFILE: '/v1/authors',
  CHAT_PROMPT: '/v1/prompt',
  CHAT_SESSIONS: '/v1/chat/sessions',
  CHAT: '/v1/chat',
  PROFILE: '/v1/me',
  BUILDER: '/v1/builder',
  BUILDER_CONTEXT: '/v1/builder/context',
  SSE_LISTENER: BASE_API_URL + '/sse/sub',
};

export const PAGE_SIZE = 10;
export enum SCROLL_DIRECTION {
  UP = 0,
  DOWN = 1,
}

export const AUTH_TOKEN_KEY = 'TOKEN';

export * from './colors';
