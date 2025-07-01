"use client"

import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ArrowLeft, Download, Share2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

// In a real app, this would come from the assessment data
const mockUserData = {
  country: "United States",
  stage: "pre_med",
  interest: "cardiology",
}

export default function Roadmap() {
  const [activeTab, setActiveTab] = useState("overview")

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
              <CardTitle className="text-blue-700">Your Medical Career Roadmap</CardTitle>
              <CardDescription>
                Customized for {mockUserData.country} with focus on {mockUserData.interest}
              </CardDescription>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                <Download className="mr-2 h-4 w-4" /> Save
              </Button>
              <Button variant="outline" size="sm">
                <Share2 className="mr-2 h-4 w-4" /> Share
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          <Tabs defaultValue="overview" value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid grid-cols-3 mb-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="exams">Key Exams</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-4">
              <h3 className="text-lg font-medium text-blue-700">
                Path to Becoming a Cardiologist in the United States
              </h3>
              <p className="text-slate-600">
                This roadmap outlines the educational journey from pre-med to becoming a board-certified cardiologist in
                the United States. The entire process typically takes 14-16 years after high school.
              </p>

              <div className="bg-blue-50 p-4 rounded-lg">
                <h4 className="font-medium text-blue-700 mb-2">Your Current Stage: Pre-Med / Undergraduate</h4>
                <p className="text-slate-600 text-sm">
                  You're currently in the undergraduate phase. Focus on maintaining a high GPA, preparing for the MCAT,
                  and gaining clinical experience through volunteering or shadowing.
                </p>
              </div>

              <div className="space-y-4 mt-6">
                <RoadmapStage
                  number={1}
                  title="Pre-Med / Undergraduate (4 years)"
                  description="Bachelor's degree with pre-med requirements (Biology, Chemistry, Physics, etc.)"
                  milestones={[
                    "Maintain GPA above 3.5",
                    "Prepare for MCAT",
                    "Clinical volunteering",
                    "Research experience",
                  ]}
                  current={true}
                />

                <RoadmapStage
                  number={2}
                  title="Medical School (4 years)"
                  description="MD or DO degree program"
                  milestones={[
                    "Years 1-2: Pre-clinical studies",
                    "USMLE Step 1",
                    "Years 3-4: Clinical rotations",
                    "USMLE Step 2 CK",
                  ]}
                />

                <RoadmapStage
                  number={3}
                  title="Internal Medicine Residency (3 years)"
                  description="Graduate Medical Education in Internal Medicine"
                  milestones={["USMLE Step 3", "In-Training Exams", "Internal Medicine Board Certification"]}
                />

                <RoadmapStage
                  number={4}
                  title="Cardiology Fellowship (3 years)"
                  description="Specialized training in cardiovascular medicine"
                  milestones={["General cardiology training", "Research", "Cardiology Board Certification"]}
                />

                <RoadmapStage
                  number={5}
                  title="Optional: Advanced Fellowship (1-2 years)"
                  description="Subspecialty training (Interventional, Electrophysiology, etc.)"
                  milestones={["Subspecialty training", "Subspecialty Board Certification"]}
                />
              </div>
            </TabsContent>

            <TabsContent value="timeline" className="space-y-4">
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-blue-200"></div>

                <TimelineItem
                  year="Years 1-4"
                  title="Undergraduate / Pre-Med"
                  description="Bachelor's degree with science prerequisites"
                  highlights={[
                    "Biology, Chemistry, Physics, Math",
                    "MCAT preparation and exam",
                    "Clinical experience",
                    "Application to medical schools",
                  ]}
                  current={true}
                />

                <TimelineItem
                  year="Years 5-6"
                  title="Medical School (Pre-clinical)"
                  description="Basic sciences and fundamentals"
                  highlights={[
                    "Anatomy, Physiology, Biochemistry",
                    "Pathology, Pharmacology",
                    "USMLE Step 1",
                    "Begin clinical skills training",
                  ]}
                />

                <TimelineItem
                  year="Years 7-8"
                  title="Medical School (Clinical)"
                  description="Clinical rotations and electives"
                  highlights={[
                    "Core rotations (Internal Medicine, Surgery, etc.)",
                    "Cardiology electives",
                    "USMLE Step 2 CK",
                    "Residency applications",
                  ]}
                />

                <TimelineItem
                  year="Years 9-11"
                  title="Internal Medicine Residency"
                  description="Graduate medical education"
                  highlights={[
                    "Inpatient and outpatient care",
                    "USMLE Step 3",
                    "Internal Medicine Board Certification",
                    "Fellowship applications",
                  ]}
                />

                <TimelineItem
                  year="Years 12-14"
                  title="Cardiology Fellowship"
                  description="Specialized cardiovascular training"
                  highlights={[
                    "Cardiac catheterization",
                    "Echocardiography",
                    "Electrophysiology",
                    "Cardiology Board Certification",
                  ]}
                />

                <TimelineItem
                  year="Years 15-16 (Optional)"
                  title="Advanced Fellowship"
                  description="Subspecialty training"
                  highlights={[
                    "Interventional cardiology",
                    "Electrophysiology",
                    "Advanced heart failure",
                    "Subspecialty Board Certification",
                  ]}
                />
              </div>
            </TabsContent>

            <TabsContent value="exams" className="space-y-4">
              <div className="grid gap-4">
                <ExamCard
                  name="MCAT"
                  timing="Undergraduate (typically junior year)"
                  description="Medical College Admission Test - required for medical school admission"
                  tips={[
                    "Start preparing 6-12 months in advance",
                    "Take practice tests regularly",
                    "Consider a prep course or tutor",
                  ]}
                  resources={["AAMC Official Materials", "Kaplan MCAT Prep", "Princeton Review"]}
                  current={true}
                />

                <ExamCard
                  name="USMLE Step 1"
                  timing="Medical School (end of year 2)"
                  description="Tests basic science knowledge and its application to medicine"
                  tips={[
                    "Focus on high-yield topics",
                    "Use question banks extensively",
                    "Create a structured study schedule",
                  ]}
                  resources={["First Aid for USMLE Step 1", "UWorld Question Bank", "Boards and Beyond"]}
                />

                <ExamCard
                  name="USMLE Step 2 CK"
                  timing="Medical School (year 3 or 4)"
                  description="Tests clinical knowledge and application"
                  tips={["Build on Step 1 knowledge", "Learn from clinical rotations", "Practice clinical vignettes"]}
                  resources={["UWorld Step 2 CK", "Online MedEd", "Step Up to Medicine"]}
                />

                <ExamCard
                  name="USMLE Step 3"
                  timing="Residency (year 1 or 2)"
                  description="Tests readiness for unsupervised practice"
                  tips={["Focus on patient management", "Practice CCS cases", "Review common outpatient scenarios"]}
                  resources={["UWorld Step 3", "Master the Boards Step 3", "CCS Case Simulator"]}
                />

                <ExamCard
                  name="Internal Medicine Board Certification"
                  timing="End of Internal Medicine Residency"
                  description="Certification by the American Board of Internal Medicine (ABIM)"
                  tips={["Use MKSAP extensively", "Join board review courses", "Form study groups"]}
                  resources={["MKSAP", "UWorld Internal Medicine", "Board Basics"]}
                />

                <ExamCard
                  name="Cardiology Board Certification"
                  timing="End of Cardiology Fellowship"
                  description="Subspecialty certification in Cardiovascular Disease"
                  tips={[
                    "Focus on ECG interpretation",
                    "Master echocardiography principles",
                    "Review latest guidelines",
                  ]}
                  resources={["ACC/AHA Guidelines", "COCATS Training Requirements", "Board Review Courses"]}
                />
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="bg-blue-50 rounded-b-lg text-center text-sm text-blue-700 py-3">
          "The path may seem long, but each step brings you closer to your goal. You've got this!"
        </CardFooter>
      </Card>

      <div className="flex justify-between">
        <Link href="/assessment">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" /> Update Assessment
          </Button>
        </Link>
        <Link href="/learning">
          <Button className="bg-blue-600 hover:bg-blue-700">View Learning Resources</Button>
        </Link>
      </div>
    </div>
  )
}

function RoadmapStage({
  number,
  title,
  description,
  milestones,
  current = false,
}: {
  number: number
  title: string
  description: string
  milestones: string[]
  current?: boolean
}) {
  return (
    <div className={`border rounded-lg p-4 ${current ? "border-blue-300 bg-blue-50" : "border-slate-200"}`}>
      <div className="flex items-start gap-4">
        <div
          className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${current ? "bg-blue-600 text-white" : "bg-slate-200 text-slate-700"}`}
        >
          {number}
        </div>
        <div className="flex-1">
          <h4 className={`font-medium ${current ? "text-blue-700" : "text-slate-700"}`}>{title}</h4>
          <p className="text-slate-600 text-sm mb-3">{description}</p>
          <ul className="space-y-1">
            {milestones.map((milestone, index) => (
              <li key={index} className="text-sm flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span className="text-slate-600">{milestone}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

function TimelineItem({
  year,
  title,
  description,
  highlights,
  current = false,
}: {
  year: string
  title: string
  description: string
  highlights: string[]
  current?: boolean
}) {
  return (
    <div className="ml-8 mb-8 relative">
      <div
        className={`absolute -left-12 top-0 w-8 h-8 rounded-full flex items-center justify-center ${current ? "bg-blue-600" : "bg-blue-200"}`}
      >
        <div className={`w-3 h-3 rounded-full ${current ? "bg-white" : "bg-blue-600"}`}></div>
      </div>
      <div className={`border rounded-lg p-4 ${current ? "border-blue-300 bg-blue-50" : "border-slate-200"}`}>
        <div className="text-sm font-medium text-blue-600 mb-1">{year}</div>
        <h4 className="font-medium text-slate-800 mb-1">{title}</h4>
        <p className="text-slate-600 text-sm mb-3">{description}</p>
        <ul className="space-y-1">
          {highlights.map((highlight, index) => (
            <li key={index} className="text-sm flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              <span className="text-slate-600">{highlight}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

function ExamCard({
  name,
  timing,
  description,
  tips,
  resources,
  current = false,
}: {
  name: string
  timing: string
  description: string
  tips: string[]
  resources: string[]
  current?: boolean
}) {
  return (
    <Card className={`border ${current ? "border-blue-300" : "border-slate-200"}`}>
      <CardHeader className={`pb-2 ${current ? "bg-blue-50" : ""}`}>
        <CardTitle className="text-lg text-blue-700">{name}</CardTitle>
        <CardDescription>{timing}</CardDescription>
      </CardHeader>
      <CardContent className="pt-4">
        <p className="text-slate-600 text-sm mb-3">{description}</p>

        <div className="mb-3">
          <h5 className="text-sm font-medium text-slate-700 mb-1">Study Tips:</h5>
          <ul className="space-y-1">
            {tips.map((tip, index) => (
              <li key={index} className="text-sm flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span className="text-slate-600">{tip}</span>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h5 className="text-sm font-medium text-slate-700 mb-1">Recommended Resources:</h5>
          <ul className="space-y-1">
            {resources.map((resource, index) => (
              <li key={index} className="text-sm flex items-start">
                <span className="text-blue-500 mr-2">•</span>
                <span className="text-slate-600">{resource}</span>
              </li>
            ))}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}
