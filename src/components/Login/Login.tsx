import React from "react";
import "./Login.css";
// import "../Header/Header.css";
import Header from "../Header/Header.tsx";

const Login: React.FC = () => {
  return (
    <div>
     <Header/>
      <main className="login-main">
        {/* Left Section */}
        <section className="left-section">
         
     
        </section>

        {/* Right Section */}
        <section className="right-section">
          <h2>Log in to your account</h2>
        
          <form className="login-form">
          
            <input type="text" placeholder="Your username" />
            <input type="password" placeholder="Password" />
            
          
            <button type="submit" className="btn-primary">Log in</button>
          
          </form>

        </section>
      </main>
    </div>
  );
};

export default Login;
