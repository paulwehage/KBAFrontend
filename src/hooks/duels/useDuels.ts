import { useState, useEffect } from 'react';
import {getAllDuels} from '../../services/duelService.ts';

export const useDuels = () => {
  const [duels, setDuels] = useState([]);

  const fetchDuels = async () => {
    try {
      const fetchedDuels = await getAllDuels();
      setDuels(fetchedDuels);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchDuels();
  }, []);

  return { duels, fetchDuels };
};