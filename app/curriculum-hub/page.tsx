"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { ArrowLeft, Search, Download, Calendar, BookOpen, Clock } from "lucide-react"
import Link from "next/link"
import Footer from "@/components/footer"
import LoadingSpinner from "@/components/loading-spinner"

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

export default function CurriculumHub() {
  const [curriculum, setCurriculum] = useState<Curriculum | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedSemester, setSelectedSemester] = useState("all")

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
          <h2 className="text-2xl font-bold text-foreground mb-4">Failed to load curriculum data</h2>
          <p className="text-muted-foreground mb-6">Please try again later</p>
          <Link href="/">
            <Button>Return to Home</Button>
          </Link>
        </div>
      </div>
    )
  }

  const semesterKeys = Object.keys(curriculum.semesters)
  const years = Math.ceil(semesterKeys.length / 2)

  // Filter subjects based on search query and selected semester
  const allSubjects = Object.entries(curriculum.semesters).flatMap(([semester, subjects]) =>
    subjects.map((subject) => ({
      ...subject,
      semester,
    })),
  )

  const filteredSubjects = allSubjects.filter((subject) => {
    const matchesSearch = subject.subject.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesSemester = selectedSemester === "all" || subject.semester === selectedSemester
    return matchesSearch && matchesSemester
  })

  // Calculate total ECTS by semester
  const semesterECTS = Object.entries(curriculum.semesters).reduce(
    (acc, [semester, subjects]) => {
      acc[semester] = subjects.reduce((sum, subject) => sum + subject.ects, 0)
      return acc
    },
    {} as Record<string, number>,
  )

  return (
    <main className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/">
            <Button variant="outline" size="sm" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Home
            </Button>
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Curriculum Hub</h1>
            <p className="text-lg text-muted-foreground mb-6">
              Explore your complete curriculum at {curriculum.college}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
                      <BookOpen className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{curriculum.programme}</h3>
                      <p className="text-sm text-muted-foreground">Degree Programme</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-teal-100 dark:bg-teal-900">
                      <Clock className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{curriculum.duration_years} Years</h3>
                      <p className="text-sm text-muted-foreground">Programme Duration</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-violet-100 dark:bg-violet-900">
                      <Calendar className="h-6 w-6 text-violet-600 dark:text-violet-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{curriculum.total_ects} ECTS</h3>
                      <p className="text-sm text-muted-foreground">Total Credits</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>

        <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="subjects">Subjects</TabsTrigger>
            <TabsTrigger value="timeline">Timeline</TabsTrigger>
          </TabsList>

          <TabsContent value="overview">
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
                        <Badge className="bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-800">
                          {semesterECTS[semester]} ECTS
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3">
                        {curriculum.semesters[semester].map((subject, index) => (
                          <li key={index} className="flex justify-between items-start">
                            <div className="flex-1">
                              <p className="text-foreground">{subject.subject}</p>
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

          <TabsContent value="subjects">
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
              <motion.div variants={itemVariants}>
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                    <Input
                      placeholder="Search subjects..."
                      className="pl-10"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                  </div>
                  <div className="w-full md:w-64">
                    <Select value={selectedSemester} onValueChange={setSelectedSemester}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select semester" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Semesters</SelectItem>
                        {semesterKeys.map((semester) => (
                          <SelectItem key={semester} value={semester}>
                            Semester {semester}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <Button variant="outline" className="flex items-center gap-2">
                    <Download className="h-4 w-4" /> Export
                  </Button>
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <CardTitle>Subject List</CardTitle>
                    <CardDescription>
                      {filteredSubjects.length} subject{filteredSubjects.length !== 1 ? "s" : ""} found
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="divide-y divide-border">
                      {filteredSubjects.length > 0 ? (
                        filteredSubjects.map((subject, index) => (
                          <div key={index} className="py-4 flex justify-between items-start">
                            <div>
                              <h3 className="font-medium text-foreground">{subject.subject}</h3>
                              <p className="text-sm text-muted-foreground mt-1">Semester {subject.semester}</p>
                            </div>
                            <Badge variant="outline">{subject.ects} ECTS</Badge>
                          </div>
                        ))
                      ) : (
                        <div className="py-8 text-center">
                          <p className="text-muted-foreground">No subjects found matching your criteria.</p>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </TabsContent>

          <TabsContent value="timeline">
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-8">
              {Array.from({ length: years }, (_, i) => i + 1).map((year) => (
                <motion.div key={year} variants={itemVariants}>
                  <h2 className="text-2xl font-bold text-foreground mb-4">Year {year}</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {semesterKeys
                      .filter((_, index) => Math.floor(index / 2) + 1 === year)
                      .map((semester) => (
                        <Card key={semester} className="h-full">
                          <CardHeader className="pb-3">
                            <div className="flex justify-between items-center">
                              <CardTitle className="text-xl">Semester {semester}</CardTitle>
                              <Badge className="bg-blue-100 text-blue-700 border-blue-200 dark:bg-blue-900 dark:text-blue-300 dark:border-blue-800">
                                {semesterECTS[semester]} ECTS
                              </Badge>
                            </div>
                          </CardHeader>
                          <CardContent>
                            <ul className="space-y-3">
                              {curriculum.semesters[semester].map((subject, index) => (
                                <li key={index} className="flex justify-between items-start">
                                  <div className="flex-1">
                                    <p className="text-foreground">{subject.subject}</p>
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
