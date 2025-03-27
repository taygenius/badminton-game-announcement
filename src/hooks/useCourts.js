import { useState, useCallback } from 'react';

// Helper functions for localStorage
const saveCourtsToStorage = (courts) => {
  localStorage.setItem('badminton_courts', JSON.stringify(courts));
};

const getCourtsFromStorage = () => {
  const storedCourts = localStorage.getItem('badminton_courts');
  return storedCourts ? JSON.parse(storedCourts) : [];
};

// Mock initial data
const initialCourts = [
  {
    id: '1',
    name: 'Court 1',
    location: 'Main Hall',
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
    location: 'Main Hall',
    status: 'available'
  },
  {
    id: '3',
    name: 'Court 3',
    location: 'Main Hall',
    status: 'available'
  },
  {
    id: '4',
    name: 'Court 4',
    location: 'Main Hall',
    status: 'maintenance',
    notes: 'Net needs replacement'
  },
  {
    id: '5',
    name: 'Court 5',
    location: 'Side Hall',
    status: 'reserved',
    reservedFor: 'Junior Training'
  },
  {
    id: '6',
    name: 'Court 6',
    location: 'Side Hall',
    status: 'available'
  }
];

// Check if we need to initialize localStorage
if (getCourtsFromStorage().length === 0) {
  saveCourtsToStorage(initialCourts);
}

export const useCourts = () => {
  const [courts, setCourts] = useState(getCourtsFromStorage());
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch all courts
  const fetchCourts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      // For now, we'll just use localStorage
      const storedCourts = getCourtsFromStorage();
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setCourts(storedCourts);
      return storedCourts;
    } catch (err) {
      console.error('Error fetching courts:', err);
      setError('Failed to fetch courts. Please try again.');
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Fetch available courts
  const fetchAvailableCourts = useCallback(async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      const storedCourts = getCourtsFromStorage();
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const availableCourts = storedCourts.filter(court => 
        court.status === 'available'
      );
      
      return availableCourts;
    } catch (err) {
      console.error('Error fetching available courts:', err);
      setError('Failed to fetch available courts. Please try again.');
      return [];
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Get a specific court by ID
  const getCourt = useCallback(async (id) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      const storedCourts = getCourtsFromStorage();
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const court = storedCourts.find(c => c.id === id);
      
      if (!court) {
        throw new Error(`Court with ID ${id} not found`);
      }
      
      return court;
    } catch (err) {
      console.error(`Error fetching court with ID ${id}:`, err);
      setError(`Failed to fetch court details. ${err.message}`);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Create a new court
  const createCourt = useCallback(async (courtData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      const storedCourts = getCourtsFromStorage();
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      const newCourt = {
        id: Date.now().toString(),
        ...courtData,
        status: courtData.status || 'available'
      };
      
      const updatedCourts = [...storedCourts, newCourt];
      saveCourtsToStorage(updatedCourts);
      setCourts(updatedCourts);
      
      return newCourt;
    } catch (err) {
      console.error('Error creating court:', err);
      setError('Failed to create court. Please try again.');
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Update an existing court
  const updateCourt = useCallback(async (id, courtData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      const storedCourts = getCourtsFromStorage();
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const courtIndex = storedCourts.findIndex(c => c.id === id);
      
      if (courtIndex === -1) {
        throw new Error(`Court with ID ${id} not found`);
      }
      
      const updatedCourt = {
        ...storedCourts[courtIndex],
        ...courtData
      };
      
      const updatedCourts = [...storedCourts];
      updatedCourts[courtIndex] = updatedCourt;
      
      saveCourtsToStorage(updatedCourts);
      setCourts(updatedCourts);
      
      return updatedCourt;
    } catch (err) {
      console.error(`Error updating court with ID ${id}:`, err);
      setError(`Failed to update court. ${err.message}`);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Update court status
  const updateCourtStatus = useCallback(async (id, status, additionalData = {}) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      const storedCourts = getCourtsFromStorage();
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const courtIndex = storedCourts.findIndex(c => c.id === id);
      
      if (courtIndex === -1) {
        throw new Error(`Court with ID ${id} not found`);
      }
      
      const updatedCourt = {
        ...storedCourts[courtIndex],
        status,
        ...additionalData
      };
      
      const updatedCourts = [...storedCourts];
      updatedCourts[courtIndex] = updatedCourt;
      
      saveCourtsToStorage(updatedCourts);
      setCourts(updatedCourts);
      
      return updatedCourt;
    } catch (err) {
      console.error(`Error updating status for court ID ${id}:`, err);
      setError(`Failed to update court status. ${err.message}`);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Update match in progress
  const updateCourtMatch = useCallback(async (id, matchData) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      const storedCourts = getCourtsFromStorage();
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const courtIndex = storedCourts.findIndex(c => c.id === id);
      
      if (courtIndex === -1) {
        throw new Error(`Court with ID ${id} not found`);
      }
      
      const updatedCourt = {
        ...storedCourts[courtIndex],
        status: 'occupied',
        matchInProgress: matchData
      };
      
      const updatedCourts = [...storedCourts];
      updatedCourts[courtIndex] = updatedCourt;
      
      saveCourtsToStorage(updatedCourts);
      setCourts(updatedCourts);
      
      return updatedCourt;
    } catch (err) {
      console.error(`Error updating match for court ID ${id}:`, err);
      setError(`Failed to update court match. ${err.message}`);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Clear match in progress
  const clearCourtMatch = useCallback(async (id) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      const storedCourts = getCourtsFromStorage();
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 300));
      
      const courtIndex = storedCourts.findIndex(c => c.id === id);
      
      if (courtIndex === -1) {
        throw new Error(`Court with ID ${id} not found`);
      }
      
      // Create a copy of the court and remove matchInProgress
      const { matchInProgress, ...courtWithoutMatch } = storedCourts[courtIndex];
      
      const updatedCourt = {
        ...courtWithoutMatch,
        status: 'available'
      };
      
      const updatedCourts = [...storedCourts];
      updatedCourts[courtIndex] = updatedCourt;
      
      saveCourtsToStorage(updatedCourts);
      setCourts(updatedCourts);
      
      return updatedCourt;
    } catch (err) {
      console.error(`Error clearing match for court ID ${id}:`, err);
      setError(`Failed to clear court match. ${err.message}`);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Delete a court
  const deleteCourt = useCallback(async (id) => {
    setIsLoading(true);
    setError(null);
    
    try {
      // In a real app, this would be an API call
      const storedCourts = getCourtsFromStorage();
      
      // Simulate network delay
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const updatedCourts = storedCourts.filter(c => c.id !== id);
      
      if (updatedCourts.length === storedCourts.length) {
        throw new Error(`Court with ID ${id} not found`);
      }
      
      saveCourtsToStorage(updatedCourts);
      setCourts(updatedCourts);
      
      return { success: true };
    } catch (err) {
      console.error(`Error deleting court ID ${id}:`, err);
      setError(`Failed to delete court. ${err.message}`);
      throw err;
    } finally {
      setIsLoading(false);
    }
  }, []);

  return {
    courts,
    isLoading,
    error,
    fetchCourts,
    fetchAvailableCourts,
    getCourt,
    createCourt,
    updateCourt,
    updateCourtStatus,
    updateCourtMatch,
    clearCourtMatch,
    deleteCourt
  };
};

export default useCourts;
