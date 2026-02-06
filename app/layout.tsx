import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { MetaPixel } from "@/components/MetaPixel";
import { siteConfig } from "@/lib/config";
import { AuthProvider } from "@/components/providers/SessionProvider";
import { PublicLayoutWrapper } from "@/components/providers/PublicLayoutWrapper";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "education consultancy",
    "university admission consultant",
    "college admission guidance",
    "study abroad consultancy",
    "career counseling services",
    "admission consultant in Gwalior",
  ],
  authors: [{ name: "CSEC Gwalior" }],
  creator: "CSEC Gwalior",
  openGraph: {
    type: "website",
    locale: "en_IE",
    url: "https://csecgwl.in",
    siteName: siteConfig.name,
    title: siteConfig.name,
    description: siteConfig.description,
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: siteConfig.name,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: siteConfig.name,
    description: siteConfig.description,
    images: ["/og-image.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased`}>
        <AuthProvider>
          <MetaPixel pixelId={process.env.NEXT_PUBLIC_META_PIXEL_ID} />
          <PublicLayoutWrapper>
            {children}
          </PublicLayoutWrapper>
        </AuthProvider>
      </body>
    </html>
  );
}
