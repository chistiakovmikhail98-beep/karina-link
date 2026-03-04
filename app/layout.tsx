import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
});

export const metadata: Metadata = {
  title: "Карина Мамедова | Деньги на экспертности",
  description:
    "Помогаю экспертам превращать знания в деньги. Бесплатные AI-инструменты, распаковка, стратегия запуска. От 300 000 руб. за 6 недель.",
  openGraph: {
    title: "Карина Мамедова | Деньги на экспертности",
    description:
      "Бесплатные AI-инструменты для экспертов: сканер суперсилы, аудит оффера, калькулятор запуска",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <body className={`${inter.variable} antialiased`}>{children}</body>
    </html>
  );
}
