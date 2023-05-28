import "./globals.css";
import { Roboto } from "next/font/google";

const inter = Roboto({ weight: ["400", "700"], subsets: ["latin"] });

export const metadata = {
  title: "Perdidos y Encontrados",
  description: "Sitio donde publicar y encontrar objetos perdidos",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
