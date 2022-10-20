import React, { FC } from "react";
import Image from "next/image";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import Link from "next/link";
import { Dialog as TDialog } from "telegram/tl/custom/dialog";
TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");

const Dialog: FC<{ dialog: TDialog }> = ({ dialog }) => {
  const { unreadCount, title, message, date, id } = dialog;
  console.log("dialog??", dialog);

  return (
    <Link href={`/chat/${id}`}>
      <a>
        <div className="flex gap-2 p-3 hover:bg-gray-200 rounded-md  ">
          <Image
            className="rounded-full"
            src={"https://fakeimg.pl/54x54/"}
            width={54}
            height={54}
            alt=""
          />
          <div className="flex-1 flex flex-col gap-1 overflow-hidden">
            <p className="flex items-center justify-between">
              <span>{title}</span>
              <span className="text-gray-500 text-sm">
                {timeAgo.format(new Date(date * 1000))}
              </span>
            </p>
            <div className="flex justify-between gap-4">
              <p className="whitespace-nowrap  overflow-hidden overflow-ellipsis text-sm text-neutral-600">
                {message.message}
              </p>
              {unreadCount ? (
                <div className="bg-green-400 text-white text-center text-sm rounded-full  p-1 px-2">
                  {unreadCount}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default Dialog;
