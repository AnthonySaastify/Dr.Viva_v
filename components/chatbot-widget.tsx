"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { MessageSquare, X, ArrowRight, User } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface Message {
  content: string
  isUser: boolean
  timestamp: Date
}

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      content: "Hello! I'm AIVA, your medical study assistant. How can I help you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ])
  const [inputValue, setInputValue] = useState("")

  const handleSendMessage = () => {
    if (!inputValue.trim()) return

    // Add user message
    const userMessage: Message = {
      content: inputValue,
      isUser: true,
      timestamp: new Date(),
    }

    setMessages((prev) => [...prev, userMessage])
    setInputValue("")

    // Simulate AI response after a short delay
    setTimeout(() => {
      const aiResponses = [
        "I can help you understand that concept. Let me explain...",
        "That's a great question about medical studies. Here's what you need to know...",
        "Based on your curriculum, here's what you should focus on...",
        "Let me find some resources on that topic for you...",
        "Would you like me to create a study plan for this subject?",
      ]

      const randomResponse = aiResponses[Math.floor(Math.random() * aiResponses.length)]

      const aiMessage: Message = {
        content: randomResponse,
        isUser: false,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, aiMessage])
    }, 1000)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="relative">
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="absolute bottom-16 right-0 w-80 md:w-96 bg-white dark:bg-slate-900 rounded-lg shadow-xl border border-slate-200 dark:border-slate-800 overflow-hidden"
          >
            <div className="border-b border-slate-200 dark:border-slate-800 p-3 flex justify-between items-center bg-blue-50 dark:bg-blue-900/30">
              <div className="flex items-center gap-2">
                <div className="bg-blue-100 dark:bg-blue-800 p-1 rounded-full">
                  <MessageSquare className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-medium">Ask AIVA</h3>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setIsOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>

            <div className="h-80 overflow-y-auto p-3 flex flex-col gap-3">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`${
                    message.isUser ? "bg-blue-100 dark:bg-blue-900/30 self-end" : "bg-slate-100 dark:bg-slate-800"
                  } rounded-lg p-3 max-w-[80%]`}
                >
                  {!message.isUser && (
                    <div className="flex items-center gap-1 mb-1">
                      <div className="bg-blue-500 rounded-full h-4 w-4 flex items-center justify-center">
                        <MessageSquare className="h-2 w-2 text-white" />
                      </div>
                      <span className="text-xs font-medium">AIVA</span>
                    </div>
                  )}
                  {message.isUser && (
                    <div className="flex items-center gap-1 mb-1">
                      <div className="bg-slate-500 rounded-full h-4 w-4 flex items-center justify-center">
                        <User className="h-2 w-2 text-white" />
                      </div>
                      <span className="text-xs font-medium">You</span>
                    </div>
                  )}
                  <p className="text-sm">{message.content}</p>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-200 dark:border-slate-800 p-3">
              <form
                className="relative"
                onSubmit={(e) => {
                  e.preventDefault()
                  handleSendMessage()
                }}
              >
                <Input
                  placeholder="Type your question..."
                  className="pr-10"
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                />
                <Button type="submit" variant="ghost" size="icon" className="absolute right-0 top-0 h-full">
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </form>
            </div>
          </motion.div>
        )}

        <Button
          className="h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 shadow-lg flex items-center justify-center"
          onClick={() => setIsOpen(!isOpen)}
        >
          <motion.div animate={isOpen ? { rotate: 45 } : { rotate: 0 }} transition={{ duration: 0.2 }}>
            {isOpen ? <X className="h-6 w-6" /> : <MessageSquare className="h-6 w-6" />}
          </motion.div>
        </Button>
      </div>
    </div>
  )
}
