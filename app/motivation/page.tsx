"use client"

import type React from "react"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  ArrowLeft,
  Quote,
  MessageSquare,
  Calendar,
  Clock,
  Download,
  Share2,
  ThumbsUp,
  Bookmark,
  BookOpen,
} from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"

// In a real app, this would come from the assessment data
const mockUserData = {
  country: "United States",
  stage: "pre_med",
  interest: "cardiology",
}

export default function Motivation() {
  const [activeTab, setActiveTab] = useState("daily")
  const [journalEntry, setJournalEntry] = useState("")

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
              <CardTitle className="text-blue-700">Motivation & Support</CardTitle>
              <CardDescription>Encouragement and guidance for your medical journey</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs defaultValue="daily" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-4 mb-6">
              <TabsTrigger value="daily">Daily Inspiration</TabsTrigger>
              <TabsTrigger value="community">Community</TabsTrigger>
              <TabsTrigger value="journal">Reflection Journal</TabsTrigger>
              <TabsTrigger value="challenges">Challenges</TabsTrigger>
            </TabsList>

            <TabsContent value="daily" className="space-y-6">
              <Card className="border-blue-100 bg-blue-50">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4 mb-4">
                    <Quote className="h-10 w-10 text-blue-600" />
                    <div>
                      <h3 className="text-lg font-medium text-blue-700">Quote of the Day</h3>
                      <p className="text-slate-600 text-sm">May 9, 2025</p>
                    </div>
                  </div>
                  <blockquote className="border-l-4 border-blue-300 pl-4 italic text-slate-700 mb-4">
                    "Success is not final, failure is not fatal: it is the courage to continue that counts."
                  </blockquote>
                  <p className="text-right text-slate-600 text-sm">— Winston Churchill</p>
                </CardContent>
              </Card>

              <h3 className="text-lg font-medium text-blue-700 mt-8">Today's Motivation</h3>
              <Card className="border-slate-200">
                <CardContent className="pt-6">
                  <h4 className="font-medium text-blue-700 mb-3">Overcoming Pre-Med Challenges</h4>
                  <p className="text-slate-600 mb-4">
                    The pre-med journey can feel overwhelming with its demanding coursework, MCAT preparation, and
                    extracurricular expectations. Remember that every successful physician once stood exactly where you
                    are now, facing the same doubts and challenges.
                  </p>
                  <p className="text-slate-600 mb-4">
                    What separates those who succeed from those who don't isn't natural talent or luck—it's persistence.
                    The ability to keep going when courses get difficult, to maintain focus when distractions arise, and
                    to believe in yourself when doubt creeps in.
                  </p>
                  <p className="text-slate-600 mb-4">
                    Your interest in cardiology shows you're already thinking ahead about how you want to impact
                    patients' lives. Let that vision guide you through the challenging days. Imagine yourself listening
                    to a patient's heart, diagnosing a condition, and providing treatment that improves or even saves
                    their life.
                  </p>
                  <p className="text-slate-600">
                    Today, focus on making progress, not achieving perfection. Break down your goals into manageable
                    steps, celebrate small victories, and remember why you started this journey in the first place.
                  </p>
                </CardContent>
              </Card>

              <h3 className="text-lg font-medium text-blue-700 mt-8">Weekly Challenge</h3>
              <Card className="border-slate-200">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Calendar className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-700">Shadow a Healthcare Professional</h4>
                      <p className="text-slate-600 text-sm">May 6 - May 12, 2025</p>
                    </div>
                  </div>
                  <p className="text-slate-600 mb-4">
                    This week, challenge yourself to arrange a shadowing opportunity with a healthcare professional,
                    ideally a cardiologist or another physician in your area of interest.
                  </p>
                  <ul className="space-y-2 mb-4">
                    <li className="text-sm flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span className="text-slate-600">
                        Reach out to 3-5 physicians via email or your school's pre-med office
                      </span>
                    </li>
                    <li className="text-sm flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span className="text-slate-600">
                        Prepare 5 thoughtful questions to ask during your shadowing experience
                      </span>
                    </li>
                    <li className="text-sm flex items-start">
                      <span className="text-blue-500 mr-2">•</span>
                      <span className="text-slate-600">
                        After shadowing, reflect on what you learned and how it impacts your goals
                      </span>
                    </li>
                  </ul>
                  <div className="flex justify-end">
                    <Button className="bg-blue-600 hover:bg-blue-700">Accept Challenge</Button>
                  </div>
                </CardContent>
              </Card>

              <h3 className="text-lg font-medium text-blue-700 mt-8">Mindfulness Exercise</h3>
              <Card className="border-slate-200">
                <CardContent className="pt-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="bg-blue-100 p-3 rounded-full">
                      <Clock className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-blue-700">5-Minute Stress Relief</h4>
                      <p className="text-slate-600 text-sm">Perfect for study breaks</p>
                    </div>
                  </div>
                  <p className="text-slate-600 mb-4">
                    Medical studies can be stressful. Take 5 minutes to practice this simple breathing exercise:
                  </p>
                  <ol className="space-y-2 mb-4">
                    <li className="text-sm flex items-start">
                      <div className="bg-blue-100 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">
                        <span className="text-blue-700 text-xs">1</span>
                      </div>
                      <span className="text-slate-600">Find a comfortable seated position and close your eyes</span>
                    </li>
                    <li className="text-sm flex items-start">
                      <div className="bg-blue-100 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">
                        <span className="text-blue-700 text-xs">2</span>
                      </div>
                      <span className="text-slate-600">Breathe in slowly through your nose for 4 counts</span>
                    </li>
                    <li className="text-sm flex items-start">
                      <div className="bg-blue-100 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">
                        <span className="text-blue-700 text-xs">3</span>
                      </div>
                      <span className="text-slate-600">Hold your breath for 4 counts</span>
                    </li>
                    <li className="text-sm flex items-start">
                      <div className="bg-blue-100 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">
                        <span className="text-blue-700 text-xs">4</span>
                      </div>
                      <span className="text-slate-600">Exhale slowly through your mouth for 6 counts</span>
                    </li>
                    <li className="text-sm flex items-start">
                      <div className="bg-blue-100 rounded-full w-5 h-5 flex items-center justify-center mr-2 mt-0.5">
                        <span className="text-blue-700 text-xs">5</span>
                      </div>
                      <span className="text-slate-600">Repeat for 5 minutes, focusing only on your breath</span>
                    </li>
                  </ol>
                  <div className="flex justify-end">
                    <Button variant="outline">Start Timer</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="community" className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <h3 className="font-medium text-blue-700 mb-2">Connect with Fellow Aspiring Doctors</h3>
                <p className="text-slate-600 text-sm">
                  Share experiences, ask questions, and find support from others on the same journey.
                </p>
              </div>

              <div className="space-y-4">
                <CommunityPost
                  avatar="/placeholder.svg?height=40&width=40"
                  name="Sarah J."
                  stage="Medical School (Year 2)"
                  time="2 hours ago"
                  content="Just passed my USMLE Step 1! For those of you preparing, I found that doing practice questions was WAY more valuable than just passive reading. Happy to share my study schedule if anyone's interested."
                  likes={24}
                  comments={8}
                  tags={["USMLE", "Study Tips"]}
                />

                <CommunityPost
                  avatar="/placeholder.svg?height=40&width=40"
                  name="Michael T."
                  stage="Pre-Med"
                  time="Yesterday"
                  content="Anyone else struggling with Organic Chemistry? I'm finding reaction mechanisms particularly difficult to memorize. Any tips or resources that helped you?"
                  likes={15}
                  comments={12}
                  tags={["Pre-Med", "Organic Chemistry"]}
                />

                <CommunityPost
                  avatar="/placeholder.svg?height=40&width=40"
                  name="Dr. Lisa Chen"
                  stage="Cardiologist"
                  time="2 days ago"
                  content="For those interested in cardiology: start developing your auscultation skills early! Even as a pre-med, you can begin learning to identify normal heart sounds. There are great apps that simulate different murmurs and abnormalities. This skill takes years to master, so start now!"
                  likes={42}
                  comments={7}
                  tags={["Cardiology", "Clinical Skills"]}
                />

                <CommunityPost
                  avatar="/placeholder.svg?height=40&width=40"
                  name="James K."
                  stage="Residency (Internal Medicine)"
                  time="3 days ago"
                  content="Reflecting on my journey from pre-med to residency, I wish I'd known that it's okay to have bad days. Medicine is a marathon, not a sprint. Take care of your mental health along the way—it's just as important as your academic performance."
                  likes={56}
                  comments={14}
                  tags={["Wellness", "Advice"]}
                />
              </div>

              <Card className="border-slate-200">
                <CardContent className="pt-6">
                  <h4 className="font-medium text-blue-700 mb-3">Join the Conversation</h4>
                  <Textarea placeholder="Share your thoughts, questions, or experiences..." className="mb-4" />
                  <div className="flex justify-end">
                    <Button className="bg-blue-600 hover:bg-blue-700">Post to Community</Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="journal" className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <h3 className="font-medium text-blue-700 mb-2">Reflection Journal</h3>
                <p className="text-slate-600 text-sm">
                  Document your journey, track your progress, and reflect on your experiences.
                </p>
              </div>

              <Card className="border-slate-200">
                <CardContent className="pt-6">
                  <h4 className="font-medium text-blue-700 mb-3">New Journal Entry</h4>
                  <div className="mb-4">
                    <p className="text-slate-600 text-sm mb-2">Today's Prompt:</p>
                    <p className="italic text-slate-700 mb-4">
                      "What motivated you to pursue medicine initially, and has that motivation evolved over time?"
                    </p>
                    <Textarea
                      placeholder="Start writing..."
                      className="min-h-[200px] mb-4"
                      value={journalEntry}
                      onChange={(e) => setJournalEntry(e.target.value)}
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button variant="outline">
                      <Download className="mr-2 h-4 w-4" /> Save Draft
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700">Submit Entry</Button>
                  </div>
                </CardContent>
              </Card>

              <h3 className="text-lg font-medium text-blue-700 mt-8">Previous Entries</h3>
              <div className="space-y-4">
                <JournalEntry
                  date="May 2, 2025"
                  prompt="Describe a challenge you've faced in your medical journey and how you overcame it."
                  preview="Last semester's Biochemistry course was one of the most challenging experiences I've had. The volume of information felt overwhelming, and I found myself struggling to keep up with the pace..."
                />

                <JournalEntry
                  date="April 25, 2025"
                  prompt="What aspect of medicine are you most excited to learn about?"
                  preview="I'm fascinated by the cardiovascular system. The heart's ability to continuously pump blood throughout our entire lives without rest is incredible. I'm particularly interested in learning more about..."
                />

                <JournalEntry
                  date="April 18, 2025"
                  prompt="How do you balance your academic responsibilities with self-care?"
                  preview="Finding balance has been a journey of trial and error. I've learned that scheduling dedicated time for self-care is just as important as scheduling study sessions. I now treat my exercise time as..."
                />
              </div>
            </TabsContent>

            <TabsContent value="challenges" className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-lg mb-6">
                <h3 className="font-medium text-blue-700 mb-2">Growth Challenges</h3>
                <p className="text-slate-600 text-sm">
                  Push yourself with targeted challenges designed to build essential skills for your medical career.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <ChallengeCard
                  icon={<Calendar className="h-6 w-6 text-blue-600" />}
                  title="Shadow a Healthcare Professional"
                  description="Arrange to shadow a physician in your area of interest for at least 4 hours."
                  duration="1 week"
                  difficulty="Moderate"
                  status="active"
                />

                <ChallengeCard
                  icon={<BookOpen className="h-6 w-6 text-blue-600" />}
                  title="Research Deep Dive"
                  description="Read and summarize 3 recent research papers in your field of interest."
                  duration="2 weeks"
                  difficulty="Challenging"
                  status="available"
                />

                <ChallengeCard
                  icon={<MessageSquare className="h-6 w-6 text-blue-600" />}
                  title="Medical Terminology Mastery"
                  description="Learn and correctly use 50 new medical terms in context."
                  duration="10 days"
                  difficulty="Moderate"
                  status="available"
                />

                <ChallengeCard
                  icon={<Clock className="h-6 w-6 text-blue-600" />}
                  title="Study Efficiency Challenge"
                  description="Implement the Pomodoro technique for all study sessions for one week."
                  duration="1 week"
                  difficulty="Easy"
                  status="completed"
                />
              </div>

              <h3 className="text-lg font-medium text-blue-700 mt-8">Challenge Progress</h3>
              <Card className="border-slate-200">
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium text-blue-700">
                          Current Challenge: Shadow a Healthcare Professional
                        </h4>
                        <Badge className="bg-blue-100 text-blue-700 border-blue-200">4 days left</Badge>
                      </div>
                      <div className="w-full bg-slate-100 rounded-full h-2.5 mb-4">
                        <div className="bg-blue-600 h-2.5 rounded-full" style={{ width: "60%" }}></div>
                      </div>
                      <h5 className="text-sm font-medium text-slate-700 mb-2">Tasks:</h5>
                      <div className="space-y-2">
                        <div className="flex items-center">
                          <input type="checkbox" checked className="mr-2" />
                          <span className="text-sm text-slate-600">Identify 3-5 potential physicians to shadow</span>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" checked className="mr-2" />
                          <span className="text-sm text-slate-600">Send introduction emails with your resume</span>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" checked className="mr-2" />
                          <span className="text-sm text-slate-600">Schedule shadowing opportunity</span>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          <span className="text-sm text-slate-600">
                            Complete shadowing experience (minimum 4 hours)
                          </span>
                        </div>
                        <div className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          <span className="text-sm text-slate-600">Write reflection on what you learned</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="bg-blue-50 rounded-b-lg text-center text-sm text-blue-700 py-3">
          "You've got this — the journey may be long, but you're not alone. Dr. AIVA will be here every step of the
          way."
        </CardFooter>
      </Card>

      <div className="flex justify-between">
        <Link href="/learning">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Learning
          </Button>
        </Link>
        <Link href="/">
          <Button className="bg-blue-600 hover:bg-blue-700">Return to Home</Button>
        </Link>
      </div>
    </div>
  )
}

function CommunityPost({
  avatar,
  name,
  stage,
  time,
  content,
  likes,
  comments,
  tags,
}: {
  avatar: string
  name: string
  stage: string
  time: string
  content: string
  likes: number
  comments: number
  tags: string[]
}) {
  return (
    <Card className="border-slate-200">
      <CardContent className="pt-6">
        <div className="flex items-start gap-4 mb-3">
          <Avatar>
            <AvatarImage src={avatar || "/placeholder.svg"} alt={name} />
            <AvatarFallback>{name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <div className="flex items-center gap-2">
              <h4 className="font-medium text-slate-800">{name}</h4>
              <Badge variant="outline" className="text-xs">
                {stage}
              </Badge>
            </div>
            <p className="text-slate-500 text-xs">{time}</p>
          </div>
        </div>
        <p className="text-slate-700 mb-4">{content}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="bg-blue-50 text-blue-600 border-blue-200 text-xs">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex justify-between">
          <div className="flex gap-4">
            <Button variant="ghost" size="sm" className="text-slate-600">
              <ThumbsUp className="h-4 w-4 mr-1" /> {likes}
            </Button>
            <Button variant="ghost" size="sm" className="text-slate-600">
              <MessageSquare className="h-4 w-4 mr-1" /> {comments}
            </Button>
          </div>
          <Button variant="ghost" size="sm" className="text-slate-600">
            <Bookmark className="h-4 w-4 mr-1" /> Save
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function JournalEntry({
  date,
  prompt,
  preview,
}: {
  date: string
  prompt: string
  preview: string
}) {
  return (
    <Card className="border-slate-200 hover:border-blue-200 transition-colors cursor-pointer">
      <CardContent className="p-4">
        <div className="flex justify-between items-center mb-2">
          <h4 className="font-medium text-blue-700">{date}</h4>
          <Button variant="ghost" size="sm">
            <Share2 className="h-4 w-4 mr-1" /> Share
          </Button>
        </div>
        <p className="text-sm font-medium text-slate-700 mb-2">Prompt: {prompt}</p>
        <p className="text-sm text-slate-600 mb-3">{preview}...</p>
        <div className="flex justify-end">
          <Button variant="outline" size="sm">
            Read Full Entry
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function ChallengeCard({
  icon,
  title,
  description,
  duration,
  difficulty,
  status,
}: {
  icon: React.ReactNode
  title: string
  description: string
  duration: string
  difficulty: string
  status: "active" | "available" | "completed"
}) {
  return (
    <Card
      className={`border ${status === "active" ? "border-blue-300 bg-blue-50" : status === "completed" ? "border-green-200 bg-green-50" : "border-slate-200"}`}
    >
      <CardContent className="p-4">
        <div className="flex items-center gap-4 mb-3">
          <div
            className={`p-2 rounded-full ${status === "active" ? "bg-blue-100" : status === "completed" ? "bg-green-100" : "bg-slate-100"}`}
          >
            {icon}
          </div>
          <div>
            <h4
              className={`font-medium ${status === "active" ? "text-blue-700" : status === "completed" ? "text-green-700" : "text-slate-700"}`}
            >
              {title}
            </h4>
            <div className="flex items-center gap-2">
              <Badge
                variant="outline"
                className={`text-xs ${status === "active" ? "bg-blue-100 text-blue-600 border-blue-200" : status === "completed" ? "bg-green-100 text-green-600 border-green-200" : "bg-slate-100 text-slate-600 border-slate-200"}`}
              >
                {duration}
              </Badge>
              <Badge
                variant="outline"
                className={`text-xs ${status === "active" ? "bg-blue-100 text-blue-600 border-blue-200" : status === "completed" ? "bg-green-100 text-green-600 border-green-200" : "bg-slate-100 text-slate-600 border-slate-200"}`}
              >
                {difficulty}
              </Badge>
            </div>
          </div>
        </div>
        <p className="text-sm text-slate-600 mb-4">{description}</p>
        <div className="flex justify-end">
          {status === "active" && <Button className="bg-blue-600 hover:bg-blue-700">Continue Challenge</Button>}
          {status === "available" && <Button variant="outline">Start Challenge</Button>}
          {status === "completed" && (
            <Button variant="outline" className="text-green-600 border-green-200">
              View Certificate
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
