"use client"

import { useEffect, useState } from "react"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

type Application = {
  id: string
  startupName: string
  sector: string
  status: "Pending" | "Approved" | "Rejected"
  submittedDate: string
  location: string
  description?: string
  founderName?: string
  email?: string
  phone?: string
  teamSize?: string
  stage?: string
}

export function RecentApplications() {
  const [applications, setApplications] = useState<Application[]>([])

  useEffect(() => {
    // In a real app, this would be an API call
    const storedApplications = JSON.parse(localStorage.getItem("flare_hub_applications") || "[]")

    // If there are no stored applications, use the default ones
    if (storedApplications.length === 0) {
      setApplications([
        {
          id: "APP001",
          startupName: "TechInnovate",
          sector: "Technology",
          status: "Pending",
          submittedDate: "2023-04-15",
          location: "Nairobi, Kenya",
        },
        {
          id: "APP002",
          startupName: "GreenGrow",
          sector: "Agriculture",
          status: "Approved",
          submittedDate: "2023-04-10",
          location: "Nakuru, Kenya",
        },
        {
          id: "APP003",
          startupName: "HealthPlus",
          sector: "Healthcare",
          status: "Rejected",
          submittedDate: "2023-04-08",
          location: "Mombasa, Kenya",
        },
        {
          id: "APP004",
          startupName: "EduTech",
          sector: "Education",
          status: "Pending",
          submittedDate: "2023-04-12",
          location: "Kisumu, Kenya",
        },
        {
          id: "APP005",
          startupName: "FinSolutions",
          sector: "Finance",
          status: "Approved",
          submittedDate: "2023-04-05",
          location: "Nairobi, Kenya",
        },
      ])
    } else {
      // Combine default applications with stored ones
      const defaultApplications = [
        {
          id: "APP001",
          startupName: "TechInnovate",
          sector: "Technology",
          status: "Pending",
          submittedDate: "2023-04-15",
          location: "Nairobi, Kenya",
        },
        {
          id: "APP002",
          startupName: "GreenGrow",
          sector: "Agriculture",
          status: "Approved",
          submittedDate: "2023-04-10",
          location: "Nakuru, Kenya",
        },
      ]

      // Combine and sort by date (newest first)
      const allApplications = [...defaultApplications, ...storedApplications]
        .sort((a, b) => new Date(b.submittedDate).getTime() - new Date(a.submittedDate).getTime())
        .slice(0, 5) // Only show the 5 most recent

      setApplications(allApplications)
    }
  }, [])

  // Get initials for avatar
  const getInitials = (name: string) => {
    return name.split(" ")[0][0] + (name.split(" ")[1] ? name.split(" ")[1][0] : "")
  }

  return (
    <div className="space-y-8">
      {applications.map((app) => (
        <div key={app.id} className="flex items-center">
          <Avatar className="h-9 w-9 bg-flare-blue/20">
            <AvatarFallback>{getInitials(app.startupName)}</AvatarFallback>
          </Avatar>
          <div className="ml-4 space-y-1">
            <p className="text-sm font-medium leading-none">{app.startupName}</p>
            <p className="text-sm text-muted-foreground">
              {app.sector} / {app.location}
            </p>
          </div>
          <div className="ml-auto font-medium">
            <Badge
              variant={app.status === "Approved" ? "default" : app.status === "Rejected" ? "destructive" : "outline"}
              className={
                app.status === "Pending"
                  ? "bg-yellow-100 text-yellow-800 border-yellow-200"
                  : app.status === "Approved"
                    ? "bg-green-100 text-green-800 border-green-200"
                    : ""
              }
            >
              {app.status}
            </Badge>
          </div>
        </div>
      ))}
    </div>
  )
}
