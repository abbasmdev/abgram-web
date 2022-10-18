import React, { FC, useEffect, useRef, useState } from "react";
import { TelegramClient } from "telegram";
import { StoreSession } from "telegram/sessions";

function createClient() {
  const apiId = Number(process.env.NEXT_PUBLIC_TLG_API_ID);
  const apiHash = String(process.env.NEXT_PUBLIC_TLG_API_HASH);
  return new TelegramClient(new StoreSession(""), apiId, apiHash, {});
}

const TelegramContext = React.createContext<ReturnType<
  typeof useTelegramStore
> | null>(null);

const useTelegramStore = () => {
  const [client, setClient] = useState<TelegramClient | null>(null);

  useEffect(() => {
    const tlgClient = createClient();

    setClient(tlgClient);
    tlgClient.connect();

    return () => {
      tlgClient.disconnect().finally(() => {
        tlgClient.destroy();
      });
    };
  }, []);

  return { client };
};

const TelegramProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <TelegramContext.Provider value={useTelegramStore()}>
      {children}
    </TelegramContext.Provider>
  );
};

const useTelegram = () => {
  const ctx = React.useContext(TelegramContext);
  if (!ctx)
    throw new Error(`useTelegram should be used within TelegramProvider`);
  return ctx;
};

export { TelegramProvider, useTelegram };
