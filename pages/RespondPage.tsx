import React, { useState } from 'react';
import Nav from '../components/Nav';
import TerminalIntro from '../components/TerminalIntro';
import Footer from '../components/Footer';

const RespondPage: React.FC = () => {
    const [isIntroComplete, setIsIntroComplete] = useState(false);

    if (!isIntroComplete) {
        return <TerminalIntro moduleName="respond" accentColor="text-nist-respond" onComplete={() => setIsIntroComplete(true)} />;
    }

    return (
        <div className="min-h-screen bg-[#020202] text-white font-sans pt-24 md:pt-12 animate-fade-in selection:bg-nist-respond selection:text-black flex flex-col">
            <Nav />
            <Footer />
        </div>
    );
};

export default RespondPage;
