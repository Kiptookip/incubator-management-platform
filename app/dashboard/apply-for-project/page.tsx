"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"
// Update the imports to include Select components
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

export default function ApplyForProjectPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const router = useRouter()

  const [formData, setFormData] = useState({
    projectName: "",
    description: "",
    fundingNeeded: "",
    timeline: "",
    expectedOutcomes: "",
    sustainabilityPlan: "",
  })

  // Add a state for available projects
  const [availableProjects, setAvailableProjects] = useState([
    {
      id: "PRJ006",
      name: "Digital Marketplace",
      description: "An online marketplace connecting local artisans with global buyers.",
      fundingNeeded: "45000",
      timeline: "12",
      expectedOutcomes:
        "Create a platform that helps local artisans sell their products globally, increasing their income by at least 30%.",
      sustainabilityPlan: "Commission-based model with premium features for sellers and buyers.",
    },
    {
      id: "PRJ007",
      name: "EdTech Platform",
      description: "An educational technology platform providing affordable learning resources for students.",
      fundingNeeded: "35000",
      timeline: "10",
      expectedOutcomes:
        "Develop a comprehensive learning platform that improves academic performance for at least 5,000 students in the first year.",
      sustainabilityPlan: "Freemium model with subscription options for premium content and features.",
    },
    {
      id: "PRJ008",
      name: "HealthTech Solution",
      description: "A mobile health solution connecting patients with healthcare providers remotely.",
      fundingNeeded: "50000",
      timeline: "14",
      expectedOutcomes:
        "Create a telemedicine platform that serves at least 10,000 patients in underserved areas within the first year.",
      sustainabilityPlan: "Transaction fees and subscription model for healthcare providers.",
    },
  ])

  // Add a state for selected project
  const [selectedProject, setSelectedProject] = useState("")

  // Add a function to handle project selection
  const handleProjectSelect = (projectId: string) => {
    setSelectedProject(projectId)
    const project = availableProjects.find((p) => p.id === projectId)

    if (project) {
      setFormData({
        projectName: project.name,
        description: project.description,
        fundingNeeded: project.fundingNeeded,
        timeline: project.timeline,
        expectedOutcomes: project.expectedOutcomes,
        sustainabilityPlan: project.sustainabilityPlan,
      })
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      // In a real app, you would make an API call to submit the project application
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setSuccess(true)

      // Redirect after a delay
      setTimeout(() => {
        router.push("/dashboard/my-projects")
      }, 2000)
    } catch (err) {
      setError("An error occurred while submitting your application. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <DashboardShell requiredRole="startup">
      <DashboardHeader heading="Apply for Project" text="Submit a new project application for funding and support." />

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="mb-4 bg-green-50 text-green-800 border-green-200">
          <AlertDescription>
            Your project application has been submitted successfully! You will be redirected shortly.
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-flare-blue">Project Details</CardTitle>
          <CardDescription>Provide details about your project and funding needs</CardDescription>
        </CardHeader>
        <form onSubmit={handleSubmit}>
          {/* Replace the form content with this updated version that includes the project selection dropdown */}
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="projectSelect">
                Select Available Project <span className="text-red-500">*</span>
              </Label>
              <Select onValueChange={handleProjectSelect} value={selectedProject}>
                <SelectTrigger id="projectSelect">
                  <SelectValue placeholder="Choose a project to apply for" />
                </SelectTrigger>
                <SelectContent>
                  {availableProjects.map((project) => (
                    <SelectItem key={project.id} value={project.id}>
                      {project.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                Select from available projects created by the admin. Details will be auto-filled.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="projectName">
                Project Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="projectName"
                placeholder="Enter your project name"
                value={formData.projectName}
                onChange={handleChange}
                required
                readOnly={!!selectedProject}
                className={selectedProject ? "bg-gray-50" : ""}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">
                Project Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="description"
                placeholder="Describe your project in detail"
                rows={4}
                value={formData.description}
                onChange={handleChange}
                required
                readOnly={!!selectedProject}
                className={selectedProject ? "bg-gray-50" : ""}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fundingNeeded">
                  Funding Needed (USD) <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="fundingNeeded"
                  type="number"
                  placeholder="e.g. 50000"
                  value={formData.fundingNeeded}
                  onChange={handleChange}
                  required
                  readOnly={!!selectedProject}
                  className={selectedProject ? "bg-gray-50" : ""}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="timeline">
                  Project Timeline (months) <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="timeline"
                  type="number"
                  placeholder="e.g. 12"
                  value={formData.timeline}
                  onChange={handleChange}
                  required
                  readOnly={!!selectedProject}
                  className={selectedProject ? "bg-gray-50" : ""}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="expectedOutcomes">
                Expected Outcomes <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="expectedOutcomes"
                placeholder="What outcomes do you expect from this project?"
                rows={3}
                value={formData.expectedOutcomes}
                onChange={handleChange}
                required
                readOnly={!!selectedProject}
                className={selectedProject ? "bg-gray-50" : ""}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sustainabilityPlan">
                Sustainability Plan <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="sustainabilityPlan"
                placeholder="How will your project sustain itself after the grant period?"
                rows={3}
                value={formData.sustainabilityPlan}
                onChange={handleChange}
                required
                readOnly={!!selectedProject}
                className={selectedProject ? "bg-gray-50" : ""}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="bg-flare-blue hover:bg-flare-blue/90" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Project Application"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </DashboardShell>
  )
}
