import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Header from './Header';
import Footer from './Footer';

const MainLayout = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  
  const handleLogout = () => {
    logout();
    navigate('/login');
  };
  
  return (
    <div className="main-layout">
      <Header toggleSidebar={toggleSidebar} />
      
      <div className="layout-container">
        <aside className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
          <div className="sidebar-header">
            <div className="logo">
              <span className="logo-icon">🏸</span>
              <span className="logo-text">Badminton App</span>
            </div>
            <button 
              className="close-sidebar" 
              onClick={toggleSidebar}
            >
              ×
            </button>
          </div>
          
          <nav className="sidebar-nav">
            <ul className="nav-list">
              <li className="nav-item">
                <Link 
                  to="/dashboard" 
                  className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`}
                >
                  <span className="nav-icon">📊</span>
                  <span className="nav-text">Dashboard</span>
                </Link>
              </li>
              
              <li className="nav-item">
                <Link 
                  to="/tournaments" 
                  className={`nav-link ${location.pathname.includes('/tournaments') ? 'active' : ''}`}
                >
                  <span className="nav-icon">🏆</span>
                  <span className="nav-text">Tournaments</span>
                </Link>
              </li>
              
              <li className="nav-item">
                <Link 
                  to="/players" 
                  className={`nav-link ${location.pathname.includes('/players') ? 'active' : ''}`}
                >
                  <span className="nav-icon">👥</span>
                  <span className="nav-text">Players</span>
                </Link>
              </li>
              
              <li className="nav-item">
                <Link 
                  to="/matches" 
                  className={`nav-link ${location.pathname.includes('/matches') ? 'active' : ''}`}
                >
                  <span className="nav-icon">🎮</span>
                  <span className="nav-text">Matches</span>
                </Link>
              </li>
              
              <li className="nav-item">
                <Link 
                  to="/courts" 
                  className={`nav-link ${location.pathname.includes('/courts') ? 'active' : ''}`}
                >
                  <span className="nav-icon">🏸</span>
                  <span className="nav-text">Courts</span>
                </Link>
              </li>
            </ul>
          </nav>
          
          <div className="sidebar-footer">
            <div className="user-info">
              <div className="user-avatar">
                {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
              </div>
              <div className="user-details">
                <div className="user-name">{user?.name || 'User'}</div>
                <div className="user-role">{user?.role || 'Admin'}</div>
              </div>
            </div>
            
            <div className="user-actions">
              <Link to="/settings" className="action-link">
                <span className="action-icon">⚙️</span>
                <span>Settings</span>
              </Link>
              <button className="action-link" onClick={handleLogout}>
                <span className="action-icon">🚪</span>
                <span>Logout</span>
              </button>
            </div>
          </div>
        </aside>
        
        <main className="content">
          <div className="content-container">
            {children}
          </div>
        </main>
      </div>
      
      <Footer />
      
      <style jsx>{`
        .main-layout {
          display: flex;
          flex-direction: column;
          min-height: 100vh;
        }
        
        .layout-container {
          display: flex;
          flex: 1;
        }
        
        .sidebar {
          width: 250px;
          background-color: var(--surface);
          box-shadow: var(--shadow-sm);
          display: flex;
          flex-direction: column;
          transition: transform var(--transition-normal);
          z-index: 20;
        }
        
        .sidebar-header {
          padding: var(--spacing-md);
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-bottom: 1px solid var(--border);
        }
        
        .logo {
          display: flex;
          align-items: center;
          font-size: var(--font-md);
          font-weight: bold;
          color: var(--primary);
        }
        
        .logo-icon {
          font-size: 1.5em;
          margin-right: var(--spacing-xs);
        }
        
        .close-sidebar {
          display: none;
          background: none;
          border: none;
          font-size: var(--font-xl);
          cursor: pointer;
          color: var(--text-secondary);
        }
        
        .sidebar-nav {
          flex: 1;
          padding: var(--spacing-md) 0;
        }
        
        .nav-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }
        
        .nav-item {
          margin-bottom: var(--spacing-xs);
        }
        
        .nav-link {
          display: flex;
          align-items: center;
          padding: var(--spacing-sm) var(--spacing-md);
          color: var(--text-primary);
          text-decoration: none;
          transition: background-color var(--transition-fast);
          border-left: 3px solid transparent;
        }
        
        .nav-link:hover {
          background-color: rgba(0, 0, 0, 0.05);
          text-decoration: none;
        }
        
        .nav-link.active {
          background-color: rgba(30, 136, 229, 0.1);
          border-left-color: var(--primary);
          color: var(--primary);
        }
        
        .nav-icon {
          font-size: 1.25em;
          margin-right: var(--spacing-md);
          width: 24px;
          text-align: center;
        }
        
        .sidebar-footer {
          padding: var(--spacing-md);
          border-top: 1px solid var(--border);
        }
        
        .user-info {
          display: flex;
          align-items: center;
          margin-bottom: var(--spacing-md);
        }
        
        .user-avatar {
          width: 40px;
          height: 40px;
          border-radius: 50%;
          background-color: var(--primary);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          margin-right: var(--spacing-sm);
        }
        
        .user-name {
          font-weight: 500;
        }
        
        .user-role {
          font-size: var(--font-sm);
          color: var(--text-secondary);
        }
        
        .user-actions {
          display: flex;
          gap: var(--spacing-sm);
        }
        
        .action-link {
          display: flex;
          align-items: center;
          padding: var(--spacing-xs) var(--spacing-sm);
          border-radius: var(--radius-sm);
          color: var(--text-secondary);
          text-decoration: none;
          font-size: var(--font-sm);
          transition: background-color var(--transition-fast);
          background: none;
          border: none;
          cursor: pointer;
          text-align: left;
        }
        
        .action-link:hover {
          background-color: rgba(0, 0, 0, 0.05);
        }
        
        .action-icon {
          margin-right: var(--spacing-xs);
        }
        
        .content {
          flex: 1;
          background-color: var(--background);
          min-height: 100%;
          padding: var(--spacing-md);
        }
        
        @media (max-width: 768px) {
          .sidebar {
            position: fixed;
            top: 0;
            bottom: 0;
            left: 0;
            transform: translateX(-100%);
          }
          
          .sidebar.open {
            transform: translateX(0);
          }
          
          .close-sidebar {
            display: block;
          }
        }
      `}</style>
    </div>
  );
};

export default MainLayout;
