import type React from "react";

interface StructuredDataProps {
  type?: "Organization" | "WebSite" | "SoftwareApplication" | "all";
}

export function StructuredData({ type = "all" }: StructuredDataProps) {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://usefinny.com";
  const siteName = "Finny";
  const siteDescription =
    "Money feels overwhelming. Finny makes it simple, calm, and actually doable.";

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
      // "https://www.facebook.com/financify",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "Customer Service",
      email: "finnyadvisor@gmail.com",
      // telephone: "+1-XXX-XXX-XXXX",
    },
    foundingDate: "2024",
    founder: {
      "@type": "Person",
      name: "Finny Team",
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
    aggregateRating: {
      "@type": "AggregateRating",
      // Add ratings when available
      // ratingValue: "4.8",
      // reviewCount: "150",
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

  const schemas: Record<string, object> = {
    Organization: organizationSchema,
    WebSite: websiteSchema,
    SoftwareApplication: softwareApplicationSchema,
  };

  const getSchemas = () => {
    if (type === "all") {
      return [organizationSchema, websiteSchema, softwareApplicationSchema];
    }
    return [schemas[type]];
  };

  return (
    <>
      {getSchemas().map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
