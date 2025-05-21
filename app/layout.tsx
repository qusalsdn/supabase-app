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
      <body className="w-screen h-screen flex items-center justify-center">
        <div className="w-96 h-full py-5">{children}</div>
        <Toaster />
      </body>
    </html>
  );
}
