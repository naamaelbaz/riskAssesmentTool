import React from "react";
import "./Login.css";
import Header from "../Header/Header.tsx";

const Login: React.FC = () => {

  return (
    <>
    <Header/>
    <div className="login-wrapper">
      
      <div className="login-container">
        {/* Left panel with graphic */}
        <div className="login-left">
          <div className="tree-container">
            {/* <img src="" alt="Holiday Tree" className="tree-image" /> */}
            <p className="footer-text"></p>
          </div>
        </div>

        {/* Right login form */}
        <div className="login-right">
          <h2>Login</h2>
          <form className="login-form" style={{display: "flex", flexDirection: "column", alignItems: "center"}}>
            <input type="text" placeholder="Enter your username" />
            <input type="password" placeholder="Enter your password" />
            <a href="#" className="forgot-password">Forgot Password?</a>
            <button type="submit" className="btn-primary">Login to RiskAssesML</button>
          </form>
          <p className="register-prompt">
            Don't have an account? <a href="#">Register Now</a>
          </p>
        </div>
      </div>
    </div>
    </>
  );
};

export default Login;
