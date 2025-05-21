import React from "react";
import "./Footer.css";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';

const Footer: React.FC = () => {
    return (
        <div className="footer-container">
            <div id="contact-us" className="content-container">
                <div className="title-f">Contact Us</div>
                <div className="content">
                <div className="sub">
                    <p>Email: elbazna@post.bgu.ac.il</p>
                    <p>Email: ofirhor@post.bgu.ac.il</p>
                    <p>Email: alklai@post.bgu.ac.il</p>
                </div>

                </div>
            </div>

            <div id="follow-us" className="content-container">
                <div className="title-f">Follow Us</div>
                <div className="content">
                    <div className="content-item">
                        <a
                            className="link-visit"
                            href="https://www.linkedin.com/in/naama-elbaz-41b720235/"
                            aria-label="LinkedIn"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <LinkedInIcon className="l-icon" />
                        </a>
                    </div>
                    <div className="content-item">
                        <a
                            className="link-visit"
                            href="https://github.com/naamaelbaz/riskAssesmentTool"
                            aria-label="GitHub"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            <GitHubIcon />
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Footer;
