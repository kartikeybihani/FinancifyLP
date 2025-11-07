# Source Tracking Guide for Financify

## Overview

Your website now tracks where visitors come from using URL parameters like `?source=twitter`. This helps you understand which marketing channels are most effective.

## How It Works

### 1. **Automatic Tracking**
- When someone visits `financify.ing?source=twitter`, the system automatically:
  - Captures the source parameter
  - Stores it in localStorage (persists across page navigation)
  - Tracks it in Vercel Analytics
  - Removes the parameter from the URL (keeps it clean)

### 2. **Referrer Detection**
- If no `?source=` parameter is present, the system detects the referrer
- Automatically identifies common sources like Twitter, LinkedIn, Facebook, etc.

### 3. **Form Submissions**
- When users submit email forms, the source is automatically included
- You'll see which source each signup came from

## How to Use Source Tracking

### For Social Media Posts

When sharing your website on social media, add the `?source=` parameter:

**Twitter/X:**
```
https://financify.ing?source=twitter
```

**LinkedIn:**
```
https://financify.ing?source=linkedin
```

**Facebook:**
```
https://financify.ing?source=facebook
```

**Instagram:**
```
https://financify.ing?source=instagram
```

### Advanced Tracking (Optional)

You can also use standard UTM parameters:

```
https://financify.ing?utm_source=twitter&utm_medium=social&utm_campaign=launch
```

Or combine both:
```
https://financify.ing?source=twitter&campaign=launch&medium=social
```

## Supported Parameters

- `source` or `utm_source` - The source (twitter, linkedin, facebook, etc.)
- `medium` or `utm_medium` - The medium (social, email, paid, etc.)
- `campaign` or `utm_campaign` - Campaign name
- `term` or `utm_term` - Search term (for paid ads)
- `content` or `utm_content` - Content variant (for A/B testing)

## Viewing Your Data

### Vercel Analytics
1. Go to your Vercel dashboard
2. Navigate to Analytics
3. Look for custom events: `source_visit` and `referrer_visit`
4. See breakdown by source, medium, and campaign

### Local Storage (Developer)
Open browser console and run:
```javascript
// Get current source
JSON.parse(localStorage.getItem('source_tracking'))

// Get source history
JSON.parse(localStorage.getItem('source_tracking_history'))

// Get all email signups with sources
JSON.parse(localStorage.getItem('waitlistEmails'))
```

## Example Links for Different Platforms

### Twitter/X Post
```
Check out Financify - Your AI financial advisor!
https://financify.ing?source=twitter
```

### LinkedIn Post
```
Excited to share Financify with you all!
https://financify.ing?source=linkedin&campaign=launch
```

### Email Newsletter
```
https://financify.ing?source=email&medium=newsletter&campaign=monthly
```

### Paid Ad Campaign
```
https://financify.ing?source=google&medium=paid&campaign=summer2024&term=financial+advisor
```

## Code Examples

### Generate Tracked URLs Programmatically

```typescript
import { addSourceToUrl } from "@/lib/source-tracking";

// Simple source
const twitterUrl = addSourceToUrl("https://financify.ing", "twitter");
// Result: https://financify.ing?source=twitter

// With campaign
const linkedInUrl = addSourceToUrl("https://financify.ing", "linkedin", {
  campaign: "launch",
  medium: "social"
});
// Result: https://financify.ing?source=linkedin&campaign=launch&medium=social
```

### Get Current Source in Your Code

```typescript
import { getStoredSourceData } from "@/lib/source-tracking";

const sourceData = getStoredSourceData();
console.log(sourceData?.source); // "twitter", "linkedin", etc.
```

## Important Notes

1. **URL Cleanup**: The tracking parameters are automatically removed from the URL after capture, so users see a clean URL
2. **Persistence**: Source data persists in localStorage, so if a user navigates around your site, the original source is remembered
3. **Privacy**: All tracking happens client-side and respects user privacy
4. **Analytics**: Data is sent to Vercel Analytics automatically

## Troubleshooting

**Q: The source isn't being tracked**
- Make sure the URL has `?source=` parameter
- Check browser console for any errors
- Verify SourceTracker component is in layout.tsx

**Q: How do I test it?**
1. Visit `financify.ing?source=test`
2. Open browser console
3. Run: `localStorage.getItem('source_tracking')`
4. You should see your source data

**Q: Can I track multiple sources?**
- The system tracks the first source a user arrives with
- Subsequent visits with different sources won't overwrite the original (unless you clear localStorage)

