"use client";
import theme from "@/config/theme.json";
import { WalletProvider } from "@/context/walletContext";
import "@/styles/main.scss";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // import google font css
  const pf = theme.fonts.font_family.primary;
  return (
    <html suppressHydrationWarning={true} lang="en">
      <head>
        {/* google font css */}
        <link
          href={`https://fonts.googleapis.com/css2?family=${pf}&display=swap`}
          rel="stylesheet"
        />
      </head>

      <body suppressHydrationWarning={true}>
        <WalletProvider>
          <main>{children}</main>
        </WalletProvider>
      </body>
    </html>
  );
}
