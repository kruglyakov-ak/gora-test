import cn from 'classnames';
import { AlertCircle, Check, CheckCheck, LoaderCircle } from 'lucide-react';

import type { TChatMessageStatus } from '@/features/chat/model/types';

export interface IProps {
  status: TChatMessageStatus;
  className?: string;
  size?: number;
}

export const MessageDeliveryStatus = ({
  status,
  className,
  size = 16,
}: IProps) => {
  switch (status) {
    case 'sending':
      return (
        <LoaderCircle
          size={size}
          className={cn('animate-spin text-muted-foreground', className)}
          aria-label="Отправляется"
        />
      );

    case 'sent':
      return (
        <Check
          size={size}
          className={cn('text-gray-500 dark:text-gray-400', className)}
          aria-label="Отправлено"
        />
      );

    case 'read':
      return (
        <CheckCheck
          size={size}
          className={cn('text-blue-500 dark:text-blue-400', className)}
          aria-label="Прочитано"
        />
      );

    case 'failed':
      return (
        <div className="flex items-center gap-1.5">
          <div className="tooltip tooltip-error" data-tip="Ошибка отправки">
            <AlertCircle
              size={size}
              className={cn(
                'text-red-500 dark:text-red-400 cursor-help',
                className,
              )}
              aria-label="Ошибка отправки"
            />
          </div>
        </div>
      );

    default: {
      return null;
    }
  }
};
