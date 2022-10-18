import React from "react";
import { Bars3Icon } from "@heroicons/react/24/solid";
import ConversationItem from "./ConversationItem";
import { useTelegram } from "../../core/telegram";
import { useAsync } from "react-use";
import { Api } from "telegram";

const Home = () => {
  const { client } = useTelegram();
  const { value, error, loading } = useAsync(async () => {
    return await client?.invoke(new Api.contacts.GetContacts({}));
  });

  console.log({ value, error, loading });

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <header className="m-2">
        <button className="w-10 h-10 rounded-full hover:bg-gray-200 active:bg-gray-300">
          <Bars3Icon className="text-black w-full p-1" />
        </button>
      </header>
      <main className="flex-1 overflow-y-scroll">
        <ul className="flex flex-col gap-3">
          <ConversationItem />
          <ConversationItem />
          <ConversationItem />
          <ConversationItem />
          <ConversationItem />
          <ConversationItem />
          <ConversationItem />
          <ConversationItem />
          <ConversationItem />
          <ConversationItem />
          <ConversationItem />
          <ConversationItem />
          <ConversationItem />
          <ConversationItem />
          <ConversationItem />
          <ConversationItem />
          <ConversationItem />
          <ConversationItem />
          <ConversationItem />
          <ConversationItem />
          <ConversationItem />
          <ConversationItem />
          <ConversationItem />
          <ConversationItem />
          <ConversationItem />
          <ConversationItem />
          <ConversationItem />
          <ConversationItem />
          <ConversationItem />
        </ul>
      </main>
    </div>
  );
};

export default Home;
