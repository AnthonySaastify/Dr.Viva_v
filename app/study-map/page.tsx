"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, BookOpen, Clock, Award } from "lucide-react"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import LoadingSpinner from "@/components/loading-spinner"
import { useRouter } from "next/navigation"
import { getLoggedInUser } from "@/lib/auth"

interface Subject {
  subject: string
  ects: number
}

interface Curriculum {
  college: string
  programme: string
  batch_start_year: number
  duration_years: number
  semesters: {
    [key: string]: Subject[]
  }
  total_ects: number
}

export default function StudyMap() {
  const [curriculum, setCurriculum] = useState<Curriculum | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const user = getLoggedInUser()
    if (!user) {
      router.replace("/login")
    }
  }, [router])

  useEffect(() => {
    const fetchCurriculum = async () => {
      try {
        // Simulate network delay for demonstration purposes
        await new Promise((resolve) => setTimeout(resolve, 1000))

        const response = await fetch("/data/curriculum.json")
        const data = await response.json()
        setCurriculum(data)
        setLoading(false)
      } catch (error) {
        console.error("Error loading curriculum data:", error)
        setLoading(false)
      }
    }

    fetchCurriculum()
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-20">
        <LoadingSpinner size="lg" text="Loading curriculum data..." />
      </div>
    )
  }

  if (!curriculum) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Failed to load curriculum data</h2>
          <p className="text-slate-600 mb-6">Please try again later</p>
          <Link href="/">
            <Button>Return to Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  const semesterKeys = Object.keys(curriculum.semesters)
  const years = Math.ceil(semesterKeys.length / 2)

  return (
    <main className="min-h-screen bg-slate-50 pt-20">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/">
            <Button variant="outline" size="sm" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Home
            </Button>
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-2">Study Map</h1>
            <p className="text-lg text-slate-600 mb-6">Your complete curriculum journey at {curriculum.college}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-blue-100">
                      <BookOpen className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">{curriculum.programme}</h3>
                      <p className="text-sm text-slate-500">Degree Programme</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-teal-100">
                      <Clock className="h-6 w-6 text-teal-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">{curriculum.duration_years} Years</h3>
                      <p className="text-sm text-slate-500">Programme Duration</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-violet-100">
                      <Award className="h-6 w-6 text-violet-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">{curriculum.total_ects} ECTS</h3>
                      <p className="text-sm text-slate-500">Total Credits</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>

        <Tabs defaultValue="semesters" className="mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="semesters">By Semester</TabsTrigger>
            <TabsTrigger value="years">By Year</TabsTrigger>
          </TabsList>

          <TabsContent value="semesters">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {semesterKeys.map((semester) => (
                <motion.div key={semester} variants={itemVariants}>
                  <Card className="h-full">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-center">
                        <CardTitle className="text-xl">Semester {semester}</CardTitle>
                        <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                          {curriculum.semesters[semester].reduce((total, subject) => total + subject.ects, 0)} ECTS
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {curriculum.semesters[semester].map((subject, index) => (
                          <li key={index} className="flex justify-between items-start">
                            <div className="flex-1">
                              <p className="text-slate-800">{subject.subject}</p>
                            </div>
                            <Badge variant="outline" className="ml-2 whitespace-nowrap">
                              {subject.ects} ECTS
                            </Badge>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="years">
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
              {Array.from({ length: years }, (_, i) => i + 1).map((year) => (
                <motion.div key={year} variants={itemVariants}>
                  <h2 className="text-2xl font-bold text-slate-800 mb-4">Year {year}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {semesterKeys
                      .filter((_, index) => Math.floor(index / 2) + 1 === year)
                      .map((semester) => (
                        <Card key={semester} className="h-full">
                          <CardHeader className="pb-3">
                            <div className="flex justify-between items-center">
                              <CardTitle className="text-xl">Semester {semester}</CardTitle>
                              <Badge className="bg-blue-100 text-blue-700 border-blue-200">
                                {curriculum.semesters[semester].reduce((total, subject) => total + subject.ects, 0)}{" "}
                                ECTS
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-3">
                              {curriculum.semesters[semester].map((subject, index) => (
                                <li key={index} className="flex justify-between items-start">
                                  <div className="flex-1">
                                    <p className="text-slate-800">{subject.subject}</p>
                                  </div>
                                  <Badge variant="outline" className="ml-2 whitespace-nowrap">
                                    {subject.ects} ECTS
                                  </Badge>
                                </li>
                              ))}
                            </ul>
                          </CardContent>
                        </Card>
                      ))}
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </main>
  )
}
