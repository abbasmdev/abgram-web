import type { NextPage } from "next";
import Head from "next/head";
import Chat from "../../domains/Chat";

const ChatPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Abgram Web- chat</title>
        <meta name="description" content="Telegram unofficial web version" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Chat />
    </>
  );
};

export default ChatPage;
