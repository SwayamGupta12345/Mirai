import React from "react";
import "./globals.css";
import { Inter } from "next/font/google";

// ✅ Initialize font outside the component
const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Mirai - Chat Together, Think Smarter",
  description:
    "Join thousands of people who are revolutionizing their Working experience with collaborative AI assistance with friends.",
  description: "A safe AI demo built for educational purposes. No data stored.",
  icons: {
    icon: "/favicon.ico", // optional but explicit
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      {/* ✅ inter.className must be defined here */}
      <meta
        name="google-site-verification"
        content="Tw09hzfEP_noVIYeF008VqHNPbL-MdVLkUevFXKOpxs"
      />
      <link
        rel="apple-touch-icon"
        sizes="180x180"
        href="/apple-touch-icon.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href="/favicon-32x32.png"
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href="/favicon-16x16.png"
      />
      <body className={inter.className} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
