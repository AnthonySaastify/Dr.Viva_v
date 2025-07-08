"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Calendar, Clock, ArrowLeft, Plus, CalendarIcon, RefreshCw } from "lucide-react"
import Link from "next/link"
import Footer from "@/components/footer"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Calendar as CalendarUI } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { useToast } from "@/components/ui/use-toast"
import { createTaskAction, updateTaskStatusAction, fetchTasksAction } from "@/app/actions/task-actions"
import GoogleDriveModal from "@/components/GoogleDriveModal"
import type { DriveFile } from "../services/googleDriveService"

export default function TrackPlan() {
  const [activeTab, setActiveTab] = useState("progress")
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false)
  const [isSessionModalOpen, setIsSessionModalOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date())
  const [sheetTasks, setSheetTasks] = useState([])
  const [isLoadingTasks, setIsLoadingTasks] = useState(false)
  const [isDriveModalOpen, setIsDriveModalOpen] = useState(false)
  const [driveModalSubject, setDriveModalSubject] = useState<string | null>(null)
  const [sessionFiles, setSessionFiles] = useState<{ [key: string]: DriveFile }>({})
  const [selectedSessions, setSelectedSessions] = useState<{ day: string; sessionIndex: number }[]>([])
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false)

  const { toast } = useToast()

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

  // Mock data for progress tracking
  const [subjects, setSubjects] = useState([
    {
      name: "Anatomy & Histology",
      progress: 75,
      totalHours: 120,
      completedHours: 90,
      nextSession: "Tomorrow, 9:00 AM",
    },
    {
      name: "Physiology",
      progress: 60,
      totalHours: 100,
      completedHours: 60,
      nextSession: "Today, 2:00 PM",
    },
    {
      name: "Biochemistry",
      progress: 45,
      totalHours: 80,
      completedHours: 36,
      nextSession: "Wednesday, 10:00 AM",
    },
    {
      name: "Medical Ethics",
      progress: 90,
      totalHours: 40,
      completedHours: 36,
      nextSession: "Friday, 1:00 PM",
    },
  ])

  // Updated study schedule with instructor names
  const [studySchedule, setStudySchedule] = useState([
    {
      day: "Monday",
      sessions: [
        { time: "9:00 - 11:00", subject: "Cell biology seminar", instructor: "Elene" },
        { time: "11:00 - 12:00", subject: "Cell biology lecture", instructor: "Elene" },
        { time: "14:00 - 15:00", subject: "Medical Ethics lecture", instructor: "Natia" },
      ],
    },
    {
      day: "Tuesday",
      sessions: [
        { time: "11:00 - 12:00", subject: "Histology Lecture", instructor: "Irine" },
      ],
    },
    {
      day: "Wednesday",
      sessions: [
        { time: "13:00 - 14:00", subject: "Medical Ethics Seminar", instructor: "Natia" },
        { time: "14:00 - 15:00", subject: "Introduction to psychology Lecture", instructor: "Natia" },
        { time: "17:00 - 19:00", subject: "Georgian language Lecture", instructor: "Salome" },
        { time: "21:00 - 22:00", subject: "Imaging lecture/ seminar", instructor: "megi" },
      ],
    },
    {
      day: "Thursday",
      sessions: [
        { time: "10:00 - 12:00", subject: "Introduction to Physiology and biochemistry Seminar", instructor: "Joneta" },
        { time: "12:00 - 13:00", subject: "Anatomy lecture", instructor: "Mariam" },
        { time: "14:00 - 15:00", subject: "Introduction to psychology Seminar", instructor: "Natia" },
      ],
    },
    {
      day: "Friday",
      sessions: [
        { time: "12:00 - 13:00", subject: "Introduction to physiology and biochemistry lecture", instructor: "Gvanca" },
        { time: "18:00 - 17:00", subject: "Histology Seminar", instructor: "Qetevan" },
        { time: "20:00 - 22:00", subject: "Georgian language seminar", instructor: "Salome" },
      ],
    },
    {
      day: "Saturday",
      sessions: [
        { time: "12:00 - 14:00", subject: "Anatomy seminar", instructor: "Ani" },
        { time: "15:00 - 17:00", subject: "CAPS lecture/seminar", instructor: "Levan" },
        { time: "17:00 - 18:00", subject: "Medical Biophysics lecture", instructor: "Lali" },
        { time: "18:00 - 19:00", subject: "Medical Biophysics seminar", instructor: "Lali" },
      ],
    },
  ])

  // Load tasks from Google Sheets
  const loadTasks = async () => {
    setIsLoadingTasks(true)
    try {
      const result = await fetchTasksAction()
      if (result.success) {
        setSheetTasks(result.tasks)
      } else {
        toast({
          title: "Error",
          description: "Failed to load tasks from Google Sheets",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to load tasks",
        variant: "destructive",
      })
    } finally {
      setIsLoadingTasks(false)
    }
  }

  // Load tasks on component mount and when switching to tasks tab
  useEffect(() => {
    if (activeTab === "tasks") {
      loadTasks()
    }
  }, [activeTab])

  const handleTaskStatusUpdate = async (taskId: number, newStatus: string) => {
    try {
      const result = await updateTaskStatusAction(taskId, newStatus)
      if (result.success) {
        toast({
          title: "Success!",
          description: result.message,
        })
        // Reload tasks to reflect changes
        loadTasks()
      } else {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update task status",
        variant: "destructive",
      })
    }
  }

  const handleOpenTaskModal = () => {
    setIsTaskModalOpen(true)
  }

  const handleCloseTaskModal = () => {
    setIsTaskModalOpen(false)
  }

  const handleOpenSessionModal = () => {
    setIsSessionModalOpen(true)
  }

  const handleCloseSessionModal = () => {
    setIsSessionModalOpen(false)
  }

  const handleAddTask = () => {
    // Reload tasks after adding
    loadTasks()
    setIsTaskModalOpen(false)
  }

  const handleAddSession = (newSession: any) => {
    const day = format(selectedDate!, "EEEE")
    setStudySchedule((prevSchedule) => {
      const daySchedule = prevSchedule.find((s) => s.day === day)
      if (daySchedule) {
        daySchedule.sessions.push(newSession)
        return [...prevSchedule]
      } else {
        return [...prevSchedule, { day, sessions: [newSession] }]
      }
    })
    setIsSessionModalOpen(false)
    toast({
      title: "Session Added!",
      description: "A new study session has been added to your schedule.",
    })
  }

  const handleProgressClick = (subjectName: string) => {
    toast({
      title: "Progress Clicked!",
      description: `You clicked on the progress bar for ${subjectName}.`,
    })
  }

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "done":
        return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
      case "pending":
        return "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300"
      case "in progress":
        return "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-900 dark:text-gray-300"
    }
  }

  const handleOpenDriveModal = (subject: string, day: string, sessionIndex: number) => {
    setDriveModalSubject(`${day}__${sessionIndex}__${subject}`)
    setIsDriveModalOpen(true)
  }

  const handleDriveFileSelect = (file: DriveFile) => {
    if (driveModalSubject) {
      setSessionFiles((prev) => ({ ...prev, [driveModalSubject]: file }))
    }
    setIsDriveModalOpen(false)
    setDriveModalSubject(null)
  }

  const getSubjectFromModalKey = (key: string) => key.split("__").slice(2).join("__")
  const getDayFromModalKey = (key: string) => key.split("__")[0]
  const getSessionIndexFromModalKey = (key: string) => Number(key.split("__")[1])

  // Selection logic
  const toggleSessionSelection = (day: string, sessionIndex: number) => {
    setSelectedSessions((prev) => {
      const exists = prev.some(sel => sel.day === day && sel.sessionIndex === sessionIndex)
      if (exists) {
        return prev.filter(sel => !(sel.day === day && sel.sessionIndex === sessionIndex))
      } else {
        return [...prev, { day, sessionIndex }]
      }
    })
  }

  const isSessionSelected = (day: string, sessionIndex: number) =>
    selectedSessions.some(sel => sel.day === day && sel.sessionIndex === sessionIndex)

  // Delete logic
  const handleDeleteSelected = () => {
    setIsDeleteConfirmOpen(true)
  }
  const confirmDelete = () => {
    setStudySchedule(prev => prev.map(dayObj => ({
      ...dayObj,
      sessions: dayObj.sessions.filter((_, idx) => !selectedSessions.some(sel => sel.day === dayObj.day && sel.sessionIndex === idx))
    })).filter(dayObj => dayObj.sessions.length > 0))
    setSelectedSessions([])
    setIsDeleteConfirmOpen(false)
  }

  // Export logic
  const handleExportSelected = async () => {
    if (selectedSessions.length === 0) return
    const selectedData = studySchedule.flatMap((dayObj) =>
      dayObj.sessions.map((session, idx) =>
        selectedSessions.some(sel => sel.day === dayObj.day && sel.sessionIndex === idx)
          ? { ...session, day: dayObj.day, sessionIndex: idx }
          : null
      ).filter(Boolean)
    )
    const res = await fetch("/api/export-sessions-zip", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sessions: selectedData })
    })
    if (res.ok) {
      const blob = await res.blob()
      const url = window.URL.createObjectURL(blob)
      const tempLink = document.createElement('a')
      tempLink.href = url
      tempLink.download = "sessions.zip"
      document.body.appendChild(tempLink)
      tempLink.click()
      setTimeout(() => {
        window.URL.revokeObjectURL(url)
        tempLink.remove()
      }, 1000)
    }
  }

  return (
    <main className="min-h-screen bg-background pt-16">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/">
            <Button variant="outline" size="sm" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Home
            </Button>
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Track & Plan</h1>
            <p className="text-lg text-muted-foreground mb-6">
              Monitor your progress and plan your study schedule effectively
            </p>
          </motion.div>
        </div>

        <Tabs defaultValue="progress" value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="mb-6">
            <TabsTrigger value="progress">Progress Tracking</TabsTrigger>
            <TabsTrigger value="tasks">Tasks Database</TabsTrigger>
            <TabsTrigger value="schedule">Study Schedule</TabsTrigger>
          </TabsList>

          <TabsContent value="progress">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 md:grid-cols-2 gap-6"
            >
              {subjects.map((subject, index) => (
                <motion.div key={index} variants={itemVariants}>
                  <Card>
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-center">
                        <CardTitle>{subject.name}</CardTitle>
                        <Badge
                          className={`${
                            subject.progress >= 75
                              ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                              : subject.progress >= 50
                                ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                                : "bg-amber-100 text-amber-700 dark:bg-amber-900 dark:text-amber-300"
                          }`}
                        >
                          {subject.progress}% Complete
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Progress
                        value={subject.progress}
                        className="h-2 mb-4 cursor-pointer"
                        onClick={() => handleProgressClick(subject.name)}
                      />
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">
                            {subject.completedHours}/{subject.totalHours} hours
                          </span>
                        </div>
                        <div className="flex items-center gap-2 cursor-pointer">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Next: {subject.nextSession}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}

              <motion.div variants={itemVariants} className="md:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Overall Progress</CardTitle>
                    <CardDescription>Your semester progress across all subjects</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Semester Completion</span>
                          <span className="text-sm font-medium">67%</span>
                        </div>
                        <Progress
                          value={67}
                          className="h-2 cursor-pointer"
                          onClick={() => handleProgressClick("Semester Completion")}
                        />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Study Hours Target</span>
                          <span className="text-sm font-medium">222/340 hours</span>
                        </div>
                        <Progress
                          value={65}
                          className="h-2 cursor-pointer"
                          onClick={() => handleProgressClick("Study Hours Target")}
                        />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Assignment Completion</span>
                          <span className="text-sm font-medium">85%</span>
                        </div>
                        <Progress
                          value={85}
                          className="h-2 cursor-pointer"
                          onClick={() => handleProgressClick("Assignment Completion")}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </TabsContent>

          <TabsContent value="tasks">
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
              <motion.div variants={itemVariants} className="flex justify-between items-center">
                <div>
                  <h2 className="text-2xl font-bold text-foreground">Tasks Database</h2>
                  <p className="text-sm text-muted-foreground">
                    Connected to Google Sheets (ID: 1R7U3iKwTgxLONcliIXqZR45LV8S_aHf_J8Mqam9eWYo)
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={loadTasks} disabled={isLoadingTasks}>
                    <RefreshCw className={`h-4 w-4 mr-2 ${isLoadingTasks ? "animate-spin" : ""}`} />
                    Refresh
                  </Button>
                  <Button
                    className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
                    onClick={handleOpenTaskModal}
                  >
                    <Plus className="h-4 w-4 mr-2" /> Add Task
                  </Button>
                </div>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <CardTitle>All Tasks</CardTitle>
                    <CardDescription>Tasks stored in Google Sheets backend</CardDescription>
                  </CardHeader>
                  <CardContent className="p-0">
                    {isLoadingTasks ? (
                      <div className="p-8 text-center">
                        <RefreshCw className="h-8 w-8 animate-spin mx-auto mb-4" />
                        <p>Loading tasks from Google Sheets...</p>
                      </div>
                    ) : sheetTasks.length === 0 ? (
                      <div className="p-8 text-center text-muted-foreground">
                        <p>No tasks found. Create your first task!</p>
                      </div>
                    ) : (
                      <div className="divide-y divide-border">
                        {sheetTasks.map((task) => (
                          <div key={task.id} className="p-4">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <h3 className="font-medium text-foreground">{task.title}</h3>
                                  <Badge className={getStatusColor(task.status)}>{task.status}</Badge>
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">{task.description}</p>
                                <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                  <span>📅 Created: {task.timestamp}</span>
                                  {task.scheduledDate && <span>🗓️ Scheduled: {task.scheduledDate}</span>}
                                </div>
                              </div>
                              <div className="flex gap-2 ml-4">
                                {task.status !== "Done" && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleTaskStatusUpdate(task.id, "Done")}
                                  >
                                    Mark Done
                                  </Button>
                                )}
                                {task.status === "Pending" && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleTaskStatusUpdate(task.id, "In Progress")}
                                  >
                                    Start
                                  </Button>
                                )}
                                {task.status === "Done" && (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => handleTaskStatusUpdate(task.id, "Pending")}
                                  >
                                    Reopen
                                  </Button>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </CardContent>
                </Card>
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <CardTitle>Task Summary</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="bg-amber-50 dark:bg-amber-950 p-4 rounded-lg">
                        <h3 className="font-medium text-foreground mb-1">Pending</h3>
                        <p className="text-2xl font-bold text-amber-600 dark:text-amber-400">
                          {sheetTasks.filter((task) => task.status === "Pending").length}
                        </p>
                      </div>
                      <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg">
                        <h3 className="font-medium text-foreground mb-1">In Progress</h3>
                        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                          {sheetTasks.filter((task) => task.status === "In Progress").length}
                        </p>
                      </div>
                      <div className="bg-green-50 dark:bg-green-950 p-4 rounded-lg">
                        <h3 className="font-medium text-foreground mb-1">Done</h3>
                        <p className="text-2xl font-bold text-green-600 dark:text-green-400">
                          {sheetTasks.filter((task) => task.status === "Done").length}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </TabsContent>

          <TabsContent value="schedule">
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
              <motion.div variants={itemVariants} className="flex flex-col md:flex-row md:justify-between md:items-center gap-2 mb-2">
                <div className="flex gap-2 mb-2 md:mb-0">
                  <Button variant="destructive" size="sm" onClick={handleDeleteSelected} disabled={selectedSessions.length === 0}>Delete Selected</Button>
                  <Button variant="outline" size="sm" onClick={handleExportSelected} disabled={selectedSessions.length === 0}>Export Selected</Button>
                </div>
                <Button
                  className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
                  onClick={handleOpenSessionModal}
                >
                  <Plus className="h-4 w-4 mr-2" /> Add Study Session
                </Button>
              </motion.div>
              <motion.div variants={itemVariants} className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {studySchedule.map((day, dayIndex) => (
                  <div key={dayIndex} className="flex flex-col h-full">
                    <h2 className="text-xl font-bold text-center mb-2">{day.day}</h2>
                    <div className="bg-white dark:bg-blue-950 rounded-2xl p-2 shadow-lg">
                      {day.sessions.map((session, sessionIndex) => {
                        const modalKey = `${day.day}__${sessionIndex}__${session.subject}`
                        const file = sessionFiles[modalKey]
                        const selected = isSessionSelected(day.day, sessionIndex)
                        return (
                          <div
                            key={sessionIndex}
                            className={`py-2 px-2 border-b border-blue-100 dark:border-blue-900 last:border-0 flex items-center text-sm min-h-[48px] rounded-xl transition-colors duration-200 ${selected ? 'bg-blue-100/60 dark:bg-blue-900/60 shadow-md' : 'hover:bg-blue-50/60 dark:hover:bg-blue-900/30'}`}
                            style={{ boxShadow: selected ? '0 2px 8px 0 rgba(56,189,248,0.10)' : undefined }}
                          >
                            <input
                              type="checkbox"
                              className="mr-2 accent-blue-500 align-middle w-5 h-5 cursor-pointer"
                              checked={selected}
                              onChange={() => toggleSessionSelection(day.day, sessionIndex)}
                              style={{ marginTop: 0 }}
                            />
                            <span className="min-w-[110px] font-mono text-blue-700 dark:text-blue-200 align-middle text-base sm:text-sm">{session.time}</span>
                            <span className="ml-2 text-foreground align-middle text-base sm:text-sm">{session.subject} <span className="text-muted-foreground">({session.instructor})</span></span>
                            <div className="flex-1" />
                            <button
                              className="flex items-center gap-1 text-xs text-blue-500 hover:text-blue-700 underline bg-transparent border-0 cursor-pointer ml-2 transition-colors duration-150 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
                              onClick={() => handleOpenDriveModal(session.subject, day.day, sessionIndex)}
                              title="Click to view DataBase resources"
                              style={{ padding: 0 }}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="none" viewBox="0 0 24 24"><path fill="currentColor" d="M6.5 6.5v-2A2.5 2.5 0 0 1 9 2h6a2.5 2.5 0 0 1 2.5 2.5v2a1 1 0 1 1-2 0v-2A.5.5 0 0 0 15 4H9a.5.5 0 0 0-.5.5v2a1 1 0 1 1-2 0ZM4 8a1 1 0 0 1 1 1v9.5A2.5 2.5 0 0 0 7.5 21h9a2.5 2.5 0 0 0 2.5-2.5V9a1 1 0 1 1 2 0v9.5A4.5 4.5 0 0 1 16.5 23h-9A4.5 4.5 0 0 1 3 18.5V9a1 1 0 0 1 1-1Zm4.293 4.707a1 1 0 0 1 1.414 0L11 15.586V10a1 1 0 1 1 2 0v5.586l1.293-1.293a1 1 0 1 1 1.414 1.414l-3 3a1 1 0 0 1-1.414 0l-3-3a1 1 0 0 1 0-1.414Z"/></svg>
                              <span className="hidden sm:inline">Click to view DataBase resources</span>
                            </button>
                            {file && (
                              <a
                                href={`https://drive.google.com/file/d/${file.id}/view`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="block ml-2 text-blue-400 underline text-xs hover:text-blue-600 transition-colors duration-150"
                              >
                                {file.name}
                              </a>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                ))}
              </motion.div>

              <motion.div variants={itemVariants}>
                <Card>
                  <CardHeader>
                    <CardTitle>Study Time Distribution</CardTitle>
                    <CardDescription>Hours allocated per subject this week</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Anatomy & Histology</span>
                          <span className="text-sm font-medium">8 hours</span>
                        </div>
                        <Progress
                          value={40}
                          className="h-2 cursor-pointer"
                          onClick={() => handleProgressClick("Anatomy & Histology")}
                        />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Physiology</span>
                          <span className="text-sm font-medium">6 hours</span>
                        </div>
                        <Progress
                          value={30}
                          className="h-2 cursor-pointer"
                          onClick={() => handleProgressClick("Physiology")}
                        />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Biochemistry</span>
                          <span className="text-sm font-medium">4 hours</span>
                        </div>
                        <Progress
                          value={20}
                          className="h-2 cursor-pointer"
                          onClick={() => handleProgressClick("Biochemistry")}
                        />
                      </div>
                      <div>
                        <div className="flex justify-between mb-1">
                          <span className="text-sm font-medium">Medical Ethics</span>
                          <span className="text-sm font-medium">2 hours</span>
                        </div>
                        <Progress
                          value={10}
                          className="h-2 cursor-pointer"
                          onClick={() => handleProgressClick("Medical Ethics")}
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          </TabsContent>
        </Tabs>
      </div>

      <Footer />

      {/* Task Creation Modal */}
      <AlertDialog open={isTaskModalOpen} onOpenChange={setIsTaskModalOpen}>
        <AlertDialogContent className="max-w-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Add New Task</AlertDialogTitle>
            <AlertDialogDescription>
              Create a new task that will be saved to your Google Sheets database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <TaskForm onAddTask={handleAddTask} onClose={handleCloseTaskModal} />
        </AlertDialogContent>
      </AlertDialog>

      {/* Study Session Modal */}
      <AlertDialog open={isSessionModalOpen} onOpenChange={setIsSessionModalOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Add Study Session</AlertDialogTitle>
            <AlertDialogDescription>Schedule a new study session to stay organized.</AlertDialogDescription>
          </AlertDialogHeader>
          <SessionForm
            onAddSession={handleAddSession}
            onClose={handleCloseSessionModal}
            setSelectedDate={setSelectedDate}
            selectedDate={selectedDate}
          />
        </AlertDialogContent>
      </AlertDialog>

      {/* DataBase Modal Integration */}
      <GoogleDriveModal
        open={isDriveModalOpen}
        onClose={() => {
          setIsDriveModalOpen(false)
          setDriveModalSubject(null)
        }}
        subject={driveModalSubject ? getSubjectFromModalKey(driveModalSubject) : ''}
        onFileSelect={handleDriveFileSelect}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteConfirmOpen} onOpenChange={setIsDeleteConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete Selected Sessions?</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete the selected session(s)? This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => setIsDeleteConfirmOpen(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmDelete}>Delete</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </main>
  )
}

function TaskForm({ onAddTask, onClose }: { onAddTask: () => void; onClose: () => void }) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const [scheduledDate, setScheduledDate] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { toast } = useToast()

  const handleSubmit = async () => {
    if (!title || !description) {
      toast({
        title: "Error",
        description: "Title and description are required",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)

    const formData = new FormData()
    formData.append("title", title)
    formData.append("description", description)
    formData.append("scheduledDate", scheduledDate)

    try {
      const result = await createTaskAction(formData)

      if (result.success) {
        toast({
          title: "Success!",
          description: result.message,
        })
        onAddTask()
        // Reset form
        setTitle("")
        setDescription("")
        setScheduledDate("")
      } else {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to create task",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="title" className="text-right">
          Title *
        </Label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="col-span-3"
          placeholder="e.g., Georgian to English basics"
        />
      </div>
      <div className="grid grid-cols-4 items-start gap-4">
        <Label htmlFor="description" className="text-right mt-2">
          Description *
        </Label>
        <textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="col-span-3 min-h-[120px] px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
          placeholder="Replace Mind Boost with a new section called Language. In this section, add Georgian language content that teaches English basics. It should include 100 commonly used English words and 100 basic English sentences for Georgian students."
        />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="scheduledDate" className="text-right">
          Scheduled Date
        </Label>
        <Input
          id="scheduledDate"
          type="date"
          value={scheduledDate}
          onChange={(e) => setScheduledDate(e.target.value)}
          className="col-span-3"
        />
      </div>
      <div className="text-sm text-muted-foreground px-4">
        <p>📊 This task will be saved to Google Sheets with:</p>
        <ul className="list-disc list-inside mt-1 space-y-1">
          <li>Timestamp: Auto-generated</li>
          <li>Status: Pending (default)</li>
          <li>All fields above</li>
        </ul>
      </div>
      <AlertDialogFooter>
        <AlertDialogCancel onClick={onClose} disabled={isSubmitting}>
          Cancel
        </AlertDialogCancel>
        <AlertDialogAction onClick={handleSubmit} disabled={isSubmitting}>
          {isSubmitting ? "Creating..." : "Add Task"}
        </AlertDialogAction>
      </AlertDialogFooter>
    </div>
  )
}

function SessionForm({
  onAddSession,
  onClose,
  setSelectedDate,
  selectedDate,
}: {
  onAddSession: (session: any) => void
  onClose: () => void
  setSelectedDate: (date: Date | undefined) => void
  selectedDate: Date | undefined
}) {
  const [subject, setSubject] = useState("")
  const [time, setTime] = useState("")

  const handleSubmit = () => {
    if (subject && time && selectedDate) {
      onAddSession({ subject, time })
      onClose()
    }
  }

  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="subject" className="text-right">
          Subject
        </Label>
        <Input id="subject" value={subject} onChange={(e) => setSubject(e.target.value)} className="col-span-3" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="time" className="text-right">
          Time
        </Label>
        <Input id="time" value={time} onChange={(e) => setTime(e.target.value)} className="col-span-3" />
      </div>
      <div className="grid grid-cols-4 items-center gap-4">
        <Label htmlFor="date" className="text-right">
          Date
        </Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn("w-[240px] justify-start text-left font-normal", !selectedDate && "text-muted-foreground")}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {selectedDate ? format(selectedDate, "PPP") : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <CalendarUI
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={(date) => date > new Date()}
              initialFocus
            />
          </PopoverContent>
        </Popover>
      </div>
      <AlertDialogFooter>
        <AlertDialogCancel onClick={onClose}>Cancel</AlertDialogCancel>
        <AlertDialogAction onClick={handleSubmit}>Add Session</AlertDialogAction>
      </AlertDialogFooter>
    </div>
  )
}
