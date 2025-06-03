import type { Metadata } from "next";
import { Inter, Lato } from "next/font/google";
import "./globals.css";
import ClientBody from "./ClientBody";
import { CartProvider } from "@/contexts/CartContext";
import { AuthProvider } from "@/contexts/AuthContext";
import CartDrawer from "@/components/CartDrawer";
import LoginModal from "@/components/LoginModal";
import SignupModal from "@/components/SignupModal";
import VisualEditing from "@/components/VisualEditing";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const lato = Lato({
  variable: "--font-lato",
  subsets: ["latin"],
  weight: ["300", "400", "700"],
});

export const metadata: Metadata = {
  title: "INKEY | Free US Shipping On Your First Order",
  description: "INKEY (formerly The INKEY List) delivers knowledge-powered skincare for every concern. Order today & get free shipping on your first purchase!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${lato.variable}`}>
      <body suppressHydrationWarning className="antialiased font-inter">
        <AuthProvider>
          <CartProvider>
            <ClientBody>{children}</ClientBody>
            <CartDrawer />
            <LoginModal />
            <SignupModal />
            <VisualEditing />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
