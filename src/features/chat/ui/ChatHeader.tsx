import { Trash2 } from 'lucide-react';
import { useShallow } from 'zustand/shallow';

import { useChatStore } from '../model/useChatStore';

interface IProps {
  name: string;
  avatar?: string;
}

export function ChatHeader({ name, avatar }: IProps) {
  const { isTyping, clearMessages } = useChatStore(
    useShallow((state) => ({
      clearMessages: state.clearMessages,
      isTyping: state.isTyping,
    })),
  );

  return (
    <div className="flex justify-between items-center p-4 bg-primary">
      <div className="flex items-center gap-2">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full bg-accent flex justify-center items-center">
            {avatar ? (
              <img alt={`${name} avatar`} src={avatar} />
            ) : (
              <span className="text-xl font-semibold text-accent-content -translate-y-0.5">
                {name.toUpperCase().charAt(0)}
              </span>
            )}
          </div>
        </div>

        <div className="flex flex-col h-full">
          <h1 className="text-xl font-semibold text-primary-content leading-none">
            {name}
          </h1>
          {isTyping ? (
            <span className="text-sm text-primary-content leading-none">
              Typing{' '}
              <span className="loading loading-dots loading-xs translate-y-0.5"></span>
            </span>
          ) : (
            <span className="text-sm text-primary-content">Online</span>
          )}
        </div>
      </div>

      <button
        onClick={clearMessages}
        className="btn btn-xs btn-error btn-outline text-error md:text-primary-content"
        aria-label="Очистить историю чата"
        title="Очистить историю чата"
      >
        <span className="hidden md:inline">Очистить историю чата</span>
        <Trash2 size={15} />
      </button>
    </div>
  );
}
