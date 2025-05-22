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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"

export default function NewUserPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    password: "",
    status: "Active",
  })

  // Additional fields based on role
  const [startupData, setStartupData] = useState({
    startupName: "",
    sector: "",
  })

  const [mentorData, setMentorData] = useState({
    expertise: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleStartupChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setStartupData((prev) => ({ ...prev, [id]: value }))
  }

  const handleMentorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setMentorData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleStartupSelectChange = (id: string, value: string) => {
    setStartupData((prev) => ({ ...prev, [id]: value }))
  }

  const handleMentorSelectChange = (id: string, value: string) => {
    setMentorData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    try {
      // In a real app, this would be an API call to create the user
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Store user in localStorage for demo purposes
      const users = JSON.parse(localStorage.getItem("flare_hub_users") || "[]")
      const newUser = {
        id: Math.random().toString(36).substring(2, 9),
        ...formData,
        approved: true,
      }
      users.push(newUser)
      localStorage.setItem("flare_hub_users", JSON.stringify(users))

      // If role is startup, create a startup record
      if (formData.role === "startup") {
        const startups = JSON.parse(localStorage.getItem("flare_hub_startups") || "[]")
        const newStartup = {
          id: `ST${Math.floor(Math.random() * 1000)
            .toString()
            .padStart(3, "0")}`,
          name: startupData.startupName,
          sector: startupData.sector,
          founderName: formData.name,
          email: formData.email,
          status: "Active",
        }
        startups.push(newStartup)
        localStorage.setItem("flare_hub_startups", JSON.stringify(startups))
      }

      // If role is mentor, create a mentor record
      if (formData.role === "mentor") {
        const mentors = JSON.parse(localStorage.getItem("flare_hub_mentors") || "[]")
        const newMentor = {
          id: `MNT${Math.floor(Math.random() * 1000)
            .toString()
            .padStart(3, "0")}`,
          name: formData.name,
          expertise: mentorData.expertise,
          email: formData.email,
          assignedStartups: 0,
          status: "Active",
        }
        mentors.push(newMentor)
        localStorage.setItem("flare_hub_mentors", JSON.stringify(mentors))
      }

      setSuccess(true)

      // Redirect after a delay
      setTimeout(() => {
        router.push("/dashboard/users")
      }, 2000)
    } catch (err) {
      setError("An error occurred while creating the user. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <DashboardShell requiredRole="admin">
      <DashboardHeader heading="Add New User" text="Create a new user for the incubator platform.">
        <Link href="/dashboard/users">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Users
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
          <AlertDescription>User created successfully! You will be redirected shortly.</AlertDescription>
        </Alert>
      )}

      <Card>
        <form onSubmit={handleSubmit}>
          <CardHeader>
            <CardTitle className="text-flare-blue">User Details</CardTitle>
            <CardDescription>Enter the details for the new user</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="name">
                Full Name <span className="text-red-500">*</span>
              </Label>
              <Input
                id="name"
                placeholder="Enter user's full name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">
                Email <span className="text-red-500">*</span>
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter email address"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="role">
                Role <span className="text-red-500">*</span>
              </Label>
              <Select onValueChange={(value) => handleSelectChange("role", value)} required>
                <SelectTrigger id="role">
                  <SelectValue placeholder="Select user role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="admin">Admin</SelectItem>
                  <SelectItem value="startup">Startup</SelectItem>
                  <SelectItem value="mentor">Mentor</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">
                Temporary Password <span className="text-red-500">*</span>
              </Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter temporary password"
                value={formData.password}
                onChange={handleChange}
                required
              />
              <p className="text-xs text-muted-foreground">
                The user will be asked to change this password on first login.
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select defaultValue="Active" onValueChange={(value) => handleSelectChange("status", value)}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Active">Active</SelectItem>
                  <SelectItem value="Inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Additional fields for startup */}
            {formData.role === "startup" && (
              <div className="border rounded-md p-4 space-y-4 mt-4">
                <h3 className="font-medium">Startup Details</h3>
                <div className="space-y-2">
                  <Label htmlFor="startupName">
                    Startup Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="startupName"
                    placeholder="Enter startup name"
                    value={startupData.startupName}
                    onChange={handleStartupChange}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="sector">
                    Sector <span className="text-red-500">*</span>
                  </Label>
                  <Select onValueChange={(value) => handleStartupSelectChange("sector", value)} required>
                    <SelectTrigger id="sector">
                      <SelectValue placeholder="Select sector" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Technology">Technology</SelectItem>
                      <SelectItem value="Healthcare">Healthcare</SelectItem>
                      <SelectItem value="Education">Education</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                      <SelectItem value="Agriculture">Agriculture</SelectItem>
                      <SelectItem value="Other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}

            {/* Additional fields for mentor */}
            {formData.role === "mentor" && (
              <div className="border rounded-md p-4 space-y-4 mt-4">
                <h3 className="font-medium">Mentor Details</h3>
                <div className="space-y-2">
                  <Label htmlFor="expertise">
                    Area of Expertise <span className="text-red-500">*</span>
                  </Label>
                  <Select onValueChange={(value) => handleMentorSelectChange("expertise", value)} required>
                    <SelectTrigger id="expertise">
                      <SelectValue placeholder="Select area of expertise" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Technology">Technology</SelectItem>
                      <SelectItem value="Finance">Finance</SelectItem>
                      <SelectItem value="Healthcare">Healthcare</SelectItem>
                      <SelectItem value="Education">Education</SelectItem>
                      <SelectItem value="Agriculture">Agriculture</SelectItem>
                      <SelectItem value="Marketing">Marketing</SelectItem>
                      <SelectItem value="Business Strategy">Business Strategy</SelectItem>
                    </SelectContent>
                  </Select>
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
                "Create User"
              )}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </DashboardShell>
  )
}
