import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "react-hot-toast";
import { config } from "@fortawesome/fontawesome-svg-core";
import "@fortawesome/fontawesome-svg-core/styles.css";
config.autoAddCss = false;

export const metadata: Metadata = {
  title: "Supabase App",
  description: "Supabase App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className="px-3 py-5 w-screen h-screen">
        <div className="w-full h-full sm:hidden">{children}</div>
        <Toaster />

        <div className="w-full h-full items-center justify-center hidden sm:flex">
          <p className="text-3xl">화면 크기가 너무 큽니다...😢</p>
        </div>
      </body>
    </html>
  );
}
