import React from 'react';

/**
 * FormGroup component for consistent form field styling
 */
export const FormGroup = ({ children, className = '', style = {} }) => {
  return (
    <div className={`form-group ${className}`} style={style}>
      {children}
      <style jsx>{`
        .form-group {
          margin-bottom: var(--spacing-md);
        }
      `}</style>
    </div>
  );
};

/**
 * Label component for form fields
 */
export const FormLabel = ({ htmlFor, children, required = false, className = '', style = {} }) => {
  return (
    <label htmlFor={htmlFor} className={`form-label ${className}`} style={style}>
      {children}
      {required && <span className="required-indicator">*</span>}
      <style jsx>{`
        .form-label {
          display: block;
          margin-bottom: var(--spacing-xs);
          font-weight: 500;
          color: var(--text-primary);
        }
        
        .required-indicator {
          color: var(--error);
          margin-left: var(--spacing-xs);
        }
      `}</style>
    </label>
  );
};

/**
 * Text Input component
 */
export const TextInput = ({ 
  id, 
  name, 
  value, 
  onChange, 
  placeholder = '', 
  type = 'text',
  error = '', 
  disabled = false,
  required = false,
  className = '',
  style = {},
  ...props
}) => {
  const inputClass = `form-input ${error ? 'has-error' : ''} ${className}`;
  
  return (
    <>
      <input
        id={id}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        disabled={disabled}
        required={required}
        className={inputClass}
        style={style}
        {...props}
      />
      {error && <div className="error-message">{error}</div>}
      
      <style jsx>{`
        .form-input {
          width: 100%;
          padding: var(--spacing-sm) var(--spacing-md);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          font-size: var(--font-md);
          transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
        }
        
        .form-input:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(30, 136, 229, 0.1);
        }
        
        .form-input.has-error {
          border-color: var(--error);
        }
        
        .form-input.has-error:focus {
          box-shadow: 0 0 0 3px rgba(244, 67, 54, 0.1);
        }
        
        .form-input:disabled {
          background-color: var(--background);
          cursor: not-allowed;
          opacity: 0.7;
        }
        
        .error-message {
          color: var(--error);
          font-size: var(--font-sm);
          margin-top: var(--spacing-xs);
        }
      `}</style>
    </>
  );
};

/**
 * Textarea component
 */
export const TextArea = ({ 
  id, 
  name, 
  value, 
  onChange, 
  placeholder = '', 
  rows = 4,
  error = '', 
  disabled = false,
  required = false,
  className = '',
  style = {},
  ...props
}) => {
  const textareaClass = `form-textarea ${error ? 'has-error' : ''} ${className}`;
  
  return (
    <>
      <textarea
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        rows={rows}
        disabled={disabled}
        required={required}
        className={textareaClass}
        style={style}
        {...props}
      />
      {error && <div className="error-message">{error}</div>}
      
      <style jsx>{`
        .form-textarea {
          width: 100%;
          padding: var(--spacing-sm) var(--spacing-md);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          font-size: var(--font-md);
          transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
          resize: vertical;
          min-height: 100px;
        }
        
        .form-textarea:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(30, 136, 229, 0.1);
        }
        
        .form-textarea.has-error {
          border-color: var(--error);
        }
        
        .form-textarea.has-error:focus {
          box-shadow: 0 0 0 3px rgba(244, 67, 54, 0.1);
        }
        
        .form-textarea:disabled {
          background-color: var(--background);
          cursor: not-allowed;
          opacity: 0.7;
        }
        
        .error-message {
          color: var(--error);
          font-size: var(--font-sm);
          margin-top: var(--spacing-xs);
        }
      `}</style>
    </>
  );
};

/**
 * Select component
 */
export const Select = ({ 
  id, 
  name, 
  value, 
  onChange, 
  options = [],
  placeholder = 'Select an option',
  error = '', 
  disabled = false,
  required = false,
  className = '',
  style = {},
  ...props
}) => {
  const selectClass = `form-select ${error ? 'has-error' : ''} ${className}`;
  
  return (
    <>
      <select
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className={selectClass}
        style={style}
        {...props}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((option) => (
          <option 
            key={option.value} 
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>
      {error && <div className="error-message">{error}</div>}
      
      <style jsx>{`
        .form-select {
          width: 100%;
          padding: var(--spacing-sm) var(--spacing-md);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          font-size: var(--font-md);
          transition: border-color var(--transition-fast), box-shadow var(--transition-fast);
          background-color: white;
          cursor: pointer;
        }
        
        .form-select:focus {
          outline: none;
          border-color: var(--primary);
          box-shadow: 0 0 0 3px rgba(30, 136, 229, 0.1);
        }
        
        .form-select.has-error {
          border-color: var(--error);
        }
        
        .form-select.has-error:focus {
          box-shadow: 0 0 0 3px rgba(244, 67, 54, 0.1);
        }
        
        .form-select:disabled {
          background-color: var(--background);
          cursor: not-allowed;
          opacity: 0.7;
        }
        
        .error-message {
          color: var(--error);
          font-size: var(--font-sm);
          margin-top: var(--spacing-xs);
        }
      `}</style>
    </>
  );
};

/**
 * Checkbox component
 */
export const Checkbox = ({ 
  id, 
  name, 
  checked, 
  onChange, 
  label,
  error = '', 
  disabled = false,
  className = '',
  style = {},
  ...props
}) => {
  const checkboxClass = `checkbox-wrapper ${error ? 'has-error' : ''} ${className}`;
  
  return (
    <div className={checkboxClass} style={style}>
      <label className="checkbox-label">
        <input
          type="checkbox"
          id={id}
          name={name}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="checkbox-input"
          {...props}
        />
        <span className="checkbox-text">{label}</span>
      </label>
      
      {error && <div className="error-message">{error}</div>}
      
      <style jsx>{`
        .checkbox-wrapper {
          margin-bottom: var(--spacing-sm);
        }
        
        .checkbox-label {
          display: flex;
          align-items: center;
          cursor: pointer;
        }
        
        .checkbox-input {
          margin-right: var(--spacing-sm);
          cursor: pointer;
        }
        
        .checkbox-input:disabled {
          cursor: not-allowed;
        }
        
        .checkbox-input:disabled + .checkbox-text {
          opacity: 0.7;
          cursor: not-allowed;
        }
        
        .checkbox-label.has-error .checkbox-text {
          color: var(--error);
        }
        
        .error-message {
          color: var(--error);
          font-size: var(--font-sm);
          margin-top: var(--spacing-xs);
          margin-left: 24px;
        }
      `}</style>
    </div>
  );
};

/**
 * Radio Button component
 */
export const RadioButton = ({ 
  id, 
  name, 
  value,
  checked, 
  onChange, 
  label,
  error = '', 
  disabled = false,
  className = '',
  style = {},
  ...props
}) => {
  const radioClass = `radio-wrapper ${error ? 'has-error' : ''} ${className}`;
  
  return (
    <div className={radioClass} style={style}>
      <label className="radio-label">
        <input
          type="radio"
          id={id}
          name={name}
          value={value}
          checked={checked}
          onChange={onChange}
          disabled={disabled}
          className="radio-input"
          {...props}
        />
        <span className="radio-text">{label}</span>
      </label>
      
      {error && <div className="error-message">{error}</div>}
      
      <style jsx>{`
        .radio-wrapper {
          margin-bottom: var(--spacing-sm);
        }
        
        .radio-label {
          display: flex;
          align-items: center;
          cursor: pointer;
        }
        
        .radio-input {
          margin-right: var(--spacing-sm);
          cursor: pointer;
        }
        
        .radio-input:disabled {
          cursor: not-allowed;
        }
        
        .radio-input:disabled + .radio-text {
          opacity: 0.7;
          cursor: not-allowed;
        }
        
        .radio-label.has-error .radio-text {
          color: var(--error);
        }
        
        .error-message {
          color: var(--error);
          font-size: var(--font-sm);
          margin-top: var(--spacing-xs);
          margin-left: 24px;
        }
      `}</style>
    </div>
  );
};

/**
 * Form Action component for form buttons section
 */
export const FormActions = ({ children, align = 'right', className = '', style = {} }) => {
  let justifyContent;
  switch (align) {
    case 'left':
      justifyContent = 'flex-start';
      break;
    case 'center':
      justifyContent = 'center';
      break;
    case 'between':
      justifyContent = 'space-between';
      break;
    case 'right':
    default:
      justifyContent = 'flex-end';
  }
  
  return (
    <div 
      className={`form-actions ${className}`} 
      style={{ ...style, justifyContent }}
    >
      {children}
      <style jsx>{`
        .form-actions {
          display: flex;
          gap: var(--spacing-md);
          margin-top: var(--spacing-lg);
        }
        
        @media (max-width: 576px) {
          .form-actions {
            flex-direction: column-reverse;
          }
          
          .form-actions > :global(*) {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};
