"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

interface PasswordContextType {
  isAuthenticated: boolean
  isLoading: boolean
  authenticate: (password: string) => boolean
  logout: () => void
}

const PasswordContext = createContext<PasswordContextType | undefined>(undefined)

const CORRECT_PASSWORD = "132800"

export function PasswordProvider({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Only run on client side
    if (typeof window === "undefined") {
      setIsLoading(false)
      return
    }

    const checkPasswordAuth = () => {
      try {
        const authStatus = localStorage.getItem("dr_aiva_password_auth")
        if (authStatus === "true") {
          setIsAuthenticated(true)
        }
      } catch (error) {
        console.error("Password auth check failed:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkPasswordAuth()
  }, [])

  const authenticate = (password: string): boolean => {
    if (password === CORRECT_PASSWORD) {
      setIsAuthenticated(true)
      if (typeof window !== "undefined") {
        localStorage.setItem("dr_aiva_password_auth", "true")
      }
      return true
    }
    return false
  }

  const logout = () => {
    setIsAuthenticated(false)
    if (typeof window !== "undefined") {
      localStorage.removeItem("dr_aiva_password_auth")
    }
  }

  const value = {
    isAuthenticated,
    isLoading,
    authenticate,
    logout,
  }

  return <PasswordContext.Provider value={value}>{children}</PasswordContext.Provider>
}

export function usePassword() {
  const context = useContext(PasswordContext)
  if (context === undefined) {
    throw new Error("usePassword must be used within a PasswordProvider")
  }
  return context
} 