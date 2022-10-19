import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import ContactItem from "./ContactItem";

const Contacts = () => {
  const router = useRouter();
  return (
    <div className=" flex flex-col gap-3 overflow-hidden h-screen">
      <header className="p-2">
        <button
          onClick={() => {
            router.push("/");
          }}
          className="w-10 h-10 rounded-full hover:bg-gray-200 active:bg-gray-300"
        >
          <ArrowLeftIcon className="text-black w-full p-1 " />
        </button>
      </header>

      <main className="flex-1 overflow-y-scroll">
        <ul className="flex flex-col gap-1">
          <ContactItem />
          <ContactItem />
          <ContactItem />
          <ContactItem />
          <ContactItem />
          <ContactItem />
          <ContactItem />
          <ContactItem />
          <ContactItem />
          <ContactItem />
          <ContactItem />
          <ContactItem />
          <ContactItem />
          <ContactItem />
          <ContactItem />
          <ContactItem />
          <ContactItem />
          <ContactItem />
          <ContactItem />
          <ContactItem />
          <ContactItem />
          <ContactItem />
          <ContactItem />
          <ContactItem />
          <ContactItem />
          <ContactItem />
        </ul>
      </main>
    </div>
  );
};

export default Contacts;
