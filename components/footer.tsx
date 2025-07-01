"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Heart } from "lucide-react"

export default function Footer() {
  const footerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const linkGroups = [
    {
      title: "Features",
      links: [
        { name: "Study Map", href: "/study-map" },
        { name: "Track & Plan", href: "/track-plan" },
        { name: "Learn Space", href: "/learn-space" },
        { name: "Mind Boost", href: "/mind-boost" },
        { name: "Curriculum Hub", href: "/curriculum-hub" },
        { name: "Next Step", href: "/next-step" },
      ],
    },
    {
      title: "Resources",
      links: [
        { name: "Blog", href: "/blog" },
        { name: "Guides", href: "/guides" },
        { name: "FAQ", href: "/faq" },
        { name: "Support", href: "/support" },
      ],
    },
    {
      title: "Company",
      links: [
        { name: "About", href: "/about" },
        { name: "Terms", href: "/terms" },
        { name: "Privacy", href: "/privacy" },
        { name: "Contact", href: "/contact" },
      ],
    },
  ]

  return (
    <motion.footer
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={footerVariants}
      className="bg-background border-t border-border pt-12 pb-6"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg text-foreground mb-4">Dr. AIVA</h3>
            <p className="text-muted-foreground mb-4">
              Your intelligent companion for MBBS success. Track progress, learn smarter, and stay motivated throughout
              your medical journey.
            </p>
          </div>

          {linkGroups.map((group, index) => (
            <div key={index}>
              <h3 className="font-bold text-lg text-foreground mb-4">{group.title}</h3>
              <ul className="space-y-2">
                {group.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <Link
                      href={link.href}
                      className="text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm mb-4 md:mb-0">
            &copy; {new Date().getFullYear()} Dr. AIVA. All rights reserved.
          </p>

          <div className="flex items-center text-muted-foreground text-sm">
            <span className="flex items-center">
              Made with <Heart className="h-4 w-4 text-red-500 mx-1" /> by Dr. AIVA
            </span>
          </div>
        </div>
      </div>
    </motion.footer>
  )
}
