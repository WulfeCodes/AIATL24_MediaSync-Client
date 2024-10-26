import React, { useState } from 'react';
import {Search, BrainCog, Handshake, BarChart, UserSearch, Settings, HelpCircle, ChevronLeft, ChevronRight, LogOut, Video, Home } from "lucide-react";
import { Link } from 'react-router-dom';
import Button from '../Button/Button'; // Import your custom Button component

const SidebarItem = ({ icon: Icon, label, to, collapsed }) => (
  <Link to={to}>
    <Button
      variant="ghost"
      className={`w-full justify-start text-gray-300 hover:text-white hover:bg-gray-800 ${
        collapsed ? 'px-2' : 'px-4'
      }`}
    >
      <Icon className={`h-5 w-5 ${collapsed ? '' : 'mr-3'}`} />
      {!collapsed && <span>{label}</span>}
    </Button>
  </Link>
);

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div 
      className={`flex flex-col h-screen bg-gray-900 text-gray-100 transition-all duration-300 ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      <div className={`p-4 flex items-center ${collapsed ? 'justify-center' : 'justify-between'} border-b border-gray-800`}>
        {!collapsed && <h2 className="text-xl font-bold">Dashboard</h2>}
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className="text-gray-300 hover:text-white"
        >
          {collapsed ? <ChevronRight className="h-5 w-5" /> : <ChevronLeft className="h-5 w-5" />}
        </Button>
      </div>
      <nav className="flex-1 overflow-y-auto overflow-x-hidden">
        <div className="py-4">
          {!collapsed && (
            <h3 className="mb-2 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Main
            </h3>
          )}
          <SidebarItem icon={Home} label="Home" to="/home" collapsed={collapsed} />
          <SidebarItem icon={BrainCog} label="Create Posts" to="/create" collapsed={collapsed} />
          <SidebarItem icon={Video} label="Create Videos" to="/create_video" collapsed={collapsed} />
          <SidebarItem icon={Handshake} label="Find Collaborators" to="/collaboration" collapsed={collapsed} />
          <SidebarItem icon={BarChart} label="View Analytics" to="/analytics" collapsed={collapsed} />
          <SidebarItem icon={Handshake} label="View Engagement" to="/engagement" collapsed={collapsed} />
        </div>
        <div className="py-4">
          {!collapsed && (
            <h3 className="mb-2 px-4 text-xs font-semibold text-gray-400 uppercase tracking-wider">
              Settings
            </h3>
          )}
          <SidebarItem icon={Settings} label="Integrations" to="/integrations" collapsed={collapsed} />
          <SidebarItem icon={HelpCircle} label="Help" to="/help" collapsed={collapsed} />
        </div>
      </nav>
      <div className={`p-4 border-t border-gray-800 ${collapsed ? 'flex justify-center' : ''}`}>
        <Button 
          variant="outline" 
          className={`text-gray-300 hover:text-white border-gray-700 ${
            collapsed ? 'w-10 h-10 p-0' : 'w-full'
          }`}
        >
          <LogOut className="h-5 w-5" />
          {!collapsed && <span className="ml-2">Log out</span>}
        </Button>
      </div>
    </div>
  );
};

export default Sidebar;
