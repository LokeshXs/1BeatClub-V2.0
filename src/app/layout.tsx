import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
import NavBar from "@/components/NavBar";
import Footer from "@/components/landing/Footer";
import MobileNav from "@/components/common/MobileNav";
import MobileNavContextProvider from "@/context/MobileNavContextProvider";
import { GoogleAnalytics } from '@next/third-parties/google'
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({
  weight: ["400", "500", "600", "700", "800"],
  subsets: ["latin"],
});
export const metadata: Metadata = {
  title: "1Beatclub — Where Music Brings Everyone Together",
  description:
    "Create music clubs, add songs, vote for the next track, and enjoy together — whether at a gym, party, wedding, or home gathering. 1Beatclub makes shared music experiences effortless and fun.",
  keywords: [
    "1Beatclub",
    "music club app",
    "shared playlists",
    "party music app",
    "group music voting",
    "real-time music experience",
    "social music platform",
    "club playlist",
    "music",
    "party"
  ],
  openGraph: {
    title: "1Beatclub — Music. Moments. Together.",
    description:
      "Host the vibe. Vote for songs. Enjoy music together. 1Beatclub lets friends create shared playlists for any occasion — parties, gyms, or casual hangouts.",
    url: "https://1beatclub.com",
    siteName: "1Beatclub",
    images: [
      {
        url: "/showcard.png",
        width: 1200,
        height: 630,
        alt: "1Beatclub - Share Music Moments Together",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "1Beatclub - Share the beat with your crew",
    description:
      "Create a club, add songs, and let everyone vote on what plays next. 1Beatclub turns any gathering into a shared music experience.",
    images: "/showcard.png",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider appearance={{ baseTheme: dark, cssLayerName: "clerk" }}>
      <html lang="en" className="light">
        <body className={`${inter.className}  antialiased`}>
          <main className=" bg-background relative">
            <MobileNavContextProvider>

            <NavBar />
             <MobileNav />
            {children}
            </MobileNavContextProvider>
            <Footer />
          </main>
                  <GoogleAnalytics gaId="G-GL9GTQX9YY" />
                       <Analytics />
        </body>
      </html>
    </ClerkProvider>
  );
}
