import { Inter } from "next/font/google";
import "./global.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Lib Suggest App",
  description: "Recomendations based on the loans of any library",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta
          http-equiv="Content-Security-Policy"
          content="upgrade-insecure-requests"
        />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
