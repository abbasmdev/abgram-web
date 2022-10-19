import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { useAsync } from "react-use";
import { Api } from "telegram";
import { useTelegram } from "../../core/telegram";
import ContactItem from "./ContactItem";

const Contacts = () => {
  const router = useRouter();
  const { client } = useTelegram();
  const {
    loading,
    error,
    value: contactsListRes,
  } = useAsync(async () => {
    return await client?.invoke(new Api.contacts.GetContacts({}));
  });

  const contacts = useMemo(() => {
    let list: Api.User[] = [];

    if (contactsListRes && contactsListRes.className === "contacts.Contacts") {
      list = contactsListRes.users.filter(
        (u) => u.className === "User"
      ) as Api.User[];
    }
    return list;
  }, [contactsListRes]);

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
        {loading && "Loading..."}
        {!loading && error && `${error || ""}`}

        <ul className="flex flex-col gap-1">
          {!loading && contacts.length === 0 && <span>No contacts</span>}
          {!loading &&
            contacts.length > 0 &&
            contacts.map((u) => <ContactItem user={u} key={u.id.toString()} />)}
        </ul>
      </main>
    </div>
  );
};

export default Contacts;
