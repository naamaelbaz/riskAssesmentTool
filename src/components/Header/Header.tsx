import react from "react";
import SecurityIcon from '@mui/icons-material/Security';
import React from "react";
import "./Header.css";


const Header: React.FC = () =>{


    return (
        <>
        <div className="logo-container">
            <div className="logo">
                <SecurityIcon></SecurityIcon>
            </div>
            <div className="logo-text">
                RiskAssesML
            </div>
        </div>
        </>
    )

}
export default Header; 