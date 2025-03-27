import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { TournamentProvider } from './contexts/TournamentContext';
import { AnnouncementProvider } from './contexts/AnnouncementContext';

// Layouts
import MainLayout from './components/common/MainLayout';
import AuthLayout from './components/common/AuthLayout';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import TournamentsPage from './pages/TournamentsPage';
import TournamentDetailPage from './pages/TournamentDetailPage';
import PlayersPage from './pages/PlayersPage';
import PlayerDetailPage from './pages/PlayerDetailPage';
import MatchesPage from './pages/MatchesPage';
import LiveMatchPage from './pages/LiveMatchPage';
import CourtsPage from './pages/CourtsPage';
import SettingsPage from './pages/SettingsPage';
import NotFoundPage from './pages/NotFoundPage';

// Auth Protected Route Component
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = localStorage.getItem('badminton_auth_token');
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate initial loading of app resources
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  }, []);

  if (isLoading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <h1>Loading Badminton App...</h1>
      </div>
    );
  }

  return (
    <Router basename={process.env.PUBLIC_URL}>
      <AuthProvider>
        <TournamentProvider>
          <AnnouncementProvider>
            <Routes>
              {/* Public routes */}
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={
                <AuthLayout>
                  <LoginPage />
                </AuthLayout>
              } />
              <Route path="/register" element={
                <AuthLayout>
                  <RegisterPage />
                </AuthLayout>
              } />
              
              {/* Protected routes */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <MainLayout>
                    <DashboardPage />
                  </MainLayout>
                </ProtectedRoute>
              } />
              <Route path="/tournaments" element={
                <ProtectedRoute>
                  <MainLayout>
                    <TournamentsPage />
                  </MainLayout>
                </ProtectedRoute>
              } />
              <Route path="/tournaments/:id" element={
                <ProtectedRoute>
                  <MainLayout>
                    <TournamentDetailPage />
                  </MainLayout>
                </ProtectedRoute>
              } />
              <Route path="/players" element={
                <ProtectedRoute>
                  <MainLayout>
                    <PlayersPage />
                  </MainLayout>
                </ProtectedRoute>
              } />
              <Route path="/players/:id" element={
                <ProtectedRoute>
                  <MainLayout>
                    <PlayerDetailPage />
                  </MainLayout>
                </ProtectedRoute>
              } />
              <Route path="/matches" element={
                <ProtectedRoute>
                  <MainLayout>
                    <MatchesPage />
                  </MainLayout>
                </ProtectedRoute>
              } />
              <Route path="/matches/live/:id" element={
                <ProtectedRoute>
                  <MainLayout>
                    <LiveMatchPage />
                  </MainLayout>
                </ProtectedRoute>
              } />
              <Route path="/courts" element={
                <ProtectedRoute>
                  <MainLayout>
                    <CourtsPage />
                  </MainLayout>
                </ProtectedRoute>
              } />
              <Route path="/settings" element={
                <ProtectedRoute>
                  <MainLayout>
                    <SettingsPage />
                  </MainLayout>
                </ProtectedRoute>
              } />
              
              {/* 404 Not Found route */}
              <Route path="*" element={<NotFoundPage />} />
            </Routes>
          </AnnouncementProvider>
        </TournamentProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
