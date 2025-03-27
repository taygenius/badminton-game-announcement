import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div className="not-found-page">
      <div className="not-found-container">
        <div className="not-found-icon">🔍</div>
        <h1>404</h1>
        <h2>Page Not Found</h2>
        <p>The page you're looking for doesn't exist or has been moved.</p>
        <div className="not-found-actions">
          <Link to="/" className="btn btn-primary">
            Go to Homepage
          </Link>
          <Link to="/dashboard" className="btn btn-secondary">
            Go to Dashboard
          </Link>
        </div>
      </div>
      
      <style jsx>{`
        .not-found-page {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          padding: var(--spacing-xl);
          text-align: center;
        }
        
        .not-found-container {
          max-width: 500px;
        }
        
        .not-found-icon {
          font-size: 5rem;
          margin-bottom: var(--spacing-md);
        }
        
        h1 {
          font-size: 6rem;
          margin: 0;
          line-height: 1;
          color: var(--primary);
        }
        
        h2 {
          margin-top: var(--spacing-md);
          margin-bottom: var(--spacing-lg);
          color: var(--text-primary);
        }
        
        p {
          margin-bottom: var(--spacing-xl);
          color: var(--text-secondary);
          font-size: var(--font-lg);
        }
        
        .not-found-actions {
          display: flex;
          justify-content: center;
          gap: var(--spacing-md);
        }
        
        @media (max-width: 576px) {
          .not-found-actions {
            flex-direction: column;
            gap: var(--spacing-sm);
          }
        }
      `}</style>
    </div>
  );
};

export default NotFoundPage;
