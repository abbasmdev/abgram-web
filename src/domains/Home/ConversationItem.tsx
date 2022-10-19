import React from "react";
import Image from "next/image";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en";
import Link from "next/link";
TimeAgo.addDefaultLocale(en);
const timeAgo = new TimeAgo("en-US");

const ConversationItem = () => {
  return (
    <Link href={"/chat/1"}>
      <a>
        <div className="flex gap-2 p-3 hover:bg-gray-200 rounded-md  ">
          <Image
            className="rounded-full"
            src={"https://fakeimg.pl/54x54/"}
            width={54}
            height={54}
          />
          <div className="flex-1 flex flex-col gap-1">
            <p className="flex items-center justify-between">
              <span>Test</span>
              <span className="text-gray-500 text-sm">
                {timeAgo.format(new Date("2022-10-17"))}
              </span>
            </p>
            <div className="flex justify-between">
              <span>
                <b>
                  <span>Abbas</span>
                  {": "}
                </b>
                Message
              </span>
              <div className="bg-green-400 text-white text-center text-sm rounded-full  p-1 px-2">
                2
              </div>
            </div>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default ConversationItem;
