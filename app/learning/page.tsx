"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, BookOpen, Video, FileText, Brain, Star, StarHalf, Download, ExternalLink } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"

// In a real app, this would come from the assessment data
const mockUserData = {
  country: "United States",
  stage: "pre_med",
  interest: "cardiology",
  learningStyle: "visual",
}

export default function Learning() {
  const [activeTab, setActiveTab] = useState("recommended")

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <Link href="/">
          <Button variant="outline" size="sm">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
          </Button>
        </Link>
      </div>

      <Card className="border-blue-100 shadow-md mb-6">
        <CardHeader className="bg-blue-50 rounded-t-lg">
          <div className="flex justify-between items-center">
            <div>
              <CardTitle className="text-blue-700">Learning Resources</CardTitle>
              <CardDescription>
                Personalized for {mockUserData.stage} level with {mockUserData.interest} focus
              </CardDescription>
            </div>
            <Badge variant="outline" className="bg-blue-100 text-blue-700 border-blue-200">
              {getFormattedLearningStyle(mockUserData.learningStyle)} Learner
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs defaultValue="recommended" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="recommended">Recommended</TabsTrigger>
              <TabsTrigger value="books">Books</TabsTrigger>
              <TabsTrigger value="videos">Videos</TabsTrigger>
              <TabsTrigger value="practice">Practice</TabsTrigger>
            </TabsList>

            <TabsContent value="recommended" className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <h3 className="font-medium text-blue-700 mb-2">Your Personalized Learning Plan</h3>
                <p className="text-slate-600 text-sm">
                  Based on your profile as a pre-med student interested in cardiology with a preference for visual
                  learning, we've curated these resources to help you succeed in your journey.
                </p>
              </div>

              <h3 className="text-lg font-medium text-blue-700">Top Picks for You</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ResourceCard
                  type="video"
                  title="Crash Course: Anatomy & Physiology"
                  author="Hank Green"
                  description="Visual explanations of human anatomy and physiology with a focus on the cardiovascular system."
                  rating={5}
                  image="/placeholder.svg?height=80&width=120"
                  link="#"
                  tags={["Visual", "Beginner-Friendly"]}
                />

                <ResourceCard
                  type="book"
                  title="Kaplan MCAT Complete 7-Book Subject Review"
                  author="Kaplan Test Prep"
                  description="Comprehensive review of all MCAT topics with visual aids and practice questions."
                  rating={4.5}
                  image="/placeholder.svg?height=80&width=120"
                  link="#"
                  tags={["MCAT Prep", "Essential"]}
                />

                <ResourceCard
                  type="practice"
                  title="Khan Academy MCAT Practice"
                  author="Khan Academy"
                  description="Free practice questions and explanations for all MCAT subjects."
                  rating={4.5}
                  image="/placeholder.svg?height=80&width=120"
                  link="#"
                  tags={["Free", "Interactive"]}
                />

                <ResourceCard
                  type="video"
                  title="Cardiovascular System in 10 Minutes"
                  author="Armando Hasudungan"
                  description="Visual overview of the cardiovascular system with detailed illustrations."
                  rating={5}
                  image="/placeholder.svg?height=80&width=120"
                  link="#"
                  tags={["Visual", "Cardiology"]}
                />
              </div>

              <h3 className="text-lg font-medium text-blue-700 mt-8">Weekly Study Plan</h3>
              <Card className="border-slate-200">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <StudyDayPlan
                      day="Monday"
                      focus="Biology Fundamentals"
                      tasks={[
                        "Watch Crash Course Biology videos (2 hours)",
                        "Review cell structure and function notes (1 hour)",
                        "Complete practice questions (30 min)",
                      ]}
                    />

                    <StudyDayPlan
                      day="Tuesday"
                      focus="General Chemistry"
                      tasks={[
                        "Study chemical bonding concepts (1.5 hours)",
                        "Watch Khan Academy videos on thermodynamics (1 hour)",
                        "Practice problems from Kaplan book (1 hour)",
                      ]}
                    />

                    <StudyDayPlan
                      day="Wednesday"
                      focus="Cardiovascular System"
                      tasks={[
                        "Watch videos on heart anatomy and physiology (1 hour)",
                        "Study blood vessel structure and function (1 hour)",
                        "Review cardiac cycle animations (30 min)",
                      ]}
                    />

                    <StudyDayPlan
                      day="Thursday"
                      focus="Organic Chemistry"
                      tasks={[
                        "Study functional groups (1 hour)",
                        "Watch videos on reaction mechanisms (1 hour)",
                        "Practice drawing structures and reactions (1 hour)",
                      ]}
                    />

                    <StudyDayPlan
                      day="Friday"
                      focus="Physics Concepts"
                      tasks={[
                        "Review fluid dynamics principles (1 hour)",
                        "Watch videos on electricity and magnetism (1 hour)",
                        "Complete practice problems (1 hour)",
                      ]}
                    />

                    <StudyDayPlan
                      day="Weekend"
                      focus="Review and Integration"
                      tasks={[
                        "Take a practice MCAT section (3 hours)",
                        "Review missed questions (1 hour)",
                        "Create summary notes connecting concepts (2 hours)",
                      ]}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="books" className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <ResourceCard
                  type="book"
                  title="Kaplan MCAT Complete 7-Book Subject Review"
                  author="Kaplan Test Prep"
                  description="Comprehensive review of all MCAT topics with visual aids and practice questions."
                  rating={4.5}
                  image="/placeholder.svg?height=80&width=120"
                  link="#"
                  tags={["MCAT Prep", "Essential"]}
                />

                <ResourceCard
                  type="book"
                  title="The Princeton Review MCAT Subject Review"
                  author="Princeton Review"
                  description="Complete content review for the MCAT exam with detailed illustrations and practice tests."
                  rating={4}
                  image="/placeholder.svg?height=80&width=120"
                  link="#"
                  tags={["MCAT Prep", "Comprehensive"]}
                />

                <ResourceCard
                  type="book"
                  title="Netter's Anatomy Coloring Book"
                  author="John T. Hansen"
                  description="Visual approach to learning anatomy through coloring with a focus on clinical relevance."
                  rating={5}
                  image="/placeholder.svg?height=80&width=120"
                  link="#"
                  tags={["Visual", "Interactive"]}
                />

                <ResourceCard
                  type="book"
                  title="Cardiovascular Physiology Concepts"
                  author="Richard E. Klabunde"
                  description="Clear explanations of cardiovascular physiology with diagrams and clinical applications."
                  rating={4.5}
                  image="/placeholder.svg?height=80&width=120"
                  link="#"
                  tags={["Cardiology", "Advanced"]}
                />

                <ResourceCard
                  type="book"
                  title="The Premed Playbook: Guide to the Medical School Interview"
                  author="Ryan Gray"
                  description="Preparation guide for medical school interviews with strategies and practice questions."
                  rating={4.5}
                  image="/placeholder.svg?height=80&width=120"
                  link="#"
                  tags={["Admissions", "Essential"]}
                />

                <ResourceCard
                  type="book"
                  title="Organic Chemistry as a Second Language"
                  author="David Klein"
                  description="Simplified approach to understanding organic chemistry concepts for pre-med students."
                  rating={5}
                  image="/placeholder.svg?height=80&width=120"
                  link="#"
                  tags={["Beginner-Friendly", "Essential"]}
                />
              </div>
            </TabsContent>

            <TabsContent value="videos" className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <ResourceCard
                  type="video"
                  title="Crash Course: Anatomy & Physiology"
                  author="Hank Green"
                  description="Visual explanations of human anatomy and physiology with a focus on the cardiovascular system."
                  rating={5}
                  image="/placeholder.svg?height=80&width=120"
                  link="#"
                  tags={["Visual", "Beginner-Friendly"]}
                />

                <ResourceCard
                  type="video"
                  title="Khan Academy MCAT"
                  author="Khan Academy"
                  description="Comprehensive video series covering all MCAT topics with visual explanations."
                  rating={4.5}
                  image="/placeholder.svg?height=80&width=120"
                  link="#"
                  tags={["MCAT Prep", "Free"]}
                />

                <ResourceCard
                  type="video"
                  title="Cardiovascular System in 10 Minutes"
                  author="Armando Hasudungan"
                  description="Visual overview of the cardiovascular system with detailed illustrations."
                  rating={5}
                  image="/placeholder.svg?height=80&width=120"
                  link="#"
                  tags={["Visual", "Cardiology"]}
                />

                <ResourceCard
                  type="video"
                  title="The Heart, Part 1 - Under Pressure"
                  author="AK Lectures"
                  description="Detailed explanation of cardiac physiology with animations and diagrams."
                  rating={4.5}
                  image="/placeholder.svg?height=80&width=120"
                  link="#"
                  tags={["Cardiology", "Detailed"]}
                />

                <ResourceCard
                  type="video"
                  title="Medical School Interviews: How to Prepare"
                  author="Med School Insiders"
                  description="Tips and strategies for medical school interviews with practice scenarios."
                  rating={4}
                  image="/placeholder.svg?height=80&width=120"
                  link="#"
                  tags={["Admissions", "Practical"]}
                />

                <ResourceCard
                  type="video"
                  title="Organic Chemistry - Basic Introduction"
                  author="The Organic Chemistry Tutor"
                  description="Visual introduction to organic chemistry concepts for MCAT preparation."
                  rating={4.5}
                  image="/placeholder.svg?height=80&width=120"
                  link="#"
                  tags={["Beginner-Friendly", "Visual"]}
                />
              </div>
            </TabsContent>

            <TabsContent value="practice" className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <ResourceCard
                  type="practice"
                  title="UWorld MCAT Qbank"
                  author="UWorld"
                  description="Comprehensive question bank with detailed explanations and visual aids."
                  rating={5}
                  image="/placeholder.svg?height=80&width=120"
                  link="#"
                  tags={["MCAT Prep", "Premium"]}
                />

                <ResourceCard
                  type="practice"
                  title="Khan Academy MCAT Practice"
                  author="Khan Academy"
                  description="Free practice questions and explanations for all MCAT subjects."
                  rating={4.5}
                  image="/placeholder.svg?height=80&width=120"
                  link="#"
                  tags={["Free", "Interactive"]}
                />

                <ResourceCard
                  type="practice"
                  title="AAMC Official MCAT Practice Exams"
                  author="Association of American Medical Colleges"
                  description="Official practice exams from the creators of the MCAT."
                  rating={5}
                  image="/placeholder.svg?height=80&width=120"
                  link="#"
                  tags={["Essential", "Most Accurate"]}
                />

                <ResourceCard
                  type="practice"
                  title="Anki Flashcards - MCAT Collection"
                  author="Community Created"
                  description="Spaced repetition flashcards covering all MCAT topics."
                  rating={4.5}
                  image="/placeholder.svg?height=80&width=120"
                  link="#"
                  tags={["Free", "Spaced Repetition"]}
                />

                <ResourceCard
                  type="practice"
                  title="NextStep MCAT Practice Tests"
                  author="Blueprint Prep (formerly NextStep)"
                  description="Full-length practice tests with detailed analytics and explanations."
                  rating={4}
                  image="/placeholder.svg?height=80&width=120"
                  link="#"
                  tags={["MCAT Prep", "Analytics"]}
                />

                <ResourceCard
                  type="practice"
                  title="Cardiovascular Physiology Virtual Lab"
                  author="PhysioEx"
                  description="Interactive simulations of cardiovascular physiology experiments."
                  rating={4}
                  image="/placeholder.svg?height=80&width=120"
                  link="#"
                  tags={["Interactive", "Cardiology"]}
                />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="bg-blue-50 rounded-b-lg text-center text-sm text-blue-700 py-3">
          "Knowledge is the foundation of your medical journey. Keep learning, keep growing!"
        </CardFooter>
      </Card>

      <div className="flex justify-between">
        <Link href="/roadmap">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Roadmap
          </Button>
        </Link>
        <Link href="/motivation">
          <Button className="bg-blue-600 hover:bg-blue-700">Get Motivation & Support</Button>
        </Link>
      </div>
    </div>
  )
}

function getFormattedLearningStyle(style: string): string {
  switch (style) {
    case "reading":
      return "Reading"
    case "visual":
      return "Visual"
    case "interactive":
      return "Interactive"
    case "practical":
      return "Practical"
    default:
      return "Balanced"
  }
}

function getResourceIcon(type: string) {
  switch (type) {
    case "book":
      return <BookOpen className="h-5 w-5 text-blue-600" />
    case "video":
      return <Video className="h-5 w-5 text-blue-600" />
    case "practice":
      return <FileText className="h-5 w-5 text-blue-600" />
    default:
      return <Brain className="h-5 w-5 text-blue-600" />
  }
}

function ResourceCard({
  type,
  title,
  author,
  description,
  rating,
  image,
  link,
  tags,
}: {
  type: string
  title: string
  author: string
  description: string
  rating: number
  image: string
  link: string
  tags: string[]
}) {
  return (
    <Card className="border-slate-200 hover:border-blue-200 transition-colors">
      <CardContent className="p-4">
        <div className="flex gap-4">
          <div className="flex-shrink-0">
            <Image
              src={image || "/placeholder.svg"}
              alt={title}
              width={120}
              height={80}
              className="rounded-md object-cover"
            />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              {getResourceIcon(type)}
              <span className="text-xs text-slate-500 uppercase">{type}</span>
            </div>
            <h4 className="font-medium text-blue-700 mb-1">{title}</h4>
            <p className="text-sm text-slate-500 mb-2">by {author}</p>
            <p className="text-sm text-slate-600 mb-3">{description}</p>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                {Array.from({ length: Math.floor(rating) }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 text-yellow-500" />
                ))}
                {rating % 1 !== 0 && <StarHalf className="h-4 w-4 text-yellow-500" />}
                <span className="text-sm text-slate-500 ml-1">{rating.toFixed(1)}</span>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">
                  <Download className="h-4 w-4 mr-1" /> Save
                </Button>
                <Button size="sm" className="bg-blue-600 hover:bg-blue-700">
                  <ExternalLink className="h-4 w-4 mr-1" /> Open
                </Button>
              </div>
            </div>
            <div className="flex gap-2 mt-3 flex-wrap">
              {tags.map((tag, index) => (
                <Badge key={index} variant="outline" className="bg-blue-50 text-blue-600 border-blue-200 text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function StudyDayPlan({ day, focus, tasks }: { day: string; focus: string; tasks: string[] }) {
  return (
    <div className="border-b border-slate-200 pb-4 last:border-0 last:pb-0">
      <div className="flex justify-between items-center mb-2">
        <h4 className="font-medium text-blue-700">{day}</h4>
        <Badge variant="outline" className="bg-blue-50 text-blue-600 border-blue-200">
          {focus}
        </Badge>
      </div>
      <ul className="space-y-1">
        {tasks.map((task, index) => (
          <li key={index} className="text-sm flex items-start">
            <span className="text-blue-500 mr-2">•</span>
            <span className="text-slate-600">{task}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
