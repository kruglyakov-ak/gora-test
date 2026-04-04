import dayjs from 'dayjs';

import { ChatHeader } from './ChatHeader';
import { ChatTextArea } from './ChatTextArea';
import { Message } from './Message';

export function Chat() {
  return (
    <div className="h-full">
      <div className="flex flex-col mx-auto h-full border-0 border-base-300 md:rounded-2xl overflow-hidden md:border md:container">
        <ChatHeader
          name="ChatBot"
          avatar="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
        />

        <div className="flex flex-col-reverse h-full w-full p-4 bg-base self-end overflow-y-scroll">
          <Message
            message="I hate you!"
            status={'failed'}
            sentAt={dayjs().toISOString()}
            isOwnMessage
            onRetry={() => console.log('retry')}
          />

          <Message
            message="You were the Chosen One!"
            status={'read'}
            sentAt={dayjs().toISOString()}
          />
        </div>

        <ChatTextArea />
      </div>
    </div>
  );
}
