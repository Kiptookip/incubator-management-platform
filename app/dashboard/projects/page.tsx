import type { Metadata } from "next"
import Link from "next/link"
import { PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { DataTable } from "@/components/data-table"
import { projectColumns } from "@/components/project-columns"

export const metadata: Metadata = {
  title: "Projects",
  description: "Manage active projects in your incubator program",
}

export default function ProjectsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Projects" text="Manage active projects in your incubator program.">
        <Link href="/dashboard/projects/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </Link>
      </DashboardHeader>
      <DataTable columns={projectColumns} data={projects} />
    </DashboardShell>
  )
}

const projects = [
  {
    id: "PRJ001",
    name: "SmartBiz Platform",
    startup: "TechInnovate",
    status: "Active",
    progress: 65,
    donor: "Innovation Fund",
    value: "$50,000",
    startDate: "2023-05-01",
    endDate: "2024-04-30",
  },
  {
    id: "PRJ002",
    name: "AgriTech Solution",
    startup: "GreenGrow",
    status: "Active",
    progress: 40,
    donor: "Sustainable Development Fund",
    value: "$35,000",
    startDate: "2023-04-15",
    endDate: "2024-04-14",
  },
  {
    id: "PRJ003",
    name: "MediConnect",
    startup: "HealthPlus",
    status: "On Hold",
    progress: 20,
    donor: "Health Innovation Fund",
    value: "$45,000",
    startDate: "2023-03-01",
    endDate: "2024-02-28",
  },
  {
    id: "PRJ004",
    name: "LearnSmart",
    startup: "EduTech",
    status: "Active",
    progress: 80,
    donor: "Education Fund",
    value: "$30,000",
    startDate: "2023-02-15",
    endDate: "2024-02-14",
  },
  {
    id: "PRJ005",
    name: "FinTrack",
    startup: "FinSolutions",
    status: "Completed",
    progress: 100,
    donor: "Financial Inclusion Fund",
    value: "$40,000",
    startDate: "2022-10-01",
    endDate: "2023-09-30",
  },
]
