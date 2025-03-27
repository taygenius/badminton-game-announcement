import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const HomePage = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="home-page">
      <header className="home-header">
        <div className="header-content">
          <div className="logo">
            <span className="logo-icon">🏸</span>
            <span className="logo-text">Badminton App</span>
          </div>
          
          <nav className="home-nav">
            <ul className="nav-menu">
              <li className="nav-item">
                <a href="#features" className="nav-link">Features</a>
              </li>
              <li className="nav-item">
                <a href="#about" className="nav-link">About</a>
              </li>
              <li className="nav-item">
                <a href="#contact" className="nav-link">Contact</a>
              </li>
            </ul>
          </nav>
          
          <div className="auth-buttons">
            {isAuthenticated ? (
              <Link to="/dashboard" className="btn btn-primary">Dashboard</Link>
            ) : (
              <>
                <Link to="/login" className="btn btn-outline">Log In</Link>
                <Link to="/register" className="btn btn-primary">Sign Up</Link>
              </>
            )}
          </div>
        </div>
      </header>
      
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1>Badminton Game Announcement System</h1>
            <p className="hero-subtitle">
              Streamline your badminton tournaments with our comprehensive management and announcement solution
            </p>
            
            <div className="hero-buttons">
              {isAuthenticated ? (
                <Link to="/dashboard" className="btn btn-primary btn-large">Go to Dashboard</Link>
              ) : (
                <>
                  <Link to="/register" className="btn btn-primary btn-large">Get Started</Link>
                  <Link to="/login" className="btn btn-secondary btn-large">Demo Login</Link>
                </>
              )}
            </div>
          </div>
          
          <div className="hero-image">
            {/* Placeholder for hero image */}
            <div className="image-placeholder">
              <span className="placeholder-icon">🏸</span>
            </div>
          </div>
        </div>
      </section>
      
      <section id="features" className="features-section">
        <div className="container">
          <h2 className="section-title">Powerful Features</h2>
          
          <div className="features-grid">
            <div className="feature-card">
              <div className="feature-icon">📅</div>
              <h3>Tournament Management</h3>
              <p>Create and manage tournaments with various formats including elimination, round-robin, and group stages.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">👥</div>
              <h3>Player Registration</h3>
              <p>Register players, create profiles, and organize participants by categories and skill levels.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🗓️</div>
              <h3>Match Scheduling</h3>
              <p>Schedule matches with drag-and-drop functionality and automatic court assignment.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Score Tracking</h3>
              <p>Track scores in real-time with an intuitive interface designed for quick updates.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🏸</div>
              <h3>Court Management</h3>
              <p>Assign and track court usage, availability, and maintenance status.</p>
            </div>
            
            <div className="feature-card">
              <div className="feature-icon">🔊</div>
              <h3>Automated Announcements</h3>
              <p>Make automated voice announcements for match calls, score updates, and results.</p>
            </div>
          </div>
        </div>
      </section>
      
      <section id="about" className="about-section">
        <div className="container">
          <h2 className="section-title">About The System</h2>
          
          <div className="about-content">
            <div className="about-text">
              <p>
                The Badminton Game Announcement Application is a comprehensive software solution designed 
                to streamline the management and announcement of badminton matches in tournaments, clubs, 
                and recreational settings.
              </p>
              <p>
                Our application aims to enhance the badminton playing experience by automating announcements, 
                providing clear visual displays, and ensuring all participants and spectators remain informed 
                about current and upcoming matches.
              </p>
              <p>
                Whether you're organizing a small club tournament or a large championship event, our system 
                scales to meet your needs with flexible configuration options and user-friendly interfaces.
              </p>
            </div>
            
            <div className="about-image">
              {/* Placeholder for about image */}
              <div className="image-placeholder">
                <span className="placeholder-icon">📱</span>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section id="contact" className="contact-section">
        <div className="container">
          <h2 className="section-title">Get In Touch</h2>
          
          <div className="contact-content">
            <div className="contact-info">
              <h3>Contact Information</h3>
              
              <div className="contact-item">
                <span className="contact-icon">📧</span>
                <span className="contact-text">support@badmintonapp.com</span>
              </div>
              
              <div className="contact-item">
                <span className="contact-icon">📞</span>
                <span className="contact-text">+1 (555) 123-4567</span>
              </div>
              
              <div className="contact-item">
                <span className="contact-icon">📍</span>
                <span className="contact-text">123 Sports Avenue, London, UK</span>
              </div>
            </div>
            
            <div className="contact-form">
              <h3>Send us a message</h3>
              
              <form>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input type="text" id="name" name="name" placeholder="Your name" />
                </div>
                
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input type="email" id="email" name="email" placeholder="Your email" />
                </div>
                
                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea id="message" name="message" rows="4" placeholder="Your message"></textarea>
                </div>
                
                <button type="submit" className="btn btn-primary">Send Message</button>
              </form>
            </div>
          </div>
        </div>
      </section>
      
      <footer className="home-footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-logo">
              <span className="logo-icon">🏸</span>
              <span className="logo-text">Badminton App</span>
            </div>
            
            <ul className="footer-links">
              <li><a href="#features">Features</a></li>
              <li><a href="#about">About</a></li>
              <li><a href="#contact">Contact</a></li>
              <li><Link to="/login">Login</Link></li>
            </ul>
            
            <div className="copyright">
              &copy; {new Date().getFullYear()} Badminton Game Announcement. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
      
      <style jsx>{`
        .home-page {
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        .container {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 var(--spacing-lg);
        }
        
        .home-header {
          background-color: var(--surface);
          box-shadow: var(--shadow-sm);
          padding: var(--spacing-md) 0;
          position: fixed;
          width: 100%;
          top: 0;
          z-index: 100;
        }
        
        .header-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        
        .logo {
          display: flex;
          align-items: center;
          font-size: var(--font-lg);
          font-weight: bold;
          color: var(--primary);
        }
        
        .logo-icon {
          font-size: 1.5em;
          margin-right: var(--spacing-xs);
        }
        
        .home-nav {
          display: flex;
        }
        
        .nav-menu {
          display: flex;
          list-style: none;
          margin: 0;
          padding: 0;
        }
        
        .nav-item {
          margin: 0 var(--spacing-md);
        }
        
        .nav-link {
          color: var(--text-primary);
          text-decoration: none;
          font-weight: 500;
          transition: color var(--transition-fast);
        }
        
        .nav-link:hover {
          color: var(--primary);
        }
        
        .auth-buttons {
          display: flex;
          gap: var(--spacing-sm);
        }
        
        .hero-section {
          padding: 120px 0 var(--spacing-xl);
          background: linear-gradient(135deg, #f5f7fa 0%, #e4e9f2 100%);
        }
        
        .hero-content {
          text-align: center;
          max-width: 800px;
          margin: 0 auto var(--spacing-xl);
        }
        
        .hero-section h1 {
          font-size: 2.5rem;
          color: var(--text-primary);
          margin-bottom: var(--spacing-md);
        }
        
        .hero-subtitle {
          font-size: var(--font-lg);
          color: var(--text-secondary);
          margin-bottom: var(--spacing-lg);
        }
        
        .hero-buttons {
          display: flex;
          justify-content: center;
          gap: var(--spacing-md);
        }
        
        .btn-large {
          padding: var(--spacing-md) var(--spacing-xl);
          font-size: var(--font-lg);
        }
        
        .hero-image {
          max-width: 600px;
          margin: 0 auto;
        }
        
        .image-placeholder {
          background-color: rgba(30, 136, 229, 0.1);
          border-radius: var(--radius-lg);
          height: 300px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .placeholder-icon {
          font-size: 5rem;
          color: var(--primary);
        }
        
        .section-title {
          text-align: center;
          margin-bottom: var(--spacing-xl);
          color: var(--text-primary);
          font-size: 2rem;
        }
        
        .features-section {
          padding: var(--spacing-xl) 0;
        }
        
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: var(--spacing-lg);
        }
        
        .feature-card {
          background-color: var(--surface);
          border-radius: var(--radius-md);
          padding: var(--spacing-lg);
          box-shadow: var(--shadow-sm);
          transition: transform var(--transition-normal), box-shadow var(--transition-normal);
        }
        
        .feature-card:hover {
          transform: translateY(-5px);
          box-shadow: var(--shadow-md);
        }
        
        .feature-icon {
          font-size: 2.5rem;
          margin-bottom: var(--spacing-md);
          color: var(--primary);
        }
        
        .feature-card h3 {
          margin-bottom: var(--spacing-sm);
          color: var(--text-primary);
        }
        
        .feature-card p {
          color: var(--text-secondary);
          line-height: 1.6;
        }
        
        .about-section {
          padding: var(--spacing-xl) 0;
          background-color: var(--background);
        }
        
        .about-content {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: var(--spacing-xl);
          align-items: center;
        }
        
        .about-text p {
          margin-bottom: var(--spacing-md);
          line-height: 1.6;
          color: var(--text-secondary);
        }
        
        .contact-section {
          padding: var(--spacing-xl) 0;
        }
        
        .contact-content {
          display: grid;
          grid-template-columns: 1fr 2fr;
          gap: var(--spacing-xl);
        }
        
        .contact-info {
          padding: var(--spacing-lg);
          background-color: var(--primary);
          color: white;
          border-radius: var(--radius-md);
        }
        
        .contact-info h3 {
          margin-bottom: var(--spacing-lg);
          color: white;
        }
        
        .contact-item {
          display: flex;
          align-items: center;
          margin-bottom: var(--spacing-md);
        }
        
        .contact-icon {
          font-size: 1.5rem;
          margin-right: var(--spacing-md);
        }
        
        .contact-form {
          padding: var(--spacing-lg);
          background-color: var(--surface);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-sm);
        }
        
        .contact-form h3 {
          margin-bottom: var(--spacing-lg);
          color: var(--text-primary);
        }
        
        .home-footer {
          background-color: var(--text-primary);
          color: white;
          padding: var(--spacing-lg) 0;
        }
        
        .footer-content {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        
        .footer-logo {
          display: flex;
          align-items: center;
          font-size: var(--font-lg);
          font-weight: bold;
          margin-bottom: var(--spacing-lg);
        }
        
        .footer-links {
          display: flex;
          list-style: none;
          margin-bottom: var(--spacing-lg);
        }
        
        .footer-links li {
          margin: 0 var(--spacing-md);
        }
        
        .footer-links a {
          color: white;
          text-decoration: none;
          opacity: 0.8;
          transition: opacity var(--transition-fast);
        }
        
        .footer-links a:hover {
          opacity: 1;
        }
        
        .copyright {
          opacity: 0.8;
          text-align: center;
        }
        
        @media (max-width: 768px) {
          .header-content {
            flex-direction: column;
            gap: var(--spacing-md);
          }
          
          .nav-menu {
            margin: var(--spacing-md) 0;
          }
          
          .about-content,
          .contact-content {
            grid-template-columns: 1fr;
          }
          
          .hero-buttons {
            flex-direction: column;
            gap: var(--spacing-md);
          }
        }
      `}</style>
    </div>
  );
};

export default HomePage;
