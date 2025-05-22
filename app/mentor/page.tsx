"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { MessageSquare, PlusCircle, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"

type Startup = {
  id: string
  name: string
  sector: string
  stage: string
  founderName: string
  email: string
  lastInteraction: string
}

type Opportunity = {
  id: string
  title: string
  type: string
  description: string
  deadline: string
  shared: boolean
}

export default function MentorDashboardPage() {
  const { user } = useAuth()
  const [assignedStartups, setAssignedStartups] = useState<Startup[]>([])
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])

  useEffect(() => {
    // In a real app, this would be an API call to fetch the mentor's assigned startups
    // For demo purposes, we'll use mock data
    const mockStartups: Startup[] = [
      {
        id: "ST001",
        name: "TechInnovate",
        sector: "Technology",
        stage: "Early Revenue",
        founderName: "John Doe",
        email: "john@techinnovate.com",
        lastInteraction: "2023-07-15",
      },
      {
        id: "ST002",
        name: "GreenGrow",
        sector: "Agriculture",
        stage: "Prototype",
        founderName: "Jane Smith",
        email: "jane@greengrow.com",
        lastInteraction: "2023-07-10",
      },
      {
        id: "ST003",
        name: "HealthPlus",
        sector: "Healthcare",
        stage: "Idea Stage",
        founderName: "Michael Ochieng",
        email: "michael@healthplus.com",
        lastInteraction: "2023-07-05",
      },
    ]

    const mockOpportunities: Opportunity[] = [
      {
        id: "OPP001",
        title: "Tech Startup Pitch Competition",
        type: "Event",
        description: "A pitch competition for tech startups with prizes up to $10,000.",
        deadline: "2023-08-15",
        shared: true,
      },
      {
        id: "OPP002",
        title: "Seed Funding for Agriculture Startups",
        type: "Funding",
        description: "Seed funding opportunity for agriculture startups focusing on sustainable farming.",
        deadline: "2023-08-30",
        shared: false,
      },
      {
        id: "OPP003",
        title: "Healthcare Innovation Workshop",
        type: "Workshop",
        description: "A workshop on healthcare innovation and regulatory compliance.",
        deadline: "2023-09-10",
        shared: false,
      },
      {
        id: "OPP004",
        title: "Investor Networking Event",
        type: "Event",
        description: "An opportunity to network with potential investors in various sectors.",
        deadline: "2023-09-20",
        shared: true,
      },
    ]

    setAssignedStartups(mockStartups)
    setOpportunities(mockOpportunities)
  }, [])

  const shareOpportunity = (id: string) => {
    setOpportunities((prev) => prev.map((opp) => (opp.id === id ? { ...opp, shared: true } : opp)))
  }

  return (
    <DashboardShell requiredRole="mentor">
      <DashboardHeader
        heading="Mentor Dashboard"
        text={`Welcome back, ${user?.name || "Mentor"}. Manage your assigned startups and opportunities.`}
      >
        <Link href="/mentor/opportunities/new">
          <Button className="bg-flare-blue hover:bg-flare-blue/90">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Opportunity
          </Button>
        </Link>
      </DashboardHeader>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Assigned Startups</CardTitle>
            <Users className="h-4 w-4 text-flare-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{assignedStartups.length}</div>
            <p className="text-xs text-muted-foreground">Active startups under your mentorship</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Opportunities Shared</CardTitle>
            <PlusCircle className="h-4 w-4 text-flare-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{opportunities.filter((o) => o.shared).length}</div>
            <p className="text-xs text-muted-foreground">Opportunities shared with startups</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
            <MessageSquare className="h-4 w-4 text-flare-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">5</div>
            <p className="text-xs text-muted-foreground">Messages from startups</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="startups" className="space-y-4 mt-6">
        <TabsList>
          <TabsTrigger value="startups">Assigned Startups</TabsTrigger>
          <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
        </TabsList>

        <TabsContent value="startups" className="space-y-4">
          {assignedStartups.map((startup) => (
            <Card key={startup.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-flare-blue">{startup.name}</CardTitle>
                  <Badge variant="outline">{startup.sector}</Badge>
                </div>
                <CardDescription>Stage: {startup.stage}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-sm font-medium">Founder</h3>
                    <p className="text-sm text-muted-foreground">{startup.founderName}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium">Contact</h3>
                    <p className="text-sm text-muted-foreground">{startup.email}</p>
                  </div>
                </div>
                <div>
                  <h3 className="text-sm font-medium">Last Interaction</h3>
                  <p className="text-sm text-muted-foreground">{startup.lastInteraction}</p>
                </div>
                <div className="flex justify-end space-x-2">
                  <Link href={`/mentor/startups/${startup.id}/messages`}>
                    <Button variant="outline">
                      <MessageSquare className="mr-2 h-4 w-4" />
                      Messages
                    </Button>
                  </Link>
                  <Link href={`/mentor/startups/${startup.id}`}>
                    <Button className="bg-flare-blue hover:bg-flare-blue/90">View Details</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>

        <TabsContent value="opportunities" className="space-y-4">
          {opportunities.map((opportunity) => (
            <Card key={opportunity.id}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-flare-blue">{opportunity.title}</CardTitle>
                  <Badge variant="outline">{opportunity.type}</Badge>
                </div>
                <CardDescription>Deadline: {opportunity.deadline}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">{opportunity.description}</p>
                </div>
                <div className="flex justify-end space-x-2">
                  {opportunity.shared ? (
                    <Button variant="outline" disabled>
                      Already Shared
                    </Button>
                  ) : (
                    <Button variant="outline" onClick={() => shareOpportunity(opportunity.id)}>
                      Share with Startups
                    </Button>
                  )}
                  <Link href={`/mentor/opportunities/${opportunity.id}`}>
                    <Button className="bg-flare-blue hover:bg-flare-blue/90">View Details</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
