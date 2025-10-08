import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { login as apiLogin, logout as apiLogout } from '../app/api/authApi'
import { AuthContext } from './authContextValue'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<{ id: string; email: string } | null>(() => {
    try {
      const raw = localStorage.getItem('user')
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  })

  useEffect(() => {
    if (user) localStorage.setItem('user', JSON.stringify(user))
    else localStorage.removeItem('user')
  }, [user])

  async function login(email: string, password: string) {
    const res = await apiLogin({ email, password })
    setUser(res.user)
  }

  async function logout() {
    await apiLogout()
    setUser(null)
  }

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated: !!user }}>
      {children}
    </AuthContext.Provider>
  )
}

// `useAuth` moved to `useAuth.ts` to keep this file component-only for fast refresh.
