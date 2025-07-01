"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ArrowRight, ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import Link from "next/link"

const formSchema = z.object({
  country: z.string().min(2, {
    message: "Please enter your country or region",
  }),
  stage: z.string({
    required_error: "Please select your current stage",
  }),
  interest: z.string().optional(),
  learningStyle: z.string({
    required_error: "Please select your preferred learning style",
  }),
})

export default function Assessment() {
  const router = useRouter()
  const [step, setStep] = useState(1)
  const totalSteps = 4

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      country: "",
      stage: "",
      interest: "",
      learningStyle: "",
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values)
    // In a real app, we would save this data to state/context/localStorage
    router.push("/roadmap")
  }

  const nextStep = () => {
    if (step < totalSteps) {
      setStep(step + 1)
    }
  }

  const prevStep = () => {
    if (step > 1) {
      setStep(step - 1)
    }
  }

  return (
    <div className="max-w-md mx-auto">
      <Card className="border-blue-100 shadow-md">
        <CardHeader className="bg-blue-50 rounded-t-lg">
          <CardTitle className="text-blue-700">Tell Us About Yourself</CardTitle>
          <CardDescription>
            Step {step} of {totalSteps}: {getStepDescription(step)}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              {step === 1 && (
                <FormField
                  control={form.control}
                  name="country"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country or Region</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g. United States, India, UK" {...field} />
                      </FormControl>
                      <FormDescription>This helps us provide country-specific guidance.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {step === 2 && (
                <FormField
                  control={form.control}
                  name="stage"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Education Stage</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select your current stage" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="high_school">High School</SelectItem>
                          <SelectItem value="pre_med">Pre-Med / Undergraduate</SelectItem>
                          <SelectItem value="med_school_1_2">Medical School (Year 1-2)</SelectItem>
                          <SelectItem value="med_school_3_4">Medical School (Year 3-4)</SelectItem>
                          <SelectItem value="residency">Residency</SelectItem>
                          <SelectItem value="fellowship">Fellowship</SelectItem>
                          <SelectItem value="practicing">Practicing Physician</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>Your current position in your medical journey.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {step === 3 && (
                <FormField
                  control={form.control}
                  name="interest"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Medical Interest (Optional)</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select area of interest" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="general">General Medicine</SelectItem>
                          <SelectItem value="surgery">Surgery</SelectItem>
                          <SelectItem value="pediatrics">Pediatrics</SelectItem>
                          <SelectItem value="cardiology">Cardiology</SelectItem>
                          <SelectItem value="neurology">Neurology</SelectItem>
                          <SelectItem value="psychiatry">Psychiatry</SelectItem>
                          <SelectItem value="emergency">Emergency Medicine</SelectItem>
                          <SelectItem value="other">Other / Not Sure Yet</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>This helps us tailor resources to your interests.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {step === 4 && (
                <FormField
                  control={form.control}
                  name="learningStyle"
                  render={({ field }) => (
                    <FormItem className="space-y-3">
                      <FormLabel>Preferred Learning Style</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          className="flex flex-col space-y-1"
                        >
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="reading" />
                            </FormControl>
                            <FormLabel className="font-normal">Reading (Books, Articles)</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="visual" />
                            </FormControl>
                            <FormLabel className="font-normal">Visual (Videos, Diagrams)</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="interactive" />
                            </FormControl>
                            <FormLabel className="font-normal">Interactive (Quizzes, Flashcards)</FormLabel>
                          </FormItem>
                          <FormItem className="flex items-center space-x-3 space-y-0">
                            <FormControl>
                              <RadioGroupItem value="practical" />
                            </FormControl>
                            <FormLabel className="font-normal">Practical (Case Studies, Practice Questions)</FormLabel>
                          </FormItem>
                        </RadioGroup>
                      </FormControl>
                      <FormDescription>We'll recommend resources that match your learning style.</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <div className="flex justify-between pt-2">
                {step > 1 ? (
                  <Button type="button" variant="outline" onClick={prevStep}>
                    <ArrowLeft className="mr-2 h-4 w-4" /> Back
                  </Button>
                ) : (
                  <Link href="/">
                    <Button type="button" variant="outline">
                      <ArrowLeft className="mr-2 h-4 w-4" /> Home
                    </Button>
                  </Link>
                )}

                {step < totalSteps ? (
                  <Button type="button" onClick={nextStep} className="bg-blue-600 hover:bg-blue-700">
                    Next <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                    Submit <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
        <CardFooter className="bg-blue-50 rounded-b-lg text-center text-sm text-blue-700 py-3">
          "Every great doctor started with the first step. You're on your way!"
        </CardFooter>
      </Card>
    </div>
  )
}

function getStepDescription(step: number): string {
  switch (step) {
    case 1:
      return "Your Location"
    case 2:
      return "Education Level"
    case 3:
      return "Medical Interests"
    case 4:
      return "Learning Preferences"
    default:
      return ""
  }
}
