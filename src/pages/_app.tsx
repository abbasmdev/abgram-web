import "../styles/globals.css";
import type { AppProps } from "next/app";
import { TelegramProvider } from "../core/telegram";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TelegramProvider>
      <Component {...pageProps} />
    </TelegramProvider>
  );
}

export default MyApp;
