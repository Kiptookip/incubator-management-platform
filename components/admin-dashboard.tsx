import Link from "next/link"
import { ArrowUpRight, CheckCircle2, Clock, FileText, Users } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { Overview } from "@/components/overview"
import { RecentApplications } from "@/components/recent-applications"
import { DemographicsChart } from "@/components/demographics-chart"

export function AdminDashboard() {
  return (
    <DashboardShell requiredRole="admin">
      <DashboardHeader heading="Admin Dashboard" text="Manage your incubator program and track progress.">
        <Link href="/dashboard/applications/new">
          <Button className="bg-flare-blue hover:bg-flare-blue/90">Add Application</Button>
        </Link>
      </DashboardHeader>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Applications</CardTitle>
            <FileText className="h-4 w-4 text-flare-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">142</div>
            <p className="text-xs text-muted-foreground">+28 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <CheckCircle2 className="h-4 w-4 text-flare-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">36</div>
            <p className="text-xs text-muted-foreground">+4 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Reviews</CardTitle>
            <Clock className="h-4 w-4 text-flare-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">18</div>
            <p className="text-xs text-muted-foreground">-2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Startups</CardTitle>
            <Users className="h-4 w-4 text-flare-blue" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">+12 from last month</p>
          </CardContent>
        </Card>
      </div>
      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="applications">Applications</TabsTrigger>
          <TabsTrigger value="demographics">Demographics</TabsTrigger>
        </TabsList>
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle className="text-flare-blue">Overview</CardTitle>
              </CardHeader>
              <CardContent className="pl-2">
                <Overview />
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle className="text-flare-blue">Recent Applications</CardTitle>
                <CardDescription>You have received 12 applications this week.</CardDescription>
              </CardHeader>
              <CardContent>
                <RecentApplications />
              </CardContent>
            </Card>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle className="text-flare-blue">Top Sectors</CardTitle>
                <CardDescription>Distribution of projects by sector.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  {/* Placeholder for sector chart */}
                  <div className="flex h-full items-center justify-center rounded-md border border-dashed">
                    <div className="flex flex-col items-center gap-1 text-center">
                      <p className="text-sm text-muted-foreground">Sector distribution chart</p>
                      <ArrowUpRight className="h-4 w-4 text-flare-blue" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle className="text-flare-blue">Funding Allocation</CardTitle>
                <CardDescription>How funding is distributed across projects.</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[200px]">
                  {/* Placeholder for funding chart */}
                  <div className="flex h-full items-center justify-center rounded-md border border-dashed">
                    <div className="flex flex-col items-center gap-1 text-center">
                      <p className="text-sm text-muted-foreground">Funding allocation chart</p>
                      <ArrowUpRight className="h-4 w-4 text-flare-blue" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="applications" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-flare-blue">Recent Applications</CardTitle>
              <CardDescription>Review and manage recent applications to your incubator program.</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentApplications />
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="demographics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="text-flare-blue">Demographics</CardTitle>
              <CardDescription>Demographic breakdown of startups in your incubator program.</CardDescription>
            </CardHeader>
            <CardContent>
              <DemographicsChart />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </DashboardShell>
  )
}
