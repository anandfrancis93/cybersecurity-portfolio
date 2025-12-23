
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';

// Initialize GA4 - Replace with your Measurement ID
const MEASUREMENT_ID = "G-FKWC0Z7NF2";

export const initGA = () => {
    ReactGA.initialize(MEASUREMENT_ID);
};

export const AnalyticsTracker = () => {
    const location = useLocation();

    useEffect(() => {
        ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
    }, [location]);

    return null;
};
