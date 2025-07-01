"use client"

import { motion } from "framer-motion"
import Image from "next/image"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  showLogo?: boolean
  text?: string
}

export default function LoadingSpinner({ size = "md", showLogo = true, text }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  }

  const dotSizes = {
    sm: "w-2 h-2",
    md: "w-2.5 h-2.5",
    lg: "w-3 h-3",
  }

  return (
    <div className="flex flex-col items-center justify-center">
      {showLogo && (
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
          className={`relative ${sizeClasses[size]} mb-4`}
        >
          <Image src="/images/logo.png" alt="Dr. AIVA Logo" fill className="object-contain" />
        </motion.div>
      )}

      <div className="flex space-x-2">
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: 0 }}
          className={`${dotSizes[size]} rounded-full bg-blue-500`}
        />
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: 0.2 }}
          className={`${dotSizes[size]} rounded-full bg-teal-500`}
        />
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 0.6, repeat: Number.POSITIVE_INFINITY, delay: 0.4 }}
          className={`${dotSizes[size]} rounded-full bg-violet-500`}
        />
      </div>

      {text && <p className="mt-4 text-sm text-muted-foreground">{text}</p>}
    </div>
  )
}
