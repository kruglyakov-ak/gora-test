import EmojiPicker, { Theme } from 'emoji-picker-react';
import { Smile } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';

export function ChatTextArea() {
  const [message, setMessage] = useState('');
  const [showPicker, setShowPicker] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  const emojiButtonRef = useRef<HTMLButtonElement>(null);

  const handleSend = () => {
    if (message.trim()) {
      console.log('Sending:', message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleEmojiClick = (emojiObject: { emoji: string }) => {
    setMessage((prev) => prev + emojiObject.emoji);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        showPicker &&
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node) &&
        emojiButtonRef.current &&
        !emojiButtonRef.current.contains(event.target as Node)
      ) {
        setShowPicker(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [showPicker]);

  return (
    <div className="w-full relative">
      <div className="relative -bottom-1">
        <TextareaAutosize
          className="min-h-14 max-h-30 p-4 pl-12 w-full focus:outline-0 bg-base-300 rounded-none border-0"
          placeholder="Write a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
        />

        <button
          ref={emojiButtonRef}
          type="button"
          onClick={() => setShowPicker(!showPicker)}
          className="absolute left-2 bottom-3 btn btn-circle btn-ghost btn-sm text-base-content/60 hover:text-base-content transition-all"
        >
          <Smile />
        </button>

        <button
          onClick={handleSend}
          className="btn btn-circle btn-ghost text-primary absolute right-0 bottom-2 transition-opacity duration-200 ease-in-out disabled:opacity-0"
          disabled={!message.trim()}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-5 h-5"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5"
            />
          </svg>
        </button>
      </div>

      <div
        ref={pickerRef}
        className={`absolute bottom-14 left-0 z-50 transition-all duration-200 ease-out ${
          showPicker
            ? 'opacity-100 scale-100 visible'
            : 'opacity-0 scale-95 invisible'
        }`}
      >
        <EmojiPicker
          skinTonesDisabled
          previewConfig={{ showPreview: false }}
          width={320}
          onEmojiClick={handleEmojiClick}
          lazyLoadEmojis
          theme={Theme.AUTO}
          className="bg-base-300"
        />
      </div>
    </div>
  );
}
