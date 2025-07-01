"use client"
import { useEffect } from "react"

/**
 * Loads the Google API client script (gapi) once on mount.
 * Place this component at the root of your app (e.g., in layout or a provider).
 */
export default function GapiLoader() {
  useEffect(() => {
    if (typeof window !== "undefined" && !(window as any).gapi) {
      const script = document.createElement("script")
      script.src = "https://apis.google.com/js/api.js"
      script.async = true
      document.head.appendChild(script)
    }
  }, [])
  return null
} 