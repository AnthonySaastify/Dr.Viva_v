"use client"

import { useState, useEffect } from "react"
import { ArrowLeft, Search, BookOpen, MessageSquare, Trophy } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface WordPair {
  georgian: string
  pronunciation: string
  english: string
}

interface SentencePair {
  georgian: string
  pronunciation: string
  english: string
}

interface LanguageData {
  title: string
  description: string
  word_pairs: WordPair[]
  sentence_pairs: SentencePair[]
}

export default function LanguageLearning() {
  const [languageData, setLanguageData] = useState<LanguageData | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("words")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadLanguageData = async () => {
      try {
        const response = await fetch("/data/georgian-english.json")
        const data = await response.json()
        setLanguageData(data)
      } catch (error) {
        console.error("Error loading language data:", error)
      } finally {
        setLoading(false)
      }
    }

    loadLanguageData()
  }, [])

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Loading language data...</p>
        </div>
      </div>
    )
  }

  if (!languageData) {
    return (
      <div className="min-h-screen bg-slate-900 text-white flex items-center justify-center">
        <div className="text-center">
          <p>Error loading language data</p>
        </div>
      </div>
    )
  }

  const filteredWords = languageData.word_pairs.filter(
    (word) =>
      word.georgian.toLowerCase().includes(searchTerm.toLowerCase()) ||
      word.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
      word.pronunciation.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const filteredSentences = languageData.sentence_pairs.filter(
    (sentence) =>
      sentence.georgian.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sentence.english.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sentence.pronunciation.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  return (
    <div className="min-h-screen bg-slate-900 text-white">
      {/* Header */}
      <div className="border-b border-slate-800 bg-slate-900/95 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/">
              <Button variant="ghost" size="sm" className="text-slate-400 hover:text-white">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>

          <div className="mb-6">
            <h1 className="text-4xl font-bold mb-2">Language Learning</h1>
            <p className="text-slate-400 text-lg mb-1">{languageData.title}</p>
            <p className="text-slate-500">{languageData.description}</p>
          </div>

          {/* Search */}
          <div className="relative mb-6">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400 h-5 w-5" />
            <Input
              placeholder="Search words or sentences..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 bg-slate-800 border-slate-700 text-white placeholder-slate-400 focus:border-blue-500"
            />
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="bg-slate-800 border-slate-700">
              <TabsTrigger value="words" className="data-[state=active]:bg-slate-700">
                <BookOpen className="h-4 w-4 mr-2" />
                Words ({filteredWords.length})
              </TabsTrigger>
              <TabsTrigger value="sentences" className="data-[state=active]:bg-slate-700">
                <MessageSquare className="h-4 w-4 mr-2" />
                Sentences ({filteredSentences.length})
              </TabsTrigger>
              <TabsTrigger value="practice" className="data-[state=active]:bg-slate-700">
                <Trophy className="h-4 w-4 mr-2" />
                Practice
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>

      {/* Content */}
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsContent value="words" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredWords.map((word, index) => (
                <Card key={index} className="bg-slate-800 border-slate-700 hover:bg-slate-750 transition-colors">
                  <CardContent className="p-6 text-center">
                    <div className="text-2xl font-bold text-white mb-2">{word.georgian}</div>
                    <div className="text-slate-400 text-sm mb-2 italic">[{word.pronunciation}]</div>
                    <div className="text-blue-400 text-lg font-medium">{word.english}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="sentences" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filteredSentences.map((sentence, index) => (
                <Card key={index} className="bg-slate-800 border-slate-700 hover:bg-slate-750 transition-colors">
                  <CardContent className="p-6">
                    <div className="text-lg font-bold text-white mb-2">{sentence.georgian}</div>
                    <div className="text-slate-400 text-sm mb-3 italic">[{sentence.pronunciation}]</div>
                    <div className="text-blue-400 font-medium">{sentence.english}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="practice" className="space-y-6">
            <div className="text-center py-12">
              <Trophy className="h-16 w-16 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-2xl font-bold mb-2">Practice Mode</h3>
              <p className="text-slate-400 mb-6">Test your knowledge with interactive exercises</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-2xl mx-auto">
                <Card className="bg-slate-800 border-slate-700 hover:bg-slate-750 transition-colors cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <BookOpen className="h-8 w-8 text-blue-500 mx-auto mb-3" />
                    <h4 className="font-bold mb-2">Word Practice</h4>
                    <p className="text-slate-400 text-sm">Practice Georgian vocabulary</p>
                    <Badge className="mt-3 bg-blue-600">Coming Soon</Badge>
                  </CardContent>
                </Card>
                <Card className="bg-slate-800 border-slate-700 hover:bg-slate-750 transition-colors cursor-pointer">
                  <CardContent className="p-6 text-center">
                    <MessageSquare className="h-8 w-8 text-green-500 mx-auto mb-3" />
                    <h4 className="font-bold mb-2">Sentence Practice</h4>
                    <p className="text-slate-400 text-sm">Practice Georgian sentences</p>
                    <Badge className="mt-3 bg-green-600">Coming Soon</Badge>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
