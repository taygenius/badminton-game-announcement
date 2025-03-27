import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if there's a stored auth token
    const token = localStorage.getItem('badminton_auth_token');
    
    if (token) {
      // For demo purposes, we're setting a mock user
      // In a real app, you would validate the token with your backend
      setUser({
        id: '1',
        name: 'Demo User',
        email: 'demo@example.com',
        role: 'admin'
      });
      setIsAuthenticated(true);
    }
    
    setIsLoading(false);
  }, []);

  // Login function
  const login = async (email, password) => {
    setIsLoading(true);
    
    try {
      // This would be an API call in a real application
      // For demo purposes, we'll just accept any credentials
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser = {
        id: '1',
        name: 'Demo User',
        email: email,
        role: 'admin'
      };
      
      // Store the token
      localStorage.setItem('badminton_auth_token', 'mock_token_for_demo');
      
      setUser(mockUser);
      setIsAuthenticated(true);
      
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: 'Invalid credentials. Please try again.'
      };
    } finally {
      setIsLoading(false);
    }
  };

  // Register function
  const register = async (name, email, password) => {
    setIsLoading(true);
    
    try {
      // This would be an API call in a real application
      // For demo purposes, we'll just accept any registration
      
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser = {
        id: '1',
        name: name,
        email: email,
        role: 'admin'
      };
      
      // Store the token
      localStorage.setItem('badminton_auth_token', 'mock_token_for_demo');
      
      setUser(mockUser);
      setIsAuthenticated(true);
      
      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: 'Registration failed. Please try again.'
      };
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('badminton_auth_token');
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
