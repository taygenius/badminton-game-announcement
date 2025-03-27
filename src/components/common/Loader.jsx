import React from 'react';

/**
 * Reusable loading component for consistent loading indicators throughout the app
 * 
 * @param {Object} props
 * @param {string} props.size - 'small', 'medium', or 'large'
 * @param {string} props.text - Optional text to display below spinner
 * @param {boolean} props.fullScreen - Whether to center in the full viewport
 */
const Loader = ({ size = 'medium', text, fullScreen = false }) => {
  // Set spinner size based on prop
  let spinnerSize;
  switch (size) {
    case 'small':
      spinnerSize = '24px';
      break;
    case 'large':
      spinnerSize = '60px';
      break;
    case 'medium':
    default:
      spinnerSize = '40px';
  }

  // Container class based on fullScreen prop
  const containerClass = fullScreen ? 'loader-fullscreen' : 'loader-container';

  return (
    <div className={containerClass}>
      <div className="spinner" style={{ width: spinnerSize, height: spinnerSize }}></div>
      {text && <p className="loader-text">{text}</p>}

      <style jsx>{`
        .loader-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: var(--spacing-lg);
        }

        .loader-fullscreen {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          width: 100%;
        }

        .spinner {
          border: 4px solid rgba(0, 0, 0, 0.1);
          border-radius: 50%;
          border-top: 4px solid var(--primary);
          animation: spin 1s linear infinite;
        }

        .loader-text {
          margin-top: var(--spacing-md);
          color: var(--text-secondary);
          text-align: center;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Loader;
