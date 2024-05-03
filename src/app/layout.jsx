import { Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Exam Management System",
  description: "It manage students exam management",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className + " dark:bg-gray-900 dark:text-white bg-gray-100 text-gray-900"}>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
