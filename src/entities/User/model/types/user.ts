export interface User {
    username: string,
    email: string,
    password: string,
    status: string,
    admin: boolean,
    id: number,
    checked: boolean
}

export interface UserSchema {
    user: User | null;
    error?: string;
    isLoading: boolean;
}
