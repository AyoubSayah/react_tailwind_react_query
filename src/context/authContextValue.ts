import { createContext } from 'react'

type User = { id: string; email: string } | null

type AuthContextType = {
  user: User
  login: (email: string, password: string) => Promise<void>
  logout: () => Promise<void>
  isAuthenticated: boolean
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)
