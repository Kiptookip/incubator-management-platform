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
import { Checkbox } from "@/components/ui/checkbox"

export default function NewOpportunityPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const [formData, setFormData] = useState({
    title: "",
    type: "",
    description: "",
    deadline: "",
    link: "",
    shareWithAll: false,
  })

  // Mock data for assigned startups
  const assignedStartups = [
    { id: "ST001", name: "TechInnovate" },
    { id: "ST002", name: "GreenGrow" },
    { id: "ST003", name: "HealthPlus" },
  ]

  const [selectedStartups, setSelectedStartups] = useState<string[]>([])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, checked } = e.target
    setFormData((prev) => ({ ...prev, [id]: checked }))

    // If shareWithAll is checked, select all startups
    if (id === "shareWithAll") {
      if (checked) {
        setSelectedStartups(assignedStartups.map((startup) => startup.id))
      } else {
        setSelectedStartups([])
      }
    }
  }

  const handleStartupSelection = (startupId: string) => {
    setSelectedStartups((prev) => {
      if (prev.includes(startupId)) {
        return prev.filter((id) => id !== startupId)
      } else {
        return [...prev, startupId]
      }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      // In a real app, this would be an API call to create the opportunity
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Store opportunity in localStorage for demo purposes
      const opportunities = JSON.parse(localStorage.getItem("flare_hub_opportunities") || "[]")
      const newOpportunity = {
        id: `OPP${Math.floor(Math.random() * 1000)
          .toString()
          .padStart(3, "0")}`,
        ...formData,
        shared: formData.shareWithAll || selectedStartups.length > 0,
        sharedWith: formData.shareWithAll ? "All" : selectedStartups,
        createdAt: new Date().toISOString(),
      }
      opportunities.push(newOpportunity)
      localStorage.setItem("flare_hub_opportunities", JSON.stringify(opportunities))

      setSuccess(true)

      // Redirect after a delay
      setTimeout(() => {
        router.push("/mentor")
      }, 2000)
    } catch (err) {
      setError("An error occurred while creating the opportunity. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <DashboardShell requiredRole="mentor">
      <DashboardHeader heading="Add New Opportunity" text="Create a new opportunity to share with startups.">
        <Link href="/mentor">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
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
          <AlertDescription>Opportunity created successfully! You will be redirected shortly.</AlertDescription>
        </Alert>
      )}

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle className="text-flare-blue">Opportunity Details</CardTitle>
            <CardDescription>Enter the details for the new opportunity</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">
                Title <span className="text-red-500">*</span>
              </Label>
              <Input
                id="title"
                placeholder="Enter opportunity title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="type">
                Type <span className="text-red-500">*</span>
              </Label>
              <Select onValueChange={(value) => handleSelectChange("type", value)} required>
                <SelectTrigger id="type">
                  <SelectValue placeholder="Select opportunity type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Event">Event</SelectItem>
                  <SelectItem value="Funding">Funding</SelectItem>
                  <SelectItem value="Workshop">Workshop</SelectItem>
                  <SelectItem value="Competition">Competition</SelectItem>
                  <SelectItem value="Networking">Networking</SelectItem>
                  <SelectItem value="Other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">
                Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="description"
                placeholder="Describe the opportunity"
                rows={3}
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="deadline">
                  Deadline <span className="text-red-500">*</span>
                </Label>
                <Input id="deadline" type="date" value={formData.deadline} onChange={handleChange} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="link">Link (Optional)</Label>
                <Input
                  id="link"
                  placeholder="Enter link to more information"
                  value={formData.link}
                  onChange={handleChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="shareWithAll"
                  checked={formData.shareWithAll}
                  onCheckedChange={(checked) => {
                    setFormData((prev) => ({ ...prev, shareWithAll: checked === true }))
                    if (checked) {
                      setSelectedStartups(assignedStartups.map((startup) => startup.id))
                    } else {
                      setSelectedStartups([])
                    }
                  }}
                />
                <Label htmlFor="shareWithAll">Share with all assigned startups</Label>
              </div>
            </div>

            {!formData.shareWithAll && (
              <div className="space-y-2">
                <Label>Select startups to share with</Label>
                <div className="border rounded-md p-4 space-y-2">
                  {assignedStartups.map((startup) => (
                    <div key={startup.id} className="flex items-center space-x-2">
                      <Checkbox
                        id={startup.id}
                        checked={selectedStartups.includes(startup.id)}
                        onCheckedChange={() => handleStartupSelection(startup.id)}
                      />
                      <Label htmlFor={startup.id}>{startup.name}</Label>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter>
            <Button type="submit" className="bg-flare-blue hover:bg-flare-blue/90" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Opportunity"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </DashboardShell>
  )
}
