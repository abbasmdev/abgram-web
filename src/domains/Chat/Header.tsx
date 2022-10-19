import { ArrowLeftIcon } from "@heroicons/react/24/solid";
import bigInt from "big-integer";
import Image from "next/image";
import { useRouter } from "next/router";
import { FC, useMemo } from "react";
import { useAsync } from "react-use";
import { Api } from "telegram";
import { useTelegram } from "../../core/telegram";
const Header: FC<{ userId: bigInt.BigInteger }> = ({ userId }) => {
  const { client } = useTelegram();
  const router = useRouter();

  const { value: contact } = useAsync(async () => {
    return await client?.invoke(
      new Api.users.GetFullUser({
        id: userId,
      })
    );
  });

  const user = useMemo(() => {
    const u = contact?.users?.[0];
    return u ? (u as Api.User) : null;
  }, [contact?.users]);

  const { value: photo } = useAsync(async () => {
    return await user.getPhoto(client);
  }, [user]);

  return (
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
          src={photo ?? "https://fakeimg.pl/54x54/"}
          width={54}
          height={54}
        />
        <div>
          <p className="font-semibold">{user?.getFormattedName()}</p>
          <span className="text-sm text-neutral-500">
            {user?.getFormattedLastSeen()}
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;
