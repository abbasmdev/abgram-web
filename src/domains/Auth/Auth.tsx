import dynamic from "next/dynamic";
import Head from "next/head";
import React from "react";
const AuthQR = dynamic(() => import("./AuthQR"), { ssr: false });

const Auth = () => {
  return (
    <>
      <div className="flex items-center justify-center h-screen">
        <main className="flex flex-col gap-10 items-center">
          <AuthQR />
          <h1 className="text-3xl font-bold">Login to Telegram by QR Code</h1>
          <ol className="list">
            <li>
              <span>1. Open Telegram on your phone</span>
            </li>
            <li>
              <span>
                2. Go to <b>Settings</b> {">"} <b>Devices</b> {">"}{" "}
                <b>Link Desktop Device</b>
              </span>
            </li>
            <li>
              <span>3. Point your phone at this screen to confirm login</span>
            </li>
          </ol>
        </main>
      </div>
    </>
  );
};

export default Auth;
