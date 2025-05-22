import type { Metadata } from "next"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Separator } from "@/components/ui/separator"
import { Switch } from "@/components/ui/switch"

export const metadata: Metadata = {
  title: "Settings",
  description: "Manage your incubator platform settings",
}

export default function SettingsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Settings" text="Manage your incubator platform settings and preferences." />

      <Tabs defaultValue="general" className="space-y-4">
        <TabsList>
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="application">Application Form</TabsTrigger>
          <TabsTrigger value="report">Report Types</TabsTrigger>
          <TabsTrigger value="sectors">Sectors</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Platform Information</CardTitle>
              <CardDescription>Update your incubator platform information</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="platform-name">Platform Name</Label>
                <Input id="platform-name" defaultValue="Incubator Platform" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  defaultValue="Our incubator program provides grants, mentorship, and resources to help innovative startups reach their full potential."
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Contact Email</Label>
                  <Input id="email" defaultValue="contact@incubator.com" type="email" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Contact Phone</Label>
                  <Input id="phone" defaultValue="+254 712 345 678" />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Appearance</CardTitle>
              <CardDescription>Customize the appearance of your platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="logo">Logo</Label>
                <div className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-md border border-dashed flex items-center justify-center">
                    <span className="text-sm text-muted-foreground">Logo</span>
                  </div>
                  <Button variant="outline" size="sm">
                    Upload
                  </Button>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Theme</Label>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="light" name="theme" className="h-4 w-4" defaultChecked />
                    <Label htmlFor="light">Light</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="dark" name="theme" className="h-4 w-4" />
                    <Label htmlFor="dark">Dark</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <input type="radio" id="system" name="theme" className="h-4 w-4" />
                    <Label htmlFor="system">System</Label>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="application" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Application Form Settings</CardTitle>
              <CardDescription>Customize the application form fields and requirements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Required Fields</Label>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2">
                    <Switch id="startup-name" defaultChecked />
                    <Label htmlFor="startup-name">Startup Name</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="founding-date" defaultChecked />
                    <Label htmlFor="founding-date">Founding Date</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="description" defaultChecked />
                    <Label htmlFor="description">Description</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="sector" defaultChecked />
                    <Label htmlFor="sector">Sector</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="stage" defaultChecked />
                    <Label htmlFor="stage">Stage</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="team-size" defaultChecked />
                    <Label htmlFor="team-size">Team Size</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="location" defaultChecked />
                    <Label htmlFor="location">Location</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Switch id="funding-needed" defaultChecked />
                    <Label htmlFor="funding-needed">Funding Needed</Label>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Custom Fields</Label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Previous Funding</span>
                    <Button variant="outline" size="sm">
                      Remove
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Team Experience</span>
                    <Button variant="outline" size="sm">
                      Remove
                    </Button>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="mt-2">
                  Add Custom Field
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="report" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Report Types</CardTitle>
              <CardDescription>Manage report types for your incubator program</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Default Report Types</Label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Technical Report</span>
                    <div className="flex items-center space-x-2">
                      <Switch id="technical-active" defaultChecked />
                      <Label htmlFor="technical-active" className="text-sm">
                        Active
                      </Label>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Financial Report</span>
                    <div className="flex items-center space-x-2">
                      <Switch id="financial-active" defaultChecked />
                      <Label htmlFor="financial-active" className="text-sm">
                        Active
                      </Label>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Progress Report</span>
                    <div className="flex items-center space-x-2">
                      <Switch id="progress-active" defaultChecked />
                      <Label htmlFor="progress-active" className="text-sm">
                        Active
                      </Label>
                    </div>
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>Custom Report Types</Label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Impact Assessment</span>
                    <Button variant="outline" size="sm">
                      Remove
                    </Button>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="mt-2">
                  Add Report Type
                </Button>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="sectors" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Sectors</CardTitle>
              <CardDescription>Manage sectors for your incubator program</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Available Sectors</Label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Technology</span>
                    <Button variant="outline" size="sm">
                      Remove
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Healthcare</span>
                    <Button variant="outline" size="sm">
                      Remove
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Education</span>
                    <Button variant="outline" size="sm">
                      Remove
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Finance</span>
                    <Button variant="outline" size="sm">
                      Remove
                    </Button>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Agriculture</span>
                    <Button variant="outline" size="sm">
                      Remove
                    </Button>
                  </div>
                </div>
                <div className="flex gap-2 mt-2">
                  <Input placeholder="New sector name" />
                  <Button variant="outline">Add</Button>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="notifications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Notification Settings</CardTitle>
              <CardDescription>Manage notification preferences for your incubator platform</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Email Notifications</Label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">New Application Submitted</span>
                    <Switch id="new-application" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Application Status Change</span>
                    <Switch id="application-status" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">New Report Submitted</span>
                    <Switch id="new-report" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Project Milestone Reached</span>
                    <Switch id="project-milestone" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Project Completion</span>
                    <Switch id="project-completion" defaultChecked />
                  </div>
                </div>
              </div>

              <Separator />

              <div className="space-y-2">
                <Label>System Notifications</Label>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Dashboard Alerts</span>
                    <Switch id="dashboard-alerts" defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Report Reminders</span>
                    <Switch id="report-reminders" defaultChecked />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button>Save Changes</Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
