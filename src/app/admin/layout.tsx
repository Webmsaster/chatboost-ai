import { Inter } from "next/font/google";
import "../globals.css";

const inter = Inter({ variable: "--font-inter", subsets: ["latin"] });

export const metadata = {
  title: "Admin – ChatBoost AI",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" className="dark">
      <body className={`${inter.variable} antialiased bg-[#030014] text-white min-h-screen`}>
        {children}
      </body>
    </html>
  );
}
