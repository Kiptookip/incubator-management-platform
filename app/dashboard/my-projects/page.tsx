"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/contexts/auth-context"

type Project = {
  id: string
  name: string
  description: string
  startDate: string
  endDate: string
  funding: string
  donor: string
  progress: number
  status: "Active" | "On Hold" | "Completed"
  milestones: Array<{
    title: string
    dueDate: string
    completed: boolean
  }>
}

export default function MyProjectsPage() {
  const { user } = useAuth()
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would be an API call to fetch the user's projects
    // For demo purposes, we'll use mock data
    const mockProjects: Project[] = [
      {
        id: "PRJ001",
        name: "SmartBiz Platform",
        description:
          "A digital platform that helps small businesses manage their operations, finances, and customer relationships efficiently.",
        startDate: "2023-05-01",
        endDate: "2024-04-30",
        funding: "$50,000",
        donor: "Innovation Fund",
        progress: 65,
        status: "Active",
        milestones: [
          {
            title: "Beta launch",
            dueDate: "2023-08-15",
            completed: true,
          },
          {
            title: "100 user milestone",
            dueDate: "2023-09-30",
            completed: true,
          },
          {
            title: "Feature expansion",
            dueDate: "2023-11-15",
            completed: false,
          },
          {
            title: "Full launch",
            dueDate: "2024-01-30",
            completed: false,
          },
        ],
      },
      {
        id: "PRJ002",
        name: "Mobile Payment Solution",
        description: "A secure and user-friendly mobile payment solution for small businesses and individuals.",
        startDate: "2023-03-15",
        endDate: "2024-03-14",
        funding: "$35,000",
        donor: "Financial Inclusion Fund",
        progress: 40,
        status: "Active",
        milestones: [
          {
            title: "MVP Development",
            dueDate: "2023-06-15",
            completed: true,
          },
          {
            title: "Security Audit",
            dueDate: "2023-07-30",
            completed: true,
          },
          {
            title: "Pilot Launch",
            dueDate: "2023-10-15",
            completed: false,
          },
          {
            title: "Market Expansion",
            dueDate: "2024-01-15",
            completed: false,
          },
        ],
      },
    ]

    setProjects(mockProjects)
    setLoading(false)
  }, [])

  return (
    <DashboardShell requiredRole="startup">
      <DashboardHeader
        heading="My Projects"
        text={`Welcome back, ${user?.name || "Entrepreneur"}. Here are your active projects.`}
      >
        <Link href="/dashboard/apply-for-project">
          <Button className="bg-flare-blue hover:bg-flare-blue/90">Apply for New Project</Button>
        </Link>
      </DashboardHeader>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <p>Loading your projects...</p>
        </div>
      ) : projects.length === 0 ? (
        <Card>
          <CardHeader>
            <CardTitle>No Projects Yet</CardTitle>
            <CardDescription>
              You don't have any active projects yet. Apply for a project to get started.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center">
            <Link href="/dashboard/apply-for-project">
              <Button className="bg-flare-blue hover:bg-flare-blue/90">Apply for Project</Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <Tabs defaultValue="active" className="space-y-4">
          <TabsList>
            <TabsTrigger value="active">Active Projects</TabsTrigger>
            <TabsTrigger value="completed">Completed Projects</TabsTrigger>
          </TabsList>

          <TabsContent value="active" className="space-y-4">
            {projects
              .filter((p) => p.status === "Active")
              .map((project) => (
                <Card key={project.id} className="overflow-hidden">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div>
                        <CardTitle className="text-flare-blue">{project.name}</CardTitle>
                        <CardDescription>{project.description}</CardDescription>
                      </div>
                      <Badge
                        variant={project.status === "Active" ? "default" : "outline"}
                        className={project.status === "Active" ? "bg-green-100 text-green-800 border-green-200" : ""}
                      >
                        {project.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h3 className="text-sm font-medium">Start Date</h3>
                        <p className="text-sm text-muted-foreground">{project.startDate}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium">End Date</h3>
                        <p className="text-sm text-muted-foreground">{project.endDate}</p>
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium">Funding</h3>
                      <p className="text-sm text-muted-foreground">
                        {project.funding} from {project.donor}
                      </p>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium">Progress</h3>
                      <Progress value={project.progress} className="mt-2" />
                      <p className="text-xs text-muted-foreground mt-1">{project.progress}% complete</p>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium">Upcoming Milestones</h3>
                      <ul className="text-sm text-muted-foreground list-disc pl-5 mt-1">
                        {project.milestones
                          .filter((m) => !m.completed)
                          .slice(0, 3)
                          .map((milestone, index) => (
                            <li key={index}>
                              {milestone.title} - {milestone.dueDate}
                            </li>
                          ))}
                      </ul>
                    </div>

                    <div className="flex justify-end">
                      <Link href={`/dashboard/my-projects/${project.id}`}>
                        <Button variant="outline">View Details</Button>
                      </Link>
                    </div>
                  </CardContent>
                </Card>
              ))}
          </TabsContent>

          <TabsContent value="completed" className="space-y-4">
            {projects.filter((p) => p.status === "Completed").length === 0 ? (
              <Card>
                <CardContent className="p-6 text-center">
                  <p className="text-muted-foreground">You don't have any completed projects yet.</p>
                </CardContent>
              </Card>
            ) : (
              projects
                .filter((p) => p.status === "Completed")
                .map((project) => (
                  <Card key={project.id}>
                    <CardHeader>
                      <CardTitle>{project.name}</CardTitle>
                      <CardDescription>{project.description}</CardDescription>
                    </CardHeader>
                    <CardContent>{/* Project details */}</CardContent>
                  </Card>
                ))
            )}
          </TabsContent>
        </Tabs>
      )}
    </DashboardShell>
  )
}
