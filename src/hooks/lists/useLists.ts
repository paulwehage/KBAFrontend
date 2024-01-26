import { useState, useEffect } from 'react';
import {getAllLists} from '../../services/listService.ts';

export const useLists = () => {
  const [lists, setLists] = useState([]);

  const fetchLists = async () => {
    try {
      const fetchedLists = await getAllLists();
      setLists(fetchedLists);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  useEffect(() => {
    fetchLists();
  }, []);

  return { lists, fetchLists };
};