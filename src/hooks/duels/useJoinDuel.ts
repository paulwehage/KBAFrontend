import { useState } from "react";
import {joinDuels} from '../../services/duelService.ts';

export const useJoinDuel = () => {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const joinDuel = async (duelID: number, userID: number) => {
      try {
        setLoading(true);
        await joinDuels(duelID, userID);
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    };

    return { joinDuel, loading, error };
}