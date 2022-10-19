import React from "react";

import ConversationItem from "./ConversationItem";
import { useTelegram } from "../../core/telegram";
import { useAsync } from "react-use";
import { Api } from "telegram";
import Header from "./Header";

const Home = () => {
  const { client } = useTelegram();
  const { value, error, loading } = useAsync(async () => {
    return await client?.invoke(new Api.contacts.GetContacts({}));
  });

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />
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
