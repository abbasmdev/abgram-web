import { ArrowLeftIcon, PaperAirplaneIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";

const Chat = () => {
  const router = useRouter();
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <header className="p-2 flex items-center gap-4 bg-white shadow-sn">
        <button
          onClick={() => {
            router.push("/");
          }}
          className="w-10 h-10 rounded-full hover:bg-gray-200 active:bg-gray-300"
        >
          <ArrowLeftIcon className="text-black w-full p-1 " />
        </button>

        <div className="flex gap-2 items-center">
          <Image
            className="rounded-full"
            src={"https://fakeimg.pl/54x54/"}
            width={54}
            height={54}
          />
          <div>
            <p className="font-semibold">Test</p>
            <span className="text-sm text-neutral-500">
              Last seen 7 minutes ago
            </span>
          </div>
        </div>
      </header>
      <main className="flex-1 bg-gray-200 flex flex-col overflow-hidden">
        <ol className="overflow-y-auto flex-1 px-2">
          <li className="h-40">chat</li>
          <li className="h-40">chat</li>
          <li className="h-40">chat</li>
          <li className="h-40">chat</li>
          <li className="h-40">chat</li>
        </ol>
        <div className="w-full   shadow-md bg-white flex items-center   max-w-lg mx-auto my-2  gap-2 p-2 rounded-lg">
          <input className="flex-1 p-1 outline-none" placeholder="Message" />
          <button className=" w-10 h-10  rounded-full hover:bg-blue-200 active:bg-blue-300">
            <PaperAirplaneIcon className="w-full p-1  text-blue-600 -rotate-45" />
          </button>
        </div>
      </main>
    </div>
  );
};

export default Chat;
