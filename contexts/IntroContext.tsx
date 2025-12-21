import React, { createContext, useContext, useState, ReactNode } from 'react';

interface IntroContextType {
    isIntroComplete: boolean;
    setIsIntroComplete: (value: boolean) => void;
}

const IntroContext = createContext<IntroContextType | undefined>(undefined);

export const IntroProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [isIntroComplete, setIsIntroComplete] = useState(false);

    return (
        <IntroContext.Provider value={{ isIntroComplete, setIsIntroComplete }}>
            {children}
        </IntroContext.Provider>
    );
};

export const useIntro = (): IntroContextType => {
    const context = useContext(IntroContext);
    if (!context) {
        throw new Error('useIntro must be used within an IntroProvider');
    }
    return context;
};
