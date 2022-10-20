import { useCallback, useEffect, useState } from "react";
import { useAsyncFn } from "react-use";
import { NewMessage, NewMessageEvent } from "telegram/events";
import { TotalList } from "telegram/Helpers";
import { Dialog as TDialog } from "telegram/tl/custom/dialog";
import { useTelegram } from "../../core/telegram";
import Dialog from "./Dialog";

const Dialogs = () => {
  const [dialogs, setDialogs] = useState<TotalList<TDialog>>([]);
  const { client } = useTelegram();
  const [{ error }, getDialogs] = useAsyncFn(async () => {
    return await client.getDialogs();
  }, []);

  const getAndSetDialogs = useCallback(() => {
    getDialogs().then((dialogs) => {
      setDialogs(dialogs);
    });
  }, [getDialogs]);

  useEffect(() => {
    getAndSetDialogs();
  }, [getAndSetDialogs]);

  useEffect(() => {
    async function handler(event: NewMessageEvent) {
      setDialogs((pre) =>
        pre.map((p) => {
          if (!p.id.eq(event.chatId)) return p;
          p.message = event.message;
          p.date = event.message.date;
          return p;
        })
      );
    }
    client.addEventHandler(handler, new NewMessage({}));

    return () => {
      client.removeEventHandler(handler, new NewMessage({}));
    };
  }, [client, getAndSetDialogs]);

  if (error) return <span>{error?.message || "Error"}</span>;
  if (!(dialogs?.length > 0)) return <span>No messages yet</span>;
  return (
    <ol className="flex flex-col gap-1">
      {dialogs.map((d) => (
        <Dialog key={d.id.toString()} dialog={d} />
      ))}
    </ol>
  );
};

export default Dialogs;
