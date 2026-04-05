import dayjs from 'dayjs';
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { BOT_MESSAGES, sendMessageApi } from '@/shared/api/chatApi';
import type { IChatMessage } from '@/shared/types/message';

const generateId = () => crypto.randomUUID();

type State = {
  messages: IChatMessage[];
};

type Actions = {
  sendMessage: (message: IChatMessage['message']) => void;
  retryMessage: (id: IChatMessage['id']) => void;
};

export const useChatStore = create<State & Actions>()(
  persist(
    (set, get) => ({
      messages: [],
      sendMessage(message) {
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

        sendMessageApi()
          .then(() => {
            set((state) => ({
              messages: state.messages.map((msg) =>
                msg.id === id ? { ...msg, status: 'sent' } : msg,
              ),
            }));

            const botText =
              BOT_MESSAGES[Math.floor(Math.random() * BOT_MESSAGES.length)];

            const botMessage: IChatMessage = {
              id: generateId(),
              message: botText,
              status: 'sent',
              sentAt: dayjs().toISOString(),
            };

            setTimeout(
              () => {
                set((state) => ({
                  messages: [...state.messages, botMessage],
                }));
              },
              1000 + Math.random() * 1000,
            );
          })
          .catch(() => {
            set((state) => ({
              messages: state.messages.map((msg) =>
                msg.id === id ? { ...msg, status: 'failed' } : msg,
              ),
            }));
          });
      },

      retryMessage(id) {
        const message = get().messages.find((m) => m.id === id);
        if (!message) return;

        set((state) => ({
          messages: state.messages.map((msg) =>
            msg.id === id ? { ...msg, status: 'sending' } : msg,
          ),
        }));

        sendMessageApi()
          .then(() => {
            set((state) => ({
              messages: state.messages.map((msg) =>
                msg.id === id ? { ...msg, status: 'sent' } : msg,
              ),
            }));
          })
          .catch(() => {
            set((state) => ({
              messages: state.messages.map((msg) =>
                msg.id === id ? { ...msg, status: 'failed' } : msg,
              ),
            }));
          });
      },
    }),
    {
      name: 'chat-storage',
    },
  ),
);
