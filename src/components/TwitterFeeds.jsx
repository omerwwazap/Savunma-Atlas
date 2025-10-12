import React, { useEffect, useState } from "react";

const TwitterFeeds = () => {
  const [loading, setLoading] = useState(true);

  // Twitter accounts related to military/defense topics and OSINT
  const twitterAccounts = [
    {
      username: "Nickatgreat1220",
      name: "Nick",
      description: "Defense & Military Analysis"
    },
    {
      username: "1yavuzselimsen",
      name: "Yavuz Selim Şen",
      description: "Defense Industry Analyst"
    },
    {
      username: "WarMonitors",
      name: "War Monitors",
      description: "Global Conflict Monitoring"
    },
    {
      username: "secretsqrl123",
      name: "Secret Squirrel",
      description: "OSINT & Intelligence"
    },
    {
      username: "direndogand",
      name: "Diren Doğan",
      description: "Defense & Security Analysis"
    },
    {
      username: "OSINT_Insider",
      name: "OSINT Insider",
      description: "Open Source Intelligence"
    },
    {
      username: "sentdefender",
      name: "Sentinel Defender",
      description: "Defense & Security News"
    },
    {
      username: "SavunmaSanayiST",
      name: "Savunma Sanayi ST",
      description: "Turkish Defense Industry"
    },
    {
      username: "XH_Lee23",
      name: "XH Lee",
      description: "Military Technology Analysis"
    },
    {
      username: "someplaosint",
      name: "Somepla OSINT",
      description: "OSINT & Geolocation"
    },
    {
      username: "IntCyberDigest",
      name: "Int Cyber Digest",
      description: "Cybersecurity & Intelligence"
    },
    {
      username: "hermesyed",
      name: "Hermes",
      description: "Defense & Intelligence Analysis"
    },
    {
      username: "InsiderGeo",
      name: "Insider Geo",
      description: "Geospatial Intelligence"
    },
    {
      username: "EGYOSINT",
      name: "EGY OSINT",
      description: "Egyptian OSINT & Defense"
    },
    {
      username: "egypt_warfare",
      name: "Egypt Warfare",
      description: "Egyptian Military Analysis"
    },
    {
      username: "UnmannedSystem",
      name: "Unmanned Systems",
      description: "Drone & UAV Technology"
    },
    {
      username: "GeospyAI",
      name: "Geospy AI",
      description: "AI-Powered Geospatial Intelligence"
    }
  ];

  useEffect(() => {
    // Load Twitter widgets script
    const script = document.createElement('script');
    script.src = 'https://platform.twitter.com/widgets.js';
    script.async = true;
    script.onload = () => {
      setLoading(false);
      // Initialize Twitter widgets
      if (window.twttr && window.twttr.widgets) {
        window.twttr.widgets.load();
      }
    };
    document.head.appendChild(script);

    return () => {
      // Cleanup script on unmount
      const existingScript = document.querySelector('script[src="https://platform.twitter.com/widgets.js"]');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        <span className="ml-3">Loading Twitter feeds...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Defense, OSINT & Intelligence Twitter Feeds</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {twitterAccounts.map((account, index) => (
          <div key={index} className="bg-white rounded-lg shadow-md p-4">
            <div className="mb-4">
              <h3 className="text-lg font-semibold text-gray-800">{account.name}</h3>
              <p className="text-sm text-gray-600">@{account.username}</p>
              <p className="text-sm text-gray-500 mt-1">{account.description}</p>
            </div>
            
            {/* Twitter Timeline Embed */}
            <a 
              className="twitter-timeline" 
              data-height="400" 
              data-theme="light" 
              data-tweet-limit="3"
              data-chrome="noheader nofooter noborders transparent"
              href={`https://twitter.com/${account.username}`}
            >
              Tweets by @{account.username}
            </a>
          </div>
        ))}
      </div>

      {/* Important Note */}
      <div className="mt-12 p-6 bg-blue-50 rounded-lg border-l-4 border-blue-500">
        <h3 className="text-xl font-bold text-blue-900 mb-4">📌 Important Note</h3>
        <p className="text-blue-800 mb-4">
          <strong>These accounts are just the tip of the iceberg!</strong> There are thousands of valuable OSINT, defense, and intelligence sources available across social media platforms.
        </p>
        
        <div className="space-y-2">
          <h4 className="font-semibold text-blue-900">📚 Additional Resources:</h4>
          <div className="space-y-1">
            <a 
              href="https://omerwwazap.github.io/CTF-Resources/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block text-blue-700 hover:text-blue-900 underline"
            >
              🔧 CTF Resources - Comprehensive OSINT Tools Collection
            </a>
            <a 
              href="https://start.me/p/rx6Qj8/nixintel-s-osint-resource-list" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block text-blue-700 hover:text-blue-900 underline"
            >
              🎯 Nixintel's OSINT Resource List - Professional OSINT Tools
            </a>
          </div>
        </div>
      </div>

      {/* Twitter Follow Buttons */}
      <div className="mt-8 p-6 bg-gray-50 rounded-lg">
        <h4 className="text-lg font-semibold text-gray-800 mb-4">Follow These Accounts</h4>
        <div className="flex flex-wrap gap-4">
          {twitterAccounts.map((account, index) => (
            <a
              key={index}
              href={`https://twitter.com/intent/follow?screen_name=${account.username}`}
              className="twitter-follow-button"
              data-show-count="false"
              data-size="large"
            >
              Follow @{account.username}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TwitterFeeds;
