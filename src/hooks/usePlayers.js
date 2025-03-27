import { useState, useCallback } from 'react';

// Helper functions for localStorage
const savePlayersToStorage = (players) => {
  localStorage.setItem('badminton_players', JSON.stringify(players));
};

const getPlayersFromStorage = () => {
  const storedPlayers = localStorage.getItem('badminton_players');
  return storedPlayers ? JSON.parse(storedPlayers) : [];
};

// Mock initial data
const initialPlayers = [
  {
    id: '1',
    name: 'John Smith',
    email: 'john.smith@example.com',
    phone: '555-123-4567',
    country: 'United Kingdom',
    gender: 'Male',
    dateOfBirth: '1990-05-15',
    skill: 'Advanced',
    tournamentIds: ['1', '2']
  },
  {
    id: '2',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    phone: '555-234-5678',
    country: 'United Kingdom',
    gender: 'Female',
    dateOfBirth: '1992-08-21',
    skill: 'Expert',
    tournamentIds: ['1']
  },
  {
    id: '3',
    name: 'David Lee',
    email: 'david.lee@example.com',
    phone: '555-345-6789',
    country: 'China',
    gender: 'Male',
    dateOfBirth: '1988-11-03',
    skill: 'Advanced',
    tournamentIds: ['1', '3']
  },
  {
    id: '4',
    name: 'Emily Wilson',
    email: 'emily.wilson@example.com',
    phone: '555-456-7890',
    country: 'United States',
    gender: 'Female',
    dateOfBirth: '1995-02-18',
    skill: 'Intermediate',
    tournamentIds: ['2']
  },
  {
    id: '5',
    name: 'Robert Chen',
    email: 'robert.chen@example.com',
    phone: '555-567-8901',
    country: 'Singapore',
    gender: 'Male',
    dateOfBirth: '1991-07-12',
    skill: 'Expert',
    tournamentIds: ['1', '2', '3']
  }
];

// Check if we need to initialize localStorage
if (getPlayersFromStorage().length === 0) {
  savePlayersToStorage(initialPlayers);
}

export const usePlayers = () => {
  const [players, setPlayers] = useState(getPlayersFromStorage());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all players
  const fetchPlayers = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      // For now, we'll just use localStorage
      const storedPlayers = getPlayersFromStorage();
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setPlayers(storedPlayers);
      return storedPlayers;
    } catch (err) {
      console.error('Error fetching players:', err);
      setError('Failed to fetch players. Please try again.');
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch players by tournament ID
  const fetchPlayersByTournament = useCallback(async (tournamentId) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      const storedPlayers = getPlayersFromStorage();
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const filteredPlayers = storedPlayers.filter(player => 
        player.tournamentIds && player.tournamentIds.includes(tournamentId)
      );
      
      return filteredPlayers;
    } catch (err) {
      console.error(`Error fetching players for tournament ${tournamentId}:`, err);
      setError('Failed to fetch tournament players. Please try again.');
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Get a specific player by ID
  const getPlayer = useCallback(async (id) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      const storedPlayers = getPlayersFromStorage();
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const player = storedPlayers.find(p => p.id === id);
      
      if (!player) {
        throw new Error(`Player with ID ${id} not found`);
      }
      
      return player;
    } catch (err) {
      console.error(`Error fetching player with ID ${id}:`, err);
      setError(`Failed to fetch player details. ${err.message}`);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Create a new player
  const createPlayer = useCallback(async (playerData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      const storedPlayers = getPlayersFromStorage();
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const newPlayer = {
        id: Date.now().toString(),
        ...playerData,
        tournamentIds: playerData.tournamentIds || []
      };
      
      const updatedPlayers = [...storedPlayers, newPlayer];
      savePlayersToStorage(updatedPlayers);
      setPlayers(updatedPlayers);
      
      return newPlayer;
    } catch (err) {
      console.error('Error creating player:', err);
      setError('Failed to create player. Please try again.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Update an existing player
  const updatePlayer = useCallback(async (id, playerData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      const storedPlayers = getPlayersFromStorage();
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const playerIndex = storedPlayers.findIndex(p => p.id === id);
      
      if (playerIndex === -1) {
        throw new Error(`Player with ID ${id} not found`);
      }
      
      const updatedPlayer = {
        ...storedPlayers[playerIndex],
        ...playerData
      };
      
      const updatedPlayers = [...storedPlayers];
      updatedPlayers[playerIndex] = updatedPlayer;
      
      savePlayersToStorage(updatedPlayers);
      setPlayers(updatedPlayers);
      
      return updatedPlayer;
    } catch (err) {
      console.error(`Error updating player with ID ${id}:`, err);
      setError(`Failed to update player. ${err.message}`);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Delete a player
  const deletePlayer = useCallback(async (id) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      const storedPlayers = getPlayersFromStorage();
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedPlayers = storedPlayers.filter(p => p.id !== id);
      
      if (updatedPlayers.length === storedPlayers.length) {
        throw new Error(`Player with ID ${id} not found`);
      }
      
      savePlayersToStorage(updatedPlayers);
      setPlayers(updatedPlayers);
      
      return { success: true };
    } catch (err) {
      console.error(`Error deleting player with ID ${id}:`, err);
      setError(`Failed to delete player. ${err.message}`);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Add a player to a tournament
  const addPlayerToTournament = useCallback(async (playerId, tournamentId) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      const storedPlayers = getPlayersFromStorage();
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const playerIndex = storedPlayers.findIndex(p => p.id === playerId);
      
      if (playerIndex === -1) {
        throw new Error(`Player with ID ${playerId} not found`);
      }
      
      const player = storedPlayers[playerIndex];
      
      // Make sure tournamentIds is initialized and the tournament isn't already added
      const tournamentIds = player.tournamentIds || [];
      
      if (!tournamentIds.includes(tournamentId)) {
        const updatedPlayer = {
          ...player,
          tournamentIds: [...tournamentIds, tournamentId]
        };
        
        const updatedPlayers = [...storedPlayers];
        updatedPlayers[playerIndex] = updatedPlayer;
        
        savePlayersToStorage(updatedPlayers);
        setPlayers(updatedPlayers);
        
        return updatedPlayer;
      }
      
      return player;
    } catch (err) {
      console.error(`Error adding player ${playerId} to tournament ${tournamentId}:`, err);
      setError(`Failed to add player to tournament. ${err.message}`);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Remove a player from a tournament
  const removePlayerFromTournament = useCallback(async (playerId, tournamentId) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      const storedPlayers = getPlayersFromStorage();
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const playerIndex = storedPlayers.findIndex(p => p.id === playerId);
      
      if (playerIndex === -1) {
        throw new Error(`Player with ID ${playerId} not found`);
      }
      
      const player = storedPlayers[playerIndex];
      
      if (!player.tournamentIds) {
        return player;
      }
      
      const updatedPlayer = {
        ...player,
        tournamentIds: player.tournamentIds.filter(id => id !== tournamentId)
      };
      
      const updatedPlayers = [...storedPlayers];
      updatedPlayers[playerIndex] = updatedPlayer;
      
      savePlayersToStorage(updatedPlayers);
      setPlayers(updatedPlayers);
      
      return updatedPlayer;
    } catch (err) {
      console.error(`Error removing player ${playerId} from tournament ${tournamentId}:`, err);
      setError(`Failed to remove player from tournament. ${err.message}`);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    players,
    isLoading,
    error,
    fetchPlayers,
    fetchPlayersByTournament,
    getPlayer,
    createPlayer,
    updatePlayer,
    deletePlayer,
    addPlayerToTournament,
    removePlayerFromTournament
  };
};

export default usePlayers;
