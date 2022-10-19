import { FC, useEffect, useId, useMemo, useRef, useState } from "react";
import { useAsync } from "react-use";
import { Api } from "telegram";
import { NewMessage, NewMessageEvent } from "telegram/events";
import { useTelegram } from "../../core/telegram";

const Messages: FC<{ userId: bigInt.BigInteger }> = ({ userId }) => {
  const { client } = useTelegram();
  const listRef = useRef<HTMLOListElement>();
  const [messages, setMessages] = useState<Api.Message[]>([]);

  const { value, loading, error } = useAsync(async () => {
    return await client?.invoke(
      new Api.messages.GetHistory({
        peer: new Api.InputPeerUser({ userId: userId, accessHash: undefined }),
        limit: 100,
      })
    );
  });

  useEffect(() => {
    if (
      value?.className === "messages.MessagesSlice" ||
      value?.className === "messages.Messages"
    ) {
      setMessages(
        value?.messages
          ?.filter((m) => m.className === "Message")
          .reverse() as Api.Message[]
      );
    }
  }, [value]);

  useEffect(() => {
    async function handler(event: NewMessageEvent) {
      setMessages((pre) => [...pre, event.message]);
    }
    client.addEventHandler(
      handler,
      new NewMessage({
        func(event) {
          return userId.eq(event.chatId);
        },
      })
    );
    return () => {
      client.removeEventHandler(handler, new NewMessage({}));
    };
  }, [client, userId]);

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
