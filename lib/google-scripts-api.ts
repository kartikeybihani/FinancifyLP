/**
 * Utility for Google Apps Script API calls with retry logic and error handling
 */

const GOOGLE_SCRIPT_URL =
  "https://script.google.com/macros/s/AKfycbyHz0JO0aq0rzS64CPoFJxE53xviNjfA1TyGcJBZohdeb2OCejU2hj-N7Ltt7Y-ndoD/exec";

interface SubmissionPayload {
  type: "contact" | "waitlist";
  email?: string;
  name?: string;
  message?: string;
  source?: string;
  sourceData?: any;
}

interface RetryOptions {
  maxRetries?: number;
  retryDelay?: number;
  onRetry?: (attempt: number) => void;
}

const DEFAULT_RETRY_OPTIONS: Required<RetryOptions> = {
  maxRetries: 3,
  retryDelay: 1000, // 1 second
  onRetry: () => {},
};

/**
 * Queue for failed requests that can be retried later
 */
const failedRequestsQueue: Array<{ payload: SubmissionPayload; timestamp: number }> = [];

/**
 * Process queued failed requests (can be called on page visibility change or periodically)
 */
export function processFailedRequests() {
  if (failedRequestsQueue.length === 0) return;

  const now = Date.now();
  const requestsToRetry = failedRequestsQueue.filter(
    (req) => now - req.timestamp > 5000 // Retry after 5 seconds
  );

  requestsToRetry.forEach((req) => {
    const index = failedRequestsQueue.indexOf(req);
    failedRequestsQueue.splice(index, 1);
    submitToGoogleScript(req.payload, { maxRetries: 1 }); // Single retry for queued requests
  });
}

/**
 * Submit data to Google Apps Script with retry logic
 */
export async function submitToGoogleScript(
  payload: SubmissionPayload,
  options: RetryOptions = {}
): Promise<boolean> {
  const opts = { ...DEFAULT_RETRY_OPTIONS, ...options };
  let lastError: Error | null = null;

  for (let attempt = 0; attempt <= opts.maxRetries; attempt++) {
    try {
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors", // Required for Google Apps Script
        headers: {
          "Content-Type": "text/plain",
        },
        body: JSON.stringify(payload),
      });

      // With no-cors mode, we can't read the response, but if no error is thrown, assume success
      return true;
    } catch (error) {
      lastError = error instanceof Error ? error : new Error(String(error));
      
      // If not the last attempt, wait before retrying
      if (attempt < opts.maxRetries) {
        opts.onRetry(attempt + 1);
        await new Promise((resolve) => setTimeout(resolve, opts.retryDelay * (attempt + 1)));
      }
    }
  }

  // All retries failed - queue for later retry
  failedRequestsQueue.push({
    payload,
    timestamp: Date.now(),
  });

  console.error("Failed to submit to Google Script after retries:", lastError);
  return false;
}

/**
 * Initialize periodic processing of failed requests
 */
export function initFailedRequestProcessor() {
  // Process failed requests when page becomes visible
  if (typeof window !== "undefined") {
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) {
        processFailedRequests();
      }
    });

    // Process failed requests periodically (every 30 seconds)
    setInterval(() => {
      processFailedRequests();
    }, 30000);
  }
}

