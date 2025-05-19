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
        {children}
        <Toaster />
      </body>
    </html>
  );
}
