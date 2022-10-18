import type { NextPage } from "next";
import Head from "next/head";
import Home from "../domains/Home/Home";

const HomePage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Abgram Web</title>
        <meta name="description" content="Telegram unofficial web version" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Home />
    </>
  );
};

export default HomePage;
