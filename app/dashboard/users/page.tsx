import type { Metadata } from "next"
import Link from "next/link"
import { PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { DataTable } from "@/components/data-table"
import { userColumns } from "@/components/user-columns"

export const metadata: Metadata = {
  title: "Users",
  description: "Manage users for your incubator platform",
}

export default function UsersPage() {
  return (
    <DashboardShell requiredRole="admin">
      <DashboardHeader heading="Users" text="Manage users for your incubator platform.">
        <Link href="/dashboard/users/new">
          <Button className="bg-flare-blue hover:bg-flare-blue/90">
            <PlusCircle className="mr-2 h-4 w-4" />
            Add User
          </Button>
        </Link>
      </DashboardHeader>
      <DataTable columns={userColumns} data={users} />
    </DashboardShell>
  )
}

const users = [
  {
    id: "USR001",
    name: "Admin User",
    email: "admin@flarehub.com",
    role: "admin",
    status: "Active",
    lastLogin: "2023-07-15",
  },
  {
    id: "USR002",
    name: "John Doe",
    email: "john@techinnovate.com",
    role: "startup",
    status: "Active",
    lastLogin: "2023-07-10",
  },
  {
    id: "USR003",
    name: "Jane Smith",
    email: "jane@greengrow.com",
    role: "startup",
    status: "Active",
    lastLogin: "2023-07-12",
  },
  {
    id: "USR004",
    name: "Dr. Sarah Johnson",
    email: "sarah@example.com",
    role: "mentor",
    status: "Active",
    lastLogin: "2023-07-14",
  },
  {
    id: "USR005",
    name: "Michael Chen",
    email: "michael@example.com",
    role: "mentor",
    status: "Active",
    lastLogin: "2023-07-13",
  },
]
