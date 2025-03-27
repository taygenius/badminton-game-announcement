import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-info">
          <div className="footer-logo">
            <span className="logo-icon">🏸</span>
            <span className="logo-text">Badminton App</span>
          </div>
          <div className="footer-description">
            A comprehensive badminton tournament management system
          </div>
        </div>
        
        <ul className="footer-links">
          <li><Link to="/about">About</Link></li>
          <li><Link to="/features">Features</Link></li>
          <li><Link to="/help">Help</Link></li>
          <li><Link to="/terms">Terms</Link></li>
          <li><Link to="/privacy">Privacy</Link></li>
        </ul>
        
        <div className="copyright">
          &copy; {new Date().getFullYear()} Badminton Game Announcement. All rights reserved.
        </div>
      </div>
      
      <style jsx>{`
        .footer {
          background-color: var(--text-primary);
          color: white;
          padding: var(--spacing-lg);
        }
        
        .footer-content {
          max-width: 1400px;
          margin: 0 auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .footer-info {
          display: flex;
          flex-direction: column;
        }
        
        .footer-logo {
          display: flex;
          align-items: center;
          font-size: var(--font-lg);
          font-weight: bold;
          margin-bottom: var(--spacing-xs);
        }
        
        .logo-icon {
          font-size: 1.5em;
          margin-right: var(--spacing-xs);
        }
        
        .footer-description {
          font-size: var(--font-sm);
          opacity: 0.7;
        }
        
        .footer-links {
          display: flex;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        
        .footer-links li {
          margin-right: var(--spacing-lg);
        }
        
        .footer-links a {
          color: white;
          opacity: 0.8;
          text-decoration: none;
          transition: opacity var(--transition-fast);
        }
        
        .footer-links a:hover {
          opacity: 1;
        }
        
        .copyright {
          opacity: 0.7;
          font-size: var(--font-sm);
        }
        
        @media (max-width: 768px) {
          .footer-content {
            flex-direction: column;
            text-align: center;
            gap: var(--spacing-md);
          }
          
          .footer-links {
            flex-wrap: wrap;
            justify-content: center;
            margin-bottom: var(--spacing-md);
          }
          
          .footer-links li {
            margin: 0 var(--spacing-sm);
            margin-bottom: var(--spacing-xs);
          }
        }
      `}</style>
    </footer>
  );
};

export default Footer;
