import React from "react";
import "./Loader.css"
import SecurityIcon from '@mui/icons-material/Security';
const Loader: React.FC = () => {
    return (
        <div data-testid="loader-overlay" className="loader-overlay">
            <div className="loader">
                <SecurityIcon data-testid="SecurityIcon" className="loading-icon" fontSize="large"/>
            </div>
        </div>
    )
} 

export default Loader; 