import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    ReactNode,
} from 'react';
import { supabase } from '../lib/supabase';

interface User {
    id: string;
    name: string;
    email: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    login: (email: string, password: string) => Promise<boolean>;
    signup: (name: string, email: string, password: string) => Promise<boolean>;
    logout: () => Promise<void>;
    loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

/* */

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    const login = async (email: string, password: string): Promise<boolean> => {
        setLoading(true);
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                console.error('Login error:', error.message);
                setLoading(false);
                return false;
            }

            if (data.user) {
                setUser({
                    id: data.user.id,
                    name:
                        data.user.user_metadata?.name ||
                        data.user.email?.split('@')[0] ||
                        'User',
                    email: data.user.email || '',
                });
            }

            setLoading(false);
            return true;
        } catch (error) {
            console.error('Login error:', error);
            setLoading(false);
            return false;
        }
    };

    const signup = async (
        name: string,
        email: string,
        password: string
    ): Promise<boolean> => {
        setLoading(true);
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        name: name,
                    },
                },
            });

            if (error) {
                console.error('Signup error:', error.message);
                setLoading(false);
                return false;
            }

            if (data.user) {
                setUser({
                    id: data.user.id,
                    name: name,
                    email: data.user.email || '',
                });
            }

            setLoading(false);
            return true;
        } catch (error) {
            console.error('Signup error:', error);
            setLoading(false);
            return false;
        }
    };

    const logout = async () => {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) {
                console.error('Logout error:', error.message);
            }
            setUser(null);
        } catch (error) {
            console.error('Logout error:', error);
            setUser(null);
        }
    };

    useEffect(() => {
        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
            if (session?.user) {
                setUser({
                    id: session.user.id,
                    name:
                        session.user.user_metadata?.name ||
                        session.user.email?.split('@')[0] ||
                        'User',
                    email: session.user.email || '',
                });
            }
            setLoading(false);
        });

        // Listen for auth state changes
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange(async (event, session) => {
            if (session?.user) {
                setUser({
                    id: session.user.id,
                    name:
                        session.user.user_metadata?.name ||
                        session.user.email?.split('@')[0] ||
                        'User',
                    email: session.user.email || '',
                });
            } else {
                setUser(null);
            }
            setLoading(false);
        });

        return () => subscription.unsubscribe();
    }, []);

    const value: AuthContextType = {
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        loading,
    };

    return (
        <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
    );
};
