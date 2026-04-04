interface IProps {
  name: string;
  avatar?: string;
}

export function ChatHeader({ name, avatar }: IProps) {
  return (
    <div className="flex justify-between items-center p-4 bg-primary">
      <div className="flex items-center gap-2">
        <div className="chat-image avatar">
          <div className="w-10 rounded-full bg-accent flex justify-center items-center">
            {avatar ? (
              <img alt={`${name} avatar`} src={avatar} />
            ) : (
              <span className="text-xl font-semibold text-accent-content -translate-y-0.5">
                {name.toUpperCase().charAt(0)}
              </span>
            )}
          </div>
        </div>

        <h1 className="text-xl font-semibold text-primary-content">{name}</h1>
      </div>
    </div>
  );
}
