import React, { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';

const TournamentDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [tournament, setTournament] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');
  const [players, setPlayers] = useState([]);
  const [matches, setMatches] = useState([]);

  useEffect(() => {
    const loadTournamentData = async () => {
      setIsLoading(true);
      
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock tournament data
        const mockTournament = {
          id,
          name: id === '1' ? 'Spring Championship 2025' : 
                id === '2' ? 'Summer Club Tournament' : 
                id === '3' ? 'Winter Invitational 2024' : 
                `Tournament ${id}`,
          description: 'This is a comprehensive badminton tournament featuring both singles and doubles categories across various skill levels.',
          location: 'Main Sports Centre',
          startDate: '2025-03-20',
          endDate: '2025-03-27',
          status: id === '1' ? 'InProgress' : 
                  id === '2' ? 'Upcoming' : 
                  'Completed',
          format: id === '1' ? 'elimination' : 
                  id === '2' ? 'roundRobin' : 
                  'doubleElimination',
          maxPlayers: 64,
          courtCount: 6,
          playerCount: 48,
          matchCount: 32
        };
        
        // Mock players data
        const mockPlayers = [
          { id: '1', name: 'John Smith', age: 28, country: 'UK', ranking: 12, matchesPlayed: 8, matchesWon: 6 },
          { id: '2', name: 'Sarah Johnson', age: 25, country: 'USA', ranking: 8, matchesPlayed: 9, matchesWon: 7 },
          { id: '3', name: 'David Lee', age: 30, country: 'Canada', ranking: 15, matchesPlayed: 7, matchesWon: 4 },
          { id: '4', name: 'Emma Wilson', age: 22, country: 'Australia', ranking: 20, matchesPlayed: 8, matchesWon: 5 },
          { id: '5', name: 'Michael Brown', age: 27, country: 'UK', ranking: 18, matchesPlayed: 6, matchesWon: 3 },
          { id: '6', name: 'Olivia Martin', age: 24, country: 'France', ranking: 10, matchesPlayed: 9, matchesWon: 6 }
        ];
        
        // Mock matches data
        const mockMatches = [
          { 
            id: '1', 
            player1: { id: '1', name: 'John Smith' }, 
            player2: { id: '3', name: 'David Lee' }, 
            status: 'completed', 
            scores: '21-19, 19-21, 21-18', 
            winner: 'player1',
            court: 'Court 1',
            round: 'Round of 16',
            scheduledTime: '2025-03-20T14:00:00Z',
            completedAt: '2025-03-20T15:20:00Z'
          },
          { 
            id: '2', 
            player1: { id: '2', name: 'Sarah Johnson' }, 
            player2: { id: '4', name: 'Emma Wilson' }, 
            status: 'completed', 
            scores: '21-15, 21-17', 
            winner: 'player1',
            court: 'Court 2',
            round: 'Round of 16',
            scheduledTime: '2025-03-20T14:30:00Z',
            completedAt: '2025-03-20T15:30:00Z'
          },
          { 
            id: '3', 
            player1: { id: '5', name: 'Michael Brown' }, 
            player2: { id: '6', name: 'Olivia Martin' }, 
            status: 'inProgress', 
            currentScore: '16-14',
            court: 'Court 3',
            round: 'Quarter-final',
            scheduledTime: '2025-03-21T16:00:00Z'
          },
          { 
            id: '4', 
            player1: { id: '1', name: 'John Smith' }, 
            player2: { id: '2', name: 'Sarah Johnson' }, 
            status: 'scheduled', 
            court: 'Court 1',
            round: 'Semi-final',
            scheduledTime: '2025-03-22T15:00:00Z'
          }
        ];
        
        setTournament(mockTournament);
        setPlayers(mockPlayers);
        setMatches(mockMatches);
      } catch (error) {
        console.error('Error loading tournament data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadTournamentData();
  }, [id]);

  const handleStatusChange = (newStatus) => {
    setTournament(prev => ({ ...prev, status: newStatus }));
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this tournament? This action cannot be undone.')) {
      // In a real app, this would be an API call
      navigate('/tournaments');
    }
  };
  
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };
  
  const getFormatName = (format) => {
    switch (format) {
      case 'elimination': return 'Single Elimination';
      case 'doubleElimination': return 'Double Elimination';
      case 'roundRobin': return 'Round Robin';
      case 'groups': return 'Group Stage + Knockout';
      default: return format;
    }
  };
  
  if (isLoading) {
    return <div className="loading">Loading tournament details...</div>;
  }
  
  if (!tournament) {
    return <div className="error-state">Tournament not found</div>;
  }

  return (
    <div className="tournament-detail-page">
      <div className="detail-header">
        <div className="header-content">
          <h1>{tournament.name}</h1>
          <div className="tournament-meta">
            <div className="tournament-dates">
              <span className="icon">📅</span>
              {formatDate(tournament.startDate)} - {formatDate(tournament.endDate)}
            </div>
            <div className="tournament-location">
              <span className="icon">📍</span> {tournament.location}
            </div>
            <div className={`tournament-status status-${tournament.status.toLowerCase()}`}>
              {tournament.status}
            </div>
          </div>
        </div>
        
        <div className="header-actions">
          <div className="status-actions">
            <label>Status:</label>
            <div className="status-buttons">
              <button 
                onClick={() => handleStatusChange('Upcoming')}
                className={tournament.status === 'Upcoming' ? 'active' : ''}
                disabled={tournament.status === 'Upcoming'}
              >
                Upcoming
              </button>
              <button 
                onClick={() => handleStatusChange('InProgress')}
                className={tournament.status === 'InProgress' ? 'active' : ''}
                disabled={tournament.status === 'InProgress'}
              >
                In Progress
              </button>
              <button 
                onClick={() => handleStatusChange('Completed')}
                className={tournament.status === 'Completed' ? 'active' : ''}
                disabled={tournament.status === 'Completed'}
              >
                Completed
              </button>
            </div>
          </div>
          
          <div className="management-actions">
            <Link to={`/tournaments/${id}/edit`} className="btn btn-secondary">
              Edit Tournament
            </Link>
            <button className="btn btn-danger" onClick={handleDelete}>
              Delete Tournament
            </button>
          </div>
        </div>
      </div>
      
      <div className="detail-tabs">
        <button 
          className={activeTab === 'overview' ? 'active' : ''}
          onClick={() => setActiveTab('overview')}
        >
          Overview
        </button>
        <button 
          className={activeTab === 'players' ? 'active' : ''}
          onClick={() => setActiveTab('players')}
        >
          Players ({players.length})
        </button>
        <button 
          className={activeTab === 'matches' ? 'active' : ''}
          onClick={() => setActiveTab('matches')}
        >
          Matches ({matches.length})
        </button>
        <button 
          className={activeTab === 'draws' ? 'active' : ''}
          onClick={() => setActiveTab('draws')}
        >
          Tournament Draws
        </button>
      </div>
      
      <div className="detail-content">
        {activeTab === 'overview' && (
          <div className="overview-tab">
            <div className="tournament-description">
              <h2>Description</h2>
              <p>{tournament.description || 'No description provided.'}</p>
            </div>
            
            <div className="tournament-details">
              <h2>Tournament Details</h2>
              <div className="details-grid">
                <div className="detail-item">
                  <h3>Format</h3>
                  <p>{getFormatName(tournament.format)}</p>
                </div>
                <div className="detail-item">
                  <h3>Players</h3>
                  <p>{tournament.playerCount} / {tournament.maxPlayers}</p>
                </div>
                <div className="detail-item">
                  <h3>Courts</h3>
                  <p>{tournament.courtCount}</p>
                </div>
                <div className="detail-item">
                  <h3>Matches</h3>
                  <p>{tournament.matchCount}</p>
                </div>
                <div className="detail-item">
                  <h3>Progress</h3>
                  <div className="progress-bar">
                    <div 
                      className="progress" 
                      style={{ 
                        width: `${Math.round(
                          (matches.filter(m => m.status === 'completed').length / 
                          Math.max(1, matches.length)) * 100
                        )}%` 
                      }}
                    />
                  </div>
                  <p>{matches.filter(m => m.status === 'completed').length} / {matches.length} matches completed</p>
                </div>
              </div>
            </div>
            
            <div className="quick-actions">
              <h2>Quick Actions</h2>
              <div className="actions-grid">
                <Link to={`/tournaments/${id}/players/add`} className="action-card">
                  <span className="icon">👤</span>
                  <span className="text">Add Players</span>
                </Link>
                <Link to={`/tournaments/${id}/matches/schedule`} className="action-card">
                  <span className="icon">📅</span>
                  <span className="text">Schedule Matches</span>
                </Link>
                <Link to={`/tournaments/${id}/matches/call`} className="action-card">
                  <span className="icon">🔊</span>
                  <span className="text">Call Next Match</span>
                </Link>
                <Link to={`/tournaments/${id}/display`} className="action-card">
                  <span className="icon">🖥️</span>
                  <span className="text">Open Display</span>
                </Link>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'players' && (
          <div className="players-tab">
            <div className="tab-actions">
              <Link to={`/tournaments/${id}/players/add`} className="btn btn-primary">
                Add Players
              </Link>
              <Link to={`/tournaments/${id}/players/import`} className="btn btn-secondary">
                Import Players
              </Link>
            </div>
            
            <div className="players-table-container">
              <table className="players-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Age</th>
                    <th>Country</th>
                    <th>Ranking</th>
                    <th>Matches Played</th>
                    <th>Matches Won</th>
                    <th>Win Rate</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {players.map(player => (
                    <tr key={player.id}>
                      <td>
                        <Link to={`/players/${player.id}`}>{player.name}</Link>
                      </td>
                      <td>{player.age}</td>
                      <td>{player.country}</td>
                      <td>{player.ranking}</td>
                      <td>{player.matchesPlayed}</td>
                      <td>{player.matchesWon}</td>
                      <td>
                        {Math.round((player.matchesWon / Math.max(1, player.matchesPlayed)) * 100)}%
                      </td>
                      <td>
                        <div className="table-actions">
                          <Link to={`/players/${player.id}`} className="btn btn-small btn-outline">
                            View
                          </Link>
                          <Link to={`/players/${player.id}/edit`} className="btn btn-small btn-outline">
                            Edit
                          </Link>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {activeTab === 'matches' && (
          <div className="matches-tab">
            <div className="tab-actions">
              <Link to={`/tournaments/${id}/matches/create`} className="btn btn-primary">
                Create Match
              </Link>
              <Link to={`/tournaments/${id}/matches/schedule`} className="btn btn-secondary">
                Schedule Matches
              </Link>
            </div>
            
            <div className="matches-table-container">
              <table className="matches-table">
                <thead>
                  <tr>
                    <th>Players</th>
                    <th>Round</th>
                    <th>Court</th>
                    <th>Time</th>
                    <th>Status</th>
                    <th>Score/Result</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {matches.map(match => (
                    <tr key={match.id} className={`match-row status-${match.status}`}>
                      <td>
                        <div className="match-players">
                          <Link to={`/players/${match.player1.id}`}>
                            {match.player1.name}
                          </Link>
                          <span className="vs">vs</span>
                          <Link to={`/players/${match.player2.id}`}>
                            {match.player2.name}
                          </Link>
                        </div>
                      </td>
                      <td>{match.round}</td>
                      <td>{match.court}</td>
                      <td>
                        {match.scheduledTime ? 
                         new Date(match.scheduledTime).toLocaleTimeString([], {
                           hour: '2-digit',
                           minute: '2-digit'
                         }) : 'TBD'}
                      </td>
                      <td>
                        <span className={`status-badge ${match.status}`}>
                          {match.status === 'completed' ? 'Completed' : 
                           match.status === 'inProgress' ? 'In Progress' : 
                           'Scheduled'}
                        </span>
                      </td>
                      <td>
                        {match.status === 'completed' ? (
                          <div className="match-result">
                            <div className="match-score">{match.scores}</div>
                            <div className="match-winner">
                              Winner: {match.winner === 'player1' ? match.player1.name : match.player2.name}
                            </div>
                          </div>
                        ) : match.status === 'inProgress' ? (
                          <div className="current-score">{match.currentScore}</div>
                        ) : (
                          <span className="pending">-</span>
                        )}
                      </td>
                      <td>
                        <div className="table-actions">
                          {match.status === 'scheduled' && (
                            <Link to={`/matches/live/${match.id}`} className="btn btn-small btn-primary">
                              Start
                            </Link>
                          )}
                          {match.status === 'inProgress' && (
                            <Link to={`/matches/live/${match.id}`} className="btn btn-small btn-success">
                              Continue
                            </Link>
                          )}
                          {match.status === 'completed' && (
                            <Link to={`/matches/${match.id}`} className="btn btn-small btn-outline">
                              Details
                            </Link>
                          )}
                          <button className="btn btn-small btn-outline">
                            Edit
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
        
        {activeTab === 'draws' && (
          <div className="draws-tab">
            <div className="draws-placeholder">
              <h2>Tournament Draws</h2>
              <p>The tournament draw visualization would be displayed here.</p>
              <p>For this {getFormatName(tournament.format)} tournament, the draw would show the progression of matches from the initial rounds through to the finals.</p>
              <div className="placeholder-image">
                <span className="placeholder-icon">🏆</span>
              </div>
            </div>
          </div>
        )}
      </div>
      
      <style jsx>{`
        .tournament-detail-page {
          padding: var(--spacing-md);
        }
        
        .detail-header {
          background-color: var(--surface);
          border-radius: var(--radius-md);
          padding: var(--spacing-lg);
          margin-bottom: var(--spacing-lg);
          box-shadow: var(--shadow-sm);
        }
        
        .header-content {
          margin-bottom: var(--spacing-lg);
        }
        
        .tournament-meta {
          display: flex;
          flex-wrap: wrap;
          gap: var(--spacing-md);
          margin-top: var(--spacing-md);
          color: var(--text-secondary);
        }
        
        .tournament-dates,
        .tournament-location {
          display: flex;
          align-items: center;
        }
        
        .icon {
          margin-right: var(--spacing-xs);
        }
        
        .tournament-status {
          padding: var(--spacing-xs) var(--spacing-sm);
          border-radius: var(--radius-sm);
          font-size: var(--font-sm);
          font-weight: 500;
        }
        
        .status-upcoming {
          background-color: var(--info);
          color: white;
        }
        
        .status-inprogress {
          background-color: var(--warning);
          color: white;
        }
        
        .status-completed {
          background-color: var(--success);
          color: white;
        }
        
        .header-actions {
          display: flex;
          flex-wrap: wrap;
          gap: var(--spacing-lg);
          justify-content: space-between;
          align-items: center;
          padding-top: var(--spacing-md);
          border-top: 1px solid var(--border);
        }
        
        .status-actions {
          display: flex;
          align-items: center;
          gap: var(--spacing-md);
        }
        
        .status-buttons {
          display: flex;
        }
        
        .status-buttons button {
          padding: var(--spacing-xs) var(--spacing-md);
          background: none;
          border: 1px solid var(--border);
          cursor: pointer;
          font-size: var(--font-sm);
          transition: all var(--transition-fast);
        }
        
        .status-buttons button:first-child {
          border-radius: var(--radius-sm) 0 0 var(--radius-sm);
        }
        
        .status-buttons button:last-child {
          border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
        }
        
        .status-buttons button.active {
          background-color: var(--primary);
          color: white;
          border-color: var(--primary);
        }
        
        .status-buttons button:not(.active):hover {
          background-color: var(--background);
        }
        
        .management-actions {
          display: flex;
          gap: var(--spacing-md);
        }
        
        .detail-tabs {
          display: flex;
          border-bottom: 1px solid var(--border);
          margin-bottom: var(--spacing-lg);
        }
        
        .detail-tabs button {
          padding: var(--spacing-md) var(--spacing-lg);
          background: none;
          border: none;
          border-bottom: 2px solid transparent;
          cursor: pointer;
          font-size: var(--font-md);
          color: var(--text-secondary);
          transition: all var(--transition-fast);
        }
        
        .detail-tabs button:hover {
          color: var(--text-primary);
        }
        
        .detail-tabs button.active {
          color: var(--primary);
          border-bottom-color: var(--primary);
        }
        
        .detail-content {
          background-color: var(--surface);
          border-radius: var(--radius-md);
          padding: var(--spacing-lg);
          box-shadow: var(--shadow-sm);
        }
        
        .tournament-description,
        .tournament-details,
        .quick-actions {
          margin-bottom: var(--spacing-xl);
        }
        
        .tournament-description p {
          line-height: 1.6;
        }
        
        .details-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: var(--spacing-lg);
        }
        
        .detail-item h3 {
          margin-bottom: var(--spacing-xs);
          color: var(--text-secondary);
          font-size: var(--font-md);
        }
        
        .detail-item p {
          font-size: var(--font-lg);
          font-weight: 500;
        }
        
        .progress-bar {
          height: 8px;
          background-color: var(--border);
          border-radius: 4px;
          margin-bottom: var(--spacing-xs);
          overflow: hidden;
        }
        
        .progress {
          height: 100%;
          background-color: var(--success);
        }
        
        .actions-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
          gap: var(--spacing-md);
        }
        
        .action-card {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: var(--spacing-lg);
          background-color: var(--background);
          border-radius: var(--radius-md);
          text-decoration: none;
          color: var(--text-primary);
          transition: all var(--transition-fast);
        }
        
        .action-card:hover {
          background-color: var(--primary-light);
          color: white;
          transform: translateY(-2px);
          text-decoration: none;
        }
        
        .action-card .icon {
          font-size: 2rem;
          margin-bottom: var(--spacing-sm);
        }
        
        .tab-actions {
          display: flex;
          gap: var(--spacing-md);
          margin-bottom: var(--spacing-lg);
        }
        
        .players-table-container,
        .matches-table-container {
          overflow-x: auto;
        }
        
        .players-table,
        .matches-table {
          width: 100%;
          border-collapse: collapse;
        }
        
        .players-table th,
        .players-table td,
        .matches-table th,
        .matches-table td {
          padding: var(--spacing-sm) var(--spacing-md);
          text-align: left;
          border-bottom: 1px solid var(--border);
        }
        
        .players-table th,
        .matches-table th {
          background-color: var(--background);
          font-weight: 500;
        }
        
        .match-players {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
        }
        
        .vs {
          color: var(--text-secondary);
          margin: 0 var(--spacing-xs);
        }
        
        .status-badge {
          display: inline-block;
          padding: 2px var(--spacing-sm);
          border-radius: var(--radius-sm);
          font-size: var(--font-xs);
          font-weight: 500;
        }
        
        .status-badge.completed {
          background-color: var(--success);
          color: white;
        }
        
        .status-badge.inProgress {
          background-color: var(--warning);
          color: white;
        }
        
        .status-badge.scheduled {
          background-color: var(--info);
          color: white;
        }
        
        .match-result {
          display: flex;
          flex-direction: column;
        }
        
        .match-winner {
          font-size: var(--font-xs);
          color: var(--success);
        }
        
        .current-score {
          font-weight: bold;
          color: var(--warning);
        }
        
        .table-actions {
          display: flex;
          gap: var(--spacing-xs);
        }
        
        .draws-placeholder {
          text-align: center;
          padding: var(--spacing-xl);
        }
        
        .placeholder-image {
          height: 300px;
          background-color: var(--background);
          border-radius: var(--radius-md);
          display: flex;
          align-items: center;
          justify-content: center;
          margin-top: var(--spacing-lg);
        }
        
        .placeholder-icon {
          font-size: 5rem;
          color: var(--primary);
        }
        
        @media (max-width: 768px) {
          .header-actions,
          .tab-actions {
            flex-direction: column;
            gap: var(--spacing-sm);
          }
          
          .status-actions {
            flex-direction: column;
            align-items: flex-start;
          }
          
          .management-actions {
            width: 100%;
          }
          
          .management-actions .btn {
            flex: 1;
            text-align: center;
          }
          
          .details-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default TournamentDetailPage;
