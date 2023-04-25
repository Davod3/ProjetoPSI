export interface UserToken {
    username: string;
    password: string;
    isValid: boolean;
    err: string;
}