import React, { createContext, useState, useCallback } from 'react';

export const AnnouncementContext = createContext();

export const AnnouncementProvider = ({ children }) => {
  const [lastAnnouncement, setLastAnnouncement] = useState(null);
  const [isAnnouncing, setIsAnnouncing] = useState(false);
  const [announcementQueue, setAnnouncementQueue] = useState([]);

  // Process the next item in the queue
  const processQueue = useCallback(async () => {
    if (announcementQueue.length > 0 && !isAnnouncing) {
      setIsAnnouncing(true);
      
      const nextAnnouncement = announcementQueue[0];
      setLastAnnouncement(nextAnnouncement);
      
      try {
        // In a real app, we'd connect to a text-to-speech service
        // For demo purposes, we'll just simulate the announcement with a timeout
        
        console.log('ANNOUNCEMENT:', nextAnnouncement);
        
        // Simulate the time it takes to make an announcement
        await new Promise(resolve => setTimeout(resolve, 3000));
        
      } catch (error) {
        console.error('Error processing announcement:', error);
      } finally {
        // Remove the processed announcement from the queue
        setAnnouncementQueue(prev => prev.slice(1));
        setIsAnnouncing(false);
      }
    }
  }, [announcementQueue, isAnnouncing]);

  // Add an announcement to the queue
  const announce = useCallback(async (announcement) => {
    // Generate text based on announcement type
    let announcementText = '';
    
    switch (announcement.type) {
      case 'matchCall':
        announcementText = `Attention please. Players ${announcement.player1} and ${announcement.player2}, please proceed to ${announcement.court} for your match.`;
        break;
      case 'scoreUpdate':
        announcementText = `The score is now ${announcement.player1Score} - ${announcement.player2Score} in game ${announcement.gameNumber}. ${announcement.player1Name} versus ${announcement.player2Name}.`;
        break;
      case 'matchComplete':
        announcementText = `Match complete on ${announcement.court}. The winner is ${announcement.winner}.`;
        break;
      case 'test':
        announcementText = announcement.text;
        break;
      default:
        announcementText = 'Attention please. This is a general announcement.';
    }
    
    // Add the text to the announcement object
    const fullAnnouncement = {
      ...announcement,
      text: announcementText,
      timestamp: new Date().toISOString()
    };
    
    setAnnouncementQueue(prev => [...prev, fullAnnouncement]);
    
    // If not currently announcing, process the queue
    if (!isAnnouncing) {
      processQueue();
    }
  }, [isAnnouncing, processQueue]);

  // Clear the queue
  const clearAnnouncementQueue = useCallback(() => {
    setAnnouncementQueue([]);
  }, []);

  return (
    <AnnouncementContext.Provider
      value={{
        announce,
        lastAnnouncement,
        isAnnouncing,
        announcementQueue,
        clearAnnouncementQueue
      }}
    >
      {children}
    </AnnouncementContext.Provider>
  );
};

export default AnnouncementContext;
