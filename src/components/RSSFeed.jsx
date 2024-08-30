import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import xml2js from 'xml2js';

const RSSFeed = () => {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRSSFeed = async () => {
      try {
        const response = await fetch('http://china-defense.blogspot.com/feeds/posts/default');
        const text = await response.text();

        // Parse XML to JSON
        xml2js.parseString(text, (err, result) => {
          if (err) {
            throw err;
          }

          // Extract items from RSS feed
          const items = result.rss.channel[0].item;
          const formattedNews = items.map(item => ({
            title: item.title[0],
            date: item.pubDate[0],
            link: item.link[0],
            description: item.description[0],
          }));

          setNews(formattedNews);
        });
      } catch (error) {
        console.error('Error fetching or parsing RSS feed:', error);
        setError('Failed to load news. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchRSSFeed();
  }, []);

  if (loading) return <div>Loading news...</div>;
  if (error) return <div>{error}</div>;

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-xl md:text-2xl font-bold">Latest Military News</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {news.map((item, index) => (
            <li key={index} className="border-b border-gray-200 pb-4">
              <a href={item.link} target="_blank" rel="noopener noreferrer" className="font-semibold text-base md:text-lg mb-1 text-blue-600 hover:underline">
                {item.title}
              </a>
              <p className="text-sm text-gray-500">{new Date(item.date).toLocaleDateString()}</p>
              <p className="text-sm text-gray-700">{item.description}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default RSSFeed;
