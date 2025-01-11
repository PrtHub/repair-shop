import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s | Repair Shop",
    default: "Repair Shop",
  },
  description:
    "its a repair shop, you can repair your phone here, if you want. we will repair your phone for free.",
    applicationName: "Repair Shop",
    openGraph: {
        title: "Repair Shop",
        description:
            "its a repair shop, you can repair your phone here, if you want. we will repair your phone for free.",
        // images: [
        //     {
        //         url: "https://res.cloudinary.com/artifact-z7/image/upload/v1694991250/repair-shop/repair-shop_og-image.png",
        //     },
        // ],
    },
    keywords: ["repair", "shop", "phone", "repair shop", "phone repair", 'nextjs', 'vercel', 'sentry', 'react', 'next', 'tailwindcss', 'typescript', 'javascript', 'vercel', 'vercel edge functions', 'vercel edge middleware', 'vercel edge routes'],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
