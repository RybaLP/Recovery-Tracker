export interface Tokens {
    accessToken : string | undefined;
    refreshToken  : string | undefined;
}

export interface AuthState extends Tokens {
    isLoggedIn : boolean;
    login : (login : string , password : string) => Promise<boolean>;
    refresh : () => Promise<void>
    logout : () => void;
} 