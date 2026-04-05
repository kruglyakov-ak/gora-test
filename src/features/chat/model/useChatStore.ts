import dayjs from 'dayjs';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { BOT_MESSAGES, sendMessageApi } from '@/features/chat/api/chatApi';
import { getErrorMessage } from '@/shared/utils';

import type { IChatMessage } from './types';

const generateId = () => crypto.randomUUID();

type State = {
  messages: IChatMessage[];
  isTyping: boolean;
};

type Actions = {
  sendMessage: (message: IChatMessage['message']) => void;
  retryMessage: (id: IChatMessage['id']) => void;
};

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const addBotReply = async (
  _messages: IChatMessage[],
  set: (fn: (state: State) => Partial<State>) => void,
) => {
  const botText = BOT_MESSAGES[Math.floor(Math.random() * BOT_MESSAGES.length)];
  const botMessage: IChatMessage = {
    id: generateId(),
    message: botText,
    status: 'read',
    sentAt: dayjs().toISOString(),
  };

  set(() => ({
    isTyping: true,
  }));

  await delay(1000 + Math.random() * 2000);

  set((state) => ({
    messages: [...state.messages, botMessage],
    isTyping: false,
  }));
};

export const useChatStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      messages: [],
      isTyping: false,
      async sendMessage(message) {
        const id = generateId();

        const newMessage: IChatMessage = {
          id,
          message,
          status: 'sending',
          isOwnMessage: true,
          sentAt: dayjs().toISOString(),
        };

        set((state) => ({
          messages: [...state.messages, newMessage],
        }));

        try {
          await sendMessageApi(true);

          set((state) => ({
            messages: state.messages.map((msg) =>
              msg.id === id ? { ...msg, status: 'sent' } : msg,
            ),
          }));

          await delay(1000 + Math.random() * 1000);
          set((state) => ({
            messages: state.messages.map((msg) =>
              msg.id === id ? { ...msg, status: 'read' } : msg,
            ),
          }));

          await addBotReply(get().messages, set);
        } catch (error) {
          const errorMessage = getErrorMessage(error);
          console.error(errorMessage);
          set((state) => ({
            messages: state.messages.map((msg) =>
              msg.id === id ? { ...msg, status: 'failed' } : msg,
            ),
          }));
        }
      },

      async retryMessage(id) {
        const message = get().messages.find((m) => m.id === id);
        if (!message || message.status !== 'failed') return;

        set((state) => ({
          messages: state.messages.map((msg) =>
            msg.id === id ? { ...msg, status: 'sending' } : msg,
          ),
        }));

        try {
          await sendMessageApi(false);

          set((state) => ({
            messages: state.messages.map((msg) =>
              msg.id === id ? { ...msg, status: 'sent' } : msg,
            ),
          }));

          await delay(1000 + Math.random() * 1000);
          set((state) => ({
            messages: state.messages.map((msg) =>
              msg.id === id ? { ...msg, status: 'read' } : msg,
            ),
          }));

          await addBotReply(get().messages, set);
        } catch (error) {
          const errorMessage = getErrorMessage(error);
          console.error(errorMessage);

          set((state) => ({
            messages: state.messages.map((msg) =>
              msg.id === id ? { ...msg, status: 'failed' } : msg,
            ),
          }));
        }
      },
    }),
    {
      name: 'chat-storage',
    },
  ),
);
