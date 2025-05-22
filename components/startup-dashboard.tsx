import Link from "next/link"
import { Badge } from "@/components/ui/badge"
import { PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"

export function StartupDashboard() {
  return (
    <DashboardShell requiredRole="startup">
      <DashboardHeader
        heading="Startup Dashboard"
        text="Manage your projects and track progress in the incubator program."
      >
        <Link href="/dashboard/apply-for-project">
          <Button className="bg-flare-blue hover:bg-flare-blue/90">
            <PlusCircle className="mr-2 h-4 w-4" />
            Apply for Project
          </Button>
        </Link>
      </DashboardHeader>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Project Status</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">Active</div>
            <p className="text-xs text-muted-foreground">8 months remaining</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Project Progress</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">65%</div>
            <Progress value={65} className="mt-2" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Reports Due</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1</div>
            <p className="text-xs text-muted-foreground">Technical Report due in 5 days</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="projects" className="space-y-4 mt-6">
        <TabsList>
          <TabsTrigger value="projects">My Projects</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
          <TabsTrigger value="resources">Resources</TabsTrigger>
        </TabsList>

        <TabsContent value="projects" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-flare-blue">SmartBiz Platform</CardTitle>
              <CardDescription>
                A digital platform that helps small businesses manage their operations, finances, and customer
                relationships efficiently.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium">Start Date</h3>
                  <p className="text-sm text-muted-foreground">May 1, 2023</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium">End Date</h3>
                  <p className="text-sm text-muted-foreground">April 30, 2024</p>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium">Funding</h3>
                <p className="text-sm text-muted-foreground">$50,000 from Innovation Fund</p>
              </div>

              <div>
                <h3 className="text-sm font-medium">Progress</h3>
                <Progress value={65} className="mt-2" />
                <p className="text-xs text-muted-foreground mt-1">65% complete</p>
              </div>

              <div>
                <h3 className="text-sm font-medium">Upcoming Milestones</h3>
                <ul className="text-sm text-muted-foreground list-disc pl-5 mt-1">
                  <li>Beta launch - August 15, 2023</li>
                  <li>100 user milestone - September 30, 2023</li>
                  <li>Feature expansion - November 15, 2023</li>
                </ul>
              </div>

              <div className="flex justify-end">
                <Button variant="outline">View Details</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="reports" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-flare-blue">Reports</CardTitle>
              <CardDescription>Manage and submit reports for your projects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Technical Report - Q2 2023</h3>
                      <p className="text-sm text-muted-foreground">Due: July 15, 2023</p>
                    </div>
                    <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-yellow-200">
                      Due Soon
                    </Badge>
                  </div>
                  <div className="flex justify-end mt-4">
                    <Button className="bg-flare-blue hover:bg-flare-blue/90">Submit Report</Button>
                  </div>
                </div>

                <div className="rounded-md border p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Financial Report - Q2 2023</h3>
                      <p className="text-sm text-muted-foreground">Submitted: July 10, 2023</p>
                    </div>
                    <Badge variant="outline" className="bg-green-100 text-green-800 border-green-200">
                      Submitted
                    </Badge>
                  </div>
                  <div className="flex justify-end mt-4">
                    <Button variant="outline">View Report</Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-flare-blue">Resources</CardTitle>
              <CardDescription>Access resources and support for your incubator journey</CardDescription>
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
                  <h3 className="font-medium">Mentorship</h3>
                  <p className="text-sm text-muted-foreground mt-1">Connect with mentors in your field</p>
                  <div className="flex justify-end mt-2">
                    <Button variant="outline">Request Mentorship</Button>
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
