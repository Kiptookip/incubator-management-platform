"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { PlusCircle } from "lucide-react"

import { Button } from "@/components/ui/button"
import { DashboardHeader } from "@/components/dashboard-header"
import { DashboardShell } from "@/components/dashboard-shell"
import { DataTable } from "@/components/data-table"
import { applicationColumns } from "@/components/application-columns"

export default function ApplicationsPageClient() {
  const [applications, setApplications] = useState([])

  useEffect(() => {
    // In a real app, this would be an API call
    const storedApplications = JSON.parse(localStorage.getItem("flare_hub_applications") || "[]")

    // If there are no stored applications, use the default ones
    if (storedApplications.length === 0) {
      setApplications([
        {
          id: "APP001",
          startupName: "TechInnovate",
          sector: "Technology",
          status: "Pending",
          submittedDate: "2023-04-15",
          location: "Nairobi, Kenya",
        },
        {
          id: "APP002",
          startupName: "GreenGrow",
          sector: "Agriculture",
          status: "Approved",
          submittedDate: "2023-04-10",
          location: "Nakuru, Kenya",
        },
        {
          id: "APP003",
          startupName: "HealthPlus",
          sector: "Healthcare",
          status: "Rejected",
          submittedDate: "2023-04-08",
          location: "Mombasa, Kenya",
        },
        {
          id: "APP004",
          startupName: "EduTech",
          sector: "Education",
          status: "Pending",
          submittedDate: "2023-04-12",
          location: "Kisumu, Kenya",
        },
        {
          id: "APP005",
          startupName: "FinSolutions",
          sector: "Finance",
          status: "Approved",
          submittedDate: "2023-04-05",
          location: "Nairobi, Kenya",
        },
      ])
    } else {
      // Combine default applications with stored ones
      const defaultApplications = [
        {
          id: "APP001",
          startupName: "TechInnovate",
          sector: "Technology",
          status: "Pending",
          submittedDate: "2023-04-15",
          location: "Nairobi, Kenya",
        },
        {
          id: "APP002",
          startupName: "GreenGrow",
          sector: "Agriculture",
          status: "Approved",
          submittedDate: "2023-04-10",
          location: "Nakuru, Kenya",
        },
        {
          id: "APP003",
          startupName: "HealthPlus",
          sector: "Healthcare",
          status: "Rejected",
          submittedDate: "2023-04-08",
          location: "Mombasa, Kenya",
        },
      ]

      // Combine and sort by date (newest first)
      const allApplications = [...defaultApplications, ...storedApplications].sort(
        (a, b) => new Date(b.submittedDate).getTime() - new Date(a.submittedDate).getTime(),
      )

      setApplications(allApplications)
    }
  }, [])

  return (
    <DashboardShell requiredRole="admin">
      <DashboardHeader heading="Applications" text="Review and manage applications to your incubator program.">
        <Link href="/dashboard/applications/new">
          <Button className="bg-flare-blue hover:bg-flare-blue/90">
            <PlusCircle className="mr-2 h-4 w-4" />
            New Application
          </Button>
        </Link>
      </DashboardHeader>
      <DataTable columns={applicationColumns} data={applications} />
    </DashboardShell>
  )
}
