import React from "react";
import Header from "../Header/Header.tsx";
import "./HomePage.css";
import Button from "../Button/Button.tsx"
import homePage from "C:\\Users\\naama\\final-project\\src\\utils\\homepage.jpeg";
import Footer from "../Footer/Footer.tsx";
import { useNavigate } from 'react-router-dom';
const HomePage: React.FC = () =>{

    const nevFormPage = useNavigate (); 

    const handleGetStarted = () => {
        nevFormPage('/form'); 
      };

    return(
       
        <div className="container">
        <Header></Header>
            <div className="title">
                Wellcome To RiskAssesML  
                <div className="sub-title">
                Your go-to tool for assessing the risk of ML systems against AML threats.
                </div>
            </div>
            <div className="button-container">
                <div className="button-item">
                    <Button text="Get Started" bgColor="red" color="white-color" onClick={handleGetStarted}/>
                </div>
                <div className="button-item">
                     <Button text="Learn More" bgColor="white" color="black-color" wBorder="red-border"/>
                </div>
            </div>
            <div className="three-content-container">
                <div className="items">
                    <div className="item-title">
                        Recent Update
                    </div>
                    <div className="item-content">
                            New ML models integrated for better risk analysis - Oct 2023
                            Enhanced detection algorithms for AML threats - Sep 2023
                            Partnership with leading cybersecurity firms - Aug 2023
                    </div>
                </div>
                    <div className="second">
                        <img src={homePage} alt="Home Page" height={"225px"} width={"250px"} />
                    </div>
                    <div className="items">
                        <div className="item-title">
                            About Us   
                        </div>
                        <div className="item-content">
                        We provide a user-friendly platform for assessing and mitigating adversarial threats in machine learning models. Combining research-driven insights with tailored risk assessments, we help secure AI systems against emerging vulnerabilities.
                        </div>
                 </div>
            </div>
            <Footer/>
        </div>
        
      
    )
}
export default HomePage;