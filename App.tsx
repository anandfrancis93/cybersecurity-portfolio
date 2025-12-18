import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import IdentifyPage from './pages/IdentifyPage';
import ProtectPage from './pages/ProtectPage';
import DetectPage from './pages/DetectPage';
import RecoverPage from './pages/RecoverPage';
import RespondPage from './pages/RespondPage';
import ChatWidget from './components/ChatWidget';

const App: React.FC = () => {
   return (
      <Router>
         <Routes>
            <Route path="/" element={<Navigate to="/identify" replace />} />
            <Route path="/identify" element={<IdentifyPage />} />
            <Route path="/protect" element={<ProtectPage />} />
            <Route path="/detect" element={<DetectPage />} />
            <Route path="/recover" element={<RecoverPage />} />
            <Route path="/respond" element={<RespondPage />} />
         </Routes>
         <ChatWidget />
      </Router>
   );
};

export default App;