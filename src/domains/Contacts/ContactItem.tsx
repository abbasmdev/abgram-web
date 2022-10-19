import Image from "next/image";
import Link from "next/link";
import { FC } from "react";
import { useAsync } from "react-use";
import { Api } from "telegram";
import { useTelegram } from "../../core/telegram";

const ContactItem: FC<{ user: Api.User }> = ({ user }) => {
  const { client } = useTelegram();
  const { value: photo } = useAsync(async () => {
    return await user.getPhoto(client);
  });

  return (
    <Link href={`/chat/${user.id}`}>
      <a>
        <div className="flex gap-2 hover:bg-gray-200 p-2">
          <Image
            className="rounded-full"
            src={photo ?? "https://fakeimg.pl/54x54/"}
            width={54}
            height={54}
            alt={user.getFormattedName() + " profile image"}
          />
          <div>
            <p className="font-semibold">{user.getFormattedName()}</p>
            <span className="text-sm text-neutral-500">
              {user.getFormattedLastSeen()}
            </span>
          </div>
        </div>
      </a>
    </Link>
  );
};

export default ContactItem;
