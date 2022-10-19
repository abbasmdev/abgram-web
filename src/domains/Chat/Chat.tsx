import { PaperAirplaneIcon } from "@heroicons/react/24/solid";
import Header from "./Header";

const Chat = () => {
  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />
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
