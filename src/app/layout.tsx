import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { I18nProvider } from "@/lib/i18n/context";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "CalcMaster - 全能在线计算工具 | 免费单位换算与计算器",
    template: "%s | CalcMaster"
  },
  description: "免费的在线计算工具，包含单位换算、房贷计算器、BMI计算器、折扣计算器、复利计算器等多种实用工具，支持中英文切换",
  keywords: "在线计算器,单位换算,房贷计算器,BMI计算器,折扣计算器,复利计算器,日期计算器,预产期计算器,宝宝生长百分位,免费计算工具",
  openGraph: {
    type: 'website',
    locale: 'zh_CN',
    url: 'https://calcmaster.com',
    siteName: 'CalcMaster',
    title: 'CalcMaster - 全能在线计算工具',
    description: '免费的在线计算工具，包含单位换算、房贷计算器、BMI计算器等多种实用工具'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CalcMaster - 全能在线计算工具',
    description: '免费的在线计算工具，包含单位换算、房贷计算器、BMI计算器等多种实用工具'
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    }
  },
  verification: {
    google: '',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="zh-CN"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-gray-50">
        <I18nProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </I18nProvider>
      </body>
    </html>
  );
}
