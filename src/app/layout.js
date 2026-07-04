import { Playfair_Display, Outfit } from "next/font/google";
import "./globals.css";
import { CartProvider } from "@/context/CartContext";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import sql from "@/lib/db";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

const outfit = Outfit({
  subsets: ["latin"],
  variable: "--font-outfit",
  display: "swap",
});

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
};

export const metadata = {
  title: "Taste Bite - Modern Digital Dining & Instant Ordering",
  description: "Scan the QR code at your table to explore our gourmet menu, order your favorite dishes, and complete payment directly from your phone.",
};

export default async function RootLayout({ children }) {
  let theme = null;
  try {
    const result = await sql`SELECT value FROM settings WHERE key = 'theme'`;
    if (result.length > 0) {
      theme = result[0].value;
    }
  } catch (err) {
    console.error("Error fetching theme:", err);
  }

  return (
    <html
      lang="en"
      className={`${playfair.variable} ${outfit.variable} h-full scroll-smooth antialiased`}
    >
      <head>
        {theme && (
          <style>{`
            :root {
              --color-primary: ${theme.primary};
              --color-primary-dark: ${theme.primaryDark};
              --color-primary-light: ${theme.primaryLight};
              --color-accent: ${theme.accent};
              --color-accent-dark: ${theme.accentDark};
              --color-cream: ${theme.cream};
              --color-cream-dark: ${theme.creamDark};
              --color-dark: ${theme.dark};
              --color-dark-muted: ${theme.darkMuted};
            }
          `}</style>
        )}
      </head>
      <body className="min-h-full flex flex-col bg-cream text-dark">
        <CartProvider>
          <Header />
          <main className="flex-grow">{children}</main>
          <Footer />
          <WhatsAppButton />
        </CartProvider>
      </body>
    </html>
  );
}
