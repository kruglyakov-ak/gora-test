import cn from 'classnames';
import { RefreshCcw, X } from 'lucide-react';

import type { IChatMessage } from '@/features/chat/model/types';

import { formatMessageTime } from '../lib';
import { MessageDeliveryStatus } from './MessageDeliveryStatus';

interface IProps extends IChatMessage {
  onRetry?: () => void;
  onCancel?: () => void;
}

export function Message({
  isOwnMessage = false,
  message,
  status,
  sentAt,
  onRetry,
  onCancel,
}: IProps) {
  const chatPositionClass = isOwnMessage ? 'chat-end' : 'chat-start';
  const bubbleColorClass = isOwnMessage
    ? ''
    : 'bg-primary text-primary-content';

  const isSending = status === 'sending';

  return (
    <div className={cn('chat', chatPositionClass, 'message-appear')}>
      <div
        className={cn(
          'chat-bubble max-w-xl flex items-center relative',
          bubbleColorClass,
        )}
      >
        {isOwnMessage && isSending && onCancel && (
          <button
            onClick={onCancel}
            className="btn btn-xs btn-circle btn-ghost p-0 w-6 h-6 absolute -top-2 -right-2 bg-base-100 hover:bg-base-200 shadow-md"
            aria-label="Отменить отправку"
            title="Отменить отправку"
          >
            <X className="w-4 h-4" />
          </button>
        )}

        {onRetry && status === 'failed' && (
          <button
            onClick={onRetry}
            className="btn btn-xs btn-circle btn-ghost p-0 w-5 h-5 -translate-x-10 absolute"
            aria-label="Отправить заново"
            title="Отправить заново"
          >
            <RefreshCcw className="w-full h-full" />
          </button>
        )}

        {message}
      </div>

      <div className="chat-footer">
        <MessageDeliveryStatus status={status} />
        <time className="text-xs opacity-50">{formatMessageTime(sentAt)}</time>
      </div>
    </div>
  );
}
