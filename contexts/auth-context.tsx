"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"

type User = {
  id: string
  email: string
  name: string
  role: "applicant" | "startup" | "admin"
  approved: boolean
}

type AuthContextType = {
  user: User | null
  loading: boolean
  login: (email: string, password: string) => Promise<void>
  signup: (email: string, password: string, name: string) => Promise<void>
  logout: () => void
  isAuthenticated: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Check if user is logged in
    const checkAuth = async () => {
      try {
        // In a real app, this would verify the session/token with your backend
        const storedUser = localStorage.getItem("flare_hub_user")
        if (storedUser) {
          setUser(JSON.parse(storedUser))
        }
      } catch (error) {
        console.error("Authentication error:", error)
      } finally {
        setLoading(false)
      }
    }

    checkAuth()
  }, [])

  // Update the signup function to store users in localStorage
  const signup = async (email: string, password: string, name: string) => {
    setLoading(true)
    try {
      // In a real app, this would make an API call to your backend
      // For demo purposes, we'll simulate a successful signup

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Create a new user
      const newUser = {
        id: Math.random().toString(36).substring(2, 9),
        email,
        name,
        role: "applicant" as const,
        approved: false,
      }

      // Store user in localStorage for persistence
      const users = JSON.parse(localStorage.getItem("flare_hub_users") || "[]")
      users.push(newUser)
      localStorage.setItem("flare_hub_users", JSON.stringify(users))

      // Set user in state and localStorage
      setUser(newUser)
      localStorage.setItem("flare_hub_user", JSON.stringify(newUser))
    } catch (error) {
      console.error("Signup error:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  // Update the login function to check localStorage for users
  const login = async (email: string, password: string) => {
    setLoading(true)
    try {
      // In a real app, this would make an API call to your backend
      // For demo purposes, we'll simulate a successful login

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Check localStorage for users first
      const storedUsers = JSON.parse(localStorage.getItem("flare_hub_users") || "[]")

      // Mock users as fallback
      const mockUsers = [
        { id: "1", email: "admin@flarehub.com", name: "Admin User", role: "admin", approved: true },
        { id: "2", email: "startup@example.com", name: "Startup User", role: "startup", approved: true },
        { id: "3", email: "applicant@example.com", name: "Applicant User", role: "applicant", approved: false },
      ]

      // Combine stored users with mock users
      const allUsers = [...storedUsers, ...mockUsers]

      // Find user by email
      const foundUser = allUsers.find((u) => u.email === email)

      if (!foundUser) {
        throw new Error("Invalid credentials")
      }

      // Set user in state and localStorage
      setUser(foundUser as User)
      localStorage.setItem("flare_hub_user", JSON.stringify(foundUser))
    } catch (error) {
      console.error("Login error:", error)
      throw error
    } finally {
      setLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("flare_hub_user")

    // In a real app, you would also invalidate the session on the server

    // Redirect to home page after logout
    window.location.href = "/"
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
