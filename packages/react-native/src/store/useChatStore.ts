import { create } from 'zustand';

interface VAChatProperties {
  openChatModal: boolean;
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
  setChatStore: (updater) => {
    set((state) => ({
      ...state,
      ...(typeof updater === 'function' ? updater(state) : updater),
    }));
  },
}));
