import React from "react";
import "./Loader.css"
import SecurityIcon from '@mui/icons-material/Security';
const Loader: React.FC = () => {
    return (
        <div className="loader-overlay">
            <div className="loader">
                <SecurityIcon className="loading-icon" fontSize="large"/>
            </div>
        </div>
    )
} 

export default Loader; 