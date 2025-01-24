import React, { useEffect, useState } from "react";
import { Parser } from "xml2js";

const RSSFeed = () => {
  const [feedData, setFeedData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRSSFeed = async () => {
      const rssUrl = "https://china-defense.blogspot.com/feeds/posts/default?alt=rss";
      const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(rssUrl)}`;

      try {
        // Fetch the RSS feed through the CORS proxy
        const response = await fetch(proxyUrl);
        if (!response.ok) {
          throw new Error("Network response was not ok.");
        }

        // Extract the RSS feed content from the proxy response
        const data = await response.json();
        if (!data || !data.contents) {
          throw new Error("Invalid response format from proxy service");
        }

        let xmlText = data.contents;

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
          console.error('Raw XML content:', xmlText.substring(0, 200)); // Log first 200 chars for debugging
          throw new Error('Invalid feed format: Could not find valid XML or feed content');
        }

        // Parse the cleaned XML feed into JSON
        const parser = new Parser();
        parser.parseString(xmlText, (err, result) => {
          if (err) {
            throw new Error("Error parsing RSS feed: " + err.message);
          } else {
            setFeedData(result);
            setLoading(false);
          }
        });
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchRSSFeed();
  }, []);

  if (error) {
    return (
      <div className="p-4 text-red-600 bg-red-100 rounded-md">
        <p className="font-semibold">Error loading feed:</p>
        <p>{error}</p>
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