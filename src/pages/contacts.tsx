import type { NextPage } from "next";
import Head from "next/head";
import Contacts from "../domains/Contacts";

const ContactsPage: NextPage = () => {
  return (
    <>
      <Head>
        <title>Abgram Web - contacts</title>
        <meta name="description" content="Telegram unofficial web version" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Contacts />
    </>
  );
};

export default ContactsPage;
