"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { ArrowLeft, Calendar, CheckCircle2, Clock } from "lucide-react"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

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
  team: Array<{
    name: string
    role: string
  }>
  reports: Array<{
    id: string
    title: string
    type: string
    dueDate: string
    submitted: boolean
    submittedDate?: string
  }>
}

export default function ProjectDetailPage({ params }: { params: { id: string } }) {
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // In a real app, this would be an API call to fetch the project details
    // For demo purposes, we'll use mock data
    const mockProject: Project = {
      id: params.id,
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
        {
          title: "1,000 user milestone",
          dueDate: "2024-03-15",
          completed: false,
        },
      ],
      team: [
        {
          name: "John Doe",
          role: "Project Lead",
        },
        {
          name: "Jane Smith",
          role: "Technical Lead",
        },
        {
          name: "Michael Ochieng",
          role: "Marketing Lead",
        },
      ],
      reports: [
        {
          id: "RPT001",
          title: "Q2 2023 Technical Report",
          type: "Technical",
          dueDate: "2023-07-15",
          submitted: true,
          submittedDate: "2023-07-10",
        },
        {
          id: "RPT002",
          title: "Q2 2023 Financial Report",
          type: "Financial",
          dueDate: "2023-07-15",
          submitted: true,
          submittedDate: "2023-07-12",
        },
        {
          id: "RPT003",
          title: "Q3 2023 Technical Report",
          type: "Technical",
          dueDate: "2023-10-15",
          submitted: false,
        },
        {
          id: "RPT004",
          title: "Q3 2023 Financial Report",
          type: "Financial",
          dueDate: "2023-10-15",
          submitted: false,
        },
      ],
    }

    setProject(mockProject)
    setLoading(false)
  }, [params.id])

  if (loading) {
    return (
      <DashboardShell requiredRole="startup">
        <div className="flex items-center justify-center h-64">
          <p>Loading project details...</p>
        </div>
      </DashboardShell>
    )
  }

  if (!project) {
    return (
      <DashboardShell requiredRole="startup">
        <div className="flex items-center justify-center h-64">
          <p>Project not found</p>
        </div>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell requiredRole="startup">
      <DashboardHeader heading={project.name} text="View and manage your project details.">
        <Link href="/dashboard/my-projects">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Projects
          </Button>
        </Link>
      </DashboardHeader>

      <div className="grid gap-4 md:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-flare-blue">Project Overview</CardTitle>
              <Badge
                variant={project.status === "Active" ? "default" : "outline"}
                className={project.status === "Active" ? "bg-green-100 text-green-800 border-green-200" : ""}
              >
                {project.status}
              </Badge>
            </div>
            <CardDescription>{project.description}</CardDescription>
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
              <h3 className="text-sm font-medium">Project Team</h3>
              <div className="mt-2 space-y-2">
                {project.team.map((member, index) => (
                  <div key={index} className="flex justify-between items-center p-2 bg-gray-50 rounded-md">
                    <span className="font-medium">{member.name}</span>
                    <span className="text-sm text-muted-foreground">{member.role}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-flare-blue">Project Timeline</CardTitle>
            <CardDescription>Key milestones and deadlines</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {project.milestones.map((milestone, index) => (
                <div key={index} className="relative pl-6 pb-4 border-l border-gray-200 last:border-0 last:pb-0">
                  <div
                    className={`absolute left-0 top-0 -ml-3 h-6 w-6 rounded-full flex items-center justify-center ${
                      milestone.completed ? "bg-green-100 text-green-600" : "bg-gray-100 text-gray-400"
                    }`}
                  >
                    {milestone.completed ? <CheckCircle2 className="h-4 w-4" /> : <Clock className="h-4 w-4" />}
                  </div>
                  <div>
                    <h4 className="font-medium">{milestone.title}</h4>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="mr-1 h-3 w-3" />
                      <span>{milestone.dueDate}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="reports" className="mt-6">
        <TabsList>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="reports" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-flare-blue">Project Reports</CardTitle>
              <CardDescription>Manage and submit required reports for your project</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {project.reports.map((report) => (
                  <div key={report.id} className="rounded-md border p-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium">{report.title}</h3>
                        <p className="text-sm text-muted-foreground">
                          {report.submitted ? `Submitted: ${report.submittedDate}` : `Due: ${report.dueDate}`}
                        </p>
                      </div>
                      <Badge
                        variant="outline"
                        className={
                          report.submitted
                            ? "bg-green-100 text-green-800 border-green-200"
                            : "bg-yellow-100 text-yellow-800 border-yellow-200"
                        }
                      >
                        {report.submitted ? "Submitted" : "Due Soon"}
                      </Badge>
                    </div>
                    <div className="flex justify-end mt-4">
                      {report.submitted ? (
                        <Button variant="outline">View Report</Button>
                      ) : (
                        <Button className="bg-flare-blue hover:bg-flare-blue/90">Submit Report</Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="mt-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-flare-blue">Project Resources</CardTitle>
              <CardDescription>Access resources and support for your project</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border p-4">
                  <h3 className="font-medium">Report Templates</h3>
                  <p className="text-sm text-muted-foreground mt-1">Download templates for your reports</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Button variant="outline" size="sm">
                      Technical Report Template
                    </Button>
                    <Button variant="outline" size="sm">
                      Financial Report Template
                    </Button>
                  </div>
                </div>

                <div className="rounded-md border p-4">
                  <h3 className="font-medium">Project Documentation</h3>
                  <p className="text-sm text-muted-foreground mt-1">Access project documentation and guidelines</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    <Button variant="outline" size="sm">
                      Project Guidelines
                    </Button>
                    <Button variant="outline" size="sm">
                      Reporting Guidelines
                    </Button>
                  </div>
                </div>

                <div className="rounded-md border p-4">
                  <h3 className="font-medium">Support</h3>
                  <p className="text-sm text-muted-foreground mt-1">Get help with your project</p>
                  <div className="flex justify-end mt-2">
                    <Button variant="outline">Contact Project Manager</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
