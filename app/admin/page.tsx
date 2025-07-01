"use client"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { useAuth } from "@/contexts/auth-context"
import Header from "@/components/header"
import Footer from "@/components/footer"
import LoadingSpinner from "@/components/loading-spinner"

export default function AdminPanel() {
  const { user, isAdmin, isLoading } = useAuth()
  const router = useRouter()
  const { toast } = useToast()
  const [youtubeApiKey, setYoutubeApiKey] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  useEffect(() => {
    // If user is not admin, redirect to home
    if (!isLoading && (!user || !isAdmin)) {
      toast({
        title: "Access denied",
        description: "You don't have permission to access this page.",
        variant: "destructive",
      })
      router.push("/")
    }
  }, [user, isAdmin, isLoading, router, toast])

  const handleSaveApiKey = () => {
    setIsSaving(true)
    // Simulate saving
    setTimeout(() => {
      setIsSaving(false)
      toast({
        title: "API Key saved",
        description: "Your YouTube API key has been saved successfully.",
        variant: "default",
      })
    }, 1000)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" text="Loading admin panel..." />
      </div>
    )
  }

  if (!user || !isAdmin) {
    return null // Will redirect in useEffect
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-24">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <h1 className="text-3xl font-bold mb-6">Admin Panel</h1>

          <Tabs defaultValue="dashboard">
            <TabsList className="mb-6">
              <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
              <TabsTrigger value="users">Users</TabsTrigger>
              <TabsTrigger value="content">Content</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="dashboard">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Total Users</CardTitle>
                    <CardDescription>All registered users</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">1,245</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Premium Users</CardTitle>
                    <CardDescription>Users with paid subscriptions</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">328</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle>Revenue</CardTitle>
                    <CardDescription>Monthly recurring revenue</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-3xl font-bold">$12,480</p>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                  <CardDescription>Latest user actions and system events</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">New user registered</p>
                        <p className="text-sm text-muted-foreground">john.doe@example.com</p>
                      </div>
                      <p className="text-sm text-muted-foreground">2 minutes ago</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">Subscription upgraded</p>
                        <p className="text-sm text-muted-foreground">sarah.smith@example.com</p>
                      </div>
                      <p className="text-sm text-muted-foreground">1 hour ago</p>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="font-medium">New content added</p>
                        <p className="text-sm text-muted-foreground">Anatomy Atlas - 3D Models</p>
                      </div>
                      <p className="text-sm text-muted-foreground">3 hours ago</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="users">
              <Card>
                <CardHeader>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>Manage user accounts and permissions</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    This is a demo admin panel. User management functionality would be implemented here.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="content">
              <Card>
                <CardHeader>
                  <CardTitle>Content Management</CardTitle>
                  <CardDescription>Manage educational resources and materials</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    This is a demo admin panel. Content management functionality would be implemented here.
                  </p>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings">
              <Card>
                <CardHeader>
                  <CardTitle>API Settings</CardTitle>
                  <CardDescription>Configure external API integrations</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="youtube-api">YouTube API Key</Label>
                      <Input
                        id="youtube-api"
                        value={youtubeApiKey}
                        onChange={(e) => setYoutubeApiKey(e.target.value)}
                        placeholder="Enter your YouTube API key"
                      />
                      <p className="text-xs text-muted-foreground">
                        Available keys:
                        <br />
                        AIzaSyAaLBfqqADVcEDH8e0_n3nsOFhVh_Szsuo
                        <br />
                        AIzaSyB2pOLDHE_6S1Nl0HJMhOxZ8wlIzhuU_L8
                        <br />
                        AIzaSyAm-y3XO3WTLw8v-ZGZMXMG5UIZt3IfMyM
                        <br />
                        AIzaSyDJ8LucSeyGcKgecwSdfYDO8lGkBe5ZE44
                      </p>
                    </div>
                    <Button onClick={handleSaveApiKey} disabled={isSaving}>
                      {isSaving ? <LoadingSpinner size="sm" /> : "Save API Key"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </motion.div>
      </main>

      <Footer />
    </div>
  )
}
