import { useShallow } from 'zustand/shallow';

import { useAutoScroll } from '@/shared/hooks';

import { useChatStore } from '../model/useChatStore';
import { Message } from './Message';

export function MessagesList() {
  const { messages, retryMessage, abortMessage } = useChatStore(
    useShallow((state) => ({
      retryMessage: state.retryMessage,
      abortMessage: state.abortMessage,
      messages: state.messages,
    })),
  );
  const containerRef = useAutoScroll(messages);

  return (
    <div
      ref={containerRef}
      className="flex flex-col flex-1 min-h-0 w-full p-4 bg-base overflow-y-auto"
    >
      <div className="mt-auto" />

      {messages.map(({ id, message, sentAt, status, isOwnMessage }) => (
        <Message
          key={id}
          id={id}
          message={message}
          status={status}
          sentAt={sentAt}
          isOwnMessage={!!isOwnMessage}
          onRetry={() => retryMessage(id)}
          onCancel={() => abortMessage(id)}
        />
      ))}
    </div>
  );
}
