import type { Metadata } from "next";
import { Manrope, Playfair_Display } from "next/font/google";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-sans",
  subsets: ["latin", "cyrillic"],
  weight: ["400", "500", "600", "700", "800"],
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
      <body className={`${manrope.variable} ${playfair.variable} font-[family-name:var(--font-sans)] antialiased`}>{children}</body>
    </html>
  );
}
