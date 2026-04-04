import dayjs from 'dayjs';

import { Message } from './Message';

export function Chat() {
  return (
    <div className="h-full">
      <div className="flex flex-col mx-auto h-full border-0 border-base-300 md:rounded-2xl overflow-hidden md:border md:container">
        <div className="flex justify-between items-center p-4 bg-primary">
          <div className="flex items-center gap-2">
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS chat bubble component"
                  src="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
                />
              </div>
            </div>

            <h1 className="text-xl font-semibold text-primary-content">
              ChatBot
            </h1>
          </div>
        </div>
        <div className="flex flex-col-reverse h-full w-full p-4 bg-base self-end">
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
      </div>
    </div>
  );
}
