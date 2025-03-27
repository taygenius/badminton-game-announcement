import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

// Helper functions for localStorage
const saveUser = (user) => {
  localStorage.setItem('badminton_user', JSON.stringify(user));
};

const getUser = () => {
  const userString = localStorage.getItem('badminton_user');
  if (userString) {
    try {
      return JSON.parse(userString);
    } catch (e) {
      console.error('Error parsing user data from localStorage:', e);
      return null;
    }
  }
  return null;
};

const clearUser = () => {
  localStorage.removeItem('badminton_user');
  localStorage.removeItem('badminton_auth_token');
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if there's a stored user and auth token
    const storedUser = getUser();
    const token = localStorage.getItem('badminton_auth_token');
    
    if (storedUser && token) {
      setUser(storedUser);
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
      
      // For demo, we'll create a mock user based on the email
      const mockUser = {
        id: '1',
        name: email.split('@')[0].split('.').map(name => 
          name.charAt(0).toUpperCase() + name.slice(1)
        ).join(' '),
        email: email,
        role: 'admin'
      };
      
      // Store the user and token
      localStorage.setItem('badminton_auth_token', 'mock_token_for_demo');
      saveUser(mockUser);
      
      setUser(mockUser);
      setIsAuthenticated(true);
      
      return { success: true };
    } catch (error) {
      console.error('Login error:', error);
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
      
      // Store the user and token
      localStorage.setItem('badminton_auth_token', 'mock_token_for_demo');
      saveUser(mockUser);
      
      setUser(mockUser);
      setIsAuthenticated(true);
      
      return { success: true };
    } catch (error) {
      console.error('Registration error:', error);
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
    clearUser();
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
