import React from 'react';

/**
 * Reusable Card component for consistent styling of card elements throughout the app
 * 
 * @param {Object} props
 * @param {React.ReactNode} props.children - Card content
 * @param {string} props.title - Optional card title
 * @param {React.ReactNode} props.actions - Optional footer actions (buttons, links)
 * @param {Object} props.style - Additional inline styles
 * @param {string} props.className - Additional CSS classes
 * @param {boolean} props.noPadding - Remove default padding
 */
const Card = ({ 
  children, 
  title, 
  actions, 
  style = {}, 
  className = '',
  noPadding = false
}) => {
  const cardClass = `card ${className}`;
  const contentClass = `card-content ${noPadding ? 'no-padding' : ''}`;
  
  return (
    <div className={cardClass} style={style}>
      {title && (
        <div className="card-header">
          {typeof title === 'string' ? <h3>{title}</h3> : title}
        </div>
      )}
      
      <div className={contentClass}>
        {children}
      </div>
      
      {actions && (
        <div className="card-actions">
          {actions}
        </div>
      )}
      
      <style jsx>{`
        .card {
          background-color: var(--surface);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-sm);
          overflow: hidden;
          transition: box-shadow var(--transition-normal);
        }
        
        .card:hover {
          box-shadow: var(--shadow-md);
        }
        
        .card-header {
          padding: var(--spacing-md) var(--spacing-lg);
          border-bottom: 1px solid var(--border);
        }
        
        .card-header h3 {
          margin: 0;
          font-size: var(--font-lg);
          color: var(--primary);
        }
        
        .card-content {
          padding: var(--spacing-lg);
        }
        
        .card-content.no-padding {
          padding: 0;
        }
        
        .card-actions {
          padding: var(--spacing-md) var(--spacing-lg);
          border-top: 1px solid var(--border);
          display: flex;
          justify-content: flex-end;
          gap: var(--spacing-md);
        }
      `}</style>
    </div>
  );
};

export default Card;
