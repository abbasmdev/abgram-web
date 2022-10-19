import { FC, useEffect, useRef } from "react";
import { Api } from "telegram";

const Messages: FC<{
  messages: Api.Message[];
  loading: boolean;
  error: Error;
}> = ({ messages, error, loading }) => {
  const listRef = useRef<HTMLOListElement>();

  useEffect(() => {
    if (messages.length > 0 && listRef.current) {
      listRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages.length]);

  if (loading) return <span>loading....</span>;
  if (error) return <span>{error.message}</span>;

  return (
    <ol className="flex flex-col gap-2" ref={listRef}>
      {!messages.length && "No message"}
      {messages.map((msg) => (
        <li
          className={`self-start shadow-md rounded-md p-2 w-fit  max-w-sm bg-white text-black flex flex-col gap-2 ${
            msg.out && "self-end bg-lime-50"
          }`}
          key={msg.id}
        >
          <p className="self-start overflow-hidden break-all  ">
            {msg.message}
          </p>
          <span className="text-xs self-end min-w-fit">
            {new Date(msg.date * 1000).toLocaleTimeString("en-US")}
          </span>
        </li>
      ))}
    </ol>
  );
};

export default Messages;
