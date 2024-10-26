import React, { useState } from 'react';
import { Card, CardBody, CardHeader, Avatar, Button, Badge } from "@nextui-org/react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { MessageCircle, ThumbsUp, Share2, AlertTriangle, TrendingUp, BrainCog, Plus, X } from 'lucide-react';

const Engagements = () => {
  const [selectedPosts, setSelectedPosts] = useState([]);

  // Mock data for posts across platforms
  const allPosts = [
    {
      id: 2,
      platform: 'Threads',
      content: 'Behind the scenes at our latest photoshoot 📸 #BTS #Fashion',
      date: '2023-10-14',
      likes: 500,
      comments: 78,
      shares: 15,
      insights: [
        { type: 'success', message: 'Strong visual content resonates well with your audience' },
        { type: 'opportunity', message: 'Engagement drops off after 24 hours - consider using Stories for longer-term visibility' },
      ],
      aiInsight: 'The high engagement on this post indicates that your audience appreciates behind-the-scenes content. The use of relevant hashtags likely increased discoverability. To maintain momentum, consider creating a series of BTS posts or even a short video series to keep your audience engaged over a longer period.',
    },
    {
      id: 3,
      platform: 'Twitter',
      content: 'What features would you like to see in our next update? Let us know! 💡 #FeedbackWanted',
      date: '2023-10-13',
      likes: 120,
      comments: 85,
      shares: 25,
      insights: [
        { type: 'success', message: 'Direct question led to high comment engagement' },
        { type: 'opportunity', message: 'Consider creating a poll for easier user participation' },
      ],
      aiInsight: 'This tweets success lies in its direct engagement with the audience. The high number of comments suggests that your followers are eager to provide feedback. To capitalize on this engagement, consider creating a follow-up post summarizing the most popular suggestions and how you plan to implement them.',
    },
    {
      id: 4,
      platform: 'Reddit',
      content: 'We\'re hiring! Join our team of innovators and make a difference. #JobOpening #TechCareers',
      date: '2023-10-12',
      likes: 180,
      comments: 30,
      shares: 50,
      insights: [
        { type: 'success', message: 'High share rate indicates strong interest in job opportunities' },
        { type: 'opportunity', message: 'Engagement from 2nd-degree connections suggests potential for network growth' },
      ],
      aiInsight: "The high share rate on this post indicates that your network finds value in your job openings. To leverage this interest, consider creating a series of posts highlighting different aspects of your company culture, team members, or the specific roles you're hiring for. This could help attract even more qualified candidates and expand your network further.",
    },
  ];

  const addPost = (post) => {
    if (selectedPosts.length < 5 && !selectedPosts.some(p => p.id === post.id)) {
      setSelectedPosts([...selectedPosts, post]);
    }
  };

  const removePost = (postId) => {
    setSelectedPosts(selectedPosts.filter(post => post.id !== postId));
  };

  const renderEngagementChart = () => {
    const data = selectedPosts.map(post => ({
      name: post.platform,
      likes: post.likes,
      comments: post.comments,
      shares: post.shares,
    }));

    return (
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="likes" fill="#8884d8" />
          <Bar dataKey="comments" fill="#82ca9d" />
          <Bar dataKey="shares" fill="#ffc658" />
        </BarChart>
      </ResponsiveContainer>
    );
  };

  return (
    <div className="container mx-auto p-4 max-w-7xl">
      <h1 className="text-3xl font-bold mb-6">Engagement Comparison</h1>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Select Posts to Compare (Max 5)</h2>
        <div className="flex flex-wrap gap-2">
          {allPosts.map(post => (
            <Button
              key={post.id}
              onPress={() => addPost(post)}
              disabled={selectedPosts.length >= 5 || selectedPosts.some(p => p.id === post.id)}
            >
              {post.platform} - {post.date}
            </Button>
          ))}
        </div>
      </div>

      {selectedPosts.length > 0 && (
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Engagement Comparison Chart</h2>
          {renderEngagementChart()}
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {selectedPosts.map(post => (
          <Card key={post.id} className="w-full">
            <CardHeader className="flex justify-between items-center">
              <div className="flex items-center">
                <Avatar src={`/api/placeholder/${post.platform.toLowerCase()}`} size="lg" className="mr-4" />
                <div>
                  <h3 className="text-lg font-semibold">{post.platform}</h3>
                  <p className="text-small text-default-500">{post.date}</p>
                </div>
              </div>
              <Button isIconOnly color="danger" variant="light" onPress={() => removePost(post.id)}>
                <X size={20} />
              </Button>
            </CardHeader>
            <CardBody>
              <p className="mb-4">{post.content}</p>
              <div className="flex justify-between mb-4">
                <div className="flex items-center">
                  <ThumbsUp className="mr-2" size={20} />
                  <span>{post.likes}</span>
                </div>
                <div className="flex items-center">
                  <MessageCircle className="mr-2" size={20} />
                  <span>{post.comments}</span>
                </div>
                <div className="flex items-center">
                  <Share2 className="mr-2" size={20} />
                  <span>{post.shares}</span>
                </div>
              </div>
              <div className="space-y-2 mb-4">
                <h4 className="font-semibold flex items-center">
                  <TrendingUp className="mr-2" size={20} />
                  Insights
                </h4>
                {post.insights.map((insight, index) => (
                  <div key={index} className={`flex items-start p-2 rounded-md ${insight.type === 'success' ? 'bg-green-100' : 'bg-yellow-100'}`}>
                    {insight.type === 'success' ? (
                      <ThumbsUp className="mr-2 text-green-500" size={20} />
                    ) : (
                      <AlertTriangle className="mr-2 text-yellow-500" size={20} />
                    )}
                    <p className="text-sm">{insight.message}</p>
                  </div>
                ))}
              </div>
              <div className="mt-4">
                <h4 className="font-semibold flex items-center">
                  <BrainCog className="mr-2" size={20} />
                  AI Insight
                </h4>
                <p className="text-sm mt-2 p-2 bg-blue-100 rounded-md">{post.aiInsight}</p>
              </div>
            </CardBody>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Engagements;