import { useState } from "react";
import {joinDuel as joinDuelService} from '../../services/duelService.ts';

export const useJoinDuel = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [showPopup, setShowPopup] = useState(false);

    const closePopup = () => {
    setShowPopup(false);
  };

  const joinDuel = async (duelID: number|null, userID: number) => {
      try {
        setLoading(true);
        await joinDuelService(duelID!, userID);
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

    return { joinDuel, showPopup, closePopup, loading, error };
}