import React, { useEffect, useState } from "react";
import { Parser } from "xml2js";

const RSSFeed = () => {
  const [feedData, setFeedData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchRSSFeed = async () => {
    setLoading(true);
    setError(null);
    
    // Try multiple RSS feed URLs for the China Defense Blog
    const rssUrls = [
      "https://china-defense.blogspot.com/feeds/posts/default?alt=rss",
      "https://china-defense.blogspot.com/feeds/posts/default",
      "https://china-defense.blogspot.com/rss.xml",
      "https://china-defense.blogspot.com/atom.xml",
      "https://china-defense.blogspot.com/feed",
      "https://china-defense.blogspot.com/rss"
    ];
    
    let feedSuccess = false;
    let lastError = null; // Declare at function scope
    
    for (const rssUrl of rssUrls) {
      if (feedSuccess) break;
      
      console.log(`Trying RSS URL: ${rssUrl}`);
      
      // Multiple CORS proxy services for redundancy
      const proxyServices = [
        {
          url: `https://api.codetabs.com/v1/proxy?quest=${encodeURIComponent(rssUrl)}`,
          name: 'codetabs.com'
        },
        {
          url: `https://proxy.cors.sh/${rssUrl}`,
          name: 'cors.sh'
        },
        {
          url: `https://corsproxy.org/?${encodeURIComponent(rssUrl)}`,
          name: 'corsproxy.org'
        },
        {
          url: `https://cors-proxy.htmldriven.com/?url=${encodeURIComponent(rssUrl)}`,
          name: 'htmldriven.com'
        },
        {
          url: `https://api.allorigins.win/get?url=${encodeURIComponent(rssUrl)}`,
          name: 'allorigins.win'
        },
        {
          url: rssUrl,
          name: 'direct (no proxy)'
        }
      ];

      // Try each proxy service until one works
      for (const proxy of proxyServices) {
        try {
          console.log(`Trying CORS proxy: ${proxy.name} with RSS URL: ${rssUrl}`);
          
          // Add timeout to prevent hanging requests
          const controller = new AbortController();
          const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
          
          const response = await fetch(proxy.url, {
            method: 'GET',
            headers: {
              'Accept': 'application/xml, text/xml, application/json, */*',
              'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
            },
            signal: controller.signal
          });
          
          clearTimeout(timeoutId);
          
          if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
          }

          let xmlText;
          
          // Handle different response formats based on proxy service
          if (proxy.name === 'allorigins.win') {
            // For allorigins.win - expects JSON response with contents property
            const data = await response.json();
            if (!data || !data.contents) {
              throw new Error("Invalid response format from proxy service");
            }
            xmlText = data.contents;
          } else {
            // For direct proxies - expects text response
            xmlText = await response.text();
          }

          if (!xmlText || xmlText.trim().length === 0) {
            throw new Error("Empty response from proxy service");
          }

          // Clean and validate XML before parsing
          // Remove any BOM, whitespace, and invalid characters
          xmlText = xmlText.trim()
            .replace(/^\uFEFF/, '') // Remove BOM
            .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, ''); // Remove control characters

          // Look for common RSS/Atom feed markers
          const xmlMarkers = ['<?xml', '<rss', '<feed', '<channel'];
          let startIndex = -1;

          for (const marker of xmlMarkers) {
            startIndex = xmlText.indexOf(marker);
            if (startIndex !== -1) {
              xmlText = xmlText.substring(startIndex);
              break;
            }
          }

          if (startIndex === -1) {
            throw new Error('Invalid feed format: Could not find valid XML or feed content');
          }

          // Parse the cleaned XML feed into JSON
          const parser = new Parser();
          parser.parseString(xmlText, (err, result) => {
            if (err) {
              throw new Error("Error parsing RSS feed: " + err.message);
            } else {
              console.log(`Successfully fetched RSS feed using: ${proxy.name} with RSS URL: ${rssUrl}`);
              setFeedData(result);
              setLoading(false);
              feedSuccess = true;
            }
          });
          
          // If we reach here, the request was successful, so break out of both loops
          if (feedSuccess) return;

        } catch (error) {
          console.warn(`Failed to fetch RSS feed using ${proxy.name} with RSS URL ${rssUrl}:`, error.message);
          lastError = error;
          // Continue to the next proxy service
        }
      }
    }

    // If all RSS URLs and proxy services failed, set the error state
    if (!feedSuccess) {
      setError(lastError ? `All RSS feed URLs and CORS proxy services failed. Last error: ${lastError.message}` : 'Unable to fetch RSS feed from any source');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRSSFeed();
  }, []);

  if (error) {
    return (
      <div className="p-4 text-red-600 bg-red-100 rounded-md">
        <p className="font-semibold">Error loading RSS feed:</p>
        <p className="text-sm mb-3">{error}</p>
        <button 
          onClick={fetchRSSFeed}
          className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!feedData) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        <span className="ml-3">Loading feed...</span>
      </div>
    );
  }

  // Extract relevant data from the parsed feed
  const entries = feedData.feed.entry || [];
  const blogTitle = feedData.feed.title?.[0] || 'Military News Feed';

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">{blogTitle}</h2>
      {entries.map((entry, index) => {
        const title = entry.title?.[0] || 'Untitled';
        const publishDate = entry.published?.[0] 
          ? new Date(entry.published[0]).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })
          : 'No date';
        const content = entry.content?.[0]?._ || entry.summary?.[0] || '';
        const categories = entry.category?.map(cat => cat.$.term) || [];
        const link = entry.link?.find(l => l.$.rel === 'alternate')?.$.href;

        return (
          <article key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <h3 className="text-xl font-semibold text-gray-800 mb-2">
              {link ? (
                <a href={link} target="_blank" rel="noopener noreferrer" className="hover:text-blue-600 transition-colors">
                  {title}
                </a>
              ) : title}
            </h3>
            <div className="flex items-center text-sm text-gray-600 mb-4">
              <time dateTime={entry.published?.[0]}>{publishDate}</time>
              {categories.length > 0 && (
                <div className="ml-4 flex flex-wrap gap-2">
                  {categories.slice(0, 3).map((category, idx) => (
                    <span key={idx} className="px-2 py-1 bg-gray-100 rounded-full text-xs">
                      {category}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <div 
              className="prose prose-sm max-w-none text-gray-700" 
              dangerouslySetInnerHTML={{ __html: content }}
            />
          </article>
        );
      })}
    </div>
  );
};

export default RSSFeed;