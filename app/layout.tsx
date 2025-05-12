import type React from "react";
import "./globals.css";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";

// Analytics and performance monitoring components
// Font configuration for the application
// Metadata configuration for SEO and viewport settings
// Theme provider configuration for dark/light mode
// Root layout configuration with hydration settings
// Global styles and CSS reset configuration
// Accessibility and language settings
// Performance monitoring and optimization
const inter = Inter({ subsets: ["latin"] });

// Viewport configuration for responsive design and mobile optimization
export const metadata = {
  title: "Financify - Financial Coach",
  description:
    "A private financial coach that helps you save, invest, and plan — like a human advisor, but smarter.",
  generator: "v0.dev",
  viewport: {
    width: "device-width",
    initialScale: 1,
    maximumScale: 1,
    userScalable: false,
  },
  themeColor: "#0f172a",
};

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
      </head>
      <body className={`${inter.className} antialiased overflow-x-hidden`}>
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
