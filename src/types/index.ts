export interface User {
    userId: number;
    username: string;
}

export interface FlashcardList {
    flashcardListId: number;
    flashcardListName: string;

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

export interface Round {
    correctAnswer: string,
    errorMessage: string,
    question: string,
    roundId: number,
    wrongAnswer1: string,
    wrongAnswer2: string,
    wrongAnswer3: string
}