import React from 'react';

/**
 * Reusable Table component for displaying tabular data
 * 
 * @param {Object} props
 * @param {Array} props.columns - Array of column definitions
 * @param {Array} props.data - Array of data objects
 * @param {boolean} props.isLoading - Show loading state
 * @param {string} props.emptyMessage - Message to display when there's no data
 * @param {function} props.onRowClick - Callback when a row is clicked
 * @param {string} props.className - Additional CSS classes
 * @param {Object} props.style - Additional inline styles
 * @param {boolean} props.striped - Apply striped rows
 * @param {boolean} props.hoverable - Apply hover effect to rows
 * @param {boolean} props.bordered - Apply borders to cells
 * @param {boolean} props.compact - Use compact padding
 */
const Table = ({
  columns = [],
  data = [],
  isLoading = false,
  emptyMessage = 'No data available',
  onRowClick,
  className = '',
  style = {},
  striped = true,
  hoverable = true,
  bordered = false,
  compact = false
}) => {
  const tableClass = `data-table ${striped ? 'striped' : ''} ${bordered ? 'bordered' : ''} ${compact ? 'compact' : ''} ${className}`;
  const rowClass = `${hoverable ? 'hoverable' : ''} ${onRowClick ? 'clickable' : ''}`;
  
  // Helper function to get cell value
  const getCellValue = (item, column) => {
    if (column.render) {
      return column.render(item, column);
    }
    
    if (column.accessor) {
      if (typeof column.accessor === 'function') {
        return column.accessor(item);
      }
      return item[column.accessor];
    }
    
    return null;
  };
  
  // Handle row click
  const handleRowClick = (item) => {
    if (onRowClick) {
      onRowClick(item);
    }
  };

  return (
    <div className="table-container" style={style}>
      <table className={tableClass}>
        <thead>
          <tr>
            {columns.map((column, index) => (
              <th 
                key={index}
                className={column.className || ''}
                style={{
                  width: column.width,
                  textAlign: column.align || 'left',
                  ...column.style
                }}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        
        <tbody>
          {isLoading ? (
            <tr>
              <td colSpan={columns.length} className="table-loading">
                <div className="loading-spinner"></div>
                <span>Loading data...</span>
              </td>
            </tr>
          ) : data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="table-empty">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((item, rowIndex) => (
              <tr 
                key={rowIndex} 
                className={rowClass}
                onClick={() => handleRowClick(item)}
              >
                {columns.map((column, colIndex) => (
                  <td 
                    key={colIndex}
                    className={column.cellClassName || ''}
                    style={{
                      textAlign: column.align || 'left',
                      ...column.cellStyle
                    }}
                  >
                    {getCellValue(item, column)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
      
      <style jsx>{`
        .table-container {
          width: 100%;
          overflow-x: auto;
        }
        
        .data-table {
          width: 100%;
          border-collapse: collapse;
          border-spacing: 0;
        }
        
        .data-table th {
          background-color: var(--background);
          font-weight: 600;
          text-align: left;
          padding: var(--spacing-md);
          color: var(--text-primary);
          position: sticky;
          top: 0;
          z-index: 1;
          box-shadow: 0 1px 0 0 var(--border);
        }
        
        .data-table td {
          padding: var(--spacing-md);
          border-bottom: 1px solid var(--border);
          color: var(--text-secondary);
        }
        
        .data-table.compact th,
        .data-table.compact td {
          padding: var(--spacing-sm);
        }
        
        .data-table.striped tbody tr:nth-child(odd) {
          background-color: rgba(0, 0, 0, 0.02);
        }
        
        .data-table.bordered th,
        .data-table.bordered td {
          border: 1px solid var(--border);
        }
        
        .data-table tr.hoverable:hover {
          background-color: rgba(30, 136, 229, 0.05);
        }
        
        .data-table tr.clickable {
          cursor: pointer;
        }
        
        .table-loading,
        .table-empty {
          text-align: center;
          padding: var(--spacing-xl) !important;
          color: var(--text-secondary);
        }
        
        .table-loading {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: var(--spacing-md);
        }
        
        .loading-spinner {
          width: 24px;
          height: 24px;
          border: 3px solid rgba(0, 0, 0, 0.1);
          border-radius: 50%;
          border-top: 3px solid var(--primary);
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
};

export default Table;
