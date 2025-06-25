import React from "react";
import "./Footer.css";
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import GitHubIcon from '@mui/icons-material/GitHub';
import { FaEnvelope } from 'react-icons/fa';

const Footer: React.FC = () => {


    
const emails = [
  'elbazna@post.bgu.ac.il',
  'ofirhor@post.bgu.ac.il',
  'alklai@post.bgu.ac.il',
];


    return (
        <div className="footer-container">
        <div id="contact-us" className="content-container">
        <div className="title-f">Contact Us</div>
        <div className="email-icons-row">
          {emails.map((email, idx) => (
            <div key={idx} className="email-icon-wrapper">
              <FaEnvelope className="email-icon" />
              <span className="email-tooltip">{email}</span>
            </div>
          ))}
        </div>
      </div>


            <div id="follow-us" className="content-container">
                <div className="title-f">Follow Us</div>
                <div className="icon-row">
                    <a
                        className="link-visit"
                        href="https://www.linkedin.com/in/naama-elbaz-41b720235/"
                        aria-label="LinkedIn"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <LinkedInIcon className="social-icon" />
                    </a>
                    <a
                        className="link-visit"
                        href="https://github.com/naamaelbaz/riskAssesmentTool"
                        aria-label="GitHub"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        <GitHubIcon className="social-icon" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Footer;