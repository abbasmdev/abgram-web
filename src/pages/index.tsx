import type { NextPage } from "next";
import Head from "next/head";
import { useTelegram } from "../core/telegram";

const Home: NextPage = () => {
  const { client } = useTelegram();

  return (
    <>
      <Head>
        <title>Abgram Web</title>
        <meta name="description" content="Telegram unofficial web version" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <h1 className="text-teal-700">Hi</h1>
      </main>
    </>
  );
};

export default Home;
