import { useRouter } from "next/router";
import React, { createContext, FC, useEffect } from "react";
import { useTelegram } from "../../core/telegram";

import { Raw } from "telegram/events";

const AuthContext = createContext(null);

const AuthProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const router = useRouter();
  const { client } = useTelegram();

  useEffect(() => {
    async function check() {
      if (!client) return;
      const isAuthed = await client?.isUserAuthorized();
      if (!isAuthed && router.pathname !== "/auth") {
        router.replace("/auth");
      } else if (router.pathname === "/auth" && isAuthed) {
        router.replace("/");
      }
    }

    check();
  }, [client, router]);

  useEffect(() => {
    if (!client) return;
    client?.addEventHandler((e) => {
      console.log("e", e);

      const className = e.className;

      if (className === "UpdatesTooLong" && router.pathname !== "/auth") {
        router.replace("/auth");
      }
    }, new Raw({}));
  }, [client, router]);
  return <AuthContext.Provider value={null}>{children}</AuthContext.Provider>;
};

export { AuthProvider };
