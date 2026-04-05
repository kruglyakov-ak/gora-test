import type { IChatMessage } from '../model/types';

export const addMessageIfNotExists = (
  messages: IChatMessage[],
  newMessage: IChatMessage,
): IChatMessage[] => {
  const exists = messages.some((msg) => msg.id === newMessage.id);
  if (exists) return messages;
  return [...messages, newMessage];
};
