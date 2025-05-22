import type { Metadata } from "next"
import Link from "next/link"
import { Download, FileText, PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { DataTable } from "@/components/data-table"
import { reportColumns } from "@/components/report-columns"

export const metadata: Metadata = {
  title: "Reports",
  description: "Manage and view reports from projects",
}

export default function ReportsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Reports" text="Manage and view reports submitted by projects.">
        <Link href="/dashboard/reports/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            Request Report
          </Button>
        </Link>
      </DashboardHeader>

      <Tabs defaultValue="all" className="space-y-4">
        <TabsList>
          <TabsTrigger value="all">All Reports</TabsTrigger>
          <TabsTrigger value="technical">Technical</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
        </TabsList>
        <TabsContent value="all" className="space-y-4">
          <DataTable columns={reportColumns} data={reports} />
        </TabsContent>
        <TabsContent value="technical" className="space-y-4">
          <DataTable columns={reportColumns} data={reports.filter((report) => report.type === "Technical")} />
        </TabsContent>
        <TabsContent value="financial" className="space-y-4">
          <DataTable columns={reportColumns} data={reports.filter((report) => report.type === "Financial")} />
        </TabsContent>
      </Tabs>

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">48</div>
            <p className="text-xs text-muted-foreground">+8 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Technical Reports</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">28</div>
            <p className="text-xs text-muted-foreground">+5 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Financial Reports</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">20</div>
            <p className="text-xs text-muted-foreground">+3 from last month</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6">
        <Card>
          <CardHeader>
            <CardTitle>Report Templates</CardTitle>
            <CardDescription>Download templates for different types of reports</CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Button variant="outline" className="justify-start">
              <Download className="mr-2 h-4 w-4" />
              Technical Report Template
            </Button>
            <Button variant="outline" className="justify-start">
              <Download className="mr-2 h-4 w-4" />
              Financial Report Template
            </Button>
            <Button variant="outline" className="justify-start">
              <Download className="mr-2 h-4 w-4" />
              Progress Report Template
            </Button>
          </CardContent>
        </Card>
      </div>
    </DashboardShell>
  )
}

const reports = [
  {
    id: "RPT001",
    project: "SmartBiz Platform",
    startup: "TechInnovate",
    type: "Technical",
    period: "Q2 2023",
    submittedDate: "2023-07-05",
    status: "Approved",
  },
  {
    id: "RPT002",
    project: "SmartBiz Platform",
    startup: "TechInnovate",
    type: "Financial",
    period: "Q2 2023",
    submittedDate: "2023-07-10",
    status: "Pending",
  },
  {
    id: "RPT003",
    project: "AgriTech Solution",
    startup: "GreenGrow",
    type: "Technical",
    period: "Q2 2023",
    submittedDate: "2023-07-08",
    status: "Approved",
  },
  {
    id: "RPT004",
    project: "AgriTech Solution",
    startup: "GreenGrow",
    type: "Financial",
    period: "Q2 2023",
    submittedDate: "2023-07-12",
    status: "Approved",
  },
  {
    id: "RPT005",
    project: "MediConnect",
    startup: "HealthPlus",
    type: "Technical",
    period: "Q2 2023",
    submittedDate: "2023-07-15",
    status: "Rejected",
  },
]
