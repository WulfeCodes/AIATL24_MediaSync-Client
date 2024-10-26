// Help.jsx
import React from 'react';

const Help = () => {
  return (
    <div className="p-6 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-gray-800">Help & Support</h1>
        <p className="text-center text-gray-600 mb-6">
          Welcome to the Help Section! Here you can find detailed information about the features available in our application.
        </p>

        <div className="space-y-8">
          <HelpSection
            title="Explore"
            description="In the Explore section, you can discover new integrations and features. Search and filter through a variety of options to find the tools that best fit your needs."
          />

          <HelpSection
            title="Create"
            description="The Create page provides tools for you to generate new content and integrations. Start new projects, set up integrations, or create new analytics reports based on your preferences."
          />

          <HelpSection
            title="Analytics"
            description="In the Analytics section, analyze your data and track performance metrics. This page offers detailed insights into user engagement, integration performance, and other key metrics."
          />

          <HelpSection
            title="Engagements"
            description="The Engagements page allows you to manage your interactions with users or other platforms. View, create, and track engagement campaigns to optimize your outreach."
          />

          <HelpSection
            title="Competitor Analysis"
            description="In the Competitor Analysis section, perform a comprehensive analysis of your competitors. Compare features, performance, and other metrics to stay ahead in your market."
          />

          <HelpSection
            title="Integrations"
            description="The Integrations page is where you manage all your connected accounts and third-party services. Add new integrations, remove existing ones, and customize settings to streamline your workflow."
          />
        </div>
      </div>
    </div>
  );
};

// HelpSection Component
const HelpSection = ({ title, description }) => {
  return (
    <div className="help-section border rounded-lg shadow-md bg-white p-6">
      <h2 className="text-xl font-semibold text-gray-700 mb-2">{title}</h2>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default Help;
