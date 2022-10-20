import Head from "next/head";
import Auth from "../domains/Auth";

const AuthPage = () => {
  return (
    <>
      <Head>
        <title>Abgram Web - QR Login</title>
      </Head>
      <Auth />;
    </>
  );
};

export default AuthPage;
