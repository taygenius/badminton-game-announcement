import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const MatchesPage = () => {
  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [activeView, setActiveView] = useState('calendar');
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [currentDate, setCurrentDate] = useState(new Date());
  const [tournaments, setTournaments] = useState([]);
  const [selectedTournament, setSelectedTournament] = useState('all');

  useEffect(() => {
    const loadMatches = async () => {
      setIsLoading(true);
      
      try {
        // In a real app, this would be an API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock tournaments data
        const mockTournaments = [
          { id: '1', name: 'Spring Championship 2025' },
          { id: '2', name: 'Summer Club Tournament' },
          { id: '3', name: 'Winter Invitational 2024' }
        ];
        
        // Mock matches data
        const mockMatches = [
          { 
            id: '1', 
            tournamentId: '1',
            player1: { id: '1', name: 'John Smith' }, 
            player2: { id: '3', name: 'David Lee' }, 
            status: 'completed', 
            scores: '21-19, 19-21, 21-18', 
            winner: 'player1',
            court: 'Court 1',
            category: 'Men\'s Singles',
            round: 'Round of 16',
            scheduledTime: '2025-03-25T14:00:00Z',
            completedAt: '2025-03-25T15:20:00Z'
          },
          { 
            id: '2', 
            tournamentId: '1',
            player1: { id: '2', name: 'Sarah Johnson' }, 
            player2: { id: '4', name: 'Emma Wilson' }, 
            status: 'completed', 
            scores: '21-15, 21-17', 
            winner: 'player1',
            court: 'Court 2',
            category: 'Women\'s Singles',
            round: 'Round of 16',
            scheduledTime: '2025-03-25T14:30:00Z',
            completedAt: '2025-03-25T15:30:00Z'
          },
          { 
            id: '3', 
            tournamentId: '1',
            player1: { id: '5', name: 'Michael Brown' }, 
            player2: { id: '6', name: 'Olivia Martin' }, 
            status: 'inProgress', 
            currentScore: '16-14',
            court: 'Court 3',
            category: 'Mixed Doubles',
            round: 'Quarter-final',
            scheduledTime: '2025-03-27T16:00:00Z'
          },
          { 
            id: '4', 
            tournamentId: '1',
            player1: { id: '1', name: 'John Smith' }, 
            player2: { id: '2', name: 'Sarah Johnson' }, 
            status: 'scheduled', 
            court: 'Court 1',
            category: 'Mixed Doubles',
            round: 'Semi-final',
            scheduledTime: '2025-03-28T15:00:00Z'
          },
          { 
            id: '5', 
            tournamentId: '2',
            player1: { id: '7', name: 'James Wilson' }, 
            player2: { id: '8', name: 'Daniel Park' }, 
            status: 'scheduled', 
            court: 'Court 2',
            category: 'Men\'s Singles',
            round: 'Quarter-final',
            scheduledTime: '2025-03-29T13:00:00Z'
          },
          { 
            id: '6', 
            tournamentId: '3',
            player1: { id: '9', name: 'Sophia Chen' }, 
            player2: { id: '10', name: 'Ava Wright' }, 
            status: 'completed', 
            scores: '21-18, 21-14', 
            winner: 'player1',
            court: 'Court 4',
            category: 'Women\'s Singles',
            round: 'Final',
            scheduledTime: '2024-12-17T16:00:00Z',
            completedAt: '2024-12-17T17:10:00Z'
          }
        ];
        
        setTournaments(mockTournaments);
        setMatches(mockMatches);
      } catch (error) {
        console.error('Error loading matches:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadMatches();
  }, []);

  const filteredMatches = matches.filter(match => {
    // Filter by status
    if (filterStatus !== 'all' && match.status !== filterStatus) {
      return false;
    }
    
    // Filter by tournament
    if (selectedTournament !== 'all' && match.tournamentId !== selectedTournament) {
      return false;
    }
    
    // Filter by search term (player names)
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return match.player1.name.toLowerCase().includes(searchLower) || 
             match.player2.name.toLowerCase().includes(searchLower);
    }
    
    return true;
  });
  
  const sortedMatches = [...filteredMatches].sort((a, b) => {
    // Sort by date (most recent first for completed, soonest first for scheduled)
    if (a.status === 'completed' && b.status === 'completed') {
      return new Date(b.completedAt) - new Date(a.completedAt);
    }
    
    if (a.status === 'scheduled' && b.status === 'scheduled') {
      return new Date(a.scheduledTime) - new Date(b.scheduledTime);
    }
    
    // In progress matches first, then scheduled, then completed
    const statusOrder = { inProgress: 0, scheduled: 1, completed: 2 };
    return statusOrder[a.status] - statusOrder[b.status];
  });
  
  const getMatchesForDay = (date) => {
    return sortedMatches.filter(match => {
      const matchDate = new Date(match.scheduledTime);
      return matchDate.getDate() === date.getDate() && 
             matchDate.getMonth() === date.getMonth() && 
             matchDate.getFullYear() === date.getFullYear();
    });
  };
  
  const getMonthDays = () => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysCount = lastDay.getDate();
    
    const result = [];
    const firstDayOfWeek = firstDay.getDay(); // 0 = Sunday, 1 = Monday, etc.
    
    // Add empty cells for days before the 1st of the month
    for (let i = 0; i < firstDayOfWeek; i++) {
      result.push({ day: null, date: null });
    }
    
    // Add days of the month
    for (let i = 1; i <= daysCount; i++) {
      const dayDate = new Date(year, month, i);
      result.push({
        day: i,
        date: dayDate,
        matches: getMatchesForDay(dayDate)
      });
    }
    
    return result;
  };
  
  const monthDays = getMonthDays();
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  const formatTime = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };
  
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(undefined, { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    });
  };
  
  const nextMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };
  
  const prevMonth = () => {
    setCurrentDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };
  
  const getMockMatchStatusClass = (status) => {
    switch (status) {
      case 'completed': return 'completed';
      case 'inProgress': return 'in-progress';
      case 'scheduled': return 'scheduled';
      default: return '';
    }
  };

  if (isLoading) {
    return <div className="loading">Loading matches...</div>;
  }

  return (
    <div className="matches-page">
      <div className="page-header">
        <h1>Matches</h1>
        <div className="header-actions">
          <Link to="/matches/create" className="btn btn-primary">
            Create Match
          </Link>
          <Link to="/matches/call" className="btn btn-secondary">
            Call Next Match
          </Link>
        </div>
      </div>
      
      <div className="filters-container">
        <div className="filter-section">
          <div className="view-toggles">
            <button 
              className={`view-toggle ${activeView === 'calendar' ? 'active' : ''}`}
              onClick={() => setActiveView('calendar')}
            >
              Calendar View
            </button>
            <button 
              className={`view-toggle ${activeView === 'list' ? 'active' : ''}`}
              onClick={() => setActiveView('list')}
            >
              List View
            </button>
          </div>
          
          <div className="status-filters">
            <button 
              className={`status-filter ${filterStatus === 'all' ? 'active' : ''}`}
              onClick={() => setFilterStatus('all')}
            >
              All Matches
            </button>
            <button 
              className={`status-filter ${filterStatus === 'scheduled' ? 'active' : ''}`}
              onClick={() => setFilterStatus('scheduled')}
            >
              Scheduled
            </button>
            <button 
              className={`status-filter ${filterStatus === 'inProgress' ? 'active' : ''}`}
              onClick={() => setFilterStatus('inProgress')}
            >
              In Progress
            </button>
            <button 
              className={`status-filter ${filterStatus === 'completed' ? 'active' : ''}`}
              onClick={() => setFilterStatus('completed')}
            >
              Completed
            </button>
          </div>
          
          <div className="search-filter">
            <input
              type="text"
              placeholder="Search by player name..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="tournament-filter">
            <select
              value={selectedTournament}
              onChange={(e) => setSelectedTournament(e.target.value)}
            >
              <option value="all">All Tournaments</option>
              {tournaments.map(tournament => (
                <option key={tournament.id} value={tournament.id}>
                  {tournament.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        
        <div className="results-info">
          Showing {filteredMatches.length} of {matches.length} matches
        </div>
      </div>
      
      {activeView === 'calendar' && (
        <div className="calendar-view">
          <div className="calendar-header">
            <button className="month-nav prev" onClick={prevMonth}>
              &lt; Prev
            </button>
            <h2 className="current-month">
              {currentDate.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
            </h2>
            <button className="month-nav next" onClick={nextMonth}>
              Next &gt;
            </button>
          </div>
          
          <div className="calendar-grid">
            {weekDays.map(day => (
              <div key={day} className="calendar-day-header">
                {day}
              </div>
            ))}
            
            {monthDays.map((day, index) => (
              <div 
                key={`day-${index}`} 
                className={`calendar-day ${day.day ? '' : 'empty'} ${
                  day.date && day.date.getDate() === new Date().getDate() && 
                  day.date.getMonth() === new Date().getMonth() && 
                  day.date.getFullYear() === new Date().getFullYear() ? 'today' : ''
                }`}
              >
                {day.day && (
                  <>
                    <div className="day-number">{day.day}</div>
                    <div className="day-matches">
                      {day.matches && day.matches.length > 0 ? (
                        day.matches.map(match => (
                          <Link 
                            key={match.id} 
                            to={`/matches/${match.id}`}
                            className={`calendar-match ${getMockMatchStatusClass(match.status)}`}
                          >
                            <div className="match-time">{formatTime(match.scheduledTime)}</div>
                            <div className="match-players">
                              <span>{match.player1.name.split(' ')[0]}</span>
                              <span className="vs">vs</span>
                              <span>{match.player2.name.split(' ')[0]}</span>
                            </div>
                            <div className="match-court">{match.court}</div>
                          </Link>
                        ))
                      ) : (
                        <div className="no-matches">No matches</div>
                      )}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {activeView === 'list' && (
        <div className="list-view">
          {filteredMatches.length === 0 ? (
            <div className="empty-state">
              <p>No matches match your search criteria.</p>
            </div>
          ) : (
            <div className="matches-list">
              {sortedMatches.map(match => (
                <div key={match.id} className={`match-card ${getMockMatchStatusClass(match.status)}`}>
                  <div className="match-header">
                    <div className="match-time">
                      {formatDate(match.scheduledTime)} • {formatTime(match.scheduledTime)}
                    </div>
                    <div className={`match-status ${match.status}`}>
                      {match.status === 'completed' ? 'Completed' : 
                       match.status === 'inProgress' ? 'In Progress' : 
                       'Scheduled'}
                    </div>
                  </div>
                  
                  <div className="match-content">
                    <div className="match-details">
                      <div className="tournament-name">
                        {tournaments.find(t => t.id === match.tournamentId)?.name}
                      </div>
                      <div className="match-round">
                        {match.category} • {match.round}
                      </div>
                      <div className="match-court">{match.court}</div>
                    </div>
                    
                    <div className="match-players-container">
                      <div className="player player1">
                        <div className="player-name">
                          {match.player1.name}
                        </div>
                        {match.status === 'completed' && match.winner === 'player1' && (
                          <div className="winner-badge">Winner</div>
                        )}
                      </div>
                      
                      <div className="match-score">
                        {match.status === 'completed' ? (
                          <span className="final-score">{match.scores}</span>
                        ) : match.status === 'inProgress' ? (
                          <span className="current-score">{match.currentScore}</span>
                        ) : (
                          <span className="vs">vs</span>
                        )}
                      </div>
                      
                      <div className="player player2">
                        <div className="player-name">
                          {match.player2.name}
                        </div>
                        {match.status === 'completed' && match.winner === 'player2' && (
                          <div className="winner-badge">Winner</div>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="match-actions">
                    {match.status === 'scheduled' && (
                      <Link to={`/matches/live/${match.id}`} className="btn btn-primary">
                        Start Match
                      </Link>
                    )}
                    {match.status === 'inProgress' && (
                      <Link to={`/matches/live/${match.id}`} className="btn btn-success">
                        Continue Match
                      </Link>
                    )}
                    <Link to={`/matches/${match.id}`} className="btn btn-outline">
                      Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
      
      <style jsx>{`
        .matches-page {
          padding: var(--spacing-md);
        }
        
        .page-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--spacing-lg);
        }
        
        .header-actions {
          display: flex;
          gap: var(--spacing-md);
        }
        
        .filters-container {
          background-color: var(--surface);
          border-radius: var(--radius-md);
          padding: var(--spacing-md);
          margin-bottom: var(--spacing-lg);
          box-shadow: var(--shadow-sm);
        }
        
        .filter-section {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: var(--spacing-md);
          margin-bottom: var(--spacing-md);
        }
        
        .view-toggles,
        .status-filters {
          display: flex;
          gap: var(--spacing-xs);
        }
        
        .view-toggle,
        .status-filter {
          padding: var(--spacing-xs) var(--spacing-sm);
          background: none;
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          cursor: pointer;
          font-size: var(--font-sm);
          transition: all var(--transition-fast);
        }
        
        .view-toggle:hover,
        .status-filter:hover {
          background-color: var(--background);
        }
        
        .view-toggle.active,
        .status-filter.active {
          background-color: var(--primary);
          color: white;
          border-color: var(--primary);
        }
        
        .search-filter input,
        .tournament-filter select {
          width: 100%;
          padding: var(--spacing-xs) var(--spacing-sm);
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          font-size: var(--font-sm);
        }
        
        .results-info {
          color: var(--text-secondary);
          font-size: var(--font-sm);
        }
        
        /* Calendar View */
        .calendar-view {
          background-color: var(--surface);
          border-radius: var(--radius-md);
          padding: var(--spacing-md);
          box-shadow: var(--shadow-sm);
        }
        
        .calendar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: var(--spacing-md);
        }
        
        .month-nav {
          background: none;
          border: 1px solid var(--border);
          padding: var(--spacing-xs) var(--spacing-md);
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: all var(--transition-fast);
        }
        
        .month-nav:hover {
          background-color: var(--background);
        }
        
        .calendar-grid {
          display: grid;
          grid-template-columns: repeat(7, 1fr);
          gap: var(--spacing-xs);
        }
        
        .calendar-day-header {
          padding: var(--spacing-xs);
          text-align: center;
          font-weight: 500;
          color: var(--text-secondary);
        }
        
        .calendar-day {
          min-height: 120px;
          border: 1px solid var(--border);
          border-radius: var(--radius-sm);
          padding: var(--spacing-xs);
        }
        
        .calendar-day.empty {
          background-color: var(--background);
          border-color: transparent;
        }
        
        .calendar-day.today {
          border-color: var(--primary);
          background-color: rgba(30, 136, 229, 0.05);
        }
        
        .day-number {
          font-weight: 500;
          margin-bottom: var(--spacing-xs);
          text-align: right;
        }
        
        .today .day-number {
          color: var(--primary);
        }
        
        .day-matches {
          display: flex;
          flex-direction: column;
          gap: var(--spacing-xs);
          font-size: var(--font-xs);
        }
        
        .calendar-match {
          padding: var(--spacing-xs);
          border-radius: var(--radius-sm);
          background-color: var(--background);
          text-decoration: none;
          color: var(--text-primary);
          transition: all var(--transition-fast);
          border-left: 3px solid;
        }
        
        .calendar-match:hover {
          transform: translateY(-2px);
          text-decoration: none;
        }
        
        .calendar-match.scheduled {
          border-left-color: var(--info);
        }
        
        .calendar-match.in-progress {
          border-left-color: var(--warning);
        }
        
        .calendar-match.completed {
          border-left-color: var(--success);
        }
        
        .match-time {
          font-weight: 500;
          margin-bottom: 2px;
        }
        
        .match-players {
          display: flex;
          justify-content: space-between;
          margin-bottom: 2px;
        }
        
        .vs {
          color: var(--text-secondary);
        }
        
        .match-court {
          font-size: 0.7rem;
          color: var(--text-secondary);
        }
        
        .no-matches {
          color: var(--text-secondary);
          font-style: italic;
          text-align: center;
          padding: var(--spacing-sm);
        }
        
        /* List View */
        .list-view {
          margin-bottom: var(--spacing-lg);
        }
        
        .matches-list {
          display: grid;
          gap: var(--spacing-md);
        }
        
        .match-card {
          background-color: var(--surface);
          border-radius: var(--radius-md);
          box-shadow: var(--shadow-sm);
          overflow: hidden;
          border-left: 4px solid;
        }
        
        .match-card.scheduled {
          border-left-color: var(--info);
        }
        
        .match-card.in-progress {
          border-left-color: var(--warning);
        }
        
        .match-card.completed {
          border-left-color: var(--success);
        }
        
        .match-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--spacing-sm) var(--spacing-md);
          background-color: var(--background);
          font-size: var(--font-sm);
        }
        
        .match-status {
          padding: 2px var(--spacing-sm);
          border-radius: var(--radius-sm);
          font-weight: 500;
        }
        
        .match-status.completed {
          background-color: var(--success);
          color: white;
        }
        
        .match-status.inProgress {
          background-color: var(--warning);
          color: white;
        }
        
        .match-status.scheduled {
          background-color: var(--info);
          color: white;
        }
        
        .match-content {
          padding: var(--spacing-md);
        }
        
        .match-details {
          margin-bottom: var(--spacing-md);
        }
        
        .tournament-name {
          font-weight: 500;
          font-size: var(--font-lg);
          margin-bottom: var(--spacing-xs);
        }
        
        .match-round,
        .match-court {
          color: var(--text-secondary);
          font-size: var(--font-sm);
        }
        
        .match-players-container {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: var(--spacing-md);
        }
        
        .player {
          flex: 1;
        }
        
        .player1 {
          text-align: right;
        }
        
        .player2 {
          text-align: left;
        }
        
        .player-name {
          font-size: var(--font-lg);
          font-weight: 500;
        }
        
        .match-score {
          padding: 0 var(--spacing-md);
          font-size: var(--font-lg);
          font-weight: bold;
        }
        
        .final-score {
          color: var(--success);
        }
        
        .current-score {
          color: var(--warning);
        }
        
        .winner-badge {
          display: inline-block;
          margin-top: var(--spacing-xs);
          padding: 2px var(--spacing-sm);
          background-color: var(--success);
          color: white;
          border-radius: var(--radius-sm);
          font-size: var(--font-xs);
          font-weight: 500;
        }
        
        .match-actions {
          display: flex;
          justify-content: flex-end;
          gap: var(--spacing-sm);
          padding: var(--spacing-sm) var(--spacing-md);
          border-top: 1px solid var(--border);
        }
        
        .empty-state {
          background-color: var(--surface);
          border-radius: var(--radius-md);
          padding: var(--spacing-xl);
          text-align: center;
          color: var(--text-secondary);
        }
        
        @media (max-width: 768px) {
          .header-actions,
          .view-toggles,
          .status-filters {
            flex-direction: column;
            gap: var(--spacing-xs);
          }
          
          .calendar-grid {
            font-size: var(--font-sm);
          }
          
          .calendar-day {
            min-height: 80px;
          }
          
          .match-players-container {
            flex-direction: column;
            gap: var(--spacing-sm);
          }
          
          .player1,
          .player2 {
            text-align: center;
          }
          
          .match-actions {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default MatchesPage;
