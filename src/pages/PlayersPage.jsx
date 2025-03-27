import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { usePlayers } from '../hooks/usePlayers';

const PlayersPage = () => {
  const { players, fetchPlayers, deletePlayer, isLoading, error } = usePlayers();
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); // all, male, female
  const [sortBy, setSortBy] = useState('name'); // name, country, skill
  const [sortOrder, setSortOrder] = useState('asc'); // asc, desc
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [playerToDelete, setPlayerToDelete] = useState(null);

  // Fetch players on mount
  useEffect(() => {
    fetchPlayers();
  }, [fetchPlayers]);

  // Apply filters and sorting
  useEffect(() => {
    if (players.length === 0) {
      setFilteredPlayers([]);
      return;
    }

    let result = [...players];

    // Apply search term filter
    if (searchTerm) {
      result = result.filter(player => 
        player.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        player.country.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (player.email && player.email.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    // Apply gender filter
    if (filter !== 'all') {
      result = result.filter(player => 
        player.gender.toLowerCase() === filter.toLowerCase()
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      let valueA = a[sortBy] ? a[sortBy].toLowerCase() : '';
      let valueB = b[sortBy] ? b[sortBy].toLowerCase() : '';
      
      if (sortOrder === 'asc') {
        return valueA.localeCompare(valueB);
      } else {
        return valueB.localeCompare(valueA);
      }
    });

    setFilteredPlayers(result);
  }, [players, searchTerm, filter, sortBy, sortOrder]);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    setFilter(e.target.value);
  };

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleSortOrderToggle = () => {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  };

  const confirmDeletePlayer = (player) => {
    setPlayerToDelete(player);
    setShowDeleteModal(true);
  };

  const handleDeletePlayer = async () => {
    if (!playerToDelete) return;
    
    try {
      await deletePlayer(playerToDelete.id);
      setShowDeleteModal(false);
      setPlayerToDelete(null);
    } catch (err) {
      console.error('Error deleting player:', err);
    }
  };

  return (
    <div className="players-page">
      <div className="page-header">
        <h1>Players</h1>
        <Link to="/players/create" className="btn btn-primary">Add Player</Link>
      </div>
      
      {error && (
        <div className="error-message" style={{ marginBottom: '1rem' }}>
          {error}
        </div>
      )}
      
      <div className="filters-section">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search players..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>
        
        <div className="filter-controls">
          <div className="filter-group">
            <label htmlFor="gender-filter">Gender:</label>
            <select 
              id="gender-filter"
              value={filter}
              onChange={handleFilterChange}
              className="filter-select"
            >
              <option value="all">All</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          
          <div className="filter-group">
            <label htmlFor="sort-by">Sort by:</label>
            <select 
              id="sort-by"
              value={sortBy}
              onChange={handleSortChange}
              className="filter-select"
            >
              <option value="name">Name</option>
              <option value="country">Country</option>
              <option value="skill">Skill Level</option>
            </select>
            
            <button 
              className="sort-order-btn"
              onClick={handleSortOrderToggle}
              aria-label={sortOrder === 'asc' ? 'Sort ascending' : 'Sort descending'}
            >
              {sortOrder === 'asc' ? '↑' : '↓'}
            </button>
          </div>
        </div>
      </div>
      
      {isLoading ? (
        <div className="loading">Loading players...</div>
      ) : filteredPlayers.length === 0 ? (
        <div className="empty-state">
          <p>No players found. Add a player or adjust your filters.</p>
        </div>
      ) : (
        <div className="players-grid">
          {filteredPlayers.map(player => (
            <div key={player.id} className="player-card">
              <div className="player-avatar">
                {player.name.charAt(0).toUpperCase()}
              </div>
              
              <div className="player-details">
                <h3 className="player-name">{player.name}</h3>
                
                <div className="player-info">
                  <div className="info-row">
                    <span className="info-label">Country:</span>
                    <span className="info-value">{player.country || 'Not specified'}</span>
                  </div>
                  
                  <div className="info-row">
                    <span className="info-label">Gender:</span>
                    <span className="info-value">{player.gender || 'Not specified'}</span>
                  </div>
                  
                  {player.skill && (
                    <div className="info-row">
                      <span className="info-label">Skill:</span>
                      <span className="info-value">{player.skill}</span>
                    </div>
                  )}
                  
                  {player.tournamentIds && (
                    <div className="info-row">
                      <span className="info-label">Tournaments:</span>
                      <span className="info-value">{player.tournamentIds.length}</span>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="player-actions">
                <Link to={`/players/${player.id}`} className="btn btn-small btn-secondary">
                  View
                </Link>
                <Link to={`/players/${player.id}/edit`} className="btn btn-small btn-outline">
                  Edit
                </Link>
                <button 
                  className="btn btn-small btn-danger"
                  onClick={() => confirmDeletePlayer(player)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Delete Confirmation Modal */}
      {showDeleteModal && playerToDelete && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Confirm Deletion</h2>
              <button 
                className="close-button"
                onClick={() => setShowDeleteModal(false)}
              >
                ×
              </button>
            </div>
            
            <div className="modal-body">
              <p>Are you sure you want to delete the player <strong>{playerToDelete.name}</strong>?</p>
              <p>This action cannot be undone.</p>
            </div>
            
            <div className="modal-footer">
              <button 
                className="btn btn-secondary"
                onClick={() => setShowDeleteModal(false)}
              >
                Cancel
              </button>
              <button 
                className="btn btn-danger"
                onClick={handleDeletePlayer}
              >
                Delete Player
              </button>
            </div>
          </div>
        </div>
      )}
      
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
        
        .filters-section {
          margin-bottom: var(--spacing-lg);
          display: flex;
          flex-wrap: wrap;
          gap: var(--spacing-md);
          align-items: center;
        }
        
        .search-box {
          flex: 1;
          min-width: 250px;
        }
        
        .search-input {
          width: 100%;
          padding: var(--spacing-sm) var(--spacing-md);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
        }
        
        .filter-controls {
          display: flex;
          gap: var(--spacing-md);
          flex-wrap: wrap;
        }
        
        .filter-group {
          display: flex;
          align-items: center;
          gap: var(--spacing-xs);
        }
        
        .filter-select {
          padding: var(--spacing-xs) var(--spacing-sm);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
        }
        
        .sort-order-btn {
          background: none;
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          width: 30px;
          height: 30px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: background-color var(--transition-fast);
        }
        
        .sort-order-btn:hover {
          background-color: var(--background);
        }
        
        .players-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: var(--spacing-md);
        }
        
        .player-card {
          background-color: var(--surface);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-sm);
          padding: var(--spacing-md);
          display: flex;
          flex-direction: column;
          transition: transform var(--transition-normal), box-shadow var(--transition-normal);
        }
        
        .player-card:hover {
          transform: translateY(-3px);
          box-shadow: var(--shadow-md);
        }
        
        .player-avatar {
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background-color: var(--primary);
          color: white;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: var(--spacing-sm);
          align-self: center;
        }
        
        .player-details {
          flex: 1;
          margin-bottom: var(--spacing-md);
        }
        
        .player-name {
          margin-bottom: var(--spacing-sm);
          text-align: center;
        }
        
        .player-info {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xs);
        }
        
        .info-row {
          display: flex;
          justify-content: space-between;
          padding: var(--spacing-xs) 0;
          border-bottom: 1px solid var(--border);
        }
        
        .info-label {
          font-weight: 600;
          color: var(--text-secondary);
        }
        
        .player-actions {
          display: flex;
          justify-content: center;
          gap: var(--spacing-sm);
          margin-top: var(--spacing-sm);
        }
        
        @media (max-width: 768px) {
          .page-header {
            flex-direction: column;
            align-items: flex-start;
            gap: var(--spacing-md);
          }
          
          .filters-section {
            flex-direction: column;
            align-items: stretch;
          }
          
          .filter-controls {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default PlayersPage;
