"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useAnimation, useInView } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import {
  Compass,
  CheckSquare,
  BookOpen,
  ClipboardList,
  Globe,
  ChevronRight,
  Moon,
  Sun,
  MessageSquare,
  Menu,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { useToast } from "@/hooks/use-toast"
import { useAuth } from "@/contexts/auth-context"
import { useMobile } from "@/hooks/use-mobile"

export default function Home() {
  // State management
  const [isLoaded, setIsLoaded] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [showAdPopup, setShowAdPopup] = useState(false)
  const [showOnboarding, setShowOnboarding] = useState(false)
  const [currentOnboardingStep, setCurrentOnboardingStep] = useState(0)
  const [fontSizeScale, setFontSizeScale] = useState(1)
  const [highContrastMode, setHighContrastMode] = useState(false)
  const [showTwoFactorModal, setShowTwoFactorModal] = useState(false)
  const [verificationCode, setVerificationCode] = useState("")
  const [showChatbot, setShowChatbot] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)

  // Refs for scroll animations
  const heroRef = useRef(null)
  const featuresRef = useRef(null)
  const resourcesRef = useRef(null)
  const testimonialsRef = useRef(null)
  const pricingRef = useRef(null)
  const statsRef = useRef(null)
  const aboutRef = useRef(null)
  const teamRef = useRef(null)
  const analyticsRef = useRef(null)
  const studyBuddyRef = useRef(null)
  const learnSpaceRef = useRef(null)
  const curriculumHubRef = useRef(null)

  // InView hooks for animations
  const isHeroInView = useInView(heroRef, { once: true })
  const areFeaturesInView = useInView(featuresRef, { once: true, amount: 0.2 })
  const areResourcesInView = useInView(resourcesRef, { once: true, amount: 0.2 })
  const areTestimonialsInView = useInView(testimonialsRef, { once: true, amount: 0.2 })
  const isPricingInView = useInView(pricingRef, { once: true, amount: 0.2 })
  const areStatsInView = useInView(statsRef, { once: true, amount: 0.2 })
  const isAboutInView = useInView(aboutRef, { once: true, amount: 0.2 })
  const isTeamInView = useInView(teamRef, { once: true, amount: 0.2 })
  const isAnalyticsInView = useInView(analyticsRef, { once: true, amount: 0.2 })
  const isStudyBuddyInView = useInView(studyBuddyRef, { once: true, amount: 0.2 })
  const isLearnSpaceInView = useInView(learnSpaceRef, { once: true, amount: 0.2 })
  const isCurriculumHubInView = useInView(curriculumHubRef, { once: true, amount: 0.2 })

  // Animation controls
  const heroControls = useAnimation()
  const featureControls = useAnimation()
  const resourceControls = useAnimation()
  const testimonialControls = useAnimation()
  const pricingControls = useAnimation()
  const statsControls = useAnimation()
  const aboutControls = useAnimation()
  const teamControls = useAnimation()
  const analyticsControls = useAnimation()
  const studyBuddyControls = useAnimation()
  const learnSpaceControls = useAnimation()
  const curriculumHubControls = useAnimation()

  const { toast } = useToast()
  const { user } = useAuth()
  const isMobile = useMobile()

  // Check if user is first-time visitor
  useEffect(() => {
    const isFirstVisit = localStorage.getItem("dr_aiva_first_visit") === null
    if (isFirstVisit) {
      setShowOnboarding(true)
      localStorage.setItem("dr_aiva_first_visit", "false")
    }

    // Simulate initial page load
    const timer = setTimeout(() => {
      setInitialLoading(false)
      setIsLoaded(true)
    }, 1500)

    // Show ad popup after 30 seconds for free users
    const adTimer = setTimeout(() => {
      if (!user || user.plan === "free") {
        setShowAdPopup(true)
      }
    }, 30000)

    // Randomly set admin status for demo purposes
    setIsAdmin(Math.random() > 0.7)

    return () => {
      clearTimeout(timer)
      clearTimeout(adTimer)
    }
  }, [user])

  // Handle animations based on scroll position
  useEffect(() => {
    if (isHeroInView) heroControls.start("visible")
    if (areFeaturesInView) featureControls.start("visible")
    if (areResourcesInView) resourceControls.start("visible")
    if (areTestimonialsInView) testimonialControls.start("visible")
    if (isPricingInView) pricingControls.start("visible")
    if (areStatsInView) statsControls.start("visible")
    if (isAboutInView) aboutControls.start("visible")
    if (isTeamInView) teamControls.start("visible")
    if (isAnalyticsInView) analyticsControls.start("visible")
    if (isStudyBuddyInView) studyBuddyControls.start("visible")
    if (isLearnSpaceInView) learnSpaceControls.start("visible")
    if (isCurriculumHubInView) curriculumHubControls.start("visible")
  }, [
    isHeroInView,
    areFeaturesInView,
    areResourcesInView,
    areTestimonialsInView,
    isPricingInView,
    areStatsInView,
    isAboutInView,
    isTeamInView,
    isAnalyticsInView,
    isStudyBuddyInView,
    isLearnSpaceInView,
    isCurriculumHubInView,
    heroControls,
    featureControls,
    resourceControls,
    testimonialControls,
    pricingControls,
    statsControls,
    aboutControls,
    teamControls,
    analyticsControls,
    studyBuddyControls,
    learnSpaceControls,
    curriculumHubControls,
  ])

  // Handle font size changes
  useEffect(() => {
    document.documentElement.style.fontSize = `${fontSizeScale * 100}%`
  }, [fontSizeScale])

  // Handle high contrast mode
  useEffect(() => {
    if (highContrastMode) {
      document.documentElement.classList.add("high-contrast")
    } else {
      document.documentElement.classList.remove("high-contrast")
    }
  }, [highContrastMode])

  // Handle 2FA verification
  const handleVerifyCode = () => {
    if (verificationCode.length === 6) {
      toast({
        title: "Verification Successful",
        description: "Your account is now secured with 2FA.",
      })
      setShowTwoFactorModal(false)
    } else {
      toast({
        title: "Invalid Code",
        description: "Please enter a valid 6-digit code.",
        variant: "destructive",
      })
    }
  }

  // Sample data - removed Mind Boost
  const featureCards = [
    {
      icon: <Compass className="h-8 w-8 text-blue-500" />,
      emoji: "🧭",
      title: "Study Map",
      description: "Explore your 6-year MBBS journey",
      color: "blue",
      link: "/study-map",
      image: "/images/study-map.jpg",
    },
    {
      icon: <CheckSquare className="h-8 w-8 text-teal-500" />,
      emoji: "✅",
      title: "Track & Plan",
      description: "Smart planner + progress tracker",
      color: "teal",
      link: "/track-plan",
      image: "/images/track-plan.jpg",
    },
    {
      icon: <BookOpen className="h-8 w-8 text-violet-500" />,
      emoji: "📚",
      title: "Learn Space",
      description: "All your books, videos, and flashcards",
      color: "violet",
      link: "/learn-space",
      image: "/images/learn-space.jpg",
      premium: true,
      price: "$20",
    },
    {
      icon: <ClipboardList className="h-8 w-8 text-teal-500" />,
      emoji: "📋",
      title: "Curriculum Hub",
      description: "Your entire syllabus, semester-wise",
      color: "teal",
      link: "/curriculum-hub",
      image: "/images/curriculum-hub.jpg",
      premium: true,
      price: "$40",
    },
    {
      icon: <Globe className="h-8 w-8 text-violet-500" />,
      emoji: "🌍",
      title: "Next Step",
      description: "USMLE, PLAB, NExT and more",
      color: "violet",
      link: "/next-step",
      image: "/images/next-step.jpg",
    },
  ]

  const educationalResources = [
    {
      title: "Anatomy Atlas",
      description: "Interactive 3D models of human anatomy",
      image: "/images/anatomy-atlas.jpg",
      category: "Study Resource",
    },
    {
      title: "Clinical Case Studies",
      description: "Real patient cases with expert analysis",
      image: "/images/clinical-cases.jpg",
      category: "Practice",
    },
    {
      title: "Medical Lectures",
      description: "Video lectures from top medical professors",
      image: "/images/medical-lectures.jpg",
      category: "Video",
    },
    {
      title: "Flashcard Library",
      description: "Comprehensive flashcards for quick review",
      image: "/images/flashcards.jpg",
      category: "Study Aid",
    },
  ]

  // Animation variants
  const heroVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const featureVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const featureItemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  // Loading screen
  if (initialLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center">
          <div className="relative w-24 h-24 mb-4">
            <div className="absolute inset-0 bg-blue-100 dark:bg-blue-900 rounded-full animate-ping opacity-75"></div>
            <div className="relative flex items-center justify-center w-24 h-24 bg-blue-500 rounded-full">
              <MessageSquare className="h-12 w-12 text-white" />
            </div>
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">Dr. AIVA</h2>
          <p className="text-muted-foreground">Preparing your medical journey...</p>
        </div>
      </div>
    )
  }

  return (
    <main
      className={`min-h-screen bg-background font-sans ${highContrastMode ? "high-contrast" : ""}`}
      style={{ fontSize: `${fontSizeScale * 100}%` }}
    >
      {/* Hero Section - Full-width image with text overlay */}
      <section id="hero-section" ref={heroRef} className="relative overflow-hidden">
        <div className="relative h-[600px] w-full">
          <Image
            src="/images/hero-illustration.png"
            alt="Dr. AIVA - Medical Education Platform"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-900/80 to-transparent flex items-center">
            <div className="container mx-auto px-4">
              <motion.div initial="hidden" animate={heroControls} variants={heroVariants} className="max-w-xl">
                <motion.div variants={itemVariants}>
                  <Badge className="mb-4 bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:text-blue-300 dark:border-blue-800 px-3 py-1 text-sm">
                    For Anniuma
                  </Badge>
                </motion.div>
                <motion.h1
                  variants={itemVariants}
                  className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight"
                >
                  Everything You Need to Succeed
                </motion.h1>
                <motion.p variants={itemVariants} className="text-lg md:text-xl text-blue-100 mb-8">
                  Dr. AIVA provides all the tools and resources you need for your medical education journey.
                </motion.p>
                <motion.div variants={itemVariants} className="flex flex-wrap gap-4">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-white px-8" asChild>
                      <Link href={user ? "/dashboard" : "/sign-up"}>
                        <motion.div className="flex items-center gap-2">
                          Get Started
                          <ChevronRight className="h-4 w-4" />
                        </motion.div>
                      </Link>
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="outline"
                      size="lg"
                      className="border-white/30 text-white hover:bg-white/10"
                      asChild
                    >
                      <Link href="#features">Explore Resources</Link>
                    </Button>
                  </motion.div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Cards Section */}
      <section id="features" ref={featuresRef} className="py-16 relative">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Everything You Need to Succeed</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Dr. AIVA provides all the tools and resources you need for your medical education journey.
            </p>
          </motion.div>

          <motion.div
            variants={featureVariants}
            initial="hidden"
            animate={featureControls}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {featureCards.map((card, index) => (
              <motion.div
                key={index}
                variants={featureItemVariants}
                whileHover={{ scale: 1.03, y: -5 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
                className="h-full"
              >
                <Link href={card.link} className="block h-full">
                  <div className="h-full border border-border hover:border-blue-200 dark:hover:border-blue-800 hover:shadow-md transition-all duration-300 overflow-hidden rounded-lg bg-white dark:bg-slate-900">
                    <div className="p-0 h-full">
                      <div className="relative h-40 w-full overflow-hidden">
                        <Image
                          src={card.image || "/placeholder.svg?height=200&width=300"}
                          alt={card.title}
                          fill
                          className="object-cover transition-transform duration-300 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div className="absolute bottom-3 left-3 flex items-center gap-2">
                          <span className="text-xl">{card.emoji}</span>
                          <h3 className="text-xl font-semibold text-white">{card.title}</h3>
                        </div>
                        {card.premium && (
                          <div className="absolute top-2 right-2">
                            <Badge className="bg-blue-600 text-white">Premium {card.price}</Badge>
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <p className="text-muted-foreground">{card.description}</p>
                        <div
                          className={`flex items-center justify-end mt-2 text-${card.color}-600 dark:text-${card.color}-400 font-medium`}
                        >
                          {card.premium && !user?.plan && (
                            <div className="flex items-center mr-auto">
                              <span className="text-xs text-muted-foreground">Requires subscription</span>
                            </div>
                          )}
                          <span className="text-sm">Explore</span>
                          <ChevronRight className="h-4 w-4 ml-1" />
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Educational Resources Section */}
      <section ref={resourcesRef} className="py-16 bg-slate-50 dark:bg-slate-900">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={resourceControls}
            variants={itemVariants}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Learning Resources</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Access a wide range of educational materials to support your medical studies
            </p>
          </motion.div>

          <motion.div
            variants={featureVariants}
            initial="hidden"
            animate={resourceControls}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {educationalResources.map((resource, index) => (
              <motion.div
                key={index}
                variants={featureItemVariants}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
                }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <div className="bg-white dark:bg-slate-800 rounded-lg overflow-hidden shadow-md border border-border h-full">
                  <div className="relative h-48">
                    <Image
                      src={resource.image || "/placeholder.svg?height=200&width=300"}
                      alt={resource.title}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-white/80 text-foreground dark:bg-slate-800/80">{resource.category}</Badge>
                    </div>
                  </div>
                  <div className="p-5">
                    <h3 className="font-semibold text-lg text-foreground mb-2">{resource.title}</h3>
                    <p className="text-muted-foreground text-sm">{resource.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  )
}
