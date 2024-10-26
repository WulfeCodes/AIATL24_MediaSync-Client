import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import NextUISidebar from './components/Sidebar/Sidebar.jsx';
import Create from './pages/Create.jsx';
import Analytics from './pages/Analytics.jsx';
import Engagements from './pages/Engagements.jsx';
import Integrations from './pages/Integrations.jsx';
import Help from './pages/Help.jsx';
import Testing from './pages/Testing.jsx';
import CreateVideo from './pages/Create Videos.jsx';
import Collaborators from './pages/Collaboration.jsx';
import LandingPage from './pages/Home.jsx';

function App() {
  return (
    <Router>
      <div className="flex h-[100dvh]">
        {/* Sidebar */}
        <NextUISidebar />
        
        {/* Main Content Area */}
        <main className="flex-grow p-8 overflow-y-auto">
          <Routes>
            {/* Define Routes for each section */}
            <Route path="/" element={<Navigate to="/home" />} />
            <Route path="/home" element={<LandingPage />} />
            <Route path="/create" element={<Create />} />
            <Route path="/create_video" element={<CreateVideo />} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/collaborators" element={<Collaborators />} />
            <Route path="/engagement" element={<Engagements />} />
            <Route path="/integrations" element={<Integrations />} />
            <Route path="/help" element={<Help />} />
            <Route path="/test" element={<Testing />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
