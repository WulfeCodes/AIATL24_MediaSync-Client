import React from 'react';
import { ChevronRight, Zap, Image, Video, Users, MessageSquare, Award, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
    const navigate = useNavigate();

  return (

    <div className="mx-auto p-4 max-w-5xl  min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <header className="container mx-auto px-4 py-16 md:py-24">
        <div className="text-center max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Streamline Your Social Media with
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"> AI-Powered </span>
            Automation
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Create, customize, and schedule content across multiple platforms with our intelligent marketing automation tools designed for creators and small businesses.
          </p>
          <div className="flex justify-center gap-4">
            <button 
            onClick={() => navigate('/create')} 
            className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold flex items-center gap-2 hover:bg-blue-700 transition">
              Get Started <ChevronRight className="w-5 h-5" />
            </button>
            <button className="px-8 py-3 border border-gray-300 rounded-lg font-semibold hover:bg-gray-50 transition">
              Watch Demo
            </button>
          </div>
        </div>
      </header>

      {/* Features Grid */}
      <section className="container mx-auto px-4 py-16">
        <h2 className="text-3xl font-bold text-center mb-12">Powerful Features for Modern Creators</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <FeatureCard
            icon={<Zap className="w-6 h-6 text-blue-600" />}
            title="Multi-Platform Publishing"
            description="Connect and manage your Reddit, Twitter, and Threads accounts from a single dashboard. Create platform-specific variations with AI assistance."
          />
          <FeatureCard
            icon={<Image className="w-6 h-6 text-blue-600" />}
            title="AI-Powered Content Creation"
            description="Generate engaging captions with Gemini AI and create stunning visuals with Runware's image generation technology."
          />
          <FeatureCard
            icon={<Video className="w-6 h-6 text-blue-600" />}
            title="Text-to-Video Generation"
            description="Transform text into professional videos with AI-generated voiceovers, images, and automated video editing."
          />
          <FeatureCard
            icon={<Users className="w-6 h-6 text-blue-600" />}
            title="Creator Network"
            description="Connect with like-minded creators and build meaningful collaborations based on content alignment."
          />
          <FeatureCard
            icon={<MessageSquare className="w-6 h-6 text-blue-600" />}
            title="AI Chatbot Assistant"
            description="Get personalized content recommendations and insights with our NLX-powered conversational AI."
          />
          <FeatureCard
            icon={<Award className="w-6 h-6 text-blue-600" />}
            title="Sponsor Matching"
            description="Find relevant sponsorship opportunities matched to your content niche and audience."
          />
        </div>
      </section>

      {/* Chatbot Demo Section */}
      <section className="bg-gray-50 py-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6">AI-Powered Networking</h2>
              <p className="text-gray-600 mb-6">
                Our intelligent chatbot, powered by NLX conversational AI, helps you discover creators and sponsors that align perfectly with your content strategy.
              </p>
              <ul className="space-y-4">
                {[
                  'Smart creator recommendations based on content analysis',
                  'Real-time sponsor matching algorithms',
                  'Natural conversation flow for better networking',
                  'Personalized collaboration suggestions'
                ].map((feature, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <ArrowRight className="w-5 h-5 text-blue-600" />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="md:w-1/2">
              <div className="bg-white p-6 rounded-xl shadow-lg">
                <img 
                  src="/api/placeholder/600/400" 
                  alt="AI Chatbot Interface" 
                  className="w-full rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Social Media Strategy?</h2>
          <p className="text-gray-600 mb-8">
            Join thousands of creators who are leveraging AI to create better content and grow their audience.
          </p>
          <button className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold flex items-center gap-2 hover:bg-blue-700 transition mx-auto">
            Start Free Trial <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </section>
    </div>
  );
};

const FeatureCard = ({ icon, title, description }) => (
  <div className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition">
    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-3">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default LandingPage;