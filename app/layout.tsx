import type { Metadata } from "next";
import { Cairo, Inter } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";

const arabic = Cairo({ subsets: ["arabic"], weight: ["400", "600", "700"] });
const english = Inter({ subsets: ["latin"], weight: ["400", "600", "700"] });

export const metadata: Metadata = {
  title: "تعلم بمرح | Kids Learn",
  description: "منصة تعليمية آمنة للأطفال من 4 إلى 8 سنوات",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${arabic.className} bg-gradient-to-b from-blue-50 to-purple-50 min-h-screen`}
      >
        <LanguageProvider>
          <main className="max-w-4xl mx-auto p-4 md:p-8">{children}</main>
        </LanguageProvider>
      </body>
    </html>
  );
}
