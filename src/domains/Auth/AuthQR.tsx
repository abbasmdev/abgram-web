import React, { useEffect, useRef, useState } from "react";
import QRCodeStyling from "qr-code-styling";
import { useTelegram } from "../../core/telegram";
import { useRouter } from "next/router";
import { useAsync } from "react-use";

const qrCode = new QRCodeStyling({
  width: 240,
  height: 240,
  data: "",
  dotsOptions: {
    color: "#4267b2",
    type: "rounded",
  },
  imageOptions: {
    crossOrigin: "anonymous",
    margin: 20,
  },
});

const AuthQR = () => {
  const ref = useRef<HTMLDivElement>(null);

  const router = useRouter();

  const { client, apiHash, apiId } = useTelegram();

  useAsync(async () => {
    if (!client) return;
    return await client
      ?.signInUserWithQrCode(
        {
          apiHash,
          apiId,
        },
        {
          async qrCode(qCode) {
            const token = btoa(String.fromCharCode(...qCode.token))
              .replace(/\+/g, "-")
              .replace(/\//g, "_")
              .replace(/=+$/, "");
            qrCode.update({ data: `tg://login?token=${token}` });
          },
          onError(err) {
            console.log(err);
          },
        }
      )
      .then(() => {
        router.push("/");
      })
      .catch((e) => {});
  });

  useEffect(() => {
    if (ref.current) qrCode.append(ref.current);
  }, []);

  return <div ref={ref} />;
};

export default AuthQR;
