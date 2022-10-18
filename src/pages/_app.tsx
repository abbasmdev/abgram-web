import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import React, { FC, useCallback, useEffect } from "react";
import { useAsync } from "react-use";
import { Raw } from "telegram/events";
import { TelegramProvider, useTelegram } from "../core/telegram";
import "../styles/globals.css";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TelegramProvider>
      <Loading>
        <Component {...pageProps} />
      </Loading>
    </TelegramProvider>
  );
}

export default MyApp;
const Loading: FC<{ children: React.ReactNode }> = ({ children }) => {
  const { client } = useTelegram();
  const router = useRouter();

  const { value } = useAsync(async () => {
    if (!client) return;

    return await client?.isUserAuthorized();
  }, [client, router.route]);

  const eventHandler = useCallback(
    async (e: any) => {
      console.log(e);

      if (e.className === "UpdatesTooLong") router.replace("/auth");
    },
    [router]
  );

  useEffect(() => {
    client?.addEventHandler(eventHandler, new Raw({}));

    return () => client?.removeEventHandler(eventHandler, new Raw({}));
  }, [client, eventHandler]);

  if (!client?.connected || typeof value === "undefined")
    return <>Loading...</>;
  if (value === false && router.route !== "/auth") {
    router.push("/auth");
    return null;
  }
  if (value === true && router.route === "/auth") {
    router.push("/");
    return null;
  }
  console.log({ value });

  return <>{children}</>;
};
