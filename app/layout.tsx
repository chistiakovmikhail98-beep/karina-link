import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin", "cyrillic"],
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Карина Мамедова | Деньги на экспертности",
  description:
    "Помогаю экспертам превращать знания в деньги. Бесплатные AI-инструменты, распаковка, стратегия запуска.",
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
      <body className={`${inter.variable} ${playfair.variable} font-[family-name:var(--font-inter)] antialiased`}>{children}</body>
    </html>
  );
}
