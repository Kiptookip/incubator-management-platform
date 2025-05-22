"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import { ArrowLeft, Send, Loader2 } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"

type Message = {
  id: string
  sender: "mentor" | "startup"
  senderName: string
  content: string
  timestamp: string
}

type Startup = {
  id: string
  name: string
  founderName: string
}

export default function MessagesPage({ params }: { params: { id: string } }) {
  const { user } = useAuth()
  const [startup, setStartup] = useState<Startup | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [newMessage, setNewMessage] = useState("")
  const [sending, setSending] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // In a real app, this would be an API call to fetch the startup details
    // For demo purposes, we'll use mock data
    const mockStartup: Startup = {
      id: params.id,
      name: "TechInnovate",
      founderName: "John Doe",
    }

    const mockMessages: Message[] = [
      {
        id: "1",
        sender: "mentor",
        senderName: user?.name || "Mentor",
        content: "Hello! How is your project progressing?",
        timestamp: "2023-07-10T10:30:00Z",
      },
      {
        id: "2",
        sender: "startup",
        senderName: "John Doe",
        content: "Hi! We're making good progress. We've completed the MVP and are now testing with a few users.",
        timestamp: "2023-07-10T10:35:00Z",
      },
      {
        id: "3",
        sender: "mentor",
        senderName: user?.name || "Mentor",
        content: "That's great to hear! Have you encountered any challenges?",
        timestamp: "2023-07-10T10:40:00Z",
      },
      {
        id: "4",
        sender: "startup",
        senderName: "John Doe",
        content: "Yes, we're having some issues with user retention. Would love your advice on this.",
        timestamp: "2023-07-10T10:45:00Z",
      },
    ]

    setStartup(mockStartup)
    setMessages(mockMessages)
  }, [params.id, user?.name])

  useEffect(() => {
    // Scroll to bottom when messages change
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return

    setSending(true)

    try {
      // In a real app, this would be an API call to send the message
      await new Promise((resolve) => setTimeout(resolve, 500))

      const newMsg: Message = {
        id: Date.now().toString(),
        sender: "mentor",
        senderName: user?.name || "Mentor",
        content: newMessage,
        timestamp: new Date().toISOString(),
      }

      setMessages((prev) => [...prev, newMsg])
      setNewMessage("")
    } catch (error) {
      console.error("Error sending message:", error)
    } finally {
      setSending(false)
    }
  }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  if (!startup) {
    return (
      <DashboardShell requiredRole="mentor">
        <div className="flex items-center justify-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-flare-blue" />
        </div>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell requiredRole="mentor">
      <DashboardHeader heading={`Messages with ${startup.name}`} text={`Founder: ${startup.founderName}`}>
        <Link href="/mentor">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
      </DashboardHeader>

      <Card className="flex flex-col h-[calc(100vh-16rem)]">
        <CardHeader className="border-b">
          <CardTitle className="text-flare-blue">{startup.name}</CardTitle>
        </CardHeader>
        <CardContent className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div key={message.id} className={`flex ${message.sender === "mentor" ? "justify-end" : "justify-start"}`}>
              <div className={`flex max-w-[70%] ${message.sender === "mentor" ? "flex-row-reverse" : "flex-row"}`}>
                <Avatar className={`h-8 w-8 ${message.sender === "mentor" ? "ml-2" : "mr-2"}`}>
                  <AvatarFallback className={message.sender === "mentor" ? "bg-flare-blue text-white" : "bg-gray-200"}>
                    {message.senderName.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div
                    className={`rounded-lg p-3 ${
                      message.sender === "mentor" ? "bg-flare-blue text-white" : "bg-gray-100"
                    }`}
                  >
                    <p>{message.content}</p>
                  </div>
                  <p className="text-xs text-muted-foreground mt-1">{formatDate(message.timestamp)}</p>
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </CardContent>
        <div className="border-t p-4">
          <div className="flex space-x-2">
            <Input
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSendMessage()
                }
              }}
            />
            <Button
              className="bg-flare-blue hover:bg-flare-blue/90"
              onClick={handleSendMessage}
              disabled={sending || !newMessage.trim()}
            >
              {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </div>
        </div>
      </Card>
    </DashboardShell>
  )
}
