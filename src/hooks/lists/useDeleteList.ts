import {useState} from 'react';
import {deleteList as deleteListService} from '../../services/listService.ts';

export const useDeleteList = () => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const deleteList = async (flashcardListId: number) => {
    try {
      setLoading(true);
      await deleteListService(flashcardListId);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setLoading(false);
    }
  };

  return { deleteList, loading, error };
};