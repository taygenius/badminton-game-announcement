import { useState, useCallback } from 'react';

// Helper functions for localStorage
const saveMatchesToStorage = (matches) => {
  localStorage.setItem('badminton_matches', JSON.stringify(matches));
};

const getMatchesFromStorage = () => {
  const storedMatches = localStorage.getItem('badminton_matches');
  return storedMatches ? JSON.parse(storedMatches) : [];
};

// Mock initial data
const initialMatches = [
  {
    id: '1',
    tournamentId: '1',
    player1: { id: '1', name: 'John Smith' },
    player2: { id: '3', name: 'David Lee' },
    scheduledTime: '2025-03-27T14:00:00Z',
    court: '3',
    category: 'Men\'s Singles',
    round: 'Quarter-final',
    status: 'completed',
    winner: 'player1',
    games: [
      { player1Score: 21, player2Score: 19, completed: true, winner: 'player1' },
      { player1Score: 19, player2Score: 21, completed: true, winner: 'player2' },
      { player1Score: 21, player2Score: 18, completed: true, winner: 'player1' }
    ],
    completedAt: '2025-03-27T15:30:00Z',
    duration: 5400 // 1.5 hours in seconds
  },
  {
    id: '2',
    tournamentId: '1',
    player1: { id: '2', name: 'Sarah Johnson' },
    player2: { id: '4', name: 'Emily Wilson' },
    scheduledTime: '2025-03-27T14:30:00Z',
    court: '2',
    category: 'Women\'s Singles',
    round: 'Quarter-final',
    status: 'completed',
    winner: 'player1',
    games: [
      { player1Score: 21, player2Score: 15, completed: true, winner: 'player1' },
      { player1Score: 21, player2Score: 17, completed: true, winner: 'player1' }
    ],
    completedAt: '2025-03-27T15:45:00Z',
    duration: 4500 // 1.25 hours in seconds
  },
  {
    id: '3',
    tournamentId: '1',
    player1: { id: '3', name: 'Robert Chen' },
    player2: { id: '5', name: 'Alex Rodriguez' },
    scheduledTime: '2025-03-27T15:00:00Z',
    court: '1',
    category: 'Men\'s Singles',
    round: 'Quarter-final',
    status: 'completed',
    winner: 'player2',
    games: [
      { player1Score: 18, player2Score: 21, completed: true, winner: 'player2' },
      { player1Score: 21, player2Score: 16, completed: true, winner: 'player1' },
      { player1Score: 19, player2Score: 21, completed: true, winner: 'player2' }
    ],
    completedAt: '2025-03-27T16:30:00Z',
    duration: 5400 // 1.5 hours in seconds
  },
  {
    id: '4',
    tournamentId: '1',
    player1: { id: '1', name: 'Michael Brown' },
    player2: { id: '2', name: 'James Williams' },
    scheduledTime: '2025-03-27T17:00:00Z',
    court: '1',
    category: 'Men\'s Singles',
    round: 'Semi-final',
    status: 'called',
    games: [
      { player1Score: 0, player2Score: 0, completed: false }
    ],
    currentGame: 0
  },
  {
    id: '5',
    tournamentId: '1',
    player1: { id: '3', name: 'Emma Taylor' },
    player2: { id: '4', name: 'Olivia Martin' },
    scheduledTime: '2025-03-27T17:30:00Z',
    court: '2',
    category: 'Women\'s Singles',
    round: 'Semi-final',
    status: 'scheduled',
    games: [
      { player1Score: 0, player2Score: 0, completed: false }
    ],
    currentGame: 0
  },
  {
    id: '6',
    tournamentId: '1',
    player1: { id: '5', name: 'Daniel White' },
    player2: { id: '6', name: 'Kevin Thomas' },
    scheduledTime: '2025-03-27T18:00:00Z',
    court: '3',
    category: 'Men\'s Singles',
    round: 'Semi-final',
    status: 'scheduled',
    games: [
      { player1Score: 0, player2Score: 0, completed: false }
    ],
    currentGame: 0
  }
];

// Check if we need to initialize localStorage
if (getMatchesFromStorage().length === 0) {
  saveMatchesToStorage(initialMatches);
}

export const useMatches = () => {
  const [matches, setMatches] = useState(getMatchesFromStorage());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all matches
  const fetchMatches = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      // For now, we'll just use localStorage
      const storedMatches = getMatchesFromStorage();
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setMatches(storedMatches);
      return storedMatches;
    } catch (err) {
      console.error('Error fetching matches:', err);
      setError('Failed to fetch matches. Please try again.');
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch matches by tournament ID
  const fetchMatchesByTournament = useCallback(async (tournamentId) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      const storedMatches = getMatchesFromStorage();
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const filteredMatches = storedMatches.filter(match => 
        match.tournamentId === tournamentId
      );
      
      setMatches(filteredMatches);
      return filteredMatches;
    } catch (err) {
      console.error(`Error fetching matches for tournament ${tournamentId}:`, err);
      setError('Failed to fetch tournament matches. Please try again.');
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch pending matches (scheduled but not called)
  const fetchPendingMatches = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      const storedMatches = getMatchesFromStorage();
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const pendingMatches = storedMatches.filter(match => 
        match.status === 'scheduled'
      );
      
      return pendingMatches;
    } catch (err) {
      console.error('Error fetching pending matches:', err);
      setError('Failed to fetch pending matches. Please try again.');
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch active matches (in progress or called)
  const fetchActiveMatches = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      const storedMatches = getMatchesFromStorage();
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const activeMatches = storedMatches.filter(match => 
        match.status === 'inProgress' || match.status === 'called'
      );
      
      return activeMatches;
    } catch (err) {
      console.error('Error fetching active matches:', err);
      setError('Failed to fetch active matches. Please try again.');
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Get a specific match by ID
  const getMatch = useCallback(async (id) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      const storedMatches = getMatchesFromStorage();
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const match = storedMatches.find(m => m.id === id);
      
      if (!match) {
        throw new Error(`Match with ID ${id} not found`);
      }
      
      return match;
    } catch (err) {
      console.error(`Error fetching match with ID ${id}:`, err);
      setError(`Failed to fetch match details. ${err.message}`);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Create a new match
  const createMatch = useCallback(async (matchData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      const storedMatches = getMatchesFromStorage();
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const newMatch = {
        id: Date.now().toString(),
        ...matchData,
        status: matchData.status || 'scheduled',
        games: matchData.games || [{ player1Score: 0, player2Score: 0, completed: false }],
        currentGame: 0
      };
      
      const updatedMatches = [...storedMatches, newMatch];
      saveMatchesToStorage(updatedMatches);
      setMatches(prevMatches => [...prevMatches, newMatch]);
      
      return newMatch;
    } catch (err) {
      console.error('Error creating match:', err);
      setError('Failed to create match. Please try again.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Update match status (e.g., scheduled -> called -> inProgress -> completed)
  const updateMatchStatus = useCallback(async (id, statusData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      const storedMatches = getMatchesFromStorage();
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const matchIndex = storedMatches.findIndex(m => m.id === id);
      
      if (matchIndex === -1) {
        throw new Error(`Match with ID ${id} not found`);
      }
      
      const updatedMatch = {
        ...storedMatches[matchIndex],
        ...statusData
      };
      
      const updatedMatches = [...storedMatches];
      updatedMatches[matchIndex] = updatedMatch;
      
      saveMatchesToStorage(updatedMatches);
      setMatches(updatedMatches);
      
      return updatedMatch;
    } catch (err) {
      console.error(`Error updating match status for ID ${id}:`, err);
      setError(`Failed to update match status. ${err.message}`);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Update match score
  const updateMatchScore = useCallback(async (id, scores) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      const storedMatches = getMatchesFromStorage();
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const matchIndex = storedMatches.findIndex(m => m.id === id);
      
      if (matchIndex === -1) {
        throw new Error(`Match with ID ${id} not found`);
      }
      
      const match = storedMatches[matchIndex];
      
      const updatedMatch = {
        ...match,
        games: scores,
        status: match.status === 'scheduled' || match.status === 'called' ? 'inProgress' : match.status
      };
      
      const updatedMatches = [...storedMatches];
      updatedMatches[matchIndex] = updatedMatch;
      
      saveMatchesToStorage(updatedMatches);
      setMatches(updatedMatches);
      
      return updatedMatch;
    } catch (err) {
      console.error(`Error updating score for match ID ${id}:`, err);
      setError(`Failed to update match score. ${err.message}`);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Complete a match (set winner, duration, etc.)
  const completeMatch = useCallback(async (id, resultData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      const storedMatches = getMatchesFromStorage();
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const matchIndex = storedMatches.findIndex(m => m.id === id);
      
      if (matchIndex === -1) {
        throw new Error(`Match with ID ${id} not found`);
      }
      
      const updatedMatch = {
        ...storedMatches[matchIndex],
        ...resultData,
        status: 'completed',
        completedAt: new Date().toISOString()
      };
      
      const updatedMatches = [...storedMatches];
      updatedMatches[matchIndex] = updatedMatch;
      
      saveMatchesToStorage(updatedMatches);
      setMatches(updatedMatches);
      
      return updatedMatch;
    } catch (err) {
      console.error(`Error completing match ID ${id}:`, err);
      setError(`Failed to complete match. ${err.message}`);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Delete a match
  const deleteMatch = useCallback(async (id) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      const storedMatches = getMatchesFromStorage();
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedMatches = storedMatches.filter(m => m.id !== id);
      
      if (updatedMatches.length === storedMatches.length) {
        throw new Error(`Match with ID ${id} not found`);
      }
      
      saveMatchesToStorage(updatedMatches);
      setMatches(updatedMatches);
      
      return { success: true };
    } catch (err) {
      console.error(`Error deleting match ID ${id}:`, err);
      setError(`Failed to delete match. ${err.message}`);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    matches,
    isLoading,
    error,
    fetchMatches,
    fetchMatchesByTournament,
    fetchPendingMatches,
    fetchActiveMatches,
    getMatch,
    createMatch,
    updateMatchStatus,
    updateMatchScore,
    completeMatch,
    deleteMatch
  };
};

export default useMatches;
