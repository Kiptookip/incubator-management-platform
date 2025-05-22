import type { Metadata } from "next"
import Link from "next/link"
import { PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { DataTable } from "@/components/data-table"
import { mentorColumns } from "@/components/mentor-columns"

export const metadata: Metadata = {
  title: "Mentors",
  description: "Manage mentors for your incubator program",
}

export default function MentorsPage() {
  return (
    <DashboardShell requiredRole="admin">
      <DashboardHeader heading="Mentors" text="Manage mentors for your incubator program.">
        <Link href="/dashboard/mentors/new">
          <Button className="bg-flare-blue hover:bg-flare-blue/90">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add Mentor
          </Button>
        </Link>
      </DashboardHeader>
      <DataTable columns={mentorColumns} data={mentors} />
    </DashboardShell>
  )
}

const mentors = [
  {
    id: "MNT001",
    name: "Dr. Sarah Johnson",
    expertise: "Technology",
    email: "sarah@example.com",
    phone: "+254 712 345 678",
    assignedStartups: 3,
    status: "Active",
  },
  {
    id: "MNT002",
    name: "Michael Chen",
    expertise: "Finance",
    email: "michael@example.com",
    phone: "+254 723 456 789",
    assignedStartups: 2,
    status: "Active",
  },
  {
    id: "MNT003",
    name: "Emily Rodriguez",
    expertise: "Healthcare",
    email: "emily@example.com",
    phone: "+254 734 567 890",
    assignedStartups: 4,
    status: "Active",
  },
  {
    id: "MNT004",
    name: "David Ochieng",
    expertise: "Education",
    email: "david@example.com",
    phone: "+254 745 678 901",
    assignedStartups: 2,
    status: "Active",
  },
  {
    id: "MNT005",
    name: "Lisa Wanjiku",
    expertise: "Agriculture",
    email: "lisa@example.com",
    phone: "+254 756 789 012",
    assignedStartups: 1,
    status: "Inactive",
  },
]
