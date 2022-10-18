import React, { FC, useEffect, useRef, useState } from "react";
import { TelegramClient } from "telegram";
import { StoreSession } from "telegram/sessions";

type StoreReducerState = {
  apiId: number;
  apiHash: string;
  client: TelegramClient | null;
};

function createClient(apiId: number, apiHash: string) {
  return new TelegramClient(new StoreSession(""), apiId, apiHash, {});
}

const useTelegramStore = () => {
  const [data, dispatch] = React.useReducer(
    (state: StoreReducerState, action: Partial<StoreReducerState>) => {
      return { ...state, ...action };
    },
    {
      apiId: Number(process.env.NEXT_PUBLIC_TLG_API_ID),
      apiHash: String(process.env.NEXT_PUBLIC_TLG_API_HASH),
      client: null,
    }
  );

  const { apiHash, apiId } = data;

  useEffect(() => {
    const tlgClient = createClient(apiId, apiHash);

    tlgClient.connect().then(() => {
      dispatch({
        client: tlgClient,
      });
    });

    return () => {
      dispatch({
        client: null,
      });
      tlgClient.disconnect().finally(() => {
        tlgClient.destroy();
      });
    };
  }, [apiHash, apiId]);

  return data;
};

const TelegramContext = React.createContext<ReturnType<
  typeof useTelegramStore
> | null>(null);

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
