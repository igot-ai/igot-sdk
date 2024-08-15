import { create } from 'zustand';
import { Conversation } from '../types';

interface VAChatProperties {
  openChatModal: boolean;
  session: string;
  conversations: Conversation[];
}

interface VAChatStore extends VAChatProperties {
  setChatStore: (
    updater:
      | Partial<VAChatProperties>
      | ((prevState: VAChatProperties) => Partial<VAChatProperties>)
  ) => void;
}

export const useChatStore = create<VAChatStore>((set) => ({
  openChatModal: false,
  session: '',
  conversations: [],
  setChatStore: (updater) => {
    set((state) => ({
      ...state,
      ...(typeof updater === 'function' ? updater(state) : updater),
    }));
  },
}));
