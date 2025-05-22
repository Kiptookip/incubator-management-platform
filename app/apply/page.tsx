"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"

// Add import for email service
import { sendEmail, emailTemplates } from "@/utils/email-service"

export default function ApplyPage() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)
  const totalSteps = 3
  const router = useRouter()
  const { signup } = useAuth()

  // Form data
  const [formData, setFormData] = useState({
    startupName: "",
    foundingDate: "",
    description: "",
    sector: "",
    stage: "idea",
    teamSize: "",
    location: "",
    founderName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleSelectChange = (id: string, value: string) => {
    setFormData((prev) => ({ ...prev, [id]: value }))
  }

  const handleRadioChange = (value: string) => {
    setFormData((prev) => ({ ...prev, stage: value }))
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      // Validate current step
      if (currentStep === 1) {
        if (!formData.startupName || !formData.description || !formData.sector) {
          setError("Please fill in all required fields")
          return
        }
      } else if (currentStep === 2) {
        if (!formData.email || !formData.password || !formData.confirmPassword || !formData.founderName) {
          setError("Please fill in all required fields")
          return
        }
        if (formData.password !== formData.confirmPassword) {
          setError("Passwords do not match")
          return
        }
        if (formData.password.length < 6) {
          setError("Password must be at least 6 characters")
          return
        }
      }

      setError("")
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  // Update the handleSubmit function to include email sending
  const handleSubmit = async () => {
    setIsSubmitting(true)
    setError("")

    try {
      // In a real app, you would submit the application data to your backend
      // and create a user account

      // For demo purposes, we'll just simulate a successful submission
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Create user account
      await signup(formData.email, formData.password, formData.founderName)

      // Store application in localStorage for demo purposes
      // In a real app, this would be stored in a database
      const applications = JSON.parse(localStorage.getItem("flare_hub_applications") || "[]")
      const newApplication = {
        id: `APP${Math.floor(Math.random() * 1000)
          .toString()
          .padStart(3, "0")}`,
        startupName: formData.startupName,
        sector: formData.sector,
        status: "Pending",
        submittedDate: new Date().toISOString().split("T")[0],
        location: formData.location,
        description: formData.description,
        founderName: formData.founderName,
        email: formData.email,
        phone: "",
        teamSize: formData.teamSize,
        stage: formData.stage,
      }
      applications.push(newApplication)
      localStorage.setItem("flare_hub_applications", JSON.stringify(applications))

      // Send confirmation email
      await sendEmail({
        to: formData.email,
        ...emailTemplates.applicationSubmitted(formData.founderName),
      })

      setSuccess(true)

      // Redirect to success page after a delay
      setTimeout(() => {
        router.push("/apply/success")
      }, 2000)
    } catch (err) {
      setError("An error occurred while submitting your application. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="container max-w-4xl py-10">
      <div className="mb-8">
        <Link href="/" className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-2">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
        <h1 className="text-3xl font-bold text-flare-blue">Apply for Incubation</h1>
        <p className="text-muted-foreground mt-2">
          Complete the application form to apply for our incubation program and grant.
        </p>
      </div>

      <div className="mb-8">
        <div className="flex items-center justify-between">
          {Array.from({ length: totalSteps }).map((_, i) => (
            <div key={i} className="flex items-center">
              <div
                className={`flex h-10 w-10 items-center justify-center rounded-full border-2 ${
                  i + 1 === currentStep
                    ? "border-flare-blue bg-flare-blue text-white"
                    : i + 1 < currentStep
                      ? "border-flare-blue bg-flare-blue text-white"
                      : "border-muted-foreground/30 text-muted-foreground"
                }`}
              >
                {i + 1 < currentStep ? "✓" : i + 1}
              </div>
              {i < totalSteps - 1 && (
                <div
                  className={`h-1 w-20 md:w-32 lg:w-40 ${
                    i + 1 < currentStep ? "bg-flare-blue" : "bg-muted-foreground/30"
                  }`}
                />
              )}
            </div>
          ))}
        </div>
        <div className="mt-2 flex justify-between text-sm">
          <span>Startup Information</span>
          <span className={currentStep >= 2 ? "text-foreground" : "text-muted-foreground"}>Account Setup</span>
          <span className={currentStep >= 3 ? "text-foreground" : "text-muted-foreground"}>Review & Submit</span>
        </div>
      </div>

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="mb-4 bg-green-50 text-green-800 border-green-200">
          <AlertDescription>
            Your application has been submitted successfully! You will be redirected shortly.
          </AlertDescription>
        </Alert>
      )}

      <Card>
        <CardHeader>
          <CardTitle className="text-flare-blue">
            {currentStep === 1 && "Startup Information"}
            {currentStep === 2 && "Account Setup"}
            {currentStep === 3 && "Review & Submit"}
          </CardTitle>
          <CardDescription>
            {currentStep === 1 && "Tell us about your startup and team"}
            {currentStep === 2 && "Create your account to track your application"}
            {currentStep === 3 && "Review your application before submitting"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="startupName">
                    Startup Name <span className="text-red-500">*</span>
                  </Label>
                  <Input
                    id="startupName"
                    placeholder="Enter your startup name"
                    value={formData.startupName}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="foundingDate">Founding Date</Label>
                  <Input id="foundingDate" type="date" value={formData.foundingDate} onChange={handleChange} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">
                  Startup Description <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="description"
                  placeholder="Briefly describe your startup"
                  rows={3}
                  value={formData.description}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="sector">
                  Sector <span className="text-red-500">*</span>
                </Label>
                <Select onValueChange={(value) => handleSelectChange("sector", value)}>
                  <SelectTrigger id="sector">
                    <SelectValue placeholder="Select a sector" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="healthcare">Healthcare</SelectItem>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="finance">Finance</SelectItem>
                    <SelectItem value="agriculture">Agriculture</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Stage of Business</Label>
                <RadioGroup defaultValue="idea" value={formData.stage} onValueChange={handleRadioChange}>
                  <div className="flex flex-col space-y-2">
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="idea" id="idea" />
                      <Label htmlFor="idea">Idea Stage</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="prototype" id="prototype" />
                      <Label htmlFor="prototype">Prototype</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="early-revenue" id="early-revenue" />
                      <Label htmlFor="early-revenue">Early Revenue</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="scaling" id="scaling" />
                      <Label htmlFor="scaling">Scaling</Label>
                    </div>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="teamSize">Team Size</Label>
                  <Input
                    id="teamSize"
                    type="number"
                    min="1"
                    placeholder="Number of team members"
                    value={formData.teamSize}
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Primary Location</Label>
                  <Select onValueChange={(value) => handleSelectChange("location", value)}>
                    <SelectTrigger id="location">
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="nairobi">Nairobi</SelectItem>
                      <SelectItem value="mombasa">Mombasa</SelectItem>
                      <SelectItem value="kisumu">Kisumu</SelectItem>
                      <SelectItem value="nakuru">Nakuru</SelectItem>
                      <SelectItem value="eldoret">Eldoret</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="founderName">
                  Founder/Contact Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="founderName"
                  placeholder="Enter your full name"
                  value={formData.founderName}
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">
                  Email Address <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={handleChange}
                />
                <p className="text-xs text-muted-foreground">
                  This email will be used to log in to your account and receive updates about your application.
                </p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">
                  Create Password <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Create a secure password"
                  value={formData.password}
                  onChange={handleChange}
                />
                <p className="text-xs text-muted-foreground">Password must be at least 6 characters long.</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">
                  Confirm Password <span className="text-red-500">*</span>
                </Label>
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="Confirm your password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                />
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div className="space-y-6">
              <Tabs defaultValue="startup">
                <TabsList className="grid w-full grid-cols-2">
                  <TabsTrigger value="startup">Startup Information</TabsTrigger>
                  <TabsTrigger value="account">Account Details</TabsTrigger>
                </TabsList>
                <TabsContent value="startup" className="space-y-4 mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-medium text-sm text-muted-foreground">Startup Name</h3>
                      <p>{formData.startupName || "Not provided"}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-sm text-muted-foreground">Founding Date</h3>
                      <p>{formData.foundingDate || "Not provided"}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground">Description</h3>
                    <p>{formData.description || "Not provided"}</p>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-medium text-sm text-muted-foreground">Sector</h3>
                      <p>
                        {formData.sector
                          ? formData.sector.charAt(0).toUpperCase() + formData.sector.slice(1)
                          : "Not provided"}
                      </p>
                    </div>
                    <div>
                      <h3 className="font-medium text-sm text-muted-foreground">Stage</h3>
                      <p>
                        {formData.stage === "idea"
                          ? "Idea Stage"
                          : formData.stage === "prototype"
                            ? "Prototype"
                            : formData.stage === "early-revenue"
                              ? "Early Revenue"
                              : formData.stage === "scaling"
                                ? "Scaling"
                                : "Not provided"}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <h3 className="font-medium text-sm text-muted-foreground">Team Size</h3>
                      <p>{formData.teamSize || "Not provided"}</p>
                    </div>
                    <div>
                      <h3 className="font-medium text-sm text-muted-foreground">Location</h3>
                      <p>
                        {formData.location
                          ? formData.location.charAt(0).toUpperCase() + formData.location.slice(1)
                          : "Not provided"}
                      </p>
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="account" className="space-y-4 mt-4">
                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground">Founder/Contact Name</h3>
                    <p>{formData.founderName || "Not provided"}</p>
                  </div>

                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground">Email Address</h3>
                    <p>{formData.email || "Not provided"}</p>
                  </div>

                  <div>
                    <h3 className="font-medium text-sm text-muted-foreground">Password</h3>
                    <p>••••••••</p>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="space-y-2">
                <Label htmlFor="terms" className="flex items-center gap-2">
                  <input type="checkbox" id="terms" className="h-4 w-4 rounded border-gray-300" />
                  <span>I confirm that all information provided is accurate and complete</span>
                </Label>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex justify-between">
          {currentStep > 1 ? (
            <Button variant="outline" onClick={prevStep} disabled={isSubmitting}>
              Previous
            </Button>
          ) : (
            <div></div>
          )}

          {currentStep < totalSteps ? (
            <Button onClick={nextStep} className="bg-flare-blue hover:bg-flare-blue/90">
              Next
            </Button>
          ) : (
            <Button onClick={handleSubmit} className="bg-flare-blue hover:bg-flare-blue/90" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Submitting...
                </>
              ) : (
                "Submit Application"
              )}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  )
}
