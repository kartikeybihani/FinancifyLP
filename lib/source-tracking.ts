/**
 * Source tracking utilities
 * Handles URL parameters like ?source=twitter, ?utm_source=twitter, etc.
 * 
 * UTM Parameters Explained:
 * - utm_source: Where the traffic comes from (e.g., google, facebook, newsletter)
 * - utm_medium: The marketing medium (e.g., cpc, email, social, organic)
 * - utm_campaign: The specific campaign name (e.g., summer_sale, product_launch)
 * - utm_term: Search terms (mainly for paid search ads)
 * - utm_content: Differentiates similar content/links (for A/B testing)
 */

export interface SourceData {
  source: string | null;
  medium: string | null;
  campaign: string | null;
  term: string | null;
  content: string | null;
  referrer: string | null;
  timestamp: string;
}

export interface UTMParams {
  utm_source: string;
  utm_medium?: string;
  utm_campaign?: string;
  utm_term?: string;
  utm_content?: string;
}

/**
 * Extract source tracking parameters from URL
 * Supports both custom ?source= and standard UTM parameters
 */
export function getSourceFromUrl(): SourceData {
  if (typeof window === "undefined") {
    return {
      source: null,
      medium: null,
      campaign: null,
      term: null,
      content: null,
      referrer: null,
      timestamp: new Date().toISOString(),
    };
  }

  const params = new URLSearchParams(window.location.search);
  const referrer = document.referrer || null;

  // Check for custom ?source= parameter first, then fall back to utm_source
  const source =
    params.get("source") ||
    params.get("utm_source") ||
    getSourceFromReferrer(referrer);

  return {
    source,
    medium: params.get("medium") || params.get("utm_medium") || null,
    campaign: params.get("campaign") || params.get("utm_campaign") || null,
    term: params.get("term") || params.get("utm_term") || null,
    content: params.get("content") || params.get("utm_content") || null,
    referrer,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Detect source from referrer URL
 */
function getSourceFromReferrer(referrer: string | null): string | null {
  if (!referrer) return null;

  try {
    const url = new URL(referrer);
    const hostname = url.hostname.toLowerCase();

    // Common social media platforms
    if (hostname.includes("twitter.com") || hostname.includes("x.com")) {
      return "twitter";
    }
    if (hostname.includes("facebook.com")) {
      return "facebook";
    }
    if (hostname.includes("linkedin.com")) {
      return "linkedin";
    }
    if (hostname.includes("instagram.com")) {
      return "instagram";
    }
    if (hostname.includes("reddit.com")) {
      return "reddit";
    }
    if (hostname.includes("youtube.com")) {
      return "youtube";
    }
    if (hostname.includes("tiktok.com")) {
      return "tiktok";
    }
    if (hostname.includes("google.com")) {
      return "google";
    }

    return hostname;
  } catch {
    return null;
  }
}

/**
 * Store source data in localStorage for persistence
 */
export function storeSourceData(data: SourceData): void {
  if (typeof window === "undefined") return;

  try {
    // Store current session source
    localStorage.setItem("source_tracking", JSON.stringify(data));

    // Also store in a history array (keep last 10)
    const history = JSON.parse(
      localStorage.getItem("source_tracking_history") || "[]"
    );
    history.unshift(data);
    if (history.length > 10) {
      history.pop();
    }
    localStorage.setItem("source_tracking_history", JSON.stringify(history));
  } catch (error) {
    console.error("Error storing source data:", error);
  }
}

/**
 * Get stored source data from localStorage
 */
export function getStoredSourceData(): SourceData | null {
  if (typeof window === "undefined") return null;

  try {
    const stored = localStorage.getItem("source_tracking");
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

/**
 * Generate a URL with source tracking parameters
 * Use this when creating links for social media posts
 */
export function addSourceToUrl(
  url: string,
  source: string,
  options?: {
    medium?: string;
    campaign?: string;
    term?: string;
    content?: string;
  }
): string {
  try {
    const urlObj = new URL(url);
    urlObj.searchParams.set("source", source);

    if (options?.medium) {
      urlObj.searchParams.set("medium", options.medium);
    }
    if (options?.campaign) {
      urlObj.searchParams.set("campaign", options.campaign);
    }
    if (options?.term) {
      urlObj.searchParams.set("term", options.term);
    }
    if (options?.content) {
      urlObj.searchParams.set("content", options.content);
    }

    return urlObj.toString();
  } catch {
    // If URL parsing fails, append as query string
    const separator = url.includes("?") ? "&" : "?";
    return `${url}${separator}source=${encodeURIComponent(source)}`;
  }
}

/**
 * Generate a URL with standard UTM parameters (Google Analytics compatible)
 * This is the recommended method for professional marketing tracking
 * 
 * @param baseUrl - The base URL to add UTM parameters to
 * @param params - UTM parameters object
 * @returns URL with UTM parameters appended
 * 
 * @example
 * // Social media post
 * buildUTMUrl("https://financify.ing", {
 *   utm_source: "twitter",
 *   utm_medium: "social",
 *   utm_campaign: "product_launch"
 * })
 * // Returns: https://financify.ing?utm_source=twitter&utm_medium=social&utm_campaign=product_launch
 * 
 * @example
 * // Email newsletter
 * buildUTMUrl("https://financify.ing", {
 *   utm_source: "newsletter",
 *   utm_medium: "email",
 *   utm_campaign: "monthly_update",
 *   utm_content: "cta_button"
 * })
 */
export function buildUTMUrl(baseUrl: string, params: UTMParams): string {
  try {
    const urlObj = new URL(baseUrl);
    
    // Always include utm_source (required)
    urlObj.searchParams.set("utm_source", params.utm_source);
    
    // Add optional parameters
    if (params.utm_medium) {
      urlObj.searchParams.set("utm_medium", params.utm_medium);
    }
    if (params.utm_campaign) {
      urlObj.searchParams.set("utm_campaign", params.utm_campaign);
    }
    if (params.utm_term) {
      urlObj.searchParams.set("utm_term", params.utm_term);
    }
    if (params.utm_content) {
      urlObj.searchParams.set("utm_content", params.utm_content);
    }
    
    return urlObj.toString();
  } catch (error) {
    // If URL parsing fails, append as query string
    const separator = baseUrl.includes("?") ? "&" : "?";
    const paramsArray: string[] = [`utm_source=${encodeURIComponent(params.utm_source)}`];
    
    if (params.utm_medium) {
      paramsArray.push(`utm_medium=${encodeURIComponent(params.utm_medium)}`);
    }
    if (params.utm_campaign) {
      paramsArray.push(`utm_campaign=${encodeURIComponent(params.utm_campaign)}`);
    }
    if (params.utm_term) {
      paramsArray.push(`utm_term=${encodeURIComponent(params.utm_term)}`);
    }
    if (params.utm_content) {
      paramsArray.push(`utm_content=${encodeURIComponent(params.utm_content)}`);
    }
    
    return `${baseUrl}${separator}${paramsArray.join("&")}`;
  }
}

/**
 * Quick helper functions for common UTM scenarios
 */
export const UTMHelpers = {
  /**
   * Generate UTM URL for social media posts
   */
  socialMedia: (baseUrl: string, platform: string, campaign?: string) => {
    return buildUTMUrl(baseUrl, {
      utm_source: platform.toLowerCase(),
      utm_medium: "social",
      utm_campaign: campaign || "social_post",
    });
  },

  /**
   * Generate UTM URL for email campaigns
   */
  email: (baseUrl: string, campaign: string, content?: string) => {
    return buildUTMUrl(baseUrl, {
      utm_source: "email",
      utm_medium: "email",
      utm_campaign: campaign,
      utm_content: content,
    });
  },

  /**
   * Generate UTM URL for paid ads
   */
  paidAd: (baseUrl: string, source: string, campaign: string, term?: string) => {
    return buildUTMUrl(baseUrl, {
      utm_source: source,
      utm_medium: "cpc", // Cost Per Click
      utm_campaign: campaign,
      utm_term: term,
    });
  },

  /**
   * Generate UTM URL for content/blog posts
   */
  content: (baseUrl: string, source: string, campaign: string, content?: string) => {
    return buildUTMUrl(baseUrl, {
      utm_source: source,
      utm_medium: "referral",
      utm_campaign: campaign,
      utm_content: content,
    });
  },
};

/**
 * Example usage for social media links:
 * 
 * Twitter: addSourceToUrl("https://financify.ing", "twitter", { medium: "social", campaign: "launch" })
 * LinkedIn: addSourceToUrl("https://financify.ing", "linkedin", { medium: "social" })
 * Facebook: addSourceToUrl("https://financify.ing", "facebook", { medium: "social" })
 * 
 * Or use the new UTM helpers:
 * Twitter: UTMHelpers.socialMedia("https://financify.ing", "twitter", "launch")
 * LinkedIn: UTMHelpers.socialMedia("https://financify.ing", "linkedin", "launch")
 * Email: UTMHelpers.email("https://financify.ing", "monthly_newsletter", "header_cta")
 */

