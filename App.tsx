import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AssetPage from './pages/AssetPage';
import LabPage from './pages/LabPage';
import ReconPage from './pages/ReconPage';
import ClearancePage from './pages/ClearancePage';
import HandshakePage from './pages/HandshakePage';
import ChatWidget from './components/ChatWidget';

const App: React.FC = () => {
   return (
      <Router>
         <Routes>
            <Route path="/" element={<Navigate to="/about-me" replace />} />
            <Route path="/about-me" element={<AssetPage />} />
            <Route path="/projects" element={<LabPage />} />
            <Route path="/work-experience" element={<ReconPage />} />
            <Route path="/certifications" element={<ClearancePage />} />
            <Route path="/contact-us" element={<HandshakePage />} />
         </Routes>
         <ChatWidget />
      </Router>
   );
};

export default App;