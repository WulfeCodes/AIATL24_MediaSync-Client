import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader } from "@nextui-org/react";
import { Avatar } from "@nextui-org/react";

const ProfileCard = ({ profileData }) => (
  <div className="flex items-center gap-4 mb-4">
    <Avatar
      src={profileData.profile_image_url}
      alt={profileData.name}
      size="lg"
      isBordered
    />
    <div>
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-bold">{profileData.name}</h3>
        {profileData.verified && (
          <span className="text-blue-500">✓</span>
        )}
      </div>
      <div className="text-gray-500">@{profileData.username}</div>
      <div className="text-sm mt-1">{profileData.description}</div>
    </div>
  </div>
);

const PlatformMetrics = ({ title, metrics, isLoading, error, profileData }) => {
  if (isLoading) {
    return (
      <Card className="w-full mb-8">
        <CardHeader className="flex gap-3">
          <h2 className="text-2xl font-bold">{title}</h2>
        </CardHeader>
        <CardBody>
          <div className="text-center py-4">Loading {title} metrics...</div>
        </CardBody>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="w-full mb-8">
        <CardHeader className="flex gap-3">
          <h2 className="text-2xl font-bold">{title}</h2>
        </CardHeader>
        <CardBody>
          <div className="text-center py-4 text-danger">{error}</div>
        </CardBody>
      </Card>
    );
  }

  return (
    <Card className="w-full mb-8">
      <CardHeader className="flex gap-3">
        <h2 className="text-2xl font-bold">{title}</h2>
      </CardHeader>
      <CardBody>
        {profileData && <ProfileCard profileData={profileData} />}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {metrics.map((metric) => (
            <MetricCard key={metric.title} {...metric} />
          ))}
        </div>
      </CardBody>
    </Card>
  );
};

const MetricCard = ({ title, value, icon }) => (
  <Card>
    <CardBody className="flex flex-row items-center gap-4">
      <div className="text-2xl">{icon}</div>
      <div>
        <div className="text-2xl font-bold">{value.toLocaleString()}</div>
        <div className="text-sm text-gray-500">{title}</div>
      </div>
    </CardBody>
  </Card>
);

const Analytics = () => {
  const [threadsData, setThreadsData] = useState({
    isLoading: true,
    error: '',
    metrics: []
  });
  
  const [twitterData, setTwitterData] = useState({
    isLoading: true,
    error: '',
    metrics: [],
    profile: null
  });

  const fetchThreadsData = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/threads/user_info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          since: '2024-09-19',
          until: '2024-10-21'
        })
      });
      
      const data = await response.json();
      
      setThreadsData({
        isLoading: false,
        error: '',
        metrics: [
          { title: 'Views', value: data.totalViews || 0, icon: '👁️' },
          { title: 'Likes', value: data.totalLikes || 0, icon: '👍' },
          { title: 'Replies', value: data.totalReplies || 0, icon: '💬' },
          { title: 'Reposts', value: data.totalReposts || 0, icon: '🔁' },
          { title: 'Quotes', value: data.totalQuotes || 0, icon: '🔖' },
          { title: 'Followers', value: data.totalFollowers || 0, icon: '👥' }
        ]
      });
    } catch (error) {
      setThreadsData(prev => ({
        ...prev,
        isLoading: false,
        error: 'Failed to fetch Threads data'
      }));
    }
  };

  const fetchTwitterData = async () => {
    try {
      const response = await fetch('http://localhost:3001/api/twitter/user_info', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: 'MKBHD'
        })
      });
      
      const { data } = await response.json();
      
      setTwitterData({
        isLoading: false,
        error: '',
        profile: {
          name: data.name,
          username: data.username,
          description: data.description,
          profile_image_url: data.profile_image_url,
          verified: data.verified,
          created_at: data.created_at
        },
        metrics: [
          { title: 'Followers', value: data.public_metrics.followers_count, icon: '👥' },
          { title: 'Following', value: data.public_metrics.following_count, icon: '👤' },
          { title: 'Tweets', value: data.public_metrics.tweet_count, icon: '🐦' },
          { title: 'Lists', value: data.public_metrics.listed_count, icon: '📋' },
          { title: 'Likes', value: data.public_metrics.like_count, icon: '❤️' }
        ]
      });
    } catch (error) {
      setTwitterData(prev => ({
        ...prev,
        isLoading: false,
        error: 'Failed to fetch Twitter data'
      }));
    }
  };

  useEffect(() => {
    fetchThreadsData();
    fetchTwitterData();
  }, []);

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Content Analytics Dashboard</h1>
        <p className="text-gray-500 mt-2">Track your social media performance across platforms</p>
      </div>

      <PlatformMetrics
        title="Threads Analytics"
        metrics={threadsData.metrics}
        isLoading={threadsData.isLoading}
        error={threadsData.error}
      />

      <PlatformMetrics
        title="Twitter Analytics"
        metrics={twitterData.metrics}
        isLoading={twitterData.isLoading}
        error={twitterData.error}
        profileData={twitterData.profile}
      />
    </div>
  );
};

export default Analytics;