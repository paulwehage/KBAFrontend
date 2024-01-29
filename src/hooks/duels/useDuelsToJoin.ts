import {useEffect, useState} from 'react';
import { getDuelsToJoin} from '../../services/duelService.ts';

export const useDuelsToJoin = (userId: number) => {
  const [duels, setDuels] = useState([]);

  useEffect(() => {
    const fetchDuels = async () => {
      try {
        const fetchedDuels = await getDuelsToJoin(userId);
        setDuels(fetchedDuels);
      } catch (error) {
        console.error('Error fetching duels:', error);
      }
    };
    fetchDuels();
  }, [userId]);

  return { duels };
};