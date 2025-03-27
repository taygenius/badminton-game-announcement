import { useContext } from 'react';
import { TournamentContext } from '../contexts/TournamentContext';

export const useTournaments = () => useContext(TournamentContext);

export default useTournaments;
