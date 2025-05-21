import react from "react";
import SecurityIcon from '@mui/icons-material/Security';
import React from "react";
import "./Header.css";
import { useNavigate } from 'react-router-dom';

const Header: React.FC = () =>{
    const nevHomePage = useNavigate();
    const handleSecIcon = () => {
         nevHomePage('/')
    }

    return (
        <>
        <div className="logo-container">
            <div className="logo">
                <SecurityIcon data-testid="SecurityIcon" onClick={handleSecIcon} className="security-icon"></SecurityIcon>
            </div>
            <div className="logo-text">
                RiskAssesML
            </div>
        </div>
        </>
    )

}
export default Header; 