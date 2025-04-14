import type { Metadata } from "next";
import "@styles/globals.css";
import { ClientLayout } from "components/bsUi/clientLayout";

export const metadata: Metadata = {
  title: "Reading Time",
  description: "Reading book for yourself",
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`antialiased`}
      >
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
