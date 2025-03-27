import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Header = ({ toggleSidebar }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  
  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  return (
    <header className="header">
      <div className="header-content">
        <div className="header-left">
          <button 
            className="menu-toggle"
            onClick={toggleSidebar}
            aria-label="Toggle menu"
          >
            ☰
          </button>
          
          <Link to="/dashboard" className="logo">
            <span className="logo-icon">🏸</span>
            <span className="logo-text">Badminton App</span>
          </Link>
        </div>
        
        <div className="header-right">
          <div className="user-menu">
            <button 
              className="user-button"
              onClick={toggleUserMenu}
              aria-haspopup="true"
              aria-expanded={isUserMenuOpen}
            >
              <div className="user-avatar">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <span className="user-name">{user?.name || 'User'}</span>
            </button>
            
            {isUserMenuOpen && (
              <div className="user-dropdown">
                <div className="user-info">
                  <div className="user-avatar">
                    {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div className="user-details">
                    <div className="user-name">{user?.name || 'User'}</div>
                    <div className="user-email">{user?.email || 'user@example.com'}</div>
                  </div>
                </div>
                
                <div className="dropdown-divider"></div>
                
                <Link to="/profile" className="dropdown-item">
                  Profile
                </Link>
                <Link to="/settings" className="dropdown-item">
                  Settings
                </Link>
                
                <div className="dropdown-divider"></div>
                
                <button className="dropdown-item logout" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .header {
          background-color: var(--primary);
          color: white;
          padding: var(--spacing-md) var(--spacing-xl);
          box-shadow: var(--shadow-sm);
          position: sticky;
          top: 0;
          z-index: 30;
        }
        
        .header-content {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .header-left {
          display: flex;
          align-items: center;
        }
        
        .menu-toggle {
          background: none;
          border: none;
          color: white;
          font-size: var(--font-xl);
          margin-right: var(--spacing-md);
          cursor: pointer;
          display: none;
        }
        
        .logo {
          display: flex;
          align-items: center;
          text-decoration: none;
          color: white;
        }
        
        .logo:hover {
          text-decoration: none;
          color: white;
        }
        
        .logo-icon {
          font-size: 1.5em;
          margin-right: var(--spacing-xs);
        }
        
        .logo-text {
          font-weight: bold;
          font-size: var(--font-lg);
        }
        
        .user-menu {
          position: relative;
        }
        
        .user-button {
          display: flex;
          align-items: center;
          background: none;
          border: none;
          color: white;
          cursor: pointer;
        }
        
        .user-avatar {
          width: 2rem;
          height: 2rem;
          border-radius: 50%;
          background-color: var(--primary-light);
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          margin-right: var(--spacing-sm);
        }
        
        .user-dropdown {
          position: absolute;
          top: 100%;
          right: 0;
          margin-top: var(--spacing-sm);
          min-width: 200px;
          background-color: var(--surface);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-md);
          padding: var(--spacing-md);
          z-index: 100;
          color: var(--text-primary);
        }
        
        .user-info {
          display: flex;
          align-items: center;
          margin-bottom: var(--spacing-md);
        }
        
        .user-details {
          flex: 1;
        }
        
        .user-name {
          font-weight: 500;
        }
        
        .user-email {
          font-size: var(--font-sm);
          color: var(--text-secondary);
        }
        
        .dropdown-divider {
          height: 1px;
          background-color: var(--border);
          margin: var(--spacing-sm) 0;
        }
        
        .dropdown-item {
          display: block;
          padding: var(--spacing-sm) var(--spacing-md);
          color: var(--text-primary);
          text-decoration: none;
          border-radius: var(--radius-sm);
          transition: background-color var(--transition-fast);
          width: 100%;
          text-align: left;
          background: none;
          border: none;
          cursor: pointer;
          font-size: inherit;
        }
        
        .dropdown-item:hover {
          background-color: var(--background);
          text-decoration: none;
        }
        
        .dropdown-item.logout {
          color: var(--error);
        }
        
        @media (max-width: 768px) {
          .menu-toggle {
            display: block;
          }
        }
      `}</style>
    </header>
  );
};

export default Header;
