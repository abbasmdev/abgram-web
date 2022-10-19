import Image from "next/image";
import Link from "next/link";
import React from "react";

const ContactItem = () => {
  return (
    <Link href={"/chat/1"}>
      <a>
        <div className="flex gap-2 hover:bg-gray-200 p-2">
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
      </a>
    </Link>
  );
};

export default ContactItem;
