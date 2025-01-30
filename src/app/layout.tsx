import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../css/globals.css";
import Head from "next/head";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Free PDF Page Rotator - Rotate Individual or All Pages",
  description:
    "Rotate individual or all pages in your PDF effortlessly. No downloads or sign-ups. Fast, secure, and user-friendly. Try now!",
  keywords: [
    "PDF",
    "PDF Rotate",
    "Free",
    "页面旋转",
    "在线工具",
    "PDF 编辑",
    "文件处理",
    "网站优化",
    "用户友好",
    "快速安全",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <Head>
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "PDF 页面旋转工具",
            description:
              "轻松旋转 PDF 页面，支持单页和全部页面的旋转，快速、安全、用户友好。",
            url: "https://20250128-cxks-projects-ed724242.vercel.app", // 替换为您的网站 URL
          })}
        </script>
      </Head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
