import React, { useState, useEffect } from 'react';

/**
 * Reusable Alert component for displaying notifications, messages, errors, etc.
 * 
 * @param {Object} props
 * @param {string} props.type - 'success', 'info', 'warning', or 'error'
 * @param {string} props.message - Alert message to display
 * @param {boolean} props.dismissible - Allow user to dismiss the alert
 * @param {number} props.autoClose - Auto close after milliseconds (0 to disable)
 * @param {function} props.onClose - Function to call when alert is closed
 */
const Alert = ({ 
  type = 'info', 
  message, 
  dismissible = true, 
  autoClose = 0,
  onClose 
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Set up auto-close timer if specified
    if (autoClose > 0) {
      const timer = setTimeout(() => {
        handleClose();
      }, autoClose);

      // Clean up timer
      return () => clearTimeout(timer);
    }
  }, [autoClose]);

  const handleClose = () => {
    setVisible(false);
    if (onClose) {
      onClose();
    }
  };

  if (!visible || !message) {
    return null;
  }

  // Get alert styles based on type
  let alertStyles = {};
  switch (type) {
    case 'success':
      alertStyles = {
        background: 'rgba(76, 175, 80, 0.1)',
        border: '1px solid var(--success)',
        color: 'var(--success)'
      };
      break;
    case 'warning':
      alertStyles = {
        background: 'rgba(255, 152, 0, 0.1)',
        border: '1px solid var(--warning)',
        color: 'var(--warning)'
      };
      break;
    case 'error':
      alertStyles = {
        background: 'rgba(244, 67, 54, 0.1)',
        border: '1px solid var(--error)',
        color: 'var(--error)'
      };
      break;
    case 'info':
    default:
      alertStyles = {
        background: 'rgba(33, 150, 243, 0.1)',
        border: '1px solid var(--info)',
        color: 'var(--info)'
      };
  }

  return (
    <div className="alert" style={alertStyles}>
      <div className="alert-content">{message}</div>
      
      {dismissible && (
        <button className="close-button" onClick={handleClose} aria-label="Close alert">
          ×
        </button>
      )}
      
      <style jsx>{`
        .alert {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: var(--spacing-md) var(--spacing-lg);
          border-radius: var(--radius-md);
          margin-bottom: var(--spacing-md);
          animation: fadeIn var(--transition-normal);
        }
        
        .alert-content {
          flex: 1;
        }
        
        .close-button {
          background: none;
          border: none;
          font-size: var(--font-xl);
          line-height: 1;
          cursor: pointer;
          padding: 0;
          margin-left: var(--spacing-md);
          opacity: 0.7;
          transition: opacity var(--transition-fast);
          color: inherit;
        }
        
        .close-button:hover {
          opacity: 1;
        }
        
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </div>
  );
};

export default Alert;
