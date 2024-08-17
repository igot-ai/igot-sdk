import { create } from 'zustand';
import { Builder, Conversation } from '../types';

interface VAChatProperties {
  openChatModal: boolean;
  session: string;
  typingResponse: string;
  vaContextInfo: Builder | null;
  conversations: Conversation[];
}

interface VAChatStore extends VAChatProperties {
  setChatStore: (
    updater:
      | Partial<VAChatProperties>
      | ((prevState: VAChatProperties) => Partial<VAChatProperties>)
  ) => void;
  resetChatStore: () => void;
}

export const useChatStore = create<VAChatStore>((set) => ({
  openChatModal: false,
  session: '',
  typingResponse: '',
  vaContextInfo: null,
  conversations: [],
  setChatStore: (updater) => {
    set((state) => ({
      ...state,
      ...(typeof updater === 'function' ? updater(state) : updater),
    }));
  },
  resetChatStore: () => set({ conversations: [], session: '' }),
}));
