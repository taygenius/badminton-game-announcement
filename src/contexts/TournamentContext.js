import React, { createContext, useState, useCallback, useEffect } from 'react';

export const TournamentContext = createContext();

export const TournamentProvider = ({ children }) => {
  const [tournaments, setTournaments] = useState([]);
  const [activeTournament, setActiveTournament] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Mock data for demonstration
  const mockTournaments = [
    {
      id: '1',
      name: 'Spring Championship 2025',
      location: 'Main Sports Centre',
      startDate: '2025-03-20',
      endDate: '2025-03-27',
      status: 'InProgress',
      playerCount: 64,
      matchCount: 48,
      courtCount: 6,
      format: 'elimination',
      description: 'Annual spring badminton championship with singles and doubles categories.'
    },
    {
      id: '2',
      name: 'Summer Club Tournament',
      location: 'Community Sports Hall',
      startDate: '2025-06-15',
      endDate: '2025-06-22',
      status: 'Upcoming',
      playerCount: 32,
      matchCount: 24,
      courtCount: 4,
      format: 'roundRobin',
      description: 'Club members tournament with round-robin format.'
    },
    {
      id: '3',
      name: 'Winter Invitational 2024',
      location: 'University Sports Complex',
      startDate: '2024-12-10',
      endDate: '2024-12-17',
      status: 'Completed',
      playerCount: 48,
      matchCount: 36,
      courtCount: 5,
      format: 'doubleElimination',
      description: 'Invitational tournament with top players from the region.'
    }
  ];

  // Fetch tournaments on mount
  useEffect(() => {
    const loadTournaments = async () => {
      setIsLoading(true);
      
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        setTournaments(mockTournaments);
        
        // Set first active tournament if none is selected
        if (!activeTournament && mockTournaments.length > 0) {
          const inProgressTournament = mockTournaments.find(t => t.status === 'InProgress');
          setActiveTournament(inProgressTournament || mockTournaments[0]);
        }
      } catch (error) {
        console.error('Error fetching tournaments:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadTournaments();
  }, []);

  // Fetch all tournaments
  const fetchTournaments = useCallback(async () => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // In a real app, you would fetch from the API
      return mockTournaments;
    } catch (error) {
      console.error('Error fetching tournaments:', error);
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Get a specific tournament by ID
  const getTournament = useCallback(async (id) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Find in local state first
      const tournament = tournaments.find(t => t.id === id);
      
      if (tournament) {
        return tournament;
      }
      
      // If not found, check mock data (simulating an API call)
      const mockTournament = mockTournaments.find(t => t.id === id);
      
      if (!mockTournament) {
        throw new Error('Tournament not found');
      }
      
      return mockTournament;
    } catch (error) {
      console.error(`Error fetching tournament with ID ${id}:`, error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [tournaments]);

  // Create a new tournament
  const createTournament = useCallback(async (tournamentData) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newTournament = {
        id: Date.now().toString(),
        ...tournamentData,
        status: 'Upcoming',
        playerCount: 0,
        matchCount: 0
      };
      
      setTournaments(prev => [...prev, newTournament]);
      
      return newTournament;
    } catch (error) {
      console.error('Error creating tournament:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Update a tournament
  const updateTournament = useCallback(async (id, tournamentData) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setTournaments(prev => 
        prev.map(tournament => 
          tournament.id === id ? { ...tournament, ...tournamentData } : tournament
        )
      );
      
      // Update active tournament if it's the one being updated
      if (activeTournament && activeTournament.id === id) {
        setActiveTournament(prev => ({ ...prev, ...tournamentData }));
      }
      
      return { id, ...tournamentData };
    } catch (error) {
      console.error(`Error updating tournament with ID ${id}:`, error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [activeTournament]);

  // Update tournament status
  const updateTournamentStatus = useCallback(async (id, status) => {
    return updateTournament(id, { status });
  }, [updateTournament]);

  // Delete a tournament
  const deleteTournament = useCallback(async (id) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setTournaments(prev => prev.filter(tournament => tournament.id !== id));
      
      // Clear active tournament if it's the one being deleted
      if (activeTournament && activeTournament.id === id) {
        setActiveTournament(null);
      }
      
      return { success: true };
    } catch (error) {
      console.error(`Error deleting tournament with ID ${id}:`, error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, [activeTournament]);

  return (
    <TournamentContext.Provider
      value={{
        tournaments,
        activeTournament,
        setActiveTournament,
        isLoading,
        fetchTournaments,
        getTournament,
        createTournament,
        updateTournament,
        updateTournamentStatus,
        deleteTournament
      }}
    >
      {children}
    </TournamentContext.Provider>
  );
};

export default TournamentContext;
