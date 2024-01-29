import {useEffect, useState} from 'react';
import { getDuelsToStart} from '../../services/duelService.ts';

export const useDuelsToStart = (userId: number) => {
  const [duels, setDuels] = useState([]);

  useEffect(() => {

    const fetchDuels = async () => {
      try {
        const fetchedDuels = await getDuelsToStart(userId);
        setDuels(fetchedDuels);
      } catch (error) {
        console.error('Error fetching duels:', error);
      }
    };
    fetchDuels();
  }, [userId]);

  return { duels };
};