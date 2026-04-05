import { ChatHeader } from './ChatHeader';
import { ChatTextArea } from './ChatTextArea';
import { MessagesList } from './MessagesList';

export function Chat() {
  return (
    <div className="h-full">
      <div className="flex flex-col h-dvh md:h-full mx-auto border-0 border-base-300 md:rounded-2xl overflow-hidden md:border md:container chat-container">
        <ChatHeader
          name="ChatBot"
          avatar="https://img.daisyui.com/images/profile/demo/kenobee@192.webp"
        />
        <MessagesList />
        <ChatTextArea />
      </div>
    </div>
  );
}
