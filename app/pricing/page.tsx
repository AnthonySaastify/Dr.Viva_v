"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { ArrowLeft, Check, CreditCard } from "lucide-react"
import Link from "next/link"
import Header from "@/components/header"
import Footer from "@/components/footer"
import PaymentForm from "@/components/payment-form"
import { useAuth } from "@/contexts/auth-context"
import { useToast } from "@/components/ui/use-toast"

export default function Pricing() {
  const [billingCycle, setBillingCycle] = useState("monthly")
  const [showPaymentDialog, setShowPaymentDialog] = useState(false)
  const [selectedPlan, setSelectedPlan] = useState<"learn" | "premium" | null>(null)
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // If user is not logged in, redirect to sign in page
    if (!isLoading && !user) {
      toast({
        title: "Authentication required",
        description: "Please sign in to access this page.",
        variant: "default",
      })
      router.push("/sign-in")
    }
  }, [user, isLoading, router, toast])

  const plans = [
    {
      name: "Free",
      description: "Basic tools to get started",
      price: { monthly: "$0", annually: "$0" },
      features: [
        "Track & Plan features",
        "Study timeline creation",
        "Basic progress tracking",
        "Limited resource access",
        "Community forum access",
      ],
      cta: "Current Plan",
      popular: false,
      type: "free" as const,
    },
    {
      name: "Learn Space",
      description: "Enhanced learning resources",
      price: { monthly: "$20", annually: "$192" },
      features: [
        "Everything in Free plan",
        "Full Learn Space access",
        "Unlimited books and videos",
        "Practice questions",
        "Study analytics",
        "Email support",
      ],
      cta: "Upgrade Now",
      popular: true,
      type: "learn" as const,
    },
    {
      name: "Premium",
      description: "Complete educational suite",
      price: { monthly: "$40", annually: "$384" },
      features: [
        "Everything in Learn Space plan",
        "Full Curriculum Hub access",
        "Personalized study plans",
        "Exam preparation materials",
        "1-on-1 mentoring session monthly",
        "Priority support",
      ],
      cta: "Go Premium",
      popular: false,
      type: "premium" as const,
    },
  ]

  const handlePlanSelect = (planType: "learn" | "premium") => {
    if (!user) {
      router.push("/sign-in")
      return
    }

    setSelectedPlan(planType)
    setShowPaymentDialog(true)
  }

  const handlePaymentSuccess = () => {
    setShowPaymentDialog(false)
    router.push("/dashboard")
  }

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

  if (isLoading) {
    return null // Or a loading spinner
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
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Choose Your Plan</h1>
            <p className="text-lg text-muted-foreground mb-6">Select the plan that best fits your educational needs</p>
          </motion.div>
        </div>

        <div className="flex justify-center mb-8">
          <Tabs defaultValue="monthly" value={billingCycle} onValueChange={setBillingCycle}>
            <TabsList>
              <TabsTrigger value="monthly">Monthly</TabsTrigger>
              <TabsTrigger value="annually">
                Annually{" "}
                <Badge className="ml-2 bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                  Save 20%
                </Badge>
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {plans.map((plan, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -10 }}
              transition={{ type: "spring", stiffness: 300 }}
              className="relative"
            >
              {plan.popular && (
                <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <Badge className="bg-blue-600 text-white px-3 py-1">Most Popular</Badge>
                </div>
              )}
              <Card className={`h-full ${plan.popular ? "border-blue-300 dark:border-blue-700 shadow-lg" : ""}`}>
                <CardHeader>
                  <CardTitle>{plan.name}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-6">
                    <span className="text-4xl font-bold">{plan.price[billingCycle as keyof typeof plan.price]}</span>
                    {plan.name !== "Free" && (
                      <span className="text-muted-foreground ml-2">
                        {billingCycle === "monthly" ? "per month" : "per year"}
                      </span>
                    )}
                  </div>

                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, i) => (
                      <li key={i} className="flex items-start">
                        <Check className="h-5 w-5 text-green-500 mr-2 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
                <CardFooter>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="w-full">
                    {user?.plan === plan.type ? (
                      <Button
                        className={`w-full ${plan.popular ? "bg-blue-600 hover:bg-blue-700 text-white" : ""}`}
                        variant={plan.popular ? "default" : "outline"}
                        disabled
                      >
                        Current Plan
                      </Button>
                    ) : user?.plan === "premium" && plan.type !== "premium" ? (
                      <Button
                        className={`w-full ${plan.popular ? "bg-blue-600 hover:bg-blue-700 text-white" : ""}`}
                        variant={plan.popular ? "default" : "outline"}
                        disabled
                      >
                        Downgrade
                      </Button>
                    ) : (
                      <Button
                        className={`w-full ${plan.popular ? "bg-blue-600 hover:bg-blue-700 text-white" : ""}`}
                        variant={plan.popular ? "default" : "outline"}
                        onClick={() => plan.type !== "free" && handlePlanSelect(plan.type)}
                      >
                        {plan.name === "Free" ? (
                          plan.cta
                        ) : (
                          <span className="flex items-center">
                            <CreditCard className="mr-2 h-4 w-4" />
                            {plan.cta}
                          </span>
                        )}
                      </Button>
                    )}
                  </motion.div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        <div className="mt-12 text-center">
          <h2 className="text-2xl font-bold mb-4">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto">
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="space-y-6">
              <motion.div variants={itemVariants} className="text-left">
                <h3 className="text-lg font-medium mb-2">Can I switch plans later?</h3>
                <p className="text-muted-foreground">
                  Yes, you can upgrade, downgrade, or cancel your plan at any time. Changes will take effect at the
                  start of your next billing cycle.
                </p>
              </motion.div>
              <motion.div variants={itemVariants} className="text-left">
                <h3 className="text-lg font-medium mb-2">Is there a student discount?</h3>
                <p className="text-muted-foreground">
                  Yes, we offer a 15% discount for verified students. Contact our support team with your student ID to
                  apply for the discount.
                </p>
              </motion.div>
              <motion.div variants={itemVariants} className="text-left">
                <h3 className="text-lg font-medium mb-2">What payment methods do you accept?</h3>
                <p className="text-muted-foreground">
                  We accept all major credit cards, PayPal, and Apple Pay. All payments are processed securely through
                  our payment provider.
                </p>
              </motion.div>
              <motion.div variants={itemVariants} className="text-left">
                <h3 className="text-lg font-medium mb-2">Can I get a refund if I'm not satisfied?</h3>
                <p className="text-muted-foreground">
                  We offer a 14-day money-back guarantee for all paid plans. If you're not satisfied with our service,
                  contact our support team within 14 days of your purchase for a full refund.
                </p>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Payment Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="sm:max-w-md">
          {selectedPlan && (
            <PaymentForm
              planType={selectedPlan}
              planPrice={
                billingCycle === "monthly"
                  ? selectedPlan === "learn"
                    ? "$20"
                    : "$40"
                  : selectedPlan === "learn"
                    ? "$192"
                    : "$384"
              }
              onSuccess={handlePaymentSuccess}
              onCancel={() => setShowPaymentDialog(false)}
            />
          )}
        </DialogContent>
      </Dialog>

      <Footer />
    </main>
  )
}
