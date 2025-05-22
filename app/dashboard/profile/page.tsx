"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { PlusCircle, Trash2, Loader2 } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

type TeamMember = {
  id: string
  name: string
  role: string
  email: string
  phone?: string
}

export default function ProfilePage() {
  const { user } = useAuth()
  const [saving, setSaving] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState("")

  // Personal details state
  const [personalDetails, setPersonalDetails] = useState({
    name: user?.name || "",
    email: user?.email || "",
    phone: "",
    bio: "Founder and CEO with 5+ years of experience in technology startups.",
    startupName: "TechInnovate",
    startupDescription:
      "A technology startup focused on developing innovative solutions for small businesses in Kenya.",
  })

  // Team members state
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([
    {
      id: "1",
      name: "Jane Smith",
      role: "CTO",
      email: "jane@techinnovate.com",
      phone: "+254 712 345 679",
    },
    {
      id: "2",
      name: "Michael Ochieng",
      role: "Marketing Lead",
      email: "michael@techinnovate.com",
      phone: "+254 712 345 680",
    },
  ])

  // New team member state
  const [newMember, setNewMember] = useState({
    name: "",
    role: "",
    email: "",
    phone: "",
  })

  const handlePersonalDetailsChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target
    setPersonalDetails((prev) => ({ ...prev, [id]: value }))
  }

  const handleNewMemberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target
    setNewMember((prev) => ({ ...prev, [id]: value }))
  }

  const addTeamMember = () => {
    if (!newMember.name || !newMember.role || !newMember.email) {
      setError("Please fill in all required fields for the team member")
      return
    }

    setTeamMembers((prev) => [
      ...prev,
      {
        ...newMember,
        id: Math.random().toString(36).substring(2, 9),
      },
    ])

    // Reset form
    setNewMember({
      name: "",
      role: "",
      email: "",
      phone: "",
    })

    setError("")
  }

  const removeTeamMember = (id: string) => {
    setTeamMembers((prev) => prev.filter((member) => member.id !== id))
  }

  const saveProfile = async () => {
    setSaving(true)
    setError("")

    try {
      // In a real app, this would be an API call to update the profile
      await new Promise((resolve) => setTimeout(resolve, 1500))

      setSuccess(true)

      // Reset success message after 3 seconds
      setTimeout(() => {
        setSuccess(false)
      }, 3000)
    } catch (err) {
      setError("An error occurred while saving your profile. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  // Get initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  return (
    <DashboardShell requiredRole="startup">
      <DashboardHeader heading="Profile & Team" text="Manage your personal details and team members." />

      {error && (
        <Alert variant="destructive" className="mb-4">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {success && (
        <Alert className="mb-4 bg-green-50 text-green-800 border-green-200">
          <AlertDescription>Your profile has been updated successfully!</AlertDescription>
        </Alert>
      )}

      <Tabs defaultValue="personal" className="space-y-4">
        <TabsList>
          <TabsTrigger value="personal">Personal Details</TabsTrigger>
          <TabsTrigger value="team">Team Members</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-flare-blue">Personal Information</CardTitle>
              <CardDescription>Update your personal details and contact information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-4 mb-4">
                <Avatar className="h-16 w-16 bg-flare-blue/20">
                  <AvatarFallback className="text-xl">{getInitials(personalDetails.name)}</AvatarFallback>
                </Avatar>
                <div>
                  <h3 className="font-medium">{personalDetails.name}</h3>
                  <p className="text-sm text-muted-foreground">Founder & CEO</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" value={personalDetails.name} onChange={handlePersonalDetailsChange} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email Address</Label>
                  <Input id="email" type="email" value={personalDetails.email} onChange={handlePersonalDetailsChange} />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                <Input
                  id="phone"
                  value={personalDetails.phone}
                  onChange={handlePersonalDetailsChange}
                  placeholder="+254 7XX XXX XXX"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio">Bio</Label>
                <Textarea id="bio" value={personalDetails.bio} onChange={handlePersonalDetailsChange} rows={3} />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={saveProfile} className="bg-flare-blue hover:bg-flare-blue/90" disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-flare-blue">Startup Information</CardTitle>
              <CardDescription>Update information about your startup</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="startupName">Startup Name</Label>
                <Input id="startupName" value={personalDetails.startupName} onChange={handlePersonalDetailsChange} />
              </div>

              <div className="space-y-2">
                <Label htmlFor="startupDescription">Startup Description</Label>
                <Textarea
                  id="startupDescription"
                  value={personalDetails.startupDescription}
                  onChange={handlePersonalDetailsChange}
                  rows={3}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={saveProfile} className="bg-flare-blue hover:bg-flare-blue/90" disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save Changes"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="team" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-flare-blue">Team Members</CardTitle>
              <CardDescription>Manage your team members and their roles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {teamMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-4 border rounded-md">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 bg-flare-blue/20">
                      <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{member.name}</h4>
                      <p className="text-sm text-muted-foreground">{member.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-sm text-right">
                      <p>{member.email}</p>
                      <p className="text-muted-foreground">{member.phone}</p>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={() => removeTeamMember(member.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}

              <div className="mt-6">
                <h3 className="text-lg font-medium mb-4">Add Team Member</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">
                        Full Name <span className="text-red-500">*</span>
                      </Label>
                      <Input id="name" value={newMember.name} onChange={handleNewMemberChange} placeholder="John Doe" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role">
                        Role <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="role"
                        value={newMember.role}
                        onChange={handleNewMemberChange}
                        placeholder="CTO, Developer, etc."
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="email">
                        Email <span className="text-red-500">*</span>
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={newMember.email}
                        onChange={handleNewMemberChange}
                        placeholder="email@example.com"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        value={newMember.phone}
                        onChange={handleNewMemberChange}
                        placeholder="+254 7XX XXX XXX"
                      />
                    </div>
                  </div>

                  <Button onClick={addTeamMember} className="bg-flare-blue hover:bg-flare-blue/90">
                    <PlusCircle className="mr-2 h-4 w-4" />
                    Add Team Member
                  </Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={saveProfile} className="bg-flare-blue hover:bg-flare-blue/90" disabled={saving}>
                {saving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Saving...
                  </>
                ) : (
                  "Save All Changes"
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
