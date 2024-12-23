import React from "react";
import Header from "../Header/Header.tsx";
import "./HomePage.css";
import Button from "../Button/Button.tsx"
import homePage from "C:\\Users\\naama\\final-project\\src\\utils\\homepage.jpeg";

const HomePage: React.FC = () =>{
    return(
        <div>
        <Header></Header>
        <div className="container">
            <div className="title">
                Wellcome To RiskAssesML  
                <div className="sub-title">
                Your go-to tool for assessing the risk of ML systems against AML threats.
                </div>
            </div>
            <div className="button-container">
                <div className="button-item">
                    <Button text="Get Started" bgColor="red" color="white-color"/>
                    <Button text="Learn More" bgColor="white" color="black-color" wBorder="red-border"/>
                </div>

            </div>
            <div className="three-content-container">
                <div className="items">

                </div>
                <div className="second">
                <img src={homePage} alt="Home Page" />
                </div>
                <div className="items">

                </div>
            </div>
        </div>
        <div className="footer"></div>
        </div>
        
    )
}
export default HomePage;