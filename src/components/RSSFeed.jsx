import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RSSFeed = () => {
  const [news, setNews] = useState([]);

  useEffect(() => {
    // In a real-world scenario, you'd fetch the RSS feed from a backend API
    // For this example, we'll use mock data
    const mockNews = [
      { id: 1, title: "New Stealth Fighter Jet Unveiled", date: "2023-07-15" },
      { id: 2, title: "Advanced Drone Technology Breakthrough", date: "2023-07-14" },
      { id: 3, title: "Military Satellite Launch Successful", date: "2023-07-13" },
      { id: 4, title: "Cybersecurity Initiative for Defense Networks", date: "2023-07-12" },
      { id: 5, title: "Next-Gen Body Armor Development", date: "2023-07-11" },
    ];
    setNews(mockNews);
  }, []);

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Latest Military News</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-2">
          {news.map((item) => (
            <li key={item.id} className="border-b border-gray-200 pb-2">
              <p className="font-semibold">{item.title}</p>
              <p className="text-sm text-gray-500">{item.date}</p>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default RSSFeed;