import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { useTournaments } from '../hooks/useTournaments';

const DashboardPage = () => {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  
  // Mock data for demonstration
  const [stats, setStats] = useState({
    totalPlayers: 0,
    totalMatches: 0,
    completedMatches: 0,
    activeCourts: 0
  });
  
  const [recentMatches, setRecentMatches] = useState([]);
  const [upcomingMatches, setUpcomingMatches] = useState([]);
  const [courts, setCourts] = useState([]);
  
  useEffect(() => {
    const loadDashboardData = async () => {
      setIsLoading(true);
      
      try {
        // Simulate API calls
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        setStats({
          totalPlayers: 64,
          totalMatches: 48,
          completedMatches: 12,
          activeCourts: 4
        });
        
        setRecentMatches([
          {
            id: '1',
            player1: { name: 'John Smith' },
            player2: { name: 'David Lee' },
            scores: '21-19, 19-21, 21-18',
            winner: 'player1',
            court: 'Court 1',
            completedAt: '2025-03-27T15:30:00Z'
          },
          {
            id: '2',
            player1: { name: 'Sarah Johnson' },
            player2: { name: 'Emily Wilson' },
            scores: '21-15, 21-17',
            winner: 'player1',
            court: 'Court 2',
            completedAt: '2025-03-27T14:45:00Z'
          },
          {
            id: '3',
            player1: { name: 'Robert Chen' },
            player2: { name: 'Alex Rodriguez' },
            scores: '18-21, 21-16, 21-19',
            winner: 'player2',
            court: 'Court 3',
            completedAt: '2025-03-27T14:00:00Z'
          }
        ]);
        
        setUpcomingMatches([
          {
            id: '4',
            player1: { name: 'Michael Brown' },
            player2: { name: 'James Williams' },
            scheduledTime: '2025-03-27T17:00:00Z',
            court: 'Court 1',
            round: 'Quarter-final'
          },
          {
            id: '5',
            player1: { name: 'Emma Taylor' },
            player2: { name: 'Olivia Martin' },
            scheduledTime: '2025-03-27T17:30:00Z',
            court: 'Court 2',
            round: 'Quarter-final'
          },
          {
            id: '6',
            player1: { name: 'Daniel White' },
            player2: { name: 'Kevin Thomas' },
            scheduledTime: '2025-03-27T18:00:00Z',
            court: 'Court 3',
            round: 'Quarter-final'
          }
        ]);
        
        setCourts([
          {
            id: '1',
            name: 'Court 1',
            status: 'occupied',
            matchInProgress: {
              player1: 'Michael Brown',
              player2: 'James Williams',
              score: '11-9'
            }
          },
          {
            id: '2',
            name: 'Court 2',
            status: 'available'
          },
          {
            id: '3',
            name: 'Court 3',
            status: 'available'
          },
          {
            id: '4',
            name: 'Court 4',
            status: 'maintenance'
          }
        ]);
      } catch (error) {
        console.error('Error loading dashboard data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadDashboardData();
  }, []);

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (isLoading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h1>Welcome, {user?.name || 'User'}</h1>
        
        <div className="tournament-actions">
          <Link to="/tournaments" className="btn btn-secondary">
            View All Tournaments
          </Link>
          <Link to="/tournaments/create" className="btn btn-primary">
            Create Tournament
          </Link>
        </div>
      </div>
      
      <div className="dashboard-overview">
        <div className="quick-stats">
          <div className="stat-card">
            <div className="stat-value">{stats.totalPlayers}</div>
            <div className="stat-label">Total Players</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-value">{stats.totalMatches}</div>
            <div className="stat-label">Total Matches</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-value">{stats.completedMatches}</div>
            <div className="stat-label">Completed Matches</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-value">{stats.activeCourts}</div>
            <div className="stat-label">Active Courts</div>
          </div>
        </div>
      </div>
      
      <div className="dashboard-grid">
        <div className="dashboard-card">
          <h2>Recent Matches</h2>
          
          {recentMatches.length === 0 ? (
            <div className="empty-state">
              <p>No recent matches available.</p>
            </div>
          ) : (
            <div className="recent-matches">
              {recentMatches.map(match => (
                <div key={match.id} className="match-item">
                  <div className="match-players">
                    <span className={match.winner === 'player1' ? 'winner' : ''}>
                      {match.player1.name}
                    </span>
                    <span className="vs">vs</span>
                    <span className={match.winner === 'player2' ? 'winner' : ''}>
                      {match.player2.name}
                    </span>
                  </div>
                  
                  <div className="match-details">
                    <div className="match-score">{match.scores}</div>
                    <div className="match-meta">
                      <span>{match.court}</span>
                      <span>•</span>
                      <span>{formatTime(match.completedAt)}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="card-actions">
            <Link to="/matches" className="btn btn-outline">
              View All Matches
            </Link>
          </div>
        </div>
        
        <div className="dashboard-card">
          <h2>Active Courts</h2>
          
          {courts.length === 0 ? (
            <div className="empty-state">
              <p>No active courts available.</p>
            </div>
          ) : (
            <div className="courts-grid">
              {courts.map(court => (
                <div key={court.id} className={`court-item status-${court.status}`}>
                  <div className="court-header">
                    <h3 className="court-name">{court.name}</h3>
                    <div className="court-status">{court.status}</div>
                  </div>
                  
                  {court.matchInProgress && (
                    <div className="court-match">
                      <div className="match-players">
                        <span>{court.matchInProgress.player1}</span>
                        <span className="vs">vs</span>
                        <span>{court.matchInProgress.player2}</span>
                      </div>
                      {court.matchInProgress.score && (
                        <div className="match-score">{court.matchInProgress.score}</div>
                      )}
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
          
          <div className="card-actions">
            <Link to="/courts" className="btn btn-outline">
              Manage Courts
            </Link>
          </div>
        </div>
        
        <div className="dashboard-card">
          <h2>Upcoming Matches</h2>
          
          {upcomingMatches.length === 0 ? (
            <div className="empty-state">
              <p>No upcoming matches available.</p>
            </div>
          ) : (
            <div className="upcoming-matches">
              {upcomingMatches.map(match => (
                <div key={match.id} className="match-item">
                  <div className="match-time">
                    {formatTime(match.scheduledTime)}
                  </div>
                  
                  <div className="match-content">
                    <div className="match-players">
                      <span>{match.player1.name}</span>
                      <span className="vs">vs</span>
                      <span>{match.player2.name}</span>
                    </div>
                    
                    <div className="match-meta">
                      <span>{match.court}</span>
                      <span>•</span>
                      <span>{match.round}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
          
          <div className="card-actions">
            <Link to="/matches/schedule" className="btn btn-outline">
              View Schedule
            </Link>
          </div>
        </div>
        
        <div className="dashboard-card dashboard-actions">
          <h2>Quick Actions</h2>
          
          <div className="action-buttons">
            <Link to="/matches/call" className="action-button announce-match">
              <span className="icon">🔊</span>
              <span>Call Next Match</span>
            </Link>
            
            <Link to="/players/create" className="action-button add-player">
              <span className="icon">👤</span>
              <span>Add Player</span>
            </Link>
            
            <Link to="/courts" className="action-button manage-courts">
              <span className="icon">🏸</span>
              <span>Manage Courts</span>
            </Link>
            
            <Link to="/matches/live" className="action-button score-tracking">
              <span className="icon">📊</span>
              <span>Score Tracking</span>
            </Link>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .dashboard-overview {
          margin-bottom: var(--spacing-lg);
        }
        
        .tournament-actions {
          display: flex;
          gap: var(--spacing-md);
        }
        
        .recent-matches,
        .upcoming-matches {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-sm);
        }
        
        .match-item {
          display: flex;
          padding: var(--spacing-sm);
          border-radius: var(--radius-sm);
          background-color: rgba(0, 0, 0, 0.02);
        }
        
        .match-players {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
        }
        
        .vs {
          opacity: 0.5;
          margin: 0 var(--spacing-xs);
        }
        
        .winner {
          font-weight: bold;
          color: var(--success);
        }
        
        .match-details {
          margin-left: auto;
          text-align: right;
        }
        
        .match-score {
          font-weight: 500;
        }
        
        .match-meta {
          font-size: var(--font-sm);
          color: var(--text-secondary);
        }
        
        .match-meta span {
          margin: 0 var(--spacing-xs);
        }
        
        .match-meta span:first-child {
          margin-left: 0;
        }
        
        .match-meta span:last-child {
          margin-right: 0;
        }
        
        .courts-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
          gap: var(--spacing-md);
        }
        
        .court-item {
          padding: var(--spacing-md);
          border-radius: var(--radius-sm);
          background-color: rgba(0, 0, 0, 0.02);
          border-left: 3px solid transparent;
        }
        
        .court-item.status-available {
          border-left-color: var(--court-available);
        }
        
        .court-item.status-occupied {
          border-left-color: var(--court-occupied);
        }
        
        .court-item.status-maintenance {
          border-left-color: var(--court-maintenance);
        }
        
        .court-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--spacing-sm);
        }
        
        .court-name {
          margin: 0;
          font-size: var(--font-md);
        }
        
        .court-status {
          font-size: var(--font-xs);
          text-transform: uppercase;
          padding: 2px var(--spacing-xs);
          border-radius: var(--radius-sm);
        }
        
        .status-available .court-status {
          background-color: var(--court-available);
          color: white;
        }
        
        .status-occupied .court-status {
          background-color: var(--court-occupied);
          color: white;
        }
        
        .status-maintenance .court-status {
          background-color: var(--court-maintenance);
          color: white;
        }
        
        .court-match {
          font-size: var(--font-sm);
        }
        
        .match-time {
          min-width: 60px;
          padding: var(--spacing-xs) var(--spacing-sm);
          background-color: var(--primary);
          color: white;
          border-radius: var(--radius-sm);
          text-align: center;
          font-weight: 500;
          margin-right: var(--spacing-md);
        }
        
        .match-content {
          flex: 1;
        }
        
        @media (max-width: 768px) {
          .match-item {
            flex-direction: column;
            gap: var(--spacing-xs);
          }
          
          .match-details {
            margin-left: 0;
            text-align: left;
          }
          
          .match-time {
            margin-bottom: var(--spacing-xs);
          }
        }
      `}</style>
    </div>
  );
};

export default DashboardPage;
