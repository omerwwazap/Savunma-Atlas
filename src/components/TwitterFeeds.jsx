import React, { useEffect, useState } from "react";

const TwitterFeeds = () => {
  const [loading, setLoading] = useState(true);

  // Twitter accounts related to military/defense topics
  const twitterAccounts = [
    {
      username: "thestudyofwar",
      name: "Institute for the Study of War",
      description: "Independent, non-partisan research institute"
    },
    {
      username: "CENTCOM",
      name: "U.S. Central Command",
      description: "Official U.S. Central Command Twitter"
    },
    {
      username: "thejointstaff",
      name: "The Joint Staff",
      description: "Official Joint Chiefs of Staff"
    },
    {
      username: "DeptofDefense",
      name: "U.S. Department of Defense",
      description: "Official DoD Twitter account"
    },
    {
      username: "usairforce",
      name: "U.S. Air Force",
      description: "Official U.S. Air Force"
    },
    {
      username: "USNavy",
      name: "U.S. Navy",
      description: "Official U.S. Navy"
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
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Military & Defense Twitter Feeds</h2>
      
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

      {/* Alternative: Single column layout for better readability */}
      <div className="mt-12">
        <h3 className="text-xl font-bold text-gray-900 mb-6">Combined Defense News Feed</h3>
        <div className="bg-white rounded-lg shadow-md p-6">
          <a 
            className="twitter-timeline" 
            data-height="600" 
            data-theme="light"
            data-tweet-limit="10"
            data-chrome="noheader noborders"
            href="https://twitter.com/thestudyofwar/lists/defense-news"
          >
            Loading defense news...
          </a>
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
