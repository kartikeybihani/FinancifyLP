"use client";

import { useEffect } from "react";
import { getSourceFromUrl, storeSourceData } from "@/lib/source-tracking";
import { track } from "@vercel/analytics";

/**
 * Source Tracker Component
 *
 * This component automatically:
 * 1. Captures source parameters from URL (?source=twitter, ?utm_source=twitter, etc.)
 * 2. Stores them in localStorage for persistence
 * 3. Tracks them in Vercel Analytics
 * 4. Detects source from referrer if no URL params present
 *
 * Add this component to your root layout to track all page visits.
 */
export function SourceTracker() {
  useEffect(() => {
    // Get source data from URL parameters
    const sourceData = getSourceFromUrl();

    // Only track if we have a source
    if (sourceData.source) {
      // Store in localStorage for later use (e.g., form submissions)
      storeSourceData(sourceData);

      // Track in Vercel Analytics with comprehensive UTM data
      track("source_visit", {
        source: sourceData.source,
        medium: sourceData.medium || "unknown",
        campaign: sourceData.campaign || "none",
        term: sourceData.term || "none",
        content: sourceData.content || "none",
        referrer: sourceData.referrer || "direct",
        timestamp: sourceData.timestamp,
      });

      // Optional: Clean up URL by removing tracking parameters
      // This keeps the URL clean after tracking
      if (typeof window !== "undefined" && window.history) {
        const url = new URL(window.location.href);
        const paramsToRemove = [
          "source",
          "utm_source",
          "medium",
          "utm_medium",
          "campaign",
          "utm_campaign",
          "term",
          "utm_term",
          "content",
          "utm_content",
        ];

        let hasChanges = false;
        paramsToRemove.forEach((param) => {
          if (url.searchParams.has(param)) {
            url.searchParams.delete(param);
            hasChanges = true;
          }
        });

        // Replace URL without tracking params (doesn't reload page)
        if (hasChanges) {
          window.history.replaceState({}, "", url.toString());
        }
      }
    } else if (sourceData.referrer) {
      // Track referrer even if no explicit source parameter
      track("referrer_visit", {
        referrer: sourceData.referrer,
      });
    }
  }, []);

  // This component doesn't render anything
  return null;
}
