"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { usePathname } from "next/navigation"
import Image from "next/image"

export default function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(false)
  const [prevPathname, setPrevPathname] = useState("")

  useEffect(() => {
    // Only trigger loading animation when path changes (not on initial load)
    if (prevPathname && prevPathname !== pathname) {
      setIsLoading(true)

      // Simulate loading time (you could replace this with actual data loading)
      const timer = setTimeout(() => {
        setIsLoading(false)
      }, 800)

      return () => clearTimeout(timer)
    }

    setPrevPathname(pathname)
  }, [pathname, prevPathname])

  return (
    <div className="relative">
      <AnimatePresence mode="wait">
        {isLoading ? (
          <motion.div
            key="loader"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 flex items-center justify-center bg-white/80 backdrop-blur-sm z-50"
          >
            <div className="flex flex-col items-center">
              <motion.div
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 10, -10, 0],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
                className="relative w-16 h-16 mb-4"
              >
                <Image src="/images/logo.png" alt="Dr. AIVA Logo" width={64} height={64} />
              </motion.div>
              <div className="flex space-x-2">
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: 0 }}
                  className="w-3 h-3 rounded-full bg-blue-500"
                />
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: 0.2 }}
                  className="w-3 h-3 rounded-full bg-teal-500"
                />
                <motion.div
                  animate={{ y: [0, -10, 0] }}
                  transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: 0.4 }}
                  className="w-3 h-3 rounded-full bg-violet-500"
                />
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
