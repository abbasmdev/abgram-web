import "../styles/globals.css";
import type { AppProps } from "next/app";
import { TelegramProvider } from "../core/telegram";
import { AuthProvider } from "../domains/Auth/Auth.context";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <TelegramProvider>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </TelegramProvider>
  );
}

export default MyApp;
