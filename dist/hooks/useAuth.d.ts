interface User {
    id: string;
    name: string;
    email: string;
}
export declare const useAuth: () => {
    user: User | null;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    isAuthenticated: boolean;
};
export {};
//# sourceMappingURL=useAuth.d.ts.map