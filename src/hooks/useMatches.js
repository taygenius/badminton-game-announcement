import { useState, useCallback, useEffect } from 'react';

// Helper function to save matches to localStorage
const saveMatches = (matches) => {
  localStorage.setItem('badminton_matches', JSON.stringify(matches));
};

// Helper function to get matches from localStorage
const getStoredMatches = () => {
  const matchesString = localStorage.getItem('badminton_matches');
  if (matchesString) {
    try {
      return JSON.parse(matchesString);
    } catch (e) {
      console.error('Error parsing matches data from localStorage:', e);
      return null;
    }
  }
  return null;
};

// Mock data for matches
const generateMockMatches = () => {
  return [
    {
      id: '1',
      tournamentId: '1',
      player1: { id: '1', name: 'John Smith' },
      player2: { id: '2', name: 'David Lee' },
      court: '1',
      round: 'Quarter-final',
      category: 'Men\'s Singles',
      status: 'completed',
      scheduledTime: '2025-03-27T09:00:00Z',
      startTime: '2025-03-27T09:05:00Z',
      endTime: '2025-03-27T09:45:00Z',
      winner: 'player1',
      games: [
        { player1Score: 21, player2Score: 19, completed: true, winner: 'player1' },
        { player1Score: 19, player2Score: 21, completed: true, winner: 'player2' },
        { player1Score: 21, player2Score: 18, completed: true, winner: 'player1' }
      ]
    },
    {
      id: '2',
      tournamentId: '1',
      player1: { id: '3', name: 'Sarah Johnson' },
      player2: { id: '4', name: 'Emily Wilson' },
      court: '2',
      round: 'Quarter-final',
      category: 'Women\'s Singles',
      status: 'completed',
      scheduledTime: '2025-03-27T09:00:00Z',
      startTime: '2025-03-27T09:05:00Z',
      endTime: '2025-03-27T09:35:00Z',
      winner: 'player1',
      games: [
        { player1Score: 21, player2Score: 15, completed: true, winner: 'player1' },
        { player1Score: 21, player2Score: 17, completed: true, winner: 'player1' }
      ]
    },
    {
      id: '3',
      tournamentId: '1',
      player1: { id: '5', name: 'Robert Chen' },
      player2: { id: '6', name: 'Alex Rodriguez' },
      court: '3',
      round: 'Quarter-final',
      category: 'Men\'s Singles',
      status: 'completed',
      scheduledTime: '2025-03-27T09:30:00Z',
      startTime: '2025-03-27T09:35:00Z',
      endTime: '2025-03-27T10:15:00Z',
      winner: 'player2',
      games: [
        { player1Score: 18, player2Score: 21, completed: true, winner: 'player2' },
        { player1Score: 21, player2Score: 16, completed: true, winner: 'player1' },
        { player1Score: 19, player2Score: 21, completed: true, winner: 'player2' }
      ]
    },
    {
      id: '4',
      tournamentId: '1',
      player1: { id: '7', name: 'Michael Brown' },
      player2: { id: '8', name: 'James Williams' },
      court: '1',
      round: 'Semi-final',
      category: 'Men\'s Singles',
      status: 'inProgress',
      scheduledTime: '2025-03-27T10:30:00Z',
      startTime: '2025-03-27T10:35:00Z',
      endTime: null,
      winner: null,
      currentGame: 0,
      games: [
        { player1Score: 11, player2Score: 9, completed: false, winner: null },
        { player1Score: 0, player2Score: 0, completed: false, winner: null },
        { player1Score: 0, player2Score: 0, completed: false, winner: null }
      ]
    },
    {
      id: '5',
      tournamentId: '1',
      player1: { id: '9', name: 'Emma Taylor' },
      player2: { id: '10', name: 'Olivia Martin' },
      court: null,
      round: 'Semi-final',
      category: 'Women\'s Singles',
      status: 'scheduled',
      scheduledTime: '2025-03-27T11:00:00Z',
      startTime: null,
      endTime: null,
      winner: null,
      games: []
    },
    {
      id: '6',
      tournamentId: '1',
      player1: { id: '6', name: 'Alex Rodriguez' },
      player2: { id: '11', name: 'Kevin Thomas' },
      court: null,
      round: 'Semi-final',
      category: 'Men\'s Singles',
      status: 'scheduled',
      scheduledTime: '2025-03-27T11:30:00Z',
      startTime: null,
      endTime: null,
      winner: null,
      games: []
    }
  ];
};

/**
 * Custom hook for managing match data
 */
export const useMatches = () => {
  const [matches, setMatches] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  // Initialize matches from localStorage or mock data
  useEffect(() => {
    const initializeMatches = async () => {
      setIsLoading(true);
      try {
        // Try to get matches from localStorage
        const storedMatches = getStoredMatches();
        
        if (storedMatches) {
          setMatches(storedMatches);
        } else {
          // If no stored matches, use mock data
          const mockMatches = generateMockMatches();
          setMatches(mockMatches);
          saveMatches(mockMatches);
        }
        
        setError(null);
      } catch (err) {
        console.error('Error initializing matches:', err);
        setError('Failed to load matches data');
      } finally {
        setIsLoading(false);
      }
    };
    
    initializeMatches();
  }, []);

  // Fetch all matches
  const fetchMatches = useCallback(async () => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Return stored matches
      const storedMatches = getStoredMatches() || generateMockMatches();
      setMatches(storedMatches);
      
      return storedMatches;
    } catch (err) {
      console.error('Error fetching matches:', err);
      setError('Failed to fetch matches');
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch matches by tournament ID
  const fetchMatchesByTournament = useCallback(async (tournamentId) => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Get all matches and filter by tournament ID
      const allMatches = getStoredMatches() || generateMockMatches();
      const tournamentMatches = allMatches.filter(match => match.tournamentId === tournamentId);
      
      // Don't update all matches, just return the filtered ones
      return tournamentMatches;
    } catch (err) {
      console.error(`Error fetching matches for tournament ${tournamentId}:`, err);
      setError(`Failed to fetch matches for tournament ${tournamentId}`);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch matches by status
  const fetchMatchesByStatus = useCallback(async (status) => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Get all matches and filter by status
      const allMatches = getStoredMatches() || generateMockMatches();
      const filteredMatches = allMatches.filter(match => match.status === status);
      
      // Don't update all matches, just return the filtered ones
      return filteredMatches;
    } catch (err) {
      console.error(`Error fetching matches with status ${status}:`, err);
      setError(`Failed to fetch matches with status ${status}`);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch pending matches (scheduled but not started)
  const fetchPendingMatches = useCallback(async () => {
    return fetchMatchesByStatus('scheduled');
  }, [fetchMatchesByStatus]);

  // Fetch active matches (in progress)
  const fetchActiveMatches = useCallback(async () => {
    return fetchMatchesByStatus('inProgress');
  }, [fetchMatchesByStatus]);

  // Get a specific match by ID
  const getMatch = useCallback(async (id) => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Get all matches and find by ID
      const allMatches = getStoredMatches() || generateMockMatches();
      const match = allMatches.find(m => m.id === id);
      
      if (!match) {
        throw new Error(`Match with ID ${id} not found`);
      }
      
      return match;
    } catch (err) {
      console.error(`Error fetching match with ID ${id}:`, err);
      setError(`Failed to fetch match with ID ${id}`);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Create a new match
  const createMatch = useCallback(async (matchData) => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Get current matches
      const currentMatches = getStoredMatches() || generateMockMatches();
      
      // Create new match with ID and default values
      const newMatch = {
        id: Date.now().toString(),
        status: 'scheduled',
        scheduledTime: new Date().toISOString(),
        startTime: null,
        endTime: null,
        winner: null,
        games: [],
        ...matchData
      };
      
      // Add to matches array
      const updatedMatches = [...currentMatches, newMatch];
      setMatches(updatedMatches);
      saveMatches(updatedMatches);
      
      return newMatch;
    } catch (err) {
      console.error('Error creating match:', err);
      setError('Failed to create match');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Update match status
  const updateMatchStatus = useCallback(async (id, statusData) => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Get current matches
      const currentMatches = getStoredMatches() || generateMockMatches();
      
      // Find match to update
      const matchIndex = currentMatches.findIndex(m => m.id === id);
      
      if (matchIndex === -1) {
        throw new Error(`Match with ID ${id} not found`);
      }
      
      // Update match
      const updatedMatch = {
        ...currentMatches[matchIndex],
        ...statusData
      };
      
      // If status is changing, update related fields
      if (statusData.status) {
        if (statusData.status === 'inProgress' && !updatedMatch.startTime) {
          updatedMatch.startTime = new Date().toISOString();
        } else if (statusData.status === 'completed' && !updatedMatch.endTime) {
          updatedMatch.endTime = new Date().toISOString();
        }
      }
      
      // Update matches array
      const updatedMatches = [...currentMatches];
      updatedMatches[matchIndex] = updatedMatch;
      
      setMatches(updatedMatches);
      saveMatches(updatedMatches);
      
      return updatedMatch;
    } catch (err) {
      console.error(`Error updating match status for ID ${id}:`, err);
      setError(`Failed to update match status for ID ${id}`);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Update match score
  const updateMatchScore = useCallback(async (id, scoreData) => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Get current matches
      const currentMatches = getStoredMatches() || generateMockMatches();
      
      // Find match to update
      const matchIndex = currentMatches.findIndex(m => m.id === id);
      
      if (matchIndex === -1) {
        throw new Error(`Match with ID ${id} not found`);
      }
      
      // Update match
      const updatedMatch = {
        ...currentMatches[matchIndex],
        games: scoreData
      };
      
      // Update matches array
      const updatedMatches = [...currentMatches];
      updatedMatches[matchIndex] = updatedMatch;
      
      setMatches(updatedMatches);
      saveMatches(updatedMatches);
      
      return updatedMatch;
    } catch (err) {
      console.error(`Error updating match score for ID ${id}:`, err);
      setError(`Failed to update match score for ID ${id}`);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Complete a match
  const completeMatch = useCallback(async (id, resultData) => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Get current matches
      const currentMatches = getStoredMatches() || generateMockMatches();
      
      // Find match to update
      const matchIndex = currentMatches.findIndex(m => m.id === id);
      
      if (matchIndex === -1) {
        throw new Error(`Match with ID ${id} not found`);
      }
      
      // Update match
      const updatedMatch = {
        ...currentMatches[matchIndex],
        status: 'completed',
        endTime: new Date().toISOString(),
        ...resultData
      };
      
      // Update matches array
      const updatedMatches = [...currentMatches];
      updatedMatches[matchIndex] = updatedMatch;
      
      setMatches(updatedMatches);
      saveMatches(updatedMatches);
      
      return updatedMatch;
    } catch (err) {
      console.error(`Error completing match with ID ${id}:`, err);
      setError(`Failed to complete match with ID ${id}`);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Delete a match
  const deleteMatch = useCallback(async (id) => {
    setIsLoading(true);
    try {
      // In a real app, this would be an API call
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Get current matches
      const currentMatches = getStoredMatches() || generateMockMatches();
      
      // Filter out the match to delete
      const updatedMatches = currentMatches.filter(match => match.id !== id);
      
      setMatches(updatedMatches);
      saveMatches(updatedMatches);
      
      return { success: true };
    } catch (err) {
      console.error(`Error deleting match with ID ${id}:`, err);
      setError(`Failed to delete match with ID ${id}`);
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
    fetchMatchesByStatus,
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
