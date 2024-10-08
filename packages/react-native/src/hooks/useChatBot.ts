import { useCallback, useEffect, useState } from 'react';
import { useChatStore } from '../store';
import { isObject, uniqBy } from 'lodash';
import { vaService } from '../services';
import { SESSION_ASSETS } from '../types';

const LLM_PROCESSING_MODE = 'Processing...';
const LLM_THINKING_MODE = 'Thinking...';
const RESET_RESPONSE = '';
const SSE_SUCCESS_OR_ERROR = ['_SUCCESS', '_ERROR'];

export const useChatBot = () => {
  const { setChatStore, session } = useChatStore();
  const [response, setResponse] = useState('');

  useEffect(() => {
    if (!response) return;

    if (SSE_SUCCESS_OR_ERROR.includes(String(response))) {
      setResponse(RESET_RESPONSE);
      setChatStore({ typingResponse: RESET_RESPONSE });

      return;
    }
    if (response === '[' || response === '```' || response === '```yaml') {
      setChatStore({ typingResponse: LLM_THINKING_MODE });
    }
    const regex = /Answer:\s*(.*?)(?=\n|$)/;
    const match = regex.exec(response);
    const answer = match ? match[1].trim() : '';

    if (
      (!isObject(response) && answer) ||
      response === 'STARTING' ||
      String(response).includes('[/answer]')
    ) {
      setChatStore({ typingResponse: LLM_PROCESSING_MODE });
    }

    setChatStore({ typingResponse: `${answer || LLM_PROCESSING_MODE}` });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [response]);

  const createSession = async () => {
    const response = await vaService.createSession();
    setChatStore({ session: response.session_id });
    return response.session_id;
  };

  const sendPrompt = async (prompt: string) => {
    try {
      if (!session) {
        alert('Session not created');
      }
      await vaService.sendPrompt({ session, prompt });
      await triggerListener();
    } catch (error) {
      console.error(error);
    }
  };

  const triggerListener = useCallback(async () => {
    const eventSource = vaService.listenToSession(session); // TODO: Add session

    eventSource.addEventListener('message', async (event) => {
      if (!event.data) return;

      const data = JSON.parse(event.data);
      setResponse(data.response);

      if (data.id > 0 && SESSION_ASSETS.includes(data.role)) {
        const conversation = {
          ...data,
          content: (data.response as string).replace(/```/, ''),
          created_at: data.timestamp,
        };

        setChatStore(({ conversations }) => ({
          conversations: uniqBy([...conversations, conversation], 'id'),
        }));
      }

      if (SSE_SUCCESS_OR_ERROR.includes(String(data.response))) {
        eventSource.close();
      }
    });

    eventSource.addEventListener('error', (error) => {
      console.error('EventSource failed:', error);
      eventSource.close();
    });
  }, [session, setChatStore]);

  return { createSession, sendPrompt, triggerListener };
};
