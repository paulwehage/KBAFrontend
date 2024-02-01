import {useState} from 'react';
import {deleteDuel as deleteDuelService} from '../../services/duelService.ts';

export const useDeleteDuel = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

    const deleteDuel = async (duelID: number) => {
        try {
        setLoading(true);
        await deleteDuelService(duelID);
        } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
        } finally {
        setLoading(false);
        }
    };

    return { deleteDuel, loading, error };
};