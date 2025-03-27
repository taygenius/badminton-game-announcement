import React from 'react';
import { Link } from 'react-router-dom';

const AuthLayout = ({ children }) => {
  return (
    <div className="auth-layout">
      <div className="auth-container">
        <div className="auth-logo-container">
          <Link to="/" className="logo-link">
            <div className="logo">
              <span className="logo-icon">🏸</span>
              <span className="logo-text">Badminton App</span>
            </div>
          </Link>
        </div>
        
        {children}
      </div>
      
      <div className="auth-footer">
        <div className="footer-links">
          <Link to="/terms">Terms of Service</Link>
          <Link to="/privacy">Privacy Policy</Link>
          <Link to="/help">Help & Support</Link>
        </div>
        <div className="copyright">
          &copy; {new Date().getFullYear()} Badminton Game Announcement. All rights reserved.
        </div>
      </div>
      
      <style jsx>{`
        .auth-layout {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: var(--spacing-xl);
          background: linear-gradient(135deg, var(--primary-dark), var(--primary));
        }
        
        .auth-container {
          width: 100%;
          max-width: 400px;
          margin-bottom: var(--spacing-lg);
        }
        
        .auth-logo-container {
          text-align: center;
          margin-bottom: var(--spacing-lg);
        }
        
        .logo-link {
          text-decoration: none;
        }
        
        .logo {
          display: inline-flex;
          align-items: center;
          font-size: var(--font-xl);
          font-weight: bold;
          color: white;
        }
        
        .logo-icon {
          font-size: 1.5em;
          margin-right: var(--spacing-xs);
        }
        
        .auth-footer {
          text-align: center;
          color: rgba(255, 255, 255, 0.7);
          font-size: var(--font-sm);
        }
        
        .footer-links {
          margin-bottom: var(--spacing-sm);
        }
        
        .footer-links a {
          color: rgba(255, 255, 255, 0.9);
          margin: 0 var(--spacing-sm);
          text-decoration: none;
          transition: color var(--transition-fast);
        }
        
        .footer-links a:hover {
          color: white;
          text-decoration: underline;
        }
        
        .copyright {
          opacity: 0.7;
        }
      `}</style>
    </div>
  );
};

export default AuthLayout;
