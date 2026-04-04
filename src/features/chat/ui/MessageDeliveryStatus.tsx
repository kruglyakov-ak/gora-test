import {
  Check,
  CheckCheck,
  LoaderCircle,
  AlertCircle,
  RefreshCcw,
} from "lucide-react";
import cn from "classnames";
import type { TChatMessageStatus } from "@/shared/types/message";

export interface IProps {
  status: TChatMessageStatus;
  className?: string;
  size?: number;
  onRetry?: () => void;
}

export const MessageDeliveryStatus = ({
  status,
  className,
  size = 16,
  onRetry,
}: IProps) => {
  switch (status) {
    case "sending":
      return (
        <LoaderCircle
          size={size}
          className={cn("animate-spin text-muted-foreground", className)}
          aria-label="Отправляется"
        />
      );

    case "sent":
      return (
        <Check
          size={size}
          className={cn("text-gray-500 dark:text-gray-400", className)}
          aria-label="Отправлено"
        />
      );

    case "read":
      return (
        <CheckCheck
          size={size}
          className={cn("text-blue-500 dark:text-blue-400", className)}
          aria-label="Прочитано"
        />
      );

    case "failed":
      return (
        <div className="flex items-center gap-1.5">
          {onRetry && (
            <button
              onClick={onRetry}
              className="btn btn-xs btn-ghost p-0 w-4 h-4"
              aria-label="Отправить заново"
              title="Отправить заново"
            >
              <RefreshCcw className="w-full h-full" />
            </button>
          )}
          <div className="tooltip tooltip-error" data-tip="Ошибка отправки">
            <AlertCircle
              size={size}
              className={cn(
                "text-red-500 dark:text-red-400 cursor-help",
                className
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
