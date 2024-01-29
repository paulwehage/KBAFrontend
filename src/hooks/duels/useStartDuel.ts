import { useState } from "react";
import {startDuel as startDuelService} from '../../services/duelService.ts';

export const useStartDuel = () => {

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPopup, setShowPopup] = useState(false);

  const closePopup = () => {
    setShowPopup(false);
  };

  const startDuel = async (duelID: number|null, userID: number) => {
    try {
      setLoading(true);
      await startDuelService(duelID, userID)
      setShowPopup(true)
      setTimeout(() => {
        closePopup();
      }, 2000);
    } catch (err) {
      setError(err instanceof Error ? err.message : String(err));
      setShowPopup(true)
    } finally {
      setLoading(false);
    }
  };

  return { startDuel, showPopup, closePopup, loading, error };
}