import { Menu } from "@headlessui/react";
import {
  ArrowLeftOnRectangleIcon,
  Bars3Icon,
  QuestionMarkCircleIcon,
  UsersIcon,
} from "@heroicons/react/24/solid";
import { useRouter } from "next/router";
import React from "react";
import { Api } from "telegram";
import { useTelegram } from "../../core/telegram";

const Header = () => {
  const { client } = useTelegram();

  const router = useRouter();
  async function handleLogout() {
    const res = await client?.invoke(new Api.auth.LogOut());
  }

  return (
    <header className="m-2">
      <Menu>
        <Menu.Button as={React.Fragment}>
          <button className="w-10 h-10 rounded-full hover:bg-gray-200 active:bg-gray-300">
            <Bars3Icon className="text-black w-full p-1" />
          </button>
        </Menu.Button>
        <Menu.Items className="z-20 absolute flex flex-col w-72 rounded-md shadow-md bg-gray-100 p-1 gap-1">
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={() => router.push("/contacts")}
                className={`${
                  active && "bg-gray-200"
                } px-2 py-2 rounded-md flex items-center gap-2`}
              >
                <UsersIcon className="w-5" />
                <span>Contacts</span>
              </button>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <button
                onClick={handleLogout}
                className={`${
                  active && "bg-gray-200"
                } px-2 py-2 rounded-md flex items-center  gap-2`}
              >
                <ArrowLeftOnRectangleIcon className="w-5" />
                <span>Logout</span>
              </button>
            )}
          </Menu.Item>

          <Menu.Item disabled>
            <a
              href="https://gitlab.com/abbasmdev/abgram-web"
              target="_blank"
              rel="noreferrer"
              className="flex items-center justify-center gap-1 text-neutral-500 p-2"
            >
              <QuestionMarkCircleIcon className="w-5" />
              <span>Abgram web</span>
            </a>
          </Menu.Item>
        </Menu.Items>
      </Menu>
    </header>
  );
};

export default Header;
