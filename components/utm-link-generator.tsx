"use client";

import { useState } from "react";
import { buildUTMUrl, UTMHelpers } from "@/lib/source-tracking";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Copy, Check, Sparkles } from "lucide-react";

/**
 * UTM Link Generator Component
 * 
 * A helpful tool for generating UTM-tagged URLs for marketing campaigns.
 * This component provides an easy interface to create tracked links.
 */
export function UTMLinkGenerator() {
  const [baseUrl, setBaseUrl] = useState("https://financify.ing");
  const [generatedUrl, setGeneratedUrl] = useState("");
  const [copied, setCopied] = useState(false);

  // Manual UTM parameters
  const [utmSource, setUtmSource] = useState("");
  const [utmMedium, setUtmMedium] = useState("");
  const [utmCampaign, setUtmCampaign] = useState("");
  const [utmTerm, setUtmTerm] = useState("");
  const [utmContent, setUtmContent] = useState("");

  // Quick generator states
  const [quickPlatform, setQuickPlatform] = useState("twitter");
  const [quickCampaign, setQuickCampaign] = useState("");

  const handleCopy = async () => {
    if (generatedUrl) {
      await navigator.clipboard.writeText(generatedUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const generateManualUrl = () => {
    if (!utmSource) {
      alert("UTM Source is required!");
      return;
    }
    const url = buildUTMUrl(baseUrl, {
      utm_source: utmSource,
      utm_medium: utmMedium || undefined,
      utm_campaign: utmCampaign || undefined,
      utm_term: utmTerm || undefined,
      utm_content: utmContent || undefined,
    });
    setGeneratedUrl(url);
  };

  const generateQuickUrl = () => {
    const url = UTMHelpers.socialMedia(baseUrl, quickPlatform, quickCampaign || undefined);
    setGeneratedUrl(url);
  };

  const generateEmailUrl = () => {
    const url = UTMHelpers.email(baseUrl, utmCampaign || "newsletter", utmContent || undefined);
    setGeneratedUrl(url);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          UTM Link Generator
        </CardTitle>
        <CardDescription>
          Generate tracked URLs for your marketing campaigns. Perfect for social media, emails, and ads.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="baseUrl">Base URL</Label>
            <Input
              id="baseUrl"
              value={baseUrl}
              onChange={(e) => setBaseUrl(e.target.value)}
              placeholder="https://financify.ing"
            />
          </div>

          <Tabs defaultValue="quick" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="quick">Quick</TabsTrigger>
              <TabsTrigger value="manual">Manual</TabsTrigger>
              <TabsTrigger value="email">Email</TabsTrigger>
            </TabsList>

            <TabsContent value="quick" className="space-y-4">
              <div>
                <Label htmlFor="platform">Social Platform</Label>
                <select
                  id="platform"
                  value={quickPlatform}
                  onChange={(e) => setQuickPlatform(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background"
                >
                  <option value="twitter">Twitter/X</option>
                  <option value="linkedin">LinkedIn</option>
                  <option value="facebook">Facebook</option>
                  <option value="instagram">Instagram</option>
                  <option value="reddit">Reddit</option>
                  <option value="youtube">YouTube</option>
                  <option value="tiktok">TikTok</option>
                </select>
              </div>
              <div>
                <Label htmlFor="quickCampaign">Campaign Name (optional)</Label>
                <Input
                  id="quickCampaign"
                  value={quickCampaign}
                  onChange={(e) => setQuickCampaign(e.target.value)}
                  placeholder="product_launch"
                />
              </div>
              <Button onClick={generateQuickUrl} className="w-full">
                Generate URL
              </Button>
            </TabsContent>

            <TabsContent value="manual" className="space-y-4">
              <div>
                <Label htmlFor="utmSource">
                  UTM Source <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="utmSource"
                  value={utmSource}
                  onChange={(e) => setUtmSource(e.target.value)}
                  placeholder="twitter, google, newsletter"
                  required
                />
              </div>
              <div>
                <Label htmlFor="utmMedium">UTM Medium</Label>
                <Input
                  id="utmMedium"
                  value={utmMedium}
                  onChange={(e) => setUtmMedium(e.target.value)}
                  placeholder="social, email, cpc"
                />
              </div>
              <div>
                <Label htmlFor="utmCampaign">UTM Campaign</Label>
                <Input
                  id="utmCampaign"
                  value={utmCampaign}
                  onChange={(e) => setUtmCampaign(e.target.value)}
                  placeholder="product_launch, summer_sale"
                />
              </div>
              <div>
                <Label htmlFor="utmTerm">UTM Term (for paid ads)</Label>
                <Input
                  id="utmTerm"
                  value={utmTerm}
                  onChange={(e) => setUtmTerm(e.target.value)}
                  placeholder="financial advisor"
                />
              </div>
              <div>
                <Label htmlFor="utmContent">UTM Content (for A/B testing)</Label>
                <Input
                  id="utmContent"
                  value={utmContent}
                  onChange={(e) => setUtmContent(e.target.value)}
                  placeholder="button_red, header_link"
                />
              </div>
              <Button onClick={generateManualUrl} className="w-full">
                Generate URL
              </Button>
            </TabsContent>

            <TabsContent value="email" className="space-y-4">
              <div>
                <Label htmlFor="emailCampaign">Campaign Name</Label>
                <Input
                  id="emailCampaign"
                  value={utmCampaign}
                  onChange={(e) => setUtmCampaign(e.target.value)}
                  placeholder="monthly_newsletter"
                />
              </div>
              <div>
                <Label htmlFor="emailContent">Content Variant (optional)</Label>
                <Input
                  id="emailContent"
                  value={utmContent}
                  onChange={(e) => setUtmContent(e.target.value)}
                  placeholder="header, footer, sidebar"
                />
              </div>
              <Button onClick={generateEmailUrl} className="w-full">
                Generate Email URL
              </Button>
            </TabsContent>
          </Tabs>

          {generatedUrl && (
            <div className="space-y-2 pt-4 border-t">
              <Label>Generated URL</Label>
              <div className="flex gap-2">
                <Input value={generatedUrl} readOnly className="font-mono text-sm" />
                <Button
                  onClick={handleCopy}
                  variant="outline"
                  size="icon"
                  className="shrink-0"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Copy this URL and use it in your marketing campaigns. All clicks will be tracked automatically.
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

