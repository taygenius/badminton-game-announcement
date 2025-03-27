import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const PlayersPage = () => {
  const [players, setPlayers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterCountry, setFilterCountry] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: 'name', direction: 'ascending' });
  const [countries, setCountries] = useState([]);

  useEffect(() => {
    const loadPlayers = async () => {
      setIsLoading(true);
      
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock player data
        const mockPlayers = [
          { id: '1', name: 'John Smith', age: 28, gender: 'Male', country: 'UK', ranking: 12, matchesPlayed: 45, matchesWon: 32, winRate: 71.1 },
          { id: '2', name: 'Sarah Johnson', age: 25, gender: 'Female', country: 'USA', ranking: 8, matchesPlayed: 38, matchesWon: 29, winRate: 76.3 },
          { id: '3', name: 'David Lee', age: 30, gender: 'Male', country: 'Canada', ranking: 15, matchesPlayed: 42, matchesWon: 28, winRate: 66.7 },
          { id: '4', name: 'Emma Wilson', age: 22, gender: 'Female', country: 'Australia', ranking: 20, matchesPlayed: 30, matchesWon: 18, winRate: 60.0 },
          { id: '5', name: 'Michael Brown', age: 27, gender: 'Male', country: 'UK', ranking: 18, matchesPlayed: 40, matchesWon: 24, winRate: 60.0 },
          { id: '6', name: 'Olivia Martin', age: 24, gender: 'Female', country: 'France', ranking: 10, matchesPlayed: 36, matchesWon: 26, winRate: 72.2 },
          { id: '7', name: 'James Wilson', age: 29, gender: 'Male', country: 'USA', ranking: 25, matchesPlayed: 38, matchesWon: 20, winRate: 52.6 },
          { id: '8', name: 'Sophia Chen', age: 26, gender: 'Female', country: 'China', ranking: 5, matchesPlayed: 50, matchesWon: 42, winRate: 84.0 },
          { id: '9', name: 'Daniel Park', age: 23, gender: 'Male', country: 'South Korea', ranking: 14, matchesPlayed: 35, matchesWon: 22, winRate: 62.9 },
          { id: '10', name: 'Ava Wright', age: 21, gender: 'Female', country: 'Canada', ranking: 22, matchesPlayed: 28, matchesWon: 16, winRate: 57.1 }
        ];
        
        setPlayers(mockPlayers);
        
        // Extract unique countries for filter dropdown
        const uniqueCountries = [...new Set(mockPlayers.map(player => player.country))];
        setCountries(uniqueCountries.sort());
      } catch (error) {
        console.error('Error loading players:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadPlayers();
  }, []);

  const handleSort = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  const sortedPlayers = () => {
    const sortablePlayers = [...players];
    
    if (sortConfig.key) {
      sortablePlayers.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === 'ascending' ? 1 : -1;
        }
        return 0;
      });
    }
    
    return sortablePlayers;
  };
  
  const getSortIndicator = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? ' ↑' : ' ↓';
    }
    return '';
  };

  const filteredPlayers = sortedPlayers().filter(player => {
    const matchesSearch = player.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCountry = filterCountry === '' || player.country === filterCountry;
    return matchesSearch && matchesCountry;
  });

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this player?')) {
      // In a real app, this would be an API call
      setPlayers(players.filter(player => player.id !== id));
    }
  };
  
  if (isLoading) {
    return <div className="loading">Loading players...</div>;
  }

  return (
    <div className="players-page">
      <div className="page-header">
        <h1>Players</h1>
        <Link to="/players/create" className="btn btn-primary">
          Add New Player
        </Link>
      </div>
      
      <div className="filters-container">
        <div className="filter-section">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search players..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="country-filter">
            <select
              value={filterCountry}
              onChange={(e) => setFilterCountry(e.target.value)}
            >
              <option value="">All Countries</option>
              {countries.map(country => (
                <option key={country} value={country}>{country}</option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="results-info">
          Showing {filteredPlayers.length} of {players.length} players
        </div>
      </div>
      
      <div className="players-table-container">
        {filteredPlayers.length === 0 ? (
          <div className="empty-state">
            <p>No players match your search criteria.</p>
          </div>
        ) : (
          <table className="players-table">
            <thead>
              <tr>
                <th onClick={() => handleSort('name')}>
                  Name{getSortIndicator('name')}
                </th>
                <th onClick={() => handleSort('age')}>
                  Age{getSortIndicator('age')}
                </th>
                <th onClick={() => handleSort('gender')}>
                  Gender{getSortIndicator('gender')}
                </th>
                <th onClick={() => handleSort('country')}>
                  Country{getSortIndicator('country')}
                </th>
                <th onClick={() => handleSort('ranking')}>
                  Ranking{getSortIndicator('ranking')}
                </th>
                <th onClick={() => handleSort('matchesPlayed')}>
                  Matches{getSortIndicator('matchesPlayed')}
                </th>
                <th onClick={() => handleSort('winRate')}>
                  Win Rate{getSortIndicator('winRate')}
                </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredPlayers.map(player => (
                <tr key={player.id}>
                  <td>
                    <Link to={`/players/${player.id}`} className="player-name">
                      {player.name}
                    </Link>
                  </td>
                  <td>{player.age}</td>
                  <td>{player.gender}</td>
                  <td>{player.country}</td>
                  <td>
                    <span className="ranking">{player.ranking}</span>
                  </td>
                  <td>
                    {player.matchesWon} / {player.matchesPlayed}
                  </td>
                  <td>
                    <div className="win-rate">
                      <div 
                        className="progress-bar" 
                        style={{ 
                          width: `${player.winRate}%`,
                          backgroundColor: player.winRate > 70 ? 'var(--success)' : 
                                         player.winRate > 50 ? 'var(--warning)' : 
                                         'var(--error)'
                        }}
                      ></div>
                      <span className="win-rate-text">{player.winRate}%</span>
                    </div>
                  </td>
                  <td>
                    <div className="table-actions">
                      <Link to={`/players/${player.id}`} className="btn btn-small btn-outline">
                        View
                      </Link>
                      <Link to={`/players/${player.id}/edit`} className="btn btn-small btn-outline">
                        Edit
                      </Link>
                      <button 
                        className="btn btn-small btn-danger"
                        onClick={() => handleDelete(player.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      
      <div className="player-stats">
        <h2>Player Statistics</h2>
        
        <div className="stats-cards">
          <div className="stat-card">
            <div className="stat-value">{players.length}</div>
            <div className="stat-label">Total Players</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-value">
              {players.filter(p => p.gender === 'Male').length}
            </div>
            <div className="stat-label">Male Players</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-value">
              {players.filter(p => p.gender === 'Female').length}
            </div>
            <div className="stat-label">Female Players</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-value">
              {countries.length}
            </div>
            <div className="stat-label">Countries</div>
          </div>
          
          <div className="stat-card">
            <div className="stat-value">
              {Math.round(players.reduce((acc, p) => acc + p.age, 0) / players.length)}
            </div>
            <div className="stat-label">Average Age</div>
          </div>
        </div>
        
        <div className="import-export">
          <button className="btn btn-secondary">
            Import Players from CSV
          </button>
          <button className="btn btn-secondary">
            Export Players to CSV
          </button>
        </div>
      </div>
      
      <style jsx>{`
        .players-page {
          padding: var(--spacing-md);
        }
        
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--spacing-lg);
        }
        
        .filters-container {
          background-color: var(--surface);
          border-radius: var(--radius-md);
          padding: var(--spacing-md);
          margin-bottom: var(--spacing-lg);
          box-shadow: var(--shadow-sm);
        }
        
        .filter-section {
          display: flex;
          gap: var(--spacing-md);
          margin-bottom: var(--spacing-md);
        }
        
        .search-box {
          flex: 1;
        }
        
        .search-box input,
        .country-filter select {
          width: 100%;
          padding: var(--spacing-sm) var(--spacing-md);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          font-size: var(--font-md);
        }
        
        .country-filter {
          min-width: 200px;
        }
        
        .results-info {
          color: var(--text-secondary);
          font-size: var(--font-sm);
        }
        
        .players-table-container {
          background-color: var(--surface);
          border-radius: var(--radius-md);
          padding: var(--spacing-md);
          margin-bottom: var(--spacing-lg);
          box-shadow: var(--shadow-sm);
          overflow-x: auto;
        }
        
        .players-table {
          width: 100%;
          border-collapse: collapse;
        }
        
        .players-table th,
        .players-table td {
          padding: var(--spacing-sm) var(--spacing-md);
          text-align: left;
          border-bottom: 1px solid var(--border);
        }
        
        .players-table th {
          font-weight: 500;
          cursor: pointer;
          user-select: none;
        }
        
        .players-table th:hover {
          background-color: var(--background);
        }
        
        .player-name {
          font-weight: 500;
          color: var(--primary);
        }
        
        .ranking {
          display: inline-block;
          width: 2.5rem;
          height: 2.5rem;
          line-height: 2.5rem;
          text-align: center;
          border-radius: 50%;
          background-color: var(--primary);
          color: white;
          font-weight: bold;
        }
        
        .win-rate {
          position: relative;
          height: 1.5rem;
          background-color: var(--border);
          border-radius: var(--radius-sm);
          overflow: hidden;
          width: 100px;
        }
        
        .progress-bar {
          height: 100%;
          border-radius: var(--radius-sm);
        }
        
        .win-rate-text {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: var(--font-sm);
          font-weight: 500;
        }
        
        .table-actions {
          display: flex;
          gap: var(--spacing-xs);
        }
        
        .player-stats {
          background-color: var(--surface);
          border-radius: var(--radius-md);
          padding: var(--spacing-lg);
          box-shadow: var(--shadow-sm);
        }
        
        .player-stats h2 {
          margin-bottom: var(--spacing-lg);
        }
        
        .stats-cards {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
          gap: var(--spacing-md);
          margin-bottom: var(--spacing-lg);
        }
        
        .stat-card {
          background-color: var(--background);
          border-radius: var(--radius-md);
          padding: var(--spacing-md);
          text-align: center;
        }
        
        .stat-value {
          font-size: var(--font-xl);
          font-weight: bold;
          color: var(--primary);
          margin-bottom: var(--spacing-xs);
        }
        
        .stat-label {
          color: var(--text-secondary);
        }
        
        .import-export {
          display: flex;
          justify-content: flex-end;
          gap: var(--spacing-md);
          border-top: 1px solid var(--border);
          padding-top: var(--spacing-md);
        }
        
        .empty-state {
          padding: var(--spacing-xl);
          text-align: center;
          color: var(--text-secondary);
        }
        
        @media (max-width: 768px) {
          .filter-section {
            flex-direction: column;
          }
          
          .stats-cards {
            grid-template-columns: 1fr 1fr;
          }
          
          .import-export {
            flex-direction: column;
          }
          
          .table-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default PlayersPage;
