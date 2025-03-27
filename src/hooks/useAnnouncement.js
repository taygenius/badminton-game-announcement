import { useContext } from 'react';
import { AnnouncementContext } from '../contexts/AnnouncementContext';

export const useAnnouncement = () => useContext(AnnouncementContext);

export default useAnnouncement;
