"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, XCircle, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { createTaskAction } from "@/app/actions/task-actions"
import googleDriveService from "@/services/googleDriveService"

export default function TestIntegrations() {
  const [isTestingSheets, setIsTestingSheets] = useState(false)
  const [isTestingDrive, setIsTestingDrive] = useState(false)
  const [sheetsResult, setSheetsResult] = useState<any>(null)
  const [driveResult, setDriveResult] = useState<any>(null)
  const { toast } = useToast()

  const testGoogleSheets = async () => {
    setIsTestingSheets(true)
    setSheetsResult(null)
    
    try {
      // Test task creation
      const formData = new FormData()
      formData.append("title", "Test Task - " + new Date().toLocaleString())
      formData.append("description", "Testing Google Sheets integration from browser")
      formData.append("scheduledDate", new Date().toISOString().split('T')[0])
      
      const result = await createTaskAction(formData)
      
      if (result.success) {
        setSheetsResult({ success: true, message: result.message })
        toast({
          title: "✅ Google Sheets Test Passed",
          description: "Task created successfully in Google Sheets",
        })
      } else {
        setSheetsResult({ success: false, error: result.error })
        toast({
          title: "❌ Google Sheets Test Failed",
          description: result.error,
          variant: "destructive",
        })
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error"
      setSheetsResult({ success: false, error: errorMessage })
      toast({
        title: "❌ Google Sheets Test Failed",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsTestingSheets(false)
    }
  }

  const testGoogleDrive = async () => {
    setIsTestingDrive(true)
    setDriveResult(null)
    
    try {
      // Test Google Drive initialization
      await googleDriveService.initGapi()
      
      if (googleDriveService.isSignedIn()) {
        setDriveResult({ success: true, message: "Google Drive is connected and ready" })
        toast({
          title: "✅ Google Drive Test Passed",
          description: "Google Drive is connected and ready for use",
        })
      } else {
        setDriveResult({ 
          success: false, 
          error: "Not signed in to Google Drive. Please sign in first." 
        })
        toast({
          title: "⚠️ Google Drive Test - Sign In Required",
          description: "Please sign in to Google Drive to test functionality",
        })
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown error"
      setDriveResult({ success: false, error: errorMessage })
      toast({
        title: "❌ Google Drive Test Failed",
        description: errorMessage,
        variant: "destructive",
      })
    } finally {
      setIsTestingDrive(false)
    }
  }

  const signInToDrive = async () => {
    try {
      await googleDriveService.signIn()
      toast({
        title: "✅ Signed in to Google Drive",
        description: "You can now test Google Drive functionality",
      })
      setDriveResult({ success: true, message: "Successfully signed in to Google Drive" })
    } catch (error) {
      toast({
        title: "❌ Google Drive Sign In Failed",
        description: error instanceof Error ? error.message : "Unknown error",
        variant: "destructive",
      })
    }
  }

  return (
    <main className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Integration Tests</h1>
          <p className="text-lg text-muted-foreground">
            Test Google Drive and Google Sheets integrations before deployment
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Google Sheets Test */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Google Sheets Integration
                {sheetsResult && (
                  sheetsResult.success ? 
                    <CheckCircle className="h-5 w-5 text-green-500" /> : 
                    <XCircle className="h-5 w-5 text-red-500" />
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Test creating a task in Google Sheets using your service account credentials.
              </p>
              
              <Button 
                onClick={testGoogleSheets} 
                disabled={isTestingSheets}
                className="w-full"
              >
                {isTestingSheets ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Testing...
                  </>
                ) : (
                  "Test Google Sheets"
                )}
              </Button>

              {sheetsResult && (
                <div className={`p-3 rounded-md ${
                  sheetsResult.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                }`}>
                  <p className={`text-sm ${
                    sheetsResult.success ? 'text-green-700' : 'text-red-700'
                  }`}>
                    {sheetsResult.success ? sheetsResult.message : sheetsResult.error}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Google Drive Test */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                Google Drive Integration
                {driveResult && (
                  driveResult.success ? 
                    <CheckCircle className="h-5 w-5 text-green-500" /> : 
                    <XCircle className="h-5 w-5 text-red-500" />
                )}
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Test Google Drive connection and authentication.
              </p>
              
              <div className="space-y-2">
                <Button 
                  onClick={testGoogleDrive} 
                  disabled={isTestingDrive}
                  className="w-full"
                >
                  {isTestingDrive ? (
                    <>
                      <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                      Testing...
                    </>
                  ) : (
                    "Test Google Drive"
                  )}
                </Button>
                
                <Button 
                  onClick={signInToDrive} 
                  variant="outline"
                  className="w-full"
                >
                  Sign In to Google Drive
                </Button>
              </div>

              {driveResult && (
                <div className={`p-3 rounded-md ${
                  driveResult.success ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'
                }`}>
                  <p className={`text-sm ${
                    driveResult.success ? 'text-green-700' : 'text-red-700'
                  }`}>
                    {driveResult.success ? driveResult.message : driveResult.error}
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Environment Variables Check */}
        <Card className="mt-6">
          <CardHeader>
            <CardTitle>Environment Variables Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <h4 className="font-medium mb-2">Google Sheets (Backend)</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-2">
                    <Badge variant={process.env.GOOGLE_CLIENT_EMAIL ? "default" : "destructive"}>
                      {process.env.GOOGLE_CLIENT_EMAIL ? "✅" : "❌"}
                    </Badge>
                    <span>GOOGLE_CLIENT_EMAIL</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={process.env.GOOGLE_PRIVATE_KEY ? "default" : "destructive"}>
                      {process.env.GOOGLE_PRIVATE_KEY ? "✅" : "❌"}
                    </Badge>
                    <span>GOOGLE_PRIVATE_KEY</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={process.env.GOOGLE_SHEETS_ID ? "default" : "destructive"}>
                      {process.env.GOOGLE_SHEETS_ID ? "✅" : "❌"}
                    </Badge>
                    <span>GOOGLE_SHEETS_ID</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Google Drive (Frontend)</h4>
                <div className="space-y-1 text-sm">
                  <div className="flex items-center gap-2">
                    <Badge variant={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ? "default" : "destructive"}>
                      {process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ? "✅" : "❌"}
                    </Badge>
                    <span>NEXT_PUBLIC_GOOGLE_CLIENT_ID</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge variant={process.env.GOOGLE_DRIVE_FOLDER_ID ? "default" : "destructive"}>
                      {process.env.GOOGLE_DRIVE_FOLDER_ID ? "✅" : "❌"}
                    </Badge>
                    <span>GOOGLE_DRIVE_FOLDER_ID</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
              <p className="text-sm text-blue-700">
                <strong>Note:</strong> Environment variables marked with ❌ are not available in the browser for security reasons. 
                They will work in production on Vercel where they are properly configured.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
} 