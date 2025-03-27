import React, { useEffect, useRef } from 'react';

/**
 * Reusable Modal component for creating dialogs, popovers, etc.
 * 
 * @param {Object} props
 * @param {boolean} props.isOpen - Controls modal visibility
 * @param {function} props.onClose - Function to call when modal should close
 * @param {React.ReactNode} props.children - Modal content
 * @param {string} props.title - Optional modal title
 * @param {React.ReactNode} props.footer - Optional modal footer content
 * @param {string} props.size - 'small', 'medium', 'large', or 'fullscreen'
 * @param {boolean} props.closeOnClickOutside - Close modal when clicking outside
 * @param {boolean} props.closeOnEsc - Close modal when pressing Escape key
 */
const Modal = ({
  isOpen,
  onClose,
  children,
  title,
  footer,
  size = 'medium',
  closeOnClickOutside = true,
  closeOnEsc = true
}) => {
  const modalRef = useRef(null);

  // Set width based on size prop
  let modalWidth;
  switch (size) {
    case 'small':
      modalWidth = '400px';
      break;
    case 'large':
      modalWidth = '800px';
      break;
    case 'fullscreen':
      modalWidth = '95%';
      break;
    case 'medium':
    default:
      modalWidth = '600px';
  }

  // Handle click outside modal content
  const handleOutsideClick = (e) => {
    if (closeOnClickOutside && modalRef.current && !modalRef.current.contains(e.target)) {
      onClose();
    }
  };

  // Handle keyboard events
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (closeOnEsc && e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      // Add event listeners when modal is open
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden'; // Prevent scrolling behind modal
    }

    // Clean up event listeners when modal closes
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'auto'; // Restore scrolling
    };
  }, [isOpen, closeOnEsc, onClose]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-backdrop" onClick={handleOutsideClick}>
      <div 
        className="modal-container" 
        ref={modalRef}
        style={{ maxWidth: modalWidth }}
      >
        {title && (
          <div className="modal-header">
            <h3 className="modal-title">{title}</h3>
            <button 
              className="close-button" 
              onClick={onClose}
              aria-label="Close modal"
            >
              ×
            </button>
          </div>
        )}
        
        <div className="modal-body">
          {children}
        </div>
        
        {footer && (
          <div className="modal-footer">
            {footer}
          </div>
        )}
      </div>
      
      <style jsx>{`
        .modal-backdrop {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background-color: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
          padding: var(--spacing-md);
          animation: fadeIn var(--transition-fast);
        }
        
        .modal-container {
          background-color: var(--surface);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-lg);
          width: 100%;
          max-height: 90vh;
          display: flex;
          flex-direction: column;
          animation: slideIn var(--transition-normal);
        }
        
        .modal-header {
          padding: var(--spacing-md) var(--spacing-lg);
          border-bottom: 1px solid var(--border);
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .modal-title {
          margin: 0;
          font-size: var(--font-lg);
          color: var(--text-primary);
        }
        
        .close-button {
          background: none;
          border: none;
          font-size: var(--font-xl);
          line-height: 1;
          cursor: pointer;
          padding: 0;
          color: var(--text-secondary);
        }
        
        .modal-body {
          padding: var(--spacing-lg);
          overflow-y: auto;
          flex: 1;
        }
        
        .modal-footer {
          padding: var(--spacing-md) var(--spacing-lg);
          border-top: 1px solid var(--border);
          display: flex;
          justify-content: flex-end;
          gap: var(--spacing-md);
        }
        
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        
        @keyframes slideIn {
          from {
            opacity: 0;
            transform: translateY(-30px);
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

export default Modal;
