"use client"

import { useState, useEffect, useRef } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { 
  ArrowLeft, 
  Upload, 
  FileText, 
  FolderOpen, 
  Download, 
  Trash2, 
  Search,
  Filter,
  SortAsc,
  Eye,
  Calendar,
  User,
  File,
  FileImage,
  FileVideo,
  FileAudio,
  FileArchive,
  MoreVertical,
  Plus,
  Grid,
  List,
  LogIn,
  LogOut
} from "lucide-react"
import Link from "next/link"
import { useToast } from "@/hooks/use-toast"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import googleDriveService, { DriveFile } from "@/services/googleDriveService"

interface Document {
  id: string
  name: string
  type: string
  size: string
  uploadedBy: string
  uploadedAt: string
  description?: string
  tags: string[]
  driveId?: string
  webViewLink?: string
  webContentLink?: string
}

export default function DocumentStorage() {
  const [documents, setDocuments] = useState<Document[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [uploadProgress, setUploadProgress] = useState(0)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [sortBy, setSortBy] = useState("date")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showUploadForm, setShowUploadForm] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [documentName, setDocumentName] = useState("")
  const [documentDescription, setDocumentDescription] = useState("")
  const [documentTags, setDocumentTags] = useState("")
  const [isLoading, setIsLoading] = useState(true)
  const [isSignedIn, setIsSignedIn] = useState(false)
  
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { toast } = useToast()

  // Initialize Google Drive and load documents
  useEffect(() => {
    initializeGoogleDrive()
  }, [])

  const initializeGoogleDrive = async () => {
    try {
      setIsLoading(true)
      await googleDriveService.initGapi()
      
      if (googleDriveService.isSignedIn()) {
        setIsSignedIn(true)
        await loadDocumentsFromDrive()
      } else {
        // Load mock data if not signed in
        loadMockDocuments()
      }
    } catch (error) {
      console.error("Failed to initialize Google Drive:", error)
      loadMockDocuments()
    } finally {
      setIsLoading(false)
    }
  }

  const loadDocumentsFromDrive = async () => {
    try {
      // Use the specific Documents folder ID from environment variables
      const documentsFolderId = process.env.GOOGLE_DRIVE_FOLDER_ID || await googleDriveService.ensureFolderForSubject("Documents")
      
      // List all files in the Documents folder
      const driveFiles = await googleDriveService.listDriveFiles(`'${documentsFolderId}' in parents`)
      
      const driveDocuments: Document[] = driveFiles.map((file: DriveFile) => ({
        id: file.id,
        name: file.name,
        type: file.name.split('.').pop() || 'unknown',
        size: "Unknown", // Drive API doesn't provide size in basic listing
        uploadedBy: "Google Drive User",
        uploadedAt: new Date().toISOString().split('T')[0], // We'll need to get this from file metadata
        description: "",
        tags: [],
        driveId: file.id,
        webViewLink: `https://drive.google.com/file/d/${file.id}/view`,
        webContentLink: `https://drive.google.com/uc?export=download&id=${file.id}`
      }))
      
      setDocuments(driveDocuments)
    } catch (error) {
      console.error("Failed to load documents from Drive:", error)
      toast({
        title: "Error",
        description: "Failed to load documents from Google Drive",
        variant: "destructive",
      })
      loadMockDocuments()
    }
  }

  const loadMockDocuments = () => {
    const mockDocuments: Document[] = [
      {
        id: "1",
        name: "USMLE Step 1 Study Guide",
        type: "pdf",
        size: "2.5 MB",
        uploadedBy: "Dr. Smith",
        uploadedAt: "2024-01-15",
        description: "Comprehensive study guide for USMLE Step 1 preparation",
        tags: ["USMLE", "Step 1", "Study Guide"],
        driveId: "1abc123"
      },
      {
        id: "2",
        name: "Anatomy Notes",
        type: "docx",
        size: "1.8 MB",
        uploadedBy: "Dr. Johnson",
        uploadedAt: "2024-01-14",
        description: "Detailed anatomy notes with diagrams",
        tags: ["Anatomy", "Notes", "MBBS"],
        driveId: "2def456"
      },
      {
        id: "3",
        name: "Clinical Cases",
        type: "pdf",
        size: "3.2 MB",
        uploadedBy: "Dr. Williams",
        uploadedAt: "2024-01-13",
        description: "Collection of clinical case studies",
        tags: ["Clinical", "Cases", "Medicine"],
        driveId: "3ghi789"
      },
      {
        id: "4",
        name: "Pharmacology Review",
        type: "pptx",
        size: "4.1 MB",
        uploadedBy: "Dr. Brown",
        uploadedAt: "2024-01-12",
        description: "Pharmacology review slides",
        tags: ["Pharmacology", "Review", "Slides"],
        driveId: "4jkl012"
      }
    ]
    setDocuments(mockDocuments)
  }

  const handleSignIn = async () => {
    try {
      await googleDriveService.signIn()
      setIsSignedIn(true)
      await loadDocumentsFromDrive()
      toast({
        title: "Signed in successfully",
        description: "Connected to Google Drive",
      })
    } catch (error) {
      toast({
        title: "Sign in failed",
        description: "Failed to connect to Google Drive",
        variant: "destructive",
      })
    }
  }

  const handleSignOut = async () => {
    try {
      await googleDriveService.signOut()
      setIsSignedIn(false)
      loadMockDocuments()
      toast({
        title: "Signed out",
        description: "Disconnected from Google Drive",
      })
    } catch (error) {
      toast({
        title: "Sign out failed",
        description: "Failed to disconnect from Google Drive",
        variant: "destructive",
      })
    }
  }

  const getFileIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "pdf":
        return <FileText className="h-6 w-6 text-red-500" />
      case "docx":
      case "doc":
        return <FileText className="h-6 w-6 text-blue-500" />
      case "pptx":
      case "ppt":
        return <FileText className="h-6 w-6 text-orange-500" />
      case "xlsx":
      case "xls":
        return <FileText className="h-6 w-6 text-green-500" />
      case "jpg":
      case "jpeg":
      case "png":
        return <FileImage className="h-6 w-6 text-purple-500" />
      case "mp4":
      case "avi":
        return <FileVideo className="h-6 w-6 text-pink-500" />
      case "mp3":
      case "wav":
        return <FileAudio className="h-6 w-6 text-yellow-500" />
      case "zip":
      case "rar":
        return <FileArchive className="h-6 w-6 text-gray-500" />
      default:
        return <File className="h-6 w-6 text-gray-500" />
    }
  }

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file) {
      setSelectedFile(file)
      setDocumentName(file.name)
    }
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      toast({
        title: "No file selected",
        description: "Please select a file to upload",
        variant: "destructive",
      })
      return
    }

    if (!isSignedIn) {
      toast({
        title: "Not signed in",
        description: "Please sign in to Google Drive to upload files",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)
    setUploadProgress(0)

    try {
      // Use the specific Documents folder ID from environment variables
      const documentsFolderId = process.env.GOOGLE_DRIVE_FOLDER_ID || await googleDriveService.ensureFolderForSubject("Documents")
      
      // Upload file to Google Drive
      const uploadedFile = await googleDriveService.uploadFileToFolder(selectedFile, documentsFolderId)
      
      // Create new document entry
      const newDocument: Document = {
        id: uploadedFile.id,
        name: documentName || selectedFile.name,
        type: selectedFile.name.split('.').pop() || 'unknown',
        size: `${(selectedFile.size / 1024 / 1024).toFixed(1)} MB`,
        uploadedBy: "Current User",
        uploadedAt: new Date().toISOString().split('T')[0],
        description: documentDescription,
        tags: documentTags.split(',').map(tag => tag.trim()).filter(tag => tag),
        driveId: uploadedFile.id,
        webViewLink: `https://drive.google.com/file/d/${uploadedFile.id}/view`,
        webContentLink: `https://drive.google.com/uc?export=download&id=${uploadedFile.id}`
      }

      setDocuments(prev => [newDocument, ...prev])
      
      toast({
        title: "Upload successful",
        description: `${newDocument.name} has been uploaded to Google Drive`,
      })

      // Reset form
      setSelectedFile(null)
      setDocumentName("")
      setDocumentDescription("")
      setDocumentTags("")
      setShowUploadForm(false)
      setUploadProgress(0)

    } catch (error) {
      console.error("Upload error:", error)
      toast({
        title: "Upload failed",
        description: "An error occurred while uploading the file to Google Drive",
        variant: "destructive",
      })
    } finally {
      setIsUploading(false)
    }
  }

  const handleDownload = (document: Document) => {
    if (document.webContentLink) {
      // Open download link in new tab
      window.open(document.webContentLink, '_blank')
      toast({
        title: "Download started",
        description: `Downloading ${document.name}`,
      })
    } else {
      toast({
        title: "Download failed",
        description: "Download link not available",
        variant: "destructive",
      })
    }
  }

  const handleView = (document: Document) => {
    if (document.webViewLink) {
      // Open file in Google Drive viewer
      window.open(document.webViewLink, '_blank')
    } else {
      toast({
        title: "View failed",
        description: "View link not available",
        variant: "destructive",
      })
    }
  }

  const handleDelete = async (documentId: string) => {
    try {
      if (isSignedIn && documents.find(doc => doc.id === documentId)?.driveId) {
        // Delete from Google Drive
        await (window as any).gapi.client.drive.files.delete({
          fileId: documentId
        })
      }
      
      setDocuments(prev => prev.filter(doc => doc.id !== documentId))
      toast({
        title: "Document deleted",
        description: "The document has been removed",
      })
    } catch (error) {
      toast({
        title: "Delete failed",
        description: "Failed to delete document",
        variant: "destructive",
      })
    }
  }

  const filteredDocuments = documents
    .filter(doc => 
      doc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.description?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      doc.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
    )
    .filter(doc => selectedFilter === "all" || doc.type === selectedFilter)
    .sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.name.localeCompare(b.name)
        case "date":
          return new Date(b.uploadedAt).getTime() - new Date(a.uploadedAt).getTime()
        case "size":
          return parseFloat(a.size) - parseFloat(b.size)
        default:
          return 0
      }
    })

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
    return (
      <main className="min-h-screen bg-background pt-20">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
              <p className="text-muted-foreground">Loading documents...</p>
            </div>
          </div>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-background pt-20">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <Link href="/">
            <Button variant="outline" size="sm" className="mb-4">
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Home
            </Button>
          </Link>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
            <div className="flex justify-between items-start mb-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Document Storage</h1>
                <p className="text-lg text-muted-foreground">
                  Store, organize, and access your medical documents and study materials
                </p>
              </div>
              
              {/* Google Drive Authentication */}
              <div className="flex gap-2">
                {!isSignedIn ? (
                  <Button onClick={handleSignIn} variant="outline">
                    <LogIn className="h-4 w-4 mr-2" />
                    Connect Google Drive
                  </Button>
                ) : (
                  <Button onClick={handleSignOut} variant="outline">
                    <LogOut className="h-4 w-4 mr-2" />
                    Disconnect Drive
                  </Button>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* Upload Section */}
        <motion.div variants={itemVariants} initial="hidden" animate="visible" className="mb-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Upload Documents
                {isSignedIn && <Badge variant="secondary">Google Drive Connected</Badge>}
              </CardTitle>
              <CardDescription>
                {isSignedIn 
                  ? "Upload your medical documents, study materials, and resources to Google Drive"
                  : "Sign in to Google Drive to upload and store your documents securely"
                }
              </CardDescription>
            </CardHeader>
            <CardContent>
              {!showUploadForm ? (
                <div className="text-center py-8">
                  <Button 
                    onClick={() => setShowUploadForm(true)} 
                    className="mb-4"
                    disabled={!isSignedIn}
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Upload New Document
                  </Button>
                  <p className="text-sm text-muted-foreground">
                    Supported formats: PDF, DOCX, PPTX, XLSX, Images, Videos, Audio
                  </p>
                  {!isSignedIn && (
                    <p className="text-sm text-amber-600 mt-2">
                      ⚠️ Sign in to Google Drive to enable file uploads
                    </p>
                  )}
                </div>
              ) : (
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="file">Select File</Label>
                    <Input
                      id="file"
                      type="file"
                      ref={fileInputRef}
                      onChange={handleFileSelect}
                      accept=".pdf,.docx,.doc,.pptx,.ppt,.xlsx,.xls,.jpg,.jpeg,.png,.mp4,.avi,.mp3,.wav,.zip,.rar"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="name">Document Name</Label>
                    <Input
                      id="name"
                      value={documentName}
                      onChange={(e) => setDocumentName(e.target.value)}
                      placeholder="Enter document name"
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="description">Description (Optional)</Label>
                    <Textarea
                      id="description"
                      value={documentDescription}
                      onChange={(e) => setDocumentDescription(e.target.value)}
                      placeholder="Enter document description"
                      rows={3}
                    />
                  </div>
                  
                  <div>
                    <Label htmlFor="tags">Tags (Optional)</Label>
                    <Input
                      id="tags"
                      value={documentTags}
                      onChange={(e) => setDocumentTags(e.target.value)}
                      placeholder="Enter tags separated by commas (e.g., USMLE, Anatomy, Notes)"
                    />
                  </div>

                  {isUploading && (
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Uploading to Google Drive...</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <Progress value={uploadProgress} />
                    </div>
                  )}

                  <div className="flex gap-2">
                    <Button 
                      onClick={handleUpload} 
                      disabled={!selectedFile || isUploading || !isSignedIn}
                      className="flex-1"
                    >
                      {isUploading ? "Uploading..." : "Upload to Google Drive"}
                    </Button>
                    <Button 
                      variant="outline" 
                      onClick={() => setShowUploadForm(false)}
                      disabled={isUploading}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </motion.div>

        {/* Search and Filter Section */}
        <motion.div variants={itemVariants} initial="hidden" animate="visible" className="mb-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                      placeholder="Search documents..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">
                        <Filter className="h-4 w-4 mr-2" />
                        {selectedFilter === "all" ? "All Types" : selectedFilter.toUpperCase()}
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => setSelectedFilter("all")}>
                        All Types
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSelectedFilter("pdf")}>
                        PDF
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSelectedFilter("docx")}>
                        Word Documents
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSelectedFilter("pptx")}>
                        PowerPoint
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSelectedFilter("xlsx")}>
                        Excel
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline">
                        <SortAsc className="h-4 w-4 mr-2" />
                        Sort
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => setSortBy("date")}>
                        Date
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortBy("name")}>
                        Name
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSortBy("size")}>
                        Size
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  
                  <Button
                    variant="outline"
                    onClick={() => setViewMode(viewMode === "grid" ? "list" : "grid")}
                  >
                    {viewMode === "grid" ? <List className="h-4 w-4" /> : <Grid className="h-4 w-4" />}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Documents Grid/List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}
        >
          {filteredDocuments.map((document) => (
            <motion.div key={document.id} variants={itemVariants}>
              <Card className="h-full">
                <CardHeader className="pb-3">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      {getFileIcon(document.type)}
                      <div className="flex-1 min-w-0">
                        <CardTitle className="text-lg truncate">{document.name}</CardTitle>
                        <p className="text-sm text-muted-foreground">{document.type.toUpperCase()}</p>
                      </div>
                    </div>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => handleView(document)}>
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleDownload(document)}>
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDelete(document.id)}
                          className="text-red-600"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </CardHeader>
                
                <CardContent>
                  {document.description && (
                    <p className="text-sm text-muted-foreground mb-3">{document.description}</p>
                  )}
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <User className="h-3 w-3" />
                      {document.uploadedBy}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {document.uploadedAt}
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{document.size}</span>
                    {isSignedIn && document.driveId && (
                      <Badge variant="secondary" className="text-xs">
                        Google Drive
                      </Badge>
                    )}
                  </div>
                  
                  {document.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mt-3">
                      {document.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>

        {filteredDocuments.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-12"
          >
            <FolderOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No documents found</h3>
            <p className="text-muted-foreground">
              {searchTerm ? "Try adjusting your search terms" : "Upload your first document to get started"}
            </p>
          </motion.div>
        )}
      </div>
    </main>
  )
}
