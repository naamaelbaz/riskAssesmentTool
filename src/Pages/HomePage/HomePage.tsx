import React from "react";
import Header from "../../components/Header/Header.tsx";
import "./HomePage.css";
import Button from "../../components/Button/Button.tsx";
import HomepageImage from "../../utils/homepage.jpeg";
import Footer from "../../components/Footer/Footer.tsx";
import { useNavigate } from 'react-router-dom';

const HomePage: React.FC = () => {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate('/form');
    };

    const handleLogin = () => {
        navigate('/login');
    };

    return (
        <div className="container">
            <div className="header">
                <Header />
                <div className="header-content">
                    <div className="header-text">
                        <h1 className="home-title">Welcome To RiskAssesML</h1>
                        <p className="sub-title">Your go-to tool for assessing the risk of ML systems against AML threats.</p>
                    </div>
                    <div className="button-container">
                        <div className="button-item">
                            <Button
                                text="Get Started"
                                bgColor="red"
                                color="white-color"
                                onClick={handleGetStarted}
                            />
                        </div>
                        <div className="button-item">
                            <Button
                                text="Learn More"
                                bgColor="white"
                                color="black-color"
                                wBorder="red-border"
                                onClick={handleLogin}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="main-content">
                <div className="three-content-container">
                    <div className="items">
                        <h2 className="item-title">Recent Updates</h2>
                        <div className="item-content">
                            <ul className="updates-list">
                                <li>New ML models integrated for better risk analysis - Oct 2023</li>
                                <li>Enhanced detection algorithms for AML threats - Sep 2023</li>
                                <li>Partnership with leading cybersecurity firms - Aug 2023</li>
                            </ul>
                        </div>
                    </div>

                    <div className="feature-image-wrapper">
                        <img
                            src={HomepageImage}
                            alt="Risk Assessment Visualization"
                            className="feature-image"
                        />
                    </div>

                    <div className="items">
                        <h2 className="item-title">About Us</h2>
                        <div className="item-content">
                            We provide a user-friendly platform for assessing and mitigating adversarial
                            threats in machine learning models. Combining research-driven insights with tailored risk assessments,
                            we help secure AI systems against emerging vulnerabilities.
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    );
};

export default HomePage;