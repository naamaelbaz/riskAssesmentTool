import React from "react";
import "./Footer.css"
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import GitHubIcon from '@mui/icons-material/GitHub';
const Footer: React.FC = () =>{

    return (

        <div className="footer-container">

            <div id="contact-us" className="content-container">
                <div className="title">
                    Contact Us 
                </div>
                <div className="content">
                    <div className="sub">
                        Email: elbazna@post.bgu.ac.il
                        <br/>
                        Email: ofirhor@post.bgu.ac.il
                        <br/>
                        Email: alklai@post.bgu.ac.il
                    </div>
                </div>
            </div>
            <div id="follow-us" className="content-container">
                <div className="title">
                    Follow Us
                </div>
                <div className="content">
                        <div className="content-item">
                            <a  className="link-visit" href="https://www.linkedin.com/in/naama-elbaz-41b720235/"  rel="noopener noreferrer">
                                <LinkedInIcon/>
                            </a>
                        </div>
                        <div className="content-item">
                            <FacebookIcon/>
                        </div>
                        <div className="content-item">
                            <a className="link-visit" href="https://github.com/naamaelbaz/riskAssesmentTool">
                                <GitHubIcon/>
                            </a>
                        </div>

                    </div>
            </div>
        </div>

    ) 

}
export default Footer; 