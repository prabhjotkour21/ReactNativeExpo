import { createContext, useContext, useState, ReactNode } from "react";

type User = {
    id: string,
    name: string,
    email:string
    
}

type AuthContextType = {
    user: User | null;
    loading: boolean
    login: (email: string, password: string) => Promise<void>
    logout:()=>void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setuser] = useState<User | null>(null)
    const [loading, setLoading] = useState(false)
    
    const login = async (email: string, password: string) => {
        setLoading(true)
        try {
            const fakelogin = { id: "1", name: "Jot", email }
            setuser(fakelogin)
        } finally {
            setLoading(false)
        }
    }
    const logout = () => {
        setuser(null)
    }
    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    )

}

export function useAuth() {
    const context = useContext(AuthContext)
    if (context === undefined) {
        throw new Error ('useAuth must be used inside AuthProvider')
    }
    return context
}