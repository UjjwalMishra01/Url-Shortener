"use client";
import Link from "next/link";
import { Button } from "./button";
import { Check, CopyIcon, EyeIcon } from "lucide-react";
import { useEffect, useState } from "react";

export default function UrlList() {
  const shortenerUrl = (code: string) =>
    `${process.env.NEXT_PUBLIC_BASE_URL}/${code}`;

  type Url = {
    id: string;
    shortCode: string;
    originalUrl: string;
    visits: number;
  };

  const [urls, setUrls] = useState<Url[]>([]);
  const [copied, setCopied] = useState(false);
  const [copyUrl, setCopyurl] = useState("");

  const fetchUrls = async () => {
    try {
      const response = await fetch("/api/urls");
      const data = await response.json();
      setUrls(data);
    } catch (error) {
      console.error("Error fetching URLs: ", error);
    }
  };

  useEffect(() => {
    fetchUrls();
  }, []);

  const handleCopyUrl = (code: string) => {
    const fullUrl = `${shortenerUrl(code)}`;
    navigator.clipboard.writeText(fullUrl);

    setCopied(true);
    setCopyurl(code);

    setTimeout(() => {
      setCopied(false);
      setCopyurl("");
    }, 3000);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-2">Recent URLs</h2>

      <ul className="space-y-2">
        {urls.map((url) => (
          <li key={url.id} className="flex items-center justify-between bg-card rounded-md p-3 text-card-foreground border">
            <Link
              href={`/${url.shortCode}`}
              target="_blank"
              className="text-blue-600 underline"
            >
              {shortenerUrl(url.shortCode)}
            </Link>

            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => handleCopyUrl(url.shortCode)}
              >
                {copied && copyUrl === url.shortCode ? (
                  <Check className="w-4 h-4 text-green-600" />
                ) : (
                  <CopyIcon className="w-4 h-4" />
                )}
              </Button>

              <span className="flex items-center gap-1">
                <EyeIcon className="h-4 w-4" />
                {url.visits} views
              </span>
            </div>
          </li>
        ))}
      </ul>

      {copied && <p className="text-green-600 mt-2">Copied to clipboard!</p>}
    </div>
  );
}
