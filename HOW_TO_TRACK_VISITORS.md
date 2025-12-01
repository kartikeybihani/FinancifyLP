# How to Track Where Your Visitors Come From

## What is this?

When you share your website link on Twitter, Facebook, email, or anywhere else, you can add special tags to the link. These tags tell you exactly where each visitor came from.

**Think of it like this:** If you put up 3 signs around town advertising your business, you'd want to know which sign brought the most customers. That's what these tags do for your website.

## Why does this matter?

- **Stop guessing** - Know which social media posts work best
- **Save money** - Focus your marketing budget on what actually works
- **See results** - Know which campaigns get people to sign up

## How to use it (super simple)

### For Twitter/X posts:

Instead of sharing:
```
https://financify.ing
```

Share this:
```
https://financify.ing?utm_source=twitter&utm_medium=social&utm_campaign=my_post
```

### For LinkedIn posts:

```
https://financify.ing?utm_source=linkedin&utm_medium=social&utm_campaign=my_post
```

### For Email newsletters:

```
https://financify.ing?utm_source=newsletter&utm_medium=email&utm_campaign=monthly_update
```

### For Facebook posts:

```
https://financify.ing?utm_source=facebook&utm_medium=social&utm_campaign=my_post
```

## What do those tags mean?

- `utm_source` = Where they came from (twitter, facebook, email, etc.)
- `utm_medium` = Type of link (social, email, paid ad)
- `utm_campaign` = Name of your campaign (product_launch, summer_sale, etc.)

## Easy way to create these links

If you're a developer, you can use this code:

```typescript
import { UTMHelpers } from "@/lib/source-tracking";

// For social media
const url = UTMHelpers.socialMedia("https://financify.ing", "twitter", "my_campaign");

// For email
const url = UTMHelpers.email("https://financify.ing", "newsletter", "header");
```

## Where to see your results

1. Go to your Vercel dashboard
2. Click on "Analytics"
3. Look for events called "source_visit"
4. You'll see which sources brought the most visitors

## That's it!

Just add those tags to your links when you share them, and you'll automatically know where your visitors are coming from. The website tracks everything automatically - you don't need to do anything else.

