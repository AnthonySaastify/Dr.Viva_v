"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Globe, BookOpen, Calendar, Clock, CheckCircle2, FileText, ExternalLink } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import Header from "@/components/header"

export default function NextStep() {
  const [activeTab, setActiveTab] = useState("usmle")

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

  // Mock data for USMLE
  const usmleSteps = [
    {
      id: 1,
      title: "USMLE Step 1",
      description: "Tests basic science knowledge and its application to medicine",
      duration: "8 hours",
      questions: "280 questions",
      passingScore: "196 (3-digit score)",
      eligibility: "After completing basic science curriculum",
      resources: ["First Aid for the USMLE Step 1", "UWorld Question Bank", "Boards and Beyond", "Pathoma"],
      tips: [
        "Start preparing 6-8 months in advance",
        "Focus on high-yield topics",
        "Take regular practice tests",
        "Use spaced repetition for memorization",
      ],
    },
    {
      id: 2,
      title: "USMLE Step 2 CK",
      description: "Tests clinical knowledge and application",
      duration: "9 hours",
      questions: "318 questions",
      passingScore: "209 (3-digit score)",
      eligibility: "After completing clinical clerkships",
      resources: ["UWorld Step 2 CK Question Bank", "First Aid for the USMLE Step 2 CK", "Online MedEd", "Amboss"],
      tips: [
        "Build on Step 1 knowledge",
        "Focus on patient management",
        "Practice clinical vignettes",
        "Review high-yield clinical topics",
      ],
    },
    {
      id: 3,
      title: "USMLE Step 3",
      description: "Tests readiness for unsupervised practice",
      duration: "2 days (7 hours + 9 hours)",
      questions: "Multiple-choice questions and case simulations",
      passingScore: "198 (3-digit score)",
      eligibility: "After earning MD degree and passing Step 1 and Step 2 CK",
      resources: [
        "UWorld Step 3 Question Bank",
        "First Aid for the USMLE Step 3",
        "Master the Boards Step 3",
        "CCS Case Simulator",
      ],
      tips: [
        "Focus on patient management",
        "Practice CCS cases extensively",
        "Review common outpatient scenarios",
        "Study biostatistics and epidemiology",
      ],
    },
  ]

  // Mock data for PLAB
  const plabSteps = [
    {
      id: 1,
      title: "PLAB 1",
      description: "Tests theoretical medical knowledge through multiple-choice questions",
      duration: "3 hours",
      questions: "180 questions",
      passingScore: "Varies by exam (typically around 120-130 marks)",
      eligibility: "Medical degree recognized by GMC and IELTS/OET score",
      resources: ["PLAB 1 - 1700 EMQs", "Plabable Question Bank", "Samson Notes", "PLAB 1 Flashcards"],
      tips: [
        "Focus on common conditions in the UK",
        "Study the NICE guidelines",
        "Practice time management",
        "Join study groups for discussion",
      ],
    },
    {
      id: 2,
      title: "PLAB 2",
      description: "Objective structured clinical examination (OSCE) with 16 stations",
      duration: "3 hours 30 minutes",
      format: "16 OSCE stations (each 8 minutes)",
      passingScore: "Varies by exam",
      eligibility: "Pass PLAB 1 within last 2 years",
      resources: [
        "PLAB 2 Recalled Stations",
        "PLAB 2 Made Easy",
        "Clinical Skills for PLAB",
        "Communication Skills for PLAB 2",
      ],
      tips: [
        "Practice with a partner or group",
        "Focus on communication skills",
        "Learn the UK medical ethics principles",
        "Familiarize yourself with UK healthcare system",
      ],
    },
  ]

  // Mock data for other exams
  const otherExams = [
    {
      id: 1,
      title: "NEET-PG (India)",
      description: "National Eligibility cum Entrance Test for Postgraduate Medical Courses in India",
      format: "Multiple-choice questions",
      eligibility: "MBBS degree and completion of internship",
      resources: ["NEET-PG Prep", "Marrow", "PrepLadder", "DAMS"],
    },
    {
      id: 2,
      title: "AMC (Australia)",
      description: "Australian Medical Council examination for international medical graduates",
      format: "MCQ exam and clinical examination",
      eligibility: "Primary medical degree from a recognized institution",
      resources: ["AMC MCQ Examination Books", "AMC Clinical Examination Books", "AMC Question Banks"],
    },
    {
      id: 3,
      title: "MCCQE (Canada)",
      description: "Medical Council of Canada Qualifying Examination",
      format: "Part I (MCQ and clinical decision-making) and Part II (OSCE)",
      eligibility: "Medical degree from a recognized institution",
      resources: ["Toronto Notes", "CanadaQBank", "MCCQE Practice Tests"],
    },
  ]

  return (
    <main className="min-h-screen bg-background pt-20">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/">
            <Button variant="outline" size="sm" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Home
            </Button>
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Next Step</h1>
            <p className="text-lg text-muted-foreground mb-6">
              Prepare for international medical licensing exams and career advancement
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900">
                      <Globe className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">International Pathways</h3>
                      <p className="text-sm text-muted-foreground">Multiple licensing options</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-full bg-teal-100 dark:bg-teal-900">
                      <BookOpen className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">Comprehensive Resources</h3>
                      <p className="text-sm text-muted-foreground">Study guides and materials</p>
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
                      <h3 className="font-semibold text-foreground">Exam Timelines</h3>
                      <p className="text-sm text-muted-foreground">Planning and scheduling</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        </div>

        <Tabs defaultValue="usmle" value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="usmle">USMLE (USA)</TabsTrigger>
            <TabsTrigger value="plab">PLAB (UK)</TabsTrigger>
            <TabsTrigger value="other">Other Exams</TabsTrigger>
            <TabsTrigger value="resources">Resources</TabsTrigger>
          </TabsList>

          <TabsContent value="usmle">
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
              <motion.div variants={itemVariants}>
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>United States Medical Licensing Examination (USMLE)</CardTitle>
                    <CardDescription>
                      A three-step examination for medical licensure in the United States
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      The USMLE is a three-step examination sponsored by the Federation of State Medical Boards (FSMB)
                      and the National Board of Medical Examiners (NBME). It assesses a physician's ability to apply
                      knowledge, concepts, and principles, and to demonstrate fundamental patient-centered skills.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                        <h3 className="font-medium text-foreground mb-1">Step 1</h3>
                        <p className="text-sm text-muted-foreground">Basic Science Foundations</p>
                      </div>
                      <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                        <h3 className="font-medium text-foreground mb-1">Step 2 CK</h3>
                        <p className="text-sm text-muted-foreground">Clinical Knowledge</p>
                      </div>
                      <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                        <h3 className="font-medium text-foreground mb-1">Step 3</h3>
                        <p className="text-sm text-muted-foreground">Advanced Clinical Medicine</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {usmleSteps.map((step) => (
                <motion.div key={step.id} variants={itemVariants}>
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle>{step.title}</CardTitle>
                      <CardDescription>{step.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-lg font-medium text-foreground mb-3">Exam Details</h3>
                          <ul className="space-y-2">
                            <li className="flex items-start">
                              <Clock className="h-4 w-4 text-muted-foreground mr-2 mt-1" />
                              <span className="text-muted-foreground">
                                <span className="font-medium text-foreground">Duration:</span> {step.duration}
                              </span>
                            </li>
                            <li className="flex items-start">
                              <FileText className="h-4 w-4 text-muted-foreground mr-2 mt-1" />
                              <span className="text-muted-foreground">
                                <span className="font-medium text-foreground">Format:</span> {step.questions}
                              </span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle2 className="h-4 w-4 text-muted-foreground mr-2 mt-1" />
                              <span className="text-muted-foreground">
                                <span className="font-medium text-foreground">Passing Score:</span> {step.passingScore}
                              </span>
                            </li>
                            <li className="flex items-start">
                              <Calendar className="h-4 w-4 text-muted-foreground mr-2 mt-1" />
                              <span className="text-muted-foreground">
                                <span className="font-medium text-foreground">Eligibility:</span> {step.eligibility}
                              </span>
                            </li>
                          </ul>

                          <h3 className="text-lg font-medium text-foreground mt-6 mb-3">Study Tips</h3>
                          <ul className="space-y-2">
                            {step.tips.map((tip, index) => (
                              <li key={index} className="flex items-start">
                                <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                                <span className="text-muted-foreground">{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h3 className="text-lg font-medium text-foreground mb-3">Recommended Resources</h3>
                          <ul className="space-y-2">
                            {step.resources.map((resource, index) => (
                              <li key={index} className="flex items-start">
                                <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                                <span className="text-muted-foreground">{resource}</span>
                              </li>
                            ))}
                          </ul>

                          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                            <h4 className="font-medium text-foreground mb-2">Timeline Recommendation</h4>
                            <p className="text-sm text-muted-foreground">
                              {step.id === 1
                                ? "Begin preparation at least 6-8 months before your target exam date. Dedicate the first 4-5 months to content review and the remaining time to practice questions and self-assessment exams."
                                : step.id === 2
                                  ? "Start preparing 4-6 months before your target exam date. Use your clinical rotations as active learning opportunities and supplement with focused study."
                                  : "Begin preparation 3-4 months before your target exam date. Focus on clinical management and decision-making, with special attention to the CCS portion."}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800">
                        <ExternalLink className="h-4 w-4 mr-2" /> Visit Official USMLE Website
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="plab">
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
              <motion.div variants={itemVariants}>
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Professional and Linguistic Assessments Board (PLAB)</CardTitle>
                    <CardDescription>
                      The main route for international medical graduates to practice medicine in the UK
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      The PLAB test is the main route by which International Medical Graduates (IMGs) demonstrate that
                      they have the necessary skills and knowledge to practice medicine in the UK. It's administered by
                      the General Medical Council (GMC) and consists of two parts.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                        <h3 className="font-medium text-foreground mb-1">PLAB 1</h3>
                        <p className="text-sm text-muted-foreground">Written Examination</p>
                      </div>
                      <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                        <h3 className="font-medium text-foreground mb-1">PLAB 2</h3>
                        <p className="text-sm text-muted-foreground">
                          Objective Structured Clinical Examination (OSCE)
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>

              {plabSteps.map((step) => (
                <motion.div key={step.id} variants={itemVariants}>
                  <Card className="mb-6">
                    <CardHeader>
                      <CardTitle>{step.title}</CardTitle>
                      <CardDescription>{step.description}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h3 className="text-lg font-medium text-foreground mb-3">Exam Details</h3>
                          <ul className="space-y-2">
                            <li className="flex items-start">
                              <Clock className="h-4 w-4 text-muted-foreground mr-2 mt-1" />
                              <span className="text-muted-foreground">
                                <span className="font-medium text-foreground">Duration:</span> {step.duration}
                              </span>
                            </li>
                            <li className="flex items-start">
                              <FileText className="h-4 w-4 text-muted-foreground mr-2 mt-1" />
                              <span className="text-muted-foreground">
                                <span className="font-medium text-foreground">Format:</span>{" "}
                                {step.questions || step.format}
                              </span>
                            </li>
                            <li className="flex items-start">
                              <CheckCircle2 className="h-4 w-4 text-muted-foreground mr-2 mt-1" />
                              <span className="text-muted-foreground">
                                <span className="font-medium text-foreground">Passing Score:</span> {step.passingScore}
                              </span>
                            </li>
                            <li className="flex items-start">
                              <Calendar className="h-4 w-4 text-muted-foreground mr-2 mt-1" />
                              <span className="text-muted-foreground">
                                <span className="font-medium text-foreground">Eligibility:</span> {step.eligibility}
                              </span>
                            </li>
                          </ul>

                          <h3 className="text-lg font-medium text-foreground mt-6 mb-3">Study Tips</h3>
                          <ul className="space-y-2">
                            {step.tips.map((tip, index) => (
                              <li key={index} className="flex items-start">
                                <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                                <span className="text-muted-foreground">{tip}</span>
                              </li>
                            ))}
                          </ul>
                        </div>

                        <div>
                          <h3 className="text-lg font-medium text-foreground mb-3">Recommended Resources</h3>
                          <ul className="space-y-2">
                            {step.resources.map((resource, index) => (
                              <li key={index} className="flex items-start">
                                <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                                <span className="text-muted-foreground">{resource}</span>
                              </li>
                            ))}
                          </ul>

                          <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-950 rounded-lg">
                            <h4 className="font-medium text-foreground mb-2">Timeline Recommendation</h4>
                            <p className="text-sm text-muted-foreground">
                              {step.id === 1
                                ? "Prepare for 3-4 months before your exam date. Focus on understanding UK clinical guidelines and practice patterns, which may differ from your home country."
                                : "After passing PLAB 1, allow 2-3 months of focused preparation for PLAB 2. Consider joining a preparation course that offers mock OSCE practice."}
                            </p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800">
                        <ExternalLink className="h-4 w-4 mr-2" /> Visit Official GMC Website
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="other">
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
              <motion.div variants={itemVariants}>
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Other International Medical Licensing Exams</CardTitle>
                    <CardDescription>
                      Explore medical licensing pathways for different countries around the world
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Besides the USMLE and PLAB, there are several other medical licensing exams for international
                      medical graduates seeking to practice in different countries. Each has its own requirements,
                      format, and preparation strategies.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {otherExams.map((exam) => (
                    <Card key={exam.id} className="h-full">
                      <CardHeader>
                        <CardTitle>{exam.title}</CardTitle>
                        <CardDescription>{exam.description}</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          <div>
                            <h3 className="font-medium text-foreground mb-2">Format</h3>
                            <p className="text-sm text-muted-foreground">{exam.format}</p>
                          </div>
                          <div>
                            <h3 className="font-medium text-foreground mb-2">Eligibility</h3>
                            <p className="text-sm text-muted-foreground">{exam.eligibility}</p>
                          </div>
                          <div>
                            <h3 className="font-medium text-foreground mb-2">Resources</h3>
                            <ul className="space-y-1">
                              {exam.resources.map((resource, index) => (
                                <li key={index} className="text-sm text-muted-foreground flex items-start">
                                  <span className="text-blue-600 dark:text-blue-400 mr-2">•</span>
                                  {resource}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter>
                        <Button className="w-full">Learn More</Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <CardTitle>Comparison of International Pathways</CardTitle>
                    <CardDescription>Key differences between major licensing exams</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left py-3 px-4 font-medium text-foreground">Exam</th>
                            <th className="text-left py-3 px-4 font-medium text-foreground">Country</th>
                            <th className="text-left py-3 px-4 font-medium text-foreground">Difficulty</th>
                            <th className="text-left py-3 px-4 font-medium text-foreground">Cost</th>
                            <th className="text-left py-3 px-4 font-medium text-foreground">Time to Complete</th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-border">
                            <td className="py-3 px-4 text-foreground">USMLE</td>
                            <td className="py-3 px-4 text-muted-foreground">USA</td>
                            <td className="py-3 px-4 text-muted-foreground">High</td>
                            <td className="py-3 px-4 text-muted-foreground">$$$$ (Approx. $5,000 total)</td>
                            <td className="py-3 px-4 text-muted-foreground">1-2 years</td>
                          </tr>
                          <tr className="border-b border-border">
                            <td className="py-3 px-4 text-foreground">PLAB</td>
                            <td className="py-3 px-4 text-muted-foreground">UK</td>
                            <td className="py-3 px-4 text-muted-foreground">Moderate</td>
                            <td className="py-3 px-4 text-muted-foreground">$$ (Approx. $1,500 total)</td>
                            <td className="py-3 px-4 text-muted-foreground">6-12 months</td>
                          </tr>
                          <tr className="border-b border-border">
                            <td className="py-3 px-4 text-foreground">AMC</td>
                            <td className="py-3 px-4 text-muted-foreground">Australia</td>
                            <td className="py-3 px-4 text-muted-foreground">Moderate-High</td>
                            <td className="py-3 px-4 text-muted-foreground">$$$ (Approx. $3,000 total)</td>
                            <td className="py-3 px-4 text-muted-foreground">1-1.5 years</td>
                          </tr>
                          <tr className="border-b border-border">
                            <td className="py-3 px-4 text-foreground">MCCQE</td>
                            <td className="py-3 px-4 text-muted-foreground">Canada</td>
                            <td className="py-3 px-4 text-muted-foreground">High</td>
                            <td className="py-3 px-4 text-muted-foreground">$$$ (Approx. $2,500 total)</td>
                            <td className="py-3 px-4 text-muted-foreground">1-1.5 years</td>
                          </tr>
                          <tr>
                            <td className="py-3 px-4 text-foreground">NEET-PG</td>
                            <td className="py-3 px-4 text-muted-foreground">India</td>
                            <td className="py-3 px-4 text-muted-foreground">Very High</td>
                            <td className="py-3 px-4 text-muted-foreground">$ (Approx. $300)</td>
                            <td className="py-3 px-4 text-muted-foreground">6-12 months</td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </TabsContent>

          <TabsContent value="resources">
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
              <motion.div variants={itemVariants}>
                <Card className="mb-6">
                  <CardHeader>
                    <CardTitle>Study Resources and Materials</CardTitle>
                    <CardDescription>
                      Comprehensive collection of resources for international medical licensing exams
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">
                      Preparing for international medical licensing exams requires access to high-quality study
                      materials. Below is a curated list of resources for different exams, including books, question
                      banks, video courses, and more.
                    </p>
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h3 className="text-lg font-medium text-foreground mb-4">Books and Study Guides</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <Image
                            src="/placeholder.svg?height=100&width=80"
                            alt="First Aid for USMLE Step 1"
                            width={80}
                            height={100}
                            className="border border-border rounded-md"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">First Aid for the USMLE Step 1</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            The most comprehensive and widely-used review book for the USMLE Step 1 examination.
                          </p>
                          <div className="mt-2">
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="flex-shrink-0">
                          <Image
                            src="/placeholder.svg?height=100&width=80"
                            alt="Master the Boards USMLE Step 2 CK"
                            width={80}
                            height={100}
                            className="border border-border rounded-md"
                          />
                        </div>
                        <div>
                          <h4 className="font-medium text-foreground">Master the Boards USMLE Step 2 CK</h4>
                          <p className="text-sm text-muted-foreground mt-1">
                            Targeted review focusing on clinical knowledge and patient management.
                          </p>
                          <div className="mt-2">
                            <Button variant="outline" size="sm">
                              View Details
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <h3 className="text-lg font-medium text-foreground mb-4 mt-8">Online Question Banks</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>UWorld</CardTitle>
                      <CardDescription>Gold standard for USMLE preparation</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <span className="text-green-600 dark:text-green-400 mr-2">✓</span>
                          <span className="text-muted-foreground">Comprehensive question bank</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-600 dark:text-green-400 mr-2">✓</span>
                          <span className="text-muted-foreground">Detailed explanations</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-600 dark:text-green-400 mr-2">✓</span>
                          <span className="text-muted-foreground">Performance tracking</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-600 dark:text-green-400 mr-2">✓</span>
                          <span className="text-muted-foreground">Self-assessments</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Visit Website</Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Amboss</CardTitle>
                      <CardDescription>Integrated learning platform</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <span className="text-green-600 dark:text-green-400 mr-2">✓</span>
                          <span className="text-muted-foreground">Question bank</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-600 dark:text-green-400 mr-2">✓</span>
                          <span className="text-muted-foreground">Medical knowledge library</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-600 dark:text-green-400 mr-2">✓</span>
                          <span className="text-muted-foreground">Clinical case scenarios</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-600 dark:text-green-400 mr-2">✓</span>
                          <span className="text-muted-foreground">Customizable study plans</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Visit Website</Button>
                    </CardFooter>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Kaplan Qbank</CardTitle>
                      <CardDescription>Comprehensive test preparation</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        <li className="flex items-start">
                          <span className="text-green-600 dark:text-green-400 mr-2">✓</span>
                          <span className="text-muted-foreground">Extensive question bank</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-600 dark:text-green-400 mr-2">✓</span>
                          <span className="text-muted-foreground">Video lectures</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-600 dark:text-green-400 mr-2">✓</span>
                          <span className="text-muted-foreground">Practice tests</span>
                        </li>
                        <li className="flex items-start">
                          <span className="text-green-600 dark:text-green-400 mr-2">✓</span>
                          <span className="text-muted-foreground">Mobile app access</span>
                        </li>
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full">Visit Website</Button>
                    </CardFooter>
                  </Card>
                </div>
              </motion.div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>
    </main>
  )
}
