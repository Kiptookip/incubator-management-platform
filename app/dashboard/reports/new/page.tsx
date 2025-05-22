"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Loader2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"

export default function RequestReportPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const [formData, setFormData] = useState({
    project: "",
    startup: "",
    type: "",
    period: "",
    dueDate: "",
    instructions: "",
  })

  // Mock data for dropdowns
  const projects = [
    { id: "PRJ001", name: "SmartBiz Platform", startup: "TechInnovate" },
    { id: "PRJ002", name: "AgriTech Solution", startup: "GreenGrow" },
    { id: "PRJ003", name: "MediConnect", startup: "HealthPlus" },
    { id: "PRJ004", name: "LearnSmart", startup: "EduTech" },
    { id: "PRJ005", name: "FinTrack", startup: "FinSolutions" },
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }))

    // Auto-fill startup when project is selected
    if (id === "project") {
      const selectedProject = projects.find((p) => p.name === value)
      if (selectedProject) {
        setFormData((prev) => ({ ...prev, startup: selectedProject.startup }))
      }
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      // In a real app, this would be an API call to request the report
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Store report request in localStorage for demo purposes
      const reports = JSON.parse(localStorage.getItem("flare_hub_reports") || "[]")
      const newReport = {
        id: `RPT${Math.floor(Math.random() * 1000)
          .toString()
          .padStart(3, "0")}`,
        ...formData,
        submittedDate: "",
        status: "Pending",
      }
      reports.push(newReport)
      localStorage.setItem("flare_hub_reports", JSON.stringify(reports))

      setSuccess(true)

      // Redirect after a delay
      setTimeout(() => {
        router.push("/dashboard/reports")
      }, 2000)
    } catch (err) {
      setError("An error occurred while requesting the report. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <DashboardShell requiredRole="admin">
      <DashboardHeader heading="Request Report" text="Request a new report from a startup.">
        <Link href="/dashboard/reports">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Reports
          </Button>
        </Link>
      </DashboardHeader>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="mb-4 bg-green-50 text-green-800 border-green-200">
          <AlertDescription>Report requested successfully! You will be redirected shortly.</AlertDescription>
        </Alert>
      )}

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle className="text-flare-blue">Report Request Details</CardTitle>
            <CardDescription>Enter the details for the report request</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="project">
                Project <span className="text-red-500">*</span>
              </Label>
              <Select onValueChange={(value) => handleSelectChange("project", value)} required>
                <SelectTrigger id="project">
                  <SelectValue placeholder="Select project" />
                </SelectTrigger>
                <SelectContent>
                  {projects.map((project) => (
                    <SelectItem key={project.id} value={project.name}>
                      {project.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="startup">
                Startup <span className="text-red-500">*</span>
              </Label>
              <Input id="startup" value={formData.startup} readOnly className="bg-gray-50" />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">
                  Report Type <span className="text-red-500">*</span>
                </Label>
                <Select onValueChange={(value) => handleSelectChange("type", value)} required>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select report type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Technical">Technical</SelectItem>
                    <SelectItem value="Financial">Financial</SelectItem>
                    <SelectItem value="Progress">Progress</SelectItem>
                    <SelectItem value="Impact">Impact</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="period">
                  Reporting Period <span className="text-red-500">*</span>
                </Label>
                <Select onValueChange={(value) => handleSelectChange("period", value)} required>
                  <SelectTrigger id="period">
                    <SelectValue placeholder="Select period" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Q1 2023">Q1 2023</SelectItem>
                    <SelectItem value="Q2 2023">Q2 2023</SelectItem>
                    <SelectItem value="Q3 2023">Q3 2023</SelectItem>
                    <SelectItem value="Q4 2023">Q4 2023</SelectItem>
                    <SelectItem value="Q1 2024">Q1 2024</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="dueDate">
                Due Date <span className="text-red-500">*</span>
              </Label>
              <Input id="dueDate" type="date" value={formData.dueDate} onChange={handleChange} required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="instructions">Instructions</Label>
              <Textarea
                id="instructions"
                placeholder="Enter any specific instructions for this report"
                rows={3}
                value={formData.instructions}
                onChange={handleChange}
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button type="submit" className="bg-flare-blue hover:bg-flare-blue/90" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Requesting...
                </>
              ) : (
                "Request Report"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </DashboardShell>
  )
}
