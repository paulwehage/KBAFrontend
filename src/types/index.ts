export interface User {
    userId: number;
    username: string;
}

export interface FlashcardList {
    flashcardListId: number;
    flashcardListname: string;

}

export interface UserContextType {
    user: User | null;
    setUser: (user: User | null) => void;
    isAuthenticated: boolean;
    setIsAuthenticated: (isAuthenticated: boolean) => void;
}