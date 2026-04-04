import cn from 'classnames';

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

  return (
    <div className={cn('chat', chatPositionClass)}>
      <div className="chat-bubble">{message}</div>
      <div className="chat-footer">
        <MessageDeliveryStatus onRetry={onRetry} status={status} />
        <time className="text-xs opacity-50">{formatMessageTime(sentAt)}</time>
      </div>
    </div>
  );
}
