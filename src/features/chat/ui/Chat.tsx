import dayjs from 'dayjs';

import { Message } from './Message';

export function Chat() {
  return (
    <div>
      <div className="mx-auto border-0 rounded-2xl md:border md:container">
        <div className="flex flex-col px-4">
          <Message
            message="You were the Chosen One!"
            status={'read'}
            sentAt={dayjs().toISOString()}
          />

          <Message
            message="I hate you!"
            status={'sending'}
            sentAt={dayjs().toISOString()}
            isOwnMessage
            onRetry={() => console.log('retry')}
          />
        </div>
      </div>
    </div>
  );
}
