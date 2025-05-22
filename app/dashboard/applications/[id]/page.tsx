"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, CheckCircle, Clock, XCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Separator } from "@/components/ui/separator"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Loader2 } from "lucide-react"

// Add import for email service
import { sendEmail, emailTemplates } from "@/utils/email-service"

// Update the component to fetch application from localStorage
export default function ApplicationDetailPage({ params }: { params: { id: string } }) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")
  const [status, setStatus] = useState<"Pending" | "Approved" | "Rejected">("Pending")
  const [comments, setComments] = useState("")
  const [donor, setDonor] = useState("")
  const [application, setApplication] = useState<any>(null)
  const router = useRouter()

  useEffect(() => {
    // In a real app, this would be an API call to fetch the application
    const storedApplications = JSON.parse(localStorage.getItem("flare_hub_applications") || "[]")
    const defaultApplications = [
      {
        id: "APP001",
        startupName: "TechInnovate",
        sector: "Technology",
        status: "Pending",
        submittedDate: "2023-04-15",
        location: "Nairobi, Kenya",
        description: "A technology startup focused on developing innovative solutions for small businesses in Kenya.",
        founderName: "John Doe",
        email: "john@techinnovate.com",
        phone: "+254 712 345 678",
        teamSize: 5,
        stage: "Early Revenue",
      },
      {
        id: "APP002",
        startupName: "GreenGrow",
        sector: "Agriculture",
        status: "Approved",
        submittedDate: "2023-04-10",
        location: "Nakuru, Kenya",
        description: "An agricultural technology startup focused on sustainable farming solutions.",
        founderName: "Jane Smith",
        email: "jane@greengrow.com",
        phone: "+254 723 456 789",
        teamSize: 3,
        stage: "Prototype",
      },
    ]

    // Combine default and stored applications
    const allApplications = [...defaultApplications, ...storedApplications]

    // Find the application by ID
    const foundApplication = allApplications.find((app) => app.id === params.id)

    if (foundApplication) {
      setApplication(foundApplication)
      setStatus(foundApplication.status)
    } else {
      // If not found, create a default one
      setApplication({
        id: params.id,
        startupName: "TechInnovate",
        sector: "Technology",
        status: "Pending",
        submittedDate: "2023-04-15",
        location: "Nairobi, Kenya",
        description: "A technology startup focused on developing innovative solutions for small businesses in Kenya.",
        founderName: "John Doe",
        email: "john@techinnovate.com",
        phone: "+254 712 345 678",
        teamSize: 5,
        stage: "Early Revenue",
      })
    }
  }, [params.id])

  const handleApprove = async () => {
    setIsSubmitting(true)
    setError("")

    try {
      // In a real app, you would make an API call to approve the application
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Update application status in localStorage
      const storedApplications = JSON.parse(localStorage.getItem("flare_hub_applications") || "[]")
      const updatedApplications = storedApplications.map((app: any) => {
        if (app.id === params.id) {
          return { ...app, status: "Approved" }
        }
        return app
      })
      localStorage.setItem("flare_hub_applications", JSON.stringify(updatedApplications))

      // Update user status if this is a real user
      const storedUsers = JSON.parse(localStorage.getItem("flare_hub_users") || "[]")
      const updatedUsers = storedUsers.map((user: any) => {
        if (user.email === application.email) {
          return { ...user, approved: true, role: "startup" }
        }
        return user
      })
      localStorage.setItem("flare_hub_users", JSON.stringify(updatedUsers))

      // Send approval email
      if (application.email) {
        await sendEmail({
          to: application.email,
          ...emailTemplates.applicationApproved(application.founderName || "Applicant", application.startupName),
        })
      }

      setStatus("Approved")
      setSuccess(true)

      // Redirect after a delay
      setTimeout(() => {
        router.push("/dashboard/applications")
      }, 2000)
    } catch (err) {
      setError("An error occurred while approving the application. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleReject = async () => {
    setIsSubmitting(true)
    setError("")

    try {
      // In a real app, you would make an API call to reject the application
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // Update application status in localStorage
      const storedApplications = JSON.parse(localStorage.getItem("flare_hub_applications") || "[]")
      const updatedApplications = storedApplications.map((app: any) => {
        if (app.id === params.id) {
          return { ...app, status: "Rejected" }
        }
        return app
      })
      localStorage.setItem("flare_hub_applications", JSON.stringify(updatedApplications))

      // Send rejection email
      if (application.email) {
        await sendEmail({
          to: application.email,
          ...emailTemplates.applicationRejected(
            application.founderName || "Applicant",
            application.startupName,
            comments || undefined,
          ),
        })
      }

      setStatus("Rejected")
      setSuccess(true)

      // Redirect after a delay
      setTimeout(() => {
        router.push("/dashboard/applications")
      }, 2000)
    } catch (err) {
      setError("An error occurred while rejecting the application. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!application) {
    return (
      <DashboardShell requiredRole="admin">
        <div className="flex items-center justify-center h-64">
          <p>Loading application...</p>
        </div>
      </DashboardShell>
    )
  }

  return (
    <DashboardShell requiredRole="admin">
      <DashboardHeader
        heading={`Application: ${application.startupName}`}
        text="Review application details and make a decision."
      >
        <Link href="/dashboard/applications">
          <Button variant="outline">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Applications
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
          <AlertDescription>
            Application has been {status.toLowerCase()} successfully! You will be redirected shortly.
          </AlertDescription>
        </Alert>
      )}

      <div className="grid gap-4 md:grid-cols-7">
        <Card className="md:col-span-4">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-flare-blue">Application Details</CardTitle>
              <Badge
                variant={
                  application.status === "Approved"
                    ? "success"
                    : application.status === "Rejected"
                      ? "destructive"
                      : "outline"
                }
                className={
                  application.status === "Approved"
                    ? "bg-green-100 text-green-800 border-green-200"
                    : application.status === "Rejected"
                      ? ""
                      : "bg-yellow-100 text-yellow-800 border-yellow-200"
                }
              >
                {application.status === "Pending" && <Clock className="mr-1 h-3 w-3" />}
                {application.status === "Approved" && <CheckCircle className="mr-1 h-3 w-3" />}
                {application.status === "Rejected" && <XCircle className="mr-1 h-3 w-3" />}
                {application.status}
              </Badge>
            </div>
            <CardDescription>Submitted on {application.submittedDate}</CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="startup">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="startup">Startup Info</TabsTrigger>
                <TabsTrigger value="contact">Contact Info</TabsTrigger>
              </TabsList>
              <TabsContent value="startup" className="space-y-4 mt-4">
                <div>
                  <h3 className="font-medium">Startup Name</h3>
                  <p className="text-sm text-muted-foreground">{application.startupName}</p>
                </div>
                <Separator />
                <div>
                  <h3 className="font-medium">Description</h3>
                  <p className="text-sm text-muted-foreground">{application.description}</p>
                </div>
                <Separator />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium">Sector</h3>
                    <p className="text-sm text-muted-foreground">{application.sector}</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Stage</h3>
                    <p className="text-sm text-muted-foreground">{application.stage}</p>
                  </div>
                </div>
                <Separator />
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="font-medium">Team Size</h3>
                    <p className="text-sm text-muted-foreground">{application.teamSize}</p>
                  </div>
                  <div>
                    <h3 className="font-medium">Location</h3>
                    <p className="text-sm text-muted-foreground">{application.location}</p>
                  </div>
                </div>
              </TabsContent>

              <TabsContent value="contact" className="space-y-4 mt-4">
                <div>
                  <h3 className="font-medium">Founder Name</h3>
                  <p className="text-sm text-muted-foreground">{application.founderName}</p>
                </div>
                <Separator />
                <div>
                  <h3 className="font-medium">Email</h3>
                  <p className="text-sm text-muted-foreground">{application.email}</p>
                </div>
                <Separator />
                <div>
                  <h3 className="font-medium">Phone</h3>
                  <p className="text-sm text-muted-foreground">{application.phone}</p>
                </div>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>

        <Card className="md:col-span-3">
          <CardHeader>
            <CardTitle className="text-flare-blue">Decision</CardTitle>
            <CardDescription>Review and make a decision on this application</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {application.status === "Pending" ? (
              <>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Application Status</h3>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      className="flex-1 border-red-200 text-red-600 hover:bg-red-50"
                      onClick={handleReject}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <XCircle className="mr-2 h-4 w-4" />
                      )}
                      Reject
                    </Button>
                    <Button
                      className="flex-1 bg-green-600 hover:bg-green-700"
                      onClick={handleApprove}
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      ) : (
                        <CheckCircle className="mr-2 h-4 w-4" />
                      )}
                      Approve
                    </Button>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Assign to Donor</h3>
                  <Select onValueChange={setDonor}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select Donor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="innovation-fund">Innovation Fund</SelectItem>
                      <SelectItem value="sustainable-dev">Sustainable Development Fund</SelectItem>
                      <SelectItem value="health-innovation">Health Innovation Fund</SelectItem>
                      <SelectItem value="education-fund">Education Fund</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Separator />
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Add Comments</h3>
                  <Textarea
                    className="min-h-[100px]"
                    placeholder="Add your comments or feedback here..."
                    value={comments}
                    onChange={(e) => setComments(e.target.value)}
                  />
                </div>
              </>
            ) : (
              <>
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Decision</h3>
                  <div className="flex items-center space-x-2">
                    <Badge
                      variant={application.status === "Approved" ? "success" : "destructive"}
                      className={
                        application.status === "Approved" ? "bg-green-100 text-green-800 border-green-200" : ""
                      }
                    >
                      {application.status === "Approved" && <CheckCircle className="mr-1 h-3 w-3" />}
                      {application.status === "Rejected" && <XCircle className="mr-1 h-3 w-3" />}
                      {application.status}
                    </Badge>
                    <span className="text-sm text-muted-foreground">on {new Date().toLocaleDateString()}</span>
                  </div>
                </div>
                <Separator />
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Assigned Donor</h3>
                  <p className="text-sm">{donor || "None assigned"}</p>
                </div>
                <Separator />
                <div className="space-y-2">
                  <h3 className="text-sm font-medium">Comments</h3>
                  <p className="text-sm text-muted-foreground">
                    {comments ||
                      (application.status === "Approved"
                        ? "Strong team with a viable product and clear market opportunity. Approved for funding and incubation."
                        : "Project does not align with our current focus areas. Recommend reapplying with a more developed business model.")}
                  </p>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}
