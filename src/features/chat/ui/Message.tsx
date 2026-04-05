import cn from 'classnames';
import { RefreshCcw } from 'lucide-react';

import type { IChatMessage } from '@/shared/types/message';
import { formatMessageTime } from '@/shared/utils/formatMessageTime';

import { MessageDeliveryStatus } from './MessageDeliveryStatus';

interface IProps extends IChatMessage {
  onRetry?: () => void;
}

export function Message({
  isOwnMessage = false,
  message,
  status,
  sentAt,
  onRetry,
}: IProps) {
  const chatPositionClass = isOwnMessage ? 'chat-end' : 'chat-start';
  const bubbleColorClass = isOwnMessage
    ? ''
    : 'bg-primary text-primary-content';

  return (
    <div className={cn('chat', chatPositionClass)}>
      <div
        className={cn(
          'chat-bubble max-w-xl flex items-center relative',
          bubbleColorClass,
        )}
      >
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
