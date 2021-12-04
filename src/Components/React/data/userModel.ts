export interface Answer {
    id: number;
    rate: number;
    skipped?: boolean;
}

export interface UserState {
    apiKey: string;
    answers: Answer[];
}

export interface UserContextData extends UserState {
    setUserState(user: UserState): void; 
}