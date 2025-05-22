"use client"

import type React from "react"
import { DashboardNav } from "@/components/dashboard-nav"
import { ProtectedRoute } from "@/components/protected-route"

interface DashboardShellProps {
  children: React.ReactNode
  requiredRole?: "admin" | "startup" | "applicant"
}

export function DashboardShell({ children, requiredRole }: DashboardShellProps) {
  return (
    <ProtectedRoute requiredRole={requiredRole}>
      <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <DashboardNav />
        <main className="flex flex-col space-y-6 p-6">{children}</main>
      </div>
    </ProtectedRoute>
  )
}
