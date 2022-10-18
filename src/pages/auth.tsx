import Head from "next/head";
import Auth from "../domains/Auth";

const AuthPage = () => {
  return (
    <>
      <Head>
        <title>Abogram Web - QR Login</title>
      </Head>
      <Auth />;
    </>
  );
};

export default AuthPage;
