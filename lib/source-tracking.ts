/**
 * Source tracking utilities
 * Handles URL parameters like ?source=twitter, ?utm_source=twitter, etc.
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
 * Example usage for social media links:
 * 
 * Twitter: addSourceToUrl("https://financify.ing", "twitter", { medium: "social", campaign: "launch" })
 * LinkedIn: addSourceToUrl("https://financify.ing", "linkedin", { medium: "social" })
 * Facebook: addSourceToUrl("https://financify.ing", "facebook", { medium: "social" })
 */

