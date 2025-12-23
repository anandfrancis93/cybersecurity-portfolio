import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AssetPage from './pages/AssetPage';
import LabPage from './pages/LabPage';
import ReconPage from './pages/ReconPage';
import ClearancePage from './pages/ClearancePage';
import LogsPage from './pages/LogsPage';
import HandshakePage from './pages/HandshakePage';
import ChatWidget from './components/ChatWidget';
import { IntroProvider } from './contexts/IntroContext';

import { initGA, AnalyticsTracker } from './components/AnalyticsTracker';

// Initialize GA immediately
initGA();

const App: React.FC = () => {
   return (
      <Router>
         <AnalyticsTracker />
         <IntroProvider>
            <Routes>
               <Route path="/" element={<Navigate to="/about-me" replace />} />
               <Route path="/about-me" element={<AssetPage />} />
               <Route path="/projects" element={<LabPage />} />
               <Route path="/work-experience" element={<ReconPage />} />
               <Route path="/certifications" element={<ClearancePage />} />
               <Route path="/logs" element={<LogsPage />} />
               <Route path="/contact-us" element={<HandshakePage />} />
            </Routes>
            <ChatWidget />
         </IntroProvider>
      </Router>
   );
};

export default App;