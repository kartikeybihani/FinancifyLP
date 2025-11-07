import type React from "react";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import { SourceTracker } from "@/components/source-tracker";

const inter = Inter({ subsets: ["latin"] });

// Viewport configuration for responsive design and mobile optimization
export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: "#1e293b",
};

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://financify.ing";
const siteName = "Financify";
const siteDescription =
  "Your AI-powered financial advisor for smarter saving and investing decisions.";
const author = "Financify Team";
const publisher = "Financify";

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Financify - AI Financial Advisor",
    template: "%s | Financify",
  },
  description: siteDescription,
  generator: "Next.js",
  applicationName: siteName,
  referrer: "origin-when-cross-origin",
  keywords: [
    "financial advisor",
    "AI financial advisor",
    "personal finance",
    "investment advisor",
    "financial planning",
    "savings",
    "budgeting",
    "wealth management",
  ],
  authors: [{ name: author, url: siteUrl }],
  creator: author,
  publisher: publisher,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: siteName,
    title: "Financify - AI Financial Advisor",
    description: siteDescription,
    images: [
      {
        url: `${siteUrl}/mascot1.jpg`,
        width: 1200,
        height: 630,
        alt: "Financify - AI Financial Advisor",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Financify - AI Financial Advisor",
    description: siteDescription,
    creator: "@financify",
    images: [`${siteUrl}/mascot1.jpg`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Add your verification codes here when available
    // google: "your-google-verification-code",
    // yandex: "your-yandex-verification-code",
    // yahoo: "your-yahoo-verification-code",
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: [
      { url: "/main1.png", type: "image/png" },
      { url: "/main1.png", sizes: "32x32", type: "image/png" },
      { url: "/main1.png", sizes: "16x16", type: "image/png" },
    ],
    apple: [{ url: "/main1.png", sizes: "180x180", type: "image/png" }],
    shortcut: "/main1.png",
  },
};

// Structured Data for SEO and source attribution
function StructuredDataScripts() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteName,
    url: siteUrl,
    logo: `${siteUrl}/mascot1.jpg`,
    description: siteDescription,
    sameAs: [
      // Add your social media profiles here
      // "https://twitter.com/financify",
      // "https://www.linkedin.com/company/financify",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
    },
    foundingDate: "2024",
    founder: {
      "@type": "Person",
      name: author,
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    url: siteUrl,
    description: siteDescription,
    publisher: {
      "@type": "Organization",
      name: siteName,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/mascot1.jpg`,
      },
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  const softwareApplicationSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteName,
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web Browser",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    description: siteDescription,
    url: siteUrl,
    author: {
      "@type": "Organization",
      name: siteName,
    },
    publisher: {
      "@type": "Organization",
      name: siteName,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/mascot1.jpg`,
      },
    },
  };

  return (
    <>
      <Script
        id="organization-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <Script
        id="software-application-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareApplicationSchema),
        }}
      />
    </>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <link rel="icon" href="/main1.png" type="image/png" />
        <link rel="apple-touch-icon" href="/main1.png" />
      </head>
      <body className={`${inter.className} antialiased overflow-x-hidden`}>
        <StructuredDataScripts />
        <SourceTracker />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
