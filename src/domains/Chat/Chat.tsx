import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import bigInt from "big-integer";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { useAsync } from "react-use";
import { Api } from "telegram";
import { NewMessage, NewMessageEvent } from "telegram/events";
import { useTelegram } from "../../core/telegram";
import Header from "./Header";
import Messages from "./Messages";

const Chat = () => {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>();
  const userId = bigInt(router.query.id as string);
  const { client } = useTelegram();

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

  function handleSendMessage(e) {
    e.preventDefault();
    const value = inputRef.current.value;
    if (!value) return;
    client.sendMessage(userId, { message: value }).then((m) => {
      setMessages((pre) => [...pre, m]);
    });

    inputRef.current.value = "";
  }

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header userId={userId} />
      <main className="flex-1 bg-gray-200 flex flex-col overflow-hidden pt-2">
        <div className="overflow-y-auto flex-1 px-2">
          <Messages messages={messages} error={error} loading={loading} />
        </div>
        <form
          onSubmit={handleSendMessage}
          className="w-full   shadow-md bg-white flex items-center   max-w-lg mx-auto my-2  gap-2 p-2 rounded-lg"
        >
          <input
            ref={inputRef}
            className="flex-1 p-1 outline-none"
            placeholder="Message"
          />
          <button
            type="submit"
            className=" w-10 h-10  rounded-full hover:bg-blue-200 active:bg-blue-300"
          >
            <PaperAirplaneIcon className="w-full p-1  text-blue-600 -rotate-45" />
          </button>
        </form>
      </main>
    </div>
  );
};

export default Chat;
