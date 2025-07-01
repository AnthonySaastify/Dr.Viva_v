"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface User {
  id: string
  name: string
  email: string
  plan: "free" | "learn" | "premium"
}

interface AuthContextType {
  user: User | null
  isLoading: boolean
  isAdmin: boolean
  signIn: (email: string, password: string) => Promise<void>
  signUp: (email: string, name: string, password: string) => Promise<void>
  signOut: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isAdmin, setIsAdmin] = useState(false)

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") {
      setIsLoading(false)
      return
    }

    const checkAuth = async () => {
      try {
        const savedUser = localStorage.getItem("dr_aiva_user")
        if (savedUser) {
          const userData = JSON.parse(savedUser)
          setUser(userData)
          setIsAdmin(userData.email === "admin@draiva.com")
        }
      } catch (error) {
        console.error("Auth check failed:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkAuth()
  }, [])

  const signIn = async (email: string, password: string) => {
    setIsLoading(true)
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const userData: User = {
        id: "1",
        name: email.split("@")[0],
        email,
        plan: email.includes("premium") ? "premium" : email.includes("learn") ? "learn" : "free",
      }

      setUser(userData)
      setIsAdmin(email === "admin@draiva.com")

      if (typeof window !== "undefined") {
        localStorage.setItem("dr_aiva_user", JSON.stringify(userData))
      }
    } catch (error) {
      throw new Error("Invalid credentials")
    } finally {
      setIsLoading(false)
    }
  }

  const signUp = async (email: string, name: string, password: string) => {
    setIsLoading(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      const userData: User = {
        id: Date.now().toString(),
        name,
        email,
        plan: "free",
      }

      setUser(userData)
      setIsAdmin(false)

      if (typeof window !== "undefined") {
        localStorage.setItem("dr_aiva_user", JSON.stringify(userData))
      }
    } catch (error) {
      throw new Error("Sign up failed")
    } finally {
      setIsLoading(false)
    }
  }

  const signOut = async () => {
    setUser(null)
    setIsAdmin(false)

    if (typeof window !== "undefined") {
      localStorage.removeItem("dr_aiva_user")
    }
  }

  const value = {
    user,
    isLoading,
    isAdmin,
    signIn,
    signUp,
    signOut,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
