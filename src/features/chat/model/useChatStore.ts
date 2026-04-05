import dayjs from 'dayjs';
import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import { BOT_MESSAGES, sendMessageApi } from '@/features/chat/api/chatApi';
import { getErrorMessage } from '@/shared/utils';

import { addMessageIfNotExists } from '../lib/addMessageIfNotExists';
import { delay } from '../lib/delay';
import { generateId } from '../lib/generateId';
import type { IChatMessage } from './types';

type State = {
  messages: IChatMessage[];
  isTyping: boolean;
};

type Actions = {
  sendMessage: (message: IChatMessage['message']) => void;
  retryMessage: (id: IChatMessage['id']) => void;
};

const updateMessageStatus = (
  set: (fn: (state: State) => Partial<State>) => void,
  id: string,
  status: IChatMessage['status'],
) => {
  set((state) => ({
    messages: state.messages.map((msg) =>
      msg.id === id ? { ...msg, status } : msg,
    ),
  }));
};

const addBotReply = async (
  set: (fn: (state: State) => Partial<State>) => void,
) => {
  const botText = BOT_MESSAGES[Math.floor(Math.random() * BOT_MESSAGES.length)];

  const botMessage: IChatMessage = {
    id: generateId(),
    message: botText,
    status: 'read',
    sentAt: dayjs().toISOString(),
  };

  set(() => ({ isTyping: true }));

  await delay(1000 + Math.random() * 2000);

  set((state) => ({
    messages: addMessageIfNotExists(state.messages, botMessage),
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
          messages: addMessageIfNotExists(state.messages, newMessage),
        }));

        try {
          await sendMessageApi(true);

          updateMessageStatus(set, id, 'sent');
          await delay(1000 + Math.random() * 1000);

          updateMessageStatus(set, id, 'read');

          await addBotReply(set);
        } catch (error) {
          const errorMessage = getErrorMessage(error);
          console.error(errorMessage);
          updateMessageStatus(set, id, 'failed');
        }
      },

      async retryMessage(id) {
        const message = get().messages.find((m) => m.id === id);
        if (!message || message.status !== 'failed') return;

        updateMessageStatus(set, id, 'sending');

        try {
          await sendMessageApi(false);

          updateMessageStatus(set, id, 'sent');
          await delay(1000 + Math.random() * 1000);

          updateMessageStatus(set, id, 'read');

          await addBotReply(set);
        } catch (error) {
          const errorMessage = getErrorMessage(error);
          console.error(errorMessage);
          updateMessageStatus(set, id, 'failed');
        }
      },
    }),

    {
      name: 'chat-storage',
      storage: createJSONStorage(() => localStorage),

      onRehydrateStorage: () => (state) => {
        if (state?.messages?.length) {
          const uniqueMessages = Array.from(
            new Map(state.messages.map((msg) => [msg.id, msg])).values(),
          );

          if (uniqueMessages.length !== state.messages.length) {
            state.messages = uniqueMessages;
          }
        }
      },
    },
  ),
);
