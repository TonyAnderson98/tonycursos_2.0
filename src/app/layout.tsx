'use client'
import "@/fonts/fonts";
import "./globals.css";
import { SessionProvider } from "next-auth/react";
import Header from "./components/Header";


export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body>
        <SessionProvider>
          <Header />
          {children}
        </SessionProvider>
      </body>
    </html>
  );
}