"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

type EmailNotification = {
  id: string
  to: string
  subject: string
  timestamp: number
}

export function EmailNotifications() {
  const [notifications, setNotifications] = useState<EmailNotification[]>([])

  useEffect(() => {
    // Listen for email notifications
    const handleEmailSent = (event: CustomEvent) => {
      const { to, subject } = event.detail

      setNotifications((prev) => [
        {
          id: Math.random().toString(36).substring(2, 9),
          to,
          subject,
          timestamp: Date.now(),
        },
        ...prev,
      ])
    }

    // Add event listener
    window.addEventListener("emailSent" as any, handleEmailSent as EventListener)

    // Clean up
    return () => {
      window.removeEventListener("emailSent" as any, handleEmailSent as EventListener)
    }
  }, [])

  // Remove notification after 5 seconds
  useEffect(() => {
    if (notifications.length > 0) {
      const timer = setTimeout(() => {
        setNotifications((prev) => prev.slice(0, -1))
      }, 5000)

      return () => clearTimeout(timer)
    }
  }, [notifications])

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id))
  }

  if (notifications.length === 0) {
    return null
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-md">
      {notifications.map((notification) => (
        <Alert key={notification.id} className="bg-white border-flare-blue shadow-md">
          <AlertTitle className="flex items-center justify-between">
            Email Sent
            <button onClick={() => removeNotification(notification.id)} className="rounded-full p-1 hover:bg-gray-100">
              <X className="h-4 w-4" />
            </button>
          </AlertTitle>
          <AlertDescription>
            <p className="text-sm">
              To: <span className="font-medium">{notification.to}</span>
            </p>
            <p className="text-sm">
              Subject: <span className="font-medium">{notification.subject}</span>
            </p>
          </AlertDescription>
        </Alert>
      ))}
    </div>
  )
}
