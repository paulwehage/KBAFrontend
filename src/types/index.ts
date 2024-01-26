export interface User {
    userId: number;
    username: string;
}

export interface FlashcardList {
    flashcardListId: number;
    flashcardListname: string;

}

export interface Duel {
    duelId: number,
    "winnerIds": number[],
    "winnerUsernames": string[],
    "playerIds": number[],
    "playerUsernames": string[],
    "flashcardsForDuelId": number,
    "started": boolean,
    "finished": boolean
}

export interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    isAuthenticated: boolean;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
}