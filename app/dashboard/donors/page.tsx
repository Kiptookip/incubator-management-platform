import type { Metadata } from "next"
import Link from "next/link"
import { PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { DataTable } from "@/components/data-table"
import { donorColumns } from "@/components/donor-columns"

export const metadata: Metadata = {
  title: "Donors",
  description: "Manage donors for your incubator program",
}

export default function DonorsPage() {
  return (
    <DashboardShell>
      <DashboardHeader heading="Donors" text="Manage donors and funding sources for your incubator program.">
        <Link href="/dashboard/donors/new">
          <Button>
            <PlusCircle className="mr-2 h-4 w-4" />
            New Donor
          </Button>
        </Link>
      </DashboardHeader>
      <DataTable columns={donorColumns} data={donors} />
    </DashboardShell>
  )
}

const donors = [
  {
    id: "DNR001",
    name: "Innovation Fund",
    type: "Foundation",
    contactPerson: "Sarah Johnson",
    email: "sarah@innovationfund.org",
    totalFunding: "$500,000",
    activeProjects: 5,
    status: "Active",
  },
  {
    id: "DNR002",
    name: "Sustainable Development Fund",
    type: "Government",
    contactPerson: "Michael Chen",
    email: "michael@sdf.gov",
    totalFunding: "$750,000",
    activeProjects: 8,
    status: "Active",
  },
  {
    id: "DNR003",
    name: "Health Innovation Fund",
    type: "Corporate",
    contactPerson: "Emily Rodriguez",
    email: "emily@healthinnovation.com",
    totalFunding: "$300,000",
    activeProjects: 3,
    status: "Active",
  },
  {
    id: "DNR004",
    name: "Education Fund",
    type: "NGO",
    contactPerson: "David Ochieng",
    email: "david@educationfund.org",
    totalFunding: "$250,000",
    activeProjects: 4,
    status: "Active",
  },
  {
    id: "DNR005",
    name: "Financial Inclusion Fund",
    type: "Foundation",
    contactPerson: "Lisa Wanjiku",
    email: "lisa@financialinclusion.org",
    totalFunding: "$400,000",
    activeProjects: 6,
    status: "Inactive",
  },
]
