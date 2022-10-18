import { useRouter } from "next/router";
import QRCodeStyling from "qr-code-styling";
import { useEffect, useRef } from "react";
import { useTelegram } from "../../core/telegram";

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
  const qrRequestRef = useRef(false);
  const router = useRouter();

  const { client, apiHash, apiId } = useTelegram();

  useEffect(() => {
    if (!client || qrRequestRef.current) return;
    qrRequestRef.current = true;

    client
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
      .catch((e) => {})
      .finally(() => {
        qrRequestRef.current = false;
      });
  }, [apiHash, apiId, client, router]);

  useEffect(() => {
    if (ref.current) qrCode.append(ref.current);
  }, []);

  return <div ref={ref} />;
};

export default AuthQR;
