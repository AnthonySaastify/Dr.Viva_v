"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ArrowLeft, Search, Filter, BookOpen, Video, FileText, Star, BookMarked, Lock } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import Header from "@/components/header"
import Footer from "@/components/footer"
import LoadingSpinner from "@/components/loading-spinner"
import googleDriveService, { SUBJECT_FOLDER_MAP, DriveFile } from "@/services/googleDriveService"

export default function LearnSpace() {
  const [activeTab, setActiveTab] = useState("books")
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [userPlan, setUserPlan] = useState("free")
  const [selectedContent, setSelectedContent] = useState<any>(null)
  const [showUpgradeDialog, setShowUpgradeDialog] = useState(false)
  const [driveBooks, setDriveBooks] = useState<{ [subject: string]: DriveFile[] }>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    async function fetchAllSubjectBooks() {
      setLoading(true)
      setError(null)
      try {
        await googleDriveService.initGapi()
        if (!googleDriveService.isSignedIn()) {
          await googleDriveService.signIn()
        }
        const allBooks: { [subject: string]: DriveFile[] } = {}
        for (const [subject, folderId] of Object.entries(SUBJECT_FOLDER_MAP)) {
          const files = await googleDriveService.listDriveFiles(`'${folderId}' in parents and mimeType='application/pdf'`)
          allBooks[subject] = files
        }
        setDriveBooks(allBooks)
      } catch (e) {
        setError("Failed to load DataBase books. Please check your authentication and folder setup.")
      }
      setLoading(false)
    }
    fetchAllSubjectBooks()
  }, [])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
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

  const books = [
    {
      id: 1,
      title: "Gray's Anatomy for Students",
      author: "Richard Drake, A. Wayne Vogl, Adam Mitchell",
      description: "A comprehensive anatomy textbook with clear illustrations and clinical correlations.",
      rating: 4.8,
      category: "Anatomy",
      level: "Beginner",
      image: "/images/books/grays-anatomy.jpg",
      popular: true,
    },
    {
      id: 2,
      title: "Guyton and Hall Textbook of Medical Physiology",
      author: "John E. Hall",
      description: "The leading physiology textbook that provides a comprehensive understanding of human physiology.",
      rating: 4.7,
      category: "Physiology",
      level: "Intermediate",
      image: "/images/books/guyton-hall.jpg",
      popular: true,
    },
  ]

  const videos = [
    {
      id: 1,
      title: "Complete Anatomy Course: Digestive System",
      creator: "Dr. Najeeb Lectures",
      description: "Comprehensive explanation of the digestive system anatomy and physiology.",
      rating: 4.9,
      duration: "3h 45m",
      category: "Anatomy",
      level: "Intermediate",
      image: "/images/videos/digestive-system.jpg",
      popular: true,
    },
    {
      id: 2,
      title: "Cardiovascular System Explained",
      creator: "Osmosis",
      description: "Clear and concise explanation of the cardiovascular system with animations.",
      rating: 4.8,
      duration: "2h 20m",
      category: "Physiology",
      level: "Beginner",
      image: "/images/videos/cardiovascular-system.jpg",
      popular: true,
    },
  ]

  const practiceResources = [
    {
      id: 1,
      title: "Anatomy Quiz Bank",
      provider: "Lecturio",
      description: "Over 2,000 practice questions covering all aspects of human anatomy.",
      rating: 4.7,
      questions: 2000,
      category: "Anatomy",
      level: "All Levels",
      image: "/images/practice/anatomy-quiz.jpg",
      popular: true,
    },
    {
      id: 2,
      title: "Physiology Practice Tests",
      provider: "Boards and Beyond",
      description: "Comprehensive practice tests with detailed explanations for each answer.",
      rating: 4.8,
      questions: 1500,
      category: "Physiology",
      level: "Intermediate",
      image: "/images/practice/physiology-tests.jpg",
      popular: true,
    },
  ]

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredVideos = videos.filter(
    (video) =>
      video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.creator.toLowerCase().includes(searchQuery.toLowerCase()) ||
      video.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const filteredPractice = practiceResources.filter(
    (resource) =>
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.provider.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleReadClick = (content: any, contentType: string) => {
    if (userPlan === "free" && contentType !== "books") {
      setShowUpgradeDialog(true)
      return
    }
    setSelectedContent(content)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <LoadingSpinner size="lg" text="Loading learning resources..." />
      </div>
    )
  }

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
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Learn Space</h1>
            <p className="text-lg text-muted-foreground mb-6">
              Access all your learning resources in one convenient place
            </p>
          </motion.div>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search resources..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" className="flex items-center gap-2">
            <Filter className="h-4 w-4" /> Filters
          </Button>
        </div>

        {userPlan === "free" && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mb-6"
          >
            <Card className="bg-blue-50 dark:bg-blue-950 border-blue-200 dark:border-blue-800">
              <CardContent className="p-4 flex flex-col md:flex-row items-center justify-between">
                <div className="flex items-center mb-4 md:mb-0">
                  <Lock className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                  <p className="text-blue-700 dark:text-blue-300">
                    <span className="font-medium">Free Plan:</span> You have access to book previews only. Upgrade to
                    access videos and practice resources.
                  </p>
                </div>
                <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800" asChild>
                  <Link href="/pricing">Upgrade Now</Link>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}

        <Tabs defaultValue="books" value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="books">DataBase Books</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="practice">Practice</TabsTrigger>
            <TabsTrigger value="saved">Saved</TabsTrigger>
          </TabsList>

          <TabsContent value="books">
            <DriveBooks />
          </TabsContent>

          <TabsContent value="videos">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {filteredVideos.length > 0 ? (
                filteredVideos.map((video) => (
                  <motion.div
                    key={video.id}
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Card className="h-full flex flex-col">
                      <div className="flex p-4 h-full">
                        <div className="flex-shrink-0 mr-4">
                          <div className="relative">
                            <Image
                              src={video.image || "/placeholder.svg"}
                              alt={video.title}
                              width={150}
                              height={100}
                              className="object-cover rounded-md"
                            />
                            <div className="absolute bottom-2 right-2 bg-black bg-opacity-70 text-white text-xs px-2 py-1 rounded">
                              {video.duration}
                            </div>
                            {userPlan === "free" && (
                              <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-md">
                                <Lock className="h-8 w-8 text-white" />
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex-1 flex flex-col">
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="font-semibold text-foreground">{video.title}</h3>
                              {video.popular && (
                                <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                                  Popular
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">by {video.creator}</p>
                            <p className="text-sm text-muted-foreground mb-3">{video.description}</p>
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline">{video.category}</Badge>
                              <Badge variant="outline">{video.level}</Badge>
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-500 mr-1" />
                              <span className="text-sm font-medium">{video.rating}</span>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <BookMarked className="h-4 w-4 mr-1" /> Save
                              </Button>
                              <Button
                                size="sm"
                                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
                                onClick={() => handleReadClick(video, "videos")}
                              >
                                <Video className="h-4 w-4 mr-1" /> Watch
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))
              ) : (
                <motion.div variants={itemVariants} className="md:col-span-2 text-center py-8">
                  <p className="text-muted-foreground">No videos found matching your search criteria.</p>
                </motion.div>
              )}
            </motion.div>
          </TabsContent>

          <TabsContent value="practice">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {filteredPractice.length > 0 ? (
                filteredPractice.map((resource) => (
                  <motion.div
                    key={resource.id}
                    variants={itemVariants}
                    whileHover={{ y: -5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <Card className="h-full flex flex-col">
                      <div className="flex p-4 h-full">
                        <div className="flex-shrink-0 mr-4">
                          <div className="relative">
                            <Image
                              src={resource.image || "/placeholder.svg"}
                              alt={resource.title}
                              width={150}
                              height={100}
                              className="object-cover rounded-md"
                            />
                            {userPlan === "free" && (
                              <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-md">
                                <Lock className="h-8 w-8 text-white" />
                              </div>
                            )}
                          </div>
                        </div>
                        <div className="flex-1 flex flex-col">
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                              <h3 className="font-semibold text-foreground">{resource.title}</h3>
                              {resource.popular && (
                                <Badge className="bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300">
                                  Popular
                                </Badge>
                              )}
                            </div>
                            <p className="text-sm text-muted-foreground mb-2">by {resource.provider}</p>
                            <p className="text-sm text-muted-foreground mb-3">{resource.description}</p>
                            <div className="flex items-center gap-2 mb-2">
                              <Badge variant="outline">{resource.category}</Badge>
                              <Badge variant="outline">{resource.level}</Badge>
                              <Badge variant="outline">{resource.questions} Questions</Badge>
                            </div>
                          </div>
                          <div className="flex items-center justify-between mt-2">
                            <div className="flex items-center">
                              <Star className="h-4 w-4 text-yellow-500 mr-1" />
                              <span className="text-sm font-medium">{resource.rating}</span>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline">
                                <BookMarked className="h-4 w-4 mr-1" /> Save
                              </Button>
                              <Button
                                size="sm"
                                className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
                                onClick={() => handleReadClick(resource, "practice")}
                              >
                                <FileText className="h-4 w-4 mr-1" /> Practice
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))
              ) : (
                <motion.div variants={itemVariants} className="md:col-span-2 text-center py-8">
                  <p className="text-muted-foreground">No practice resources found matching your search criteria.</p>
                </motion.div>
              )}
            </motion.div>
          </TabsContent>

          <TabsContent value="saved">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-3 gap-6"
            >
              <motion.div variants={itemVariants} className="md:col-span-3">
                <Card className="border-dashed border-2">
                  <CardContent className="flex flex-col items-center justify-center py-12">
                    <BookMarked className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-xl font-medium text-foreground mb-2">No saved resources yet</h3>
                    <p className="text-muted-foreground text-center mb-6 max-w-md">
                      Save books, videos, and practice resources to access them quickly later.
                    </p>
                    <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800">
                      Browse Resources
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={showUpgradeDialog} onOpenChange={setShowUpgradeDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Upgrade Required</DialogTitle>
            <DialogDescription>This content is only available with a paid subscription.</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900">
                <Lock className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-medium">Learn Space Plan</h3>
                <p className="text-sm text-muted-foreground">Access all books, videos, and practice resources</p>
              </div>
              <Badge className="ml-auto">$20/mo</Badge>
            </div>
            <div className="flex items-center gap-4">
              <div className="p-2 rounded-full bg-violet-100 dark:bg-violet-900">
                <Lock className="h-6 w-6 text-violet-600 dark:text-violet-400" />
              </div>
              <div>
                <h3 className="font-medium">Premium Plan</h3>
                <p className="text-sm text-muted-foreground">Full access to all features including Curriculum Hub</p>
              </div>
              <Badge className="ml-auto">$40/mo</Badge>
            </div>
          </div>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setShowUpgradeDialog(false)}>
              Cancel
            </Button>
            <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800" asChild>
              <Link href="/pricing">View Plans</Link>
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Footer />
    </main>
  )
}

function DriveBooks() {
  const [driveBooks, setDriveBooks] = useState<{ [subject: string]: DriveFile[] }>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchAllSubjectBooks() {
      setLoading(true)
      setError(null)
      try {
        await googleDriveService.initGapi()
        if (!googleDriveService.isSignedIn()) {
          await googleDriveService.signIn()
        }
        const allBooks: { [subject: string]: DriveFile[] } = {}
        for (const [subject, folderId] of Object.entries(SUBJECT_FOLDER_MAP)) {
          const files = await googleDriveService.listDriveFiles(`'${folderId}' in parents and mimeType='application/pdf'`)
          allBooks[subject] = files
        }
        setDriveBooks(allBooks)
      } catch (e) {
        setError("Failed to load DataBase books. Please check your authentication and folder setup.")
      }
      setLoading(false)
    }
    fetchAllSubjectBooks()
  }, [])

  if (loading) return <div className="py-12 text-center text-muted-foreground">Loading DataBase books...</div>
  if (error) return <div className="py-12 text-center text-red-500">{error}</div>

  return (
    <div className="space-y-8">
      {Object.entries(driveBooks).map(([subject, files]) => (
        <div key={subject}>
          <h2 className="text-xl font-bold mb-4">{subject}</h2>
          {files.length === 0 ? (
            <div className="text-muted-foreground mb-8">No PDFs found in this folder.</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              {files.map((file) => (
                <div key={file.id} className="bg-white rounded shadow p-4 flex flex-col items-center">
                  <BookOpen className="h-12 w-12 text-blue-600 mb-2" />
                  <div className="font-semibold text-center mb-2 line-clamp-2">{file.name}</div>
                  <a
                    href={`https://drive.google.com/file/d/${file.id}/view`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
                  >
                    Read
                  </a>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
