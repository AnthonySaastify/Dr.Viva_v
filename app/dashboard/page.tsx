"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Calendar, Clock, BookOpen, Brain, CheckSquare, Settings, Lock, TrendingUp, Award } from "lucide-react"
import Link from "next/link"
import Header from "@/components/header"
import LoadingSpinner from "@/components/loading-spinner"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/components/ui/use-toast"
import { getLoggedInUser, logoutUser } from "@/lib/auth"
// demo
export default function Dashboard() {
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState("overview")
  const { user, isLoading: authLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    const user = getLoggedInUser()
    if (!user) {
      router.replace("/login")
    }
  }, [router])

  useEffect(() => {
    // If user is not logged in, redirect to sign in page
    if (!authLoading && !user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to access your dashboard.",
        variant: "default",
      })
      router.push("/sign-in")
    }

    // Simulate loading data
    const timer = setTimeout(() => {
      setIsLoading(false)
    }, 1500)

    return () => clearTimeout(timer)
  }, [user, authLoading, router, toast])

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

  // Mock user data
  const userData = {
    progress: {
      overall: 68,
      subjects: [
        { name: "Anatomy", progress: 75 },
        { name: "Physiology", progress: 60 },
        { name: "Biochemistry", progress: 45 },
        { name: "Pathology", progress: 80 },
      ],
      streak: 12,
      hoursStudied: 128,
      tasksCompleted: 42,
    },
    upcomingTasks: [
      { id: 1, title: "Complete Anatomy Assignment", dueDate: "Today", priority: "High" },
      { id: 2, title: "Review Physiology Notes", dueDate: "Tomorrow", priority: "Medium" },
      { id: 3, title: "Prepare for Biochemistry Quiz", dueDate: "In 2 days", priority: "High" },
    ],
    recentActivity: [
      { id: 1, type: "completed", subject: "Anatomy", action: "Completed chapter 5", time: "2 hours ago" },
      { id: 2, type: "started", subject: "Physiology", action: "Started new module", time: "Yesterday" },
      { id: 3, type: "achievement", subject: "", action: "Earned 'Consistent Learner' badge", time: "2 days ago" },
    ],
    recommendations: [
      { id: 1, title: "Gray's Anatomy for Students", type: "Book", image: "/placeholder.svg?height=80&width=60" },
      { id: 2, title: "Cardiovascular System Explained", type: "Video", image: "/placeholder.svg?height=80&width=60" },
      { id: 3, title: "Biochemistry Practice Quiz", type: "Practice", image: "/placeholder.svg?height=80&width=60" },
    ],
  }

  const handleLogout = () => {
    logoutUser()
    router.replace("/login")
  }

  if (isLoading || authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <LoadingSpinner size="lg" text="Loading your dashboard..." />
      </div>
    )
  }

  return (
    <main className="min-h-screen bg-background pt-16">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-end p-4">
          <button onClick={handleLogout} className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition">Logout</button>
        </div>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col md:flex-row items-start gap-6 mb-8"
        >
          <div className="w-full md:w-1/4">
            <Card className="mb-6">
              <CardContent className="pt-6">
                <div className="flex flex-col items-center text-center">
                  <Avatar className="h-20 w-20 mb-4">
                    <AvatarImage src="/placeholder.svg" alt={user?.name} />
                    <AvatarFallback>{user?.name?.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <h2 className="text-xl font-bold text-foreground">{user?.name}</h2>
                  <p className="text-sm text-muted-foreground mb-2">{user?.email}</p>
                  <Badge
                    className={
                      user?.plan === "premium"
                        ? "bg-violet-100 text-violet-700 dark:bg-violet-900 dark:text-violet-300"
                        : user?.plan === "learn"
                          ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                          : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                    }
                  >
                    {user?.plan === "premium"
                      ? "Premium Plan"
                      : user?.plan === "learn"
                        ? "Learn Space Plan"
                        : "Free Plan"}
                  </Badge>

                  {user?.plan === "free" && (
                    <div className="mt-4 w-full">
                      <Button
                        className="w-full bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
                        asChild
                      >
                        <Link href="/pricing">Upgrade Plan</Link>
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">Quick Navigation</CardTitle>
              </CardHeader>
              <CardContent>
                <nav className="space-y-1">
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="/track-plan">
                      <CheckSquare className="mr-2 h-4 w-4" />
                      Track & Plan
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild disabled={user?.plan === "free"}>
                    <Link href={user?.plan !== "free" ? "/learn-space" : "#"}>
                      {user?.plan === "free" && <Lock className="mr-2 h-4 w-4" />}
                      {user?.plan !== "free" && <BookOpen className="mr-2 h-4 w-4" />}
                      Learn Space
                      {user?.plan === "free" && (
                        <Badge className="ml-auto" variant="outline">
                          $20
                        </Badge>
                      )}
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild disabled={user?.plan !== "premium"}>
                    <Link href={user?.plan === "premium" ? "/curriculum-hub" : "#"}>
                      {user?.plan !== "premium" && <Lock className="mr-2 h-4 w-4" />}
                      {user?.plan === "premium" && <Brain className="mr-2 h-4 w-4" />}
                      Curriculum Hub
                      {user?.plan !== "premium" && (
                        <Badge className="ml-auto" variant="outline">
                          $40
                        </Badge>
                      )}
                    </Link>
                  </Button>
                  <Button variant="ghost" className="w-full justify-start" asChild>
                    <Link href="/settings">
                      <Settings className="mr-2 h-4 w-4" />
                      Settings
                    </Link>
                  </Button>
                </nav>
              </CardContent>
            </Card>
          </div>

          <div className="w-full md:w-3/4">
            <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab} className="mb-8">
              <TabsList className="mb-6">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="progress">Progress</TabsTrigger>
                <TabsTrigger value="tasks">Tasks</TabsTrigger>
                <TabsTrigger value="resources">Resources</TabsTrigger>
              </TabsList>

              <TabsContent value="overview">
                <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
                  <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center">
                          <div className="p-2 rounded-full bg-blue-100 dark:bg-blue-900 mr-4">
                            <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Study Streak</p>
                            <h3 className="text-2xl font-bold text-foreground">{userData.progress.streak} days</h3>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center">
                          <div className="p-2 rounded-full bg-teal-100 dark:bg-teal-900 mr-4">
                            <Clock className="h-6 w-6 text-teal-600 dark:text-teal-400" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Hours Studied</p>
                            <h3 className="text-2xl font-bold text-foreground">{userData.progress.hoursStudied}</h3>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card>
                      <CardContent className="pt-6">
                        <div className="flex items-center">
                          <div className="p-2 rounded-full bg-violet-100 dark:bg-violet-900 mr-4">
                            <CheckSquare className="h-6 w-6 text-violet-600 dark:text-violet-400" />
                          </div>
                          <div>
                            <p className="text-sm text-muted-foreground">Tasks Completed</p>
                            <h3 className="text-2xl font-bold text-foreground">{userData.progress.tasksCompleted}</h3>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div variants={itemVariants}>
                    <Card>
                      <CardHeader>
                        <CardTitle>Overall Progress</CardTitle>
                        <CardDescription>Your semester progress across all subjects</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="mb-4">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium">Semester Completion</span>
                            <span className="text-sm font-medium">{userData.progress.overall}%</span>
                          </div>
                          <Progress value={userData.progress.overall} className="h-2" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          {userData.progress.subjects.map((subject, index) => (
                            <div key={index}>
                              <div className="flex justify-between mb-1">
                                <span className="text-sm font-medium">{subject.name}</span>
                                <span className="text-sm font-medium">{subject.progress}%</span>
                              </div>
                              <Progress value={subject.progress} className="h-2" />
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <Card>
                      <CardHeader>
                        <CardTitle>Upcoming Tasks</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {userData.upcomingTasks.map((task) => (
                            <div key={task.id} className="flex items-start">
                              <div
                                className={`p-2 rounded-full mr-3 flex-shrink-0 ${
                                  task.priority === "High"
                                    ? "bg-red-100 dark:bg-red-900"
                                    : task.priority === "Medium"
                                      ? "bg-amber-100 dark:bg-amber-900"
                                      : "bg-green-100 dark:bg-green-900"
                                }`}
                              >
                                <CheckSquare
                                  className={`h-4 w-4 ${
                                    task.priority === "High"
                                      ? "text-red-600 dark:text-red-400"
                                      : task.priority === "Medium"
                                        ? "text-amber-600 dark:text-amber-400"
                                        : "text-green-600 dark:text-green-400"
                                  }`}
                                />
                              </div>
                              <div className="flex-1">
                                <h4 className="text-sm font-medium text-foreground">{task.title}</h4>
                                <p className="text-xs text-muted-foreground">{task.dueDate}</p>
                              </div>
                              <Badge
                                variant={task.priority === "High" ? "destructive" : "secondary"}
                                className="text-xs"
                              >
                                {task.priority}
                              </Badge>
                            </div>
                          ))}
                        </div>
                        <Button className="w-full mt-4" variant="outline" asChild>
                          <Link href="/track-plan">View All Tasks</Link>
                        </Button>
                      </CardContent>
                    </Card>

                    <Card>
                      <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {userData.recentActivity.map((activity) => (
                            <div key={activity.id} className="flex items-start">
                              <div
                                className={`p-2 rounded-full mr-3 flex-shrink-0 ${
                                  activity.type === "completed"
                                    ? "bg-green-100 dark:bg-green-900"
                                    : activity.type === "started"
                                      ? "bg-blue-100 dark:bg-blue-900"
                                      : "bg-violet-100 dark:bg-violet-900"
                                }`}
                              >
                                {activity.type === "completed" && (
                                  <CheckSquare className="h-4 w-4 text-green-600 dark:text-green-400" />
                                )}
                                {activity.type === "started" && (
                                  <BookOpen className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                                )}
                                {activity.type === "achievement" && (
                                  <Award className="h-4 w-4 text-violet-600 dark:text-violet-400" />
                                )}
                              </div>
                              <div className="flex-1">
                                <h4 className="text-sm font-medium text-foreground">{activity.action}</h4>
                                {activity.subject && (
                                  <p className="text-xs text-muted-foreground">{activity.subject}</p>
                                )}
                                <p className="text-xs text-muted-foreground">{activity.time}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              </TabsContent>

              <TabsContent value="progress">
                <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
                  <motion.div variants={itemVariants}>
                    <Card>
                      <CardHeader>
                        <CardTitle>Detailed Progress Analytics</CardTitle>
                        <CardDescription>Track your learning journey across all subjects</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-6">
                          {userData.progress.subjects.map((subject, index) => (
                            <div key={index} className="space-y-2">
                              <div className="flex justify-between items-center">
                                <h4 className="text-sm font-medium">{subject.name}</h4>
                                <div className="flex items-center gap-2">
                                  <TrendingUp className="h-4 w-4 text-green-600" />
                                  <span className="text-sm font-medium">{subject.progress}%</span>
                                </div>
                              </div>
                              <Progress value={subject.progress} className="h-3" />
                              <div className="flex justify-between text-xs text-muted-foreground">
                                <span>Started 2 weeks ago</span>
                                <span>{Math.round((subject.progress / 100) * 40)} / 40 chapters</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              </TabsContent>

              <TabsContent value="tasks">
                <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
                  <motion.div variants={itemVariants}>
                    <Card>
                      <CardHeader>
                        <CardTitle>Task Management</CardTitle>
                        <CardDescription>Organize and track your study tasks</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-4">
                          {userData.upcomingTasks.map((task) => (
                            <div key={task.id} className="flex items-center justify-between p-4 border rounded-lg">
                              <div className="flex items-center gap-3">
                                <CheckSquare className="h-5 w-5 text-muted-foreground" />
                                <div>
                                  <h4 className="font-medium">{task.title}</h4>
                                  <p className="text-sm text-muted-foreground">Due: {task.dueDate}</p>
                                </div>
                              </div>
                              <Badge variant={task.priority === "High" ? "destructive" : "secondary"}>
                                {task.priority}
                              </Badge>
                            </div>
                          ))}
                        </div>
                        <Button className="w-full mt-4" asChild>
                          <Link href="/track-plan">Manage All Tasks</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              </TabsContent>

              <TabsContent value="resources">
                <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
                  <motion.div variants={itemVariants}>
                    <Card>
                      <CardHeader>
                        <CardTitle>Recommended Resources</CardTitle>
                        <CardDescription>Personalized learning materials based on your progress</CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                          {userData.recommendations.map((resource) => (
                            <div key={resource.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                              <div className="aspect-[3/4] bg-muted rounded-md mb-3 flex items-center justify-center">
                                <BookOpen className="h-8 w-8 text-muted-foreground" />
                              </div>
                              <h4 className="font-medium text-sm mb-1">{resource.title}</h4>
                              <Badge variant="outline" className="text-xs">
                                {resource.type}
                              </Badge>
                            </div>
                          ))}
                        </div>
                        <Button className="w-full mt-4" variant="outline" asChild>
                          <Link href="/learn-space">Explore All Resources</Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.div>
                </motion.div>
              </TabsContent>
            </Tabs>
          </div>
        </motion.div>
      </div>
    </main>
  )
}
