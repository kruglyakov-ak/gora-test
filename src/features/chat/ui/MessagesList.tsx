import { useShallow } from 'zustand/shallow';

import { useAutoScroll } from '@/shared/hooks';

import { useChatStore } from '../model/useChatStore';
import { Message } from './Message';

export function MessagesList() {
  const { messages, retryMessage } = useChatStore(
    useShallow((state) => ({
      retryMessage: state.retryMessage,
      messages: state.messages,
    })),
  );
  const containerRef = useAutoScroll(messages);

  return (
    <div
      ref={containerRef}
      className="flex flex-col flex-1 min-h-0 w-full p-4 bg-base overflow-y-auto"
    >
      {messages.map(({ id, message, sentAt, status, isOwnMessage }) => (
        <Message
          key={id}
          id={id}
          message={message}
          status={status}
          sentAt={sentAt}
          isOwnMessage={!!isOwnMessage}
          onRetry={() => retryMessage(id)}
        />
      ))}
    </div>
  );
}
