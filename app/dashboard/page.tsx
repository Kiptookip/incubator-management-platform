"use client"

import { useAuth } from "@/contexts/auth-context"
import { ProtectedRoute } from "@/components/protected-route"
import { AdminDashboard } from "@/components/admin-dashboard"
import { StartupDashboard } from "@/components/startup-dashboard"

export default function DashboardPage() {
  const { user } = useAuth()

  return <ProtectedRoute>{user?.role === "admin" ? <AdminDashboard /> : <StartupDashboard />}</ProtectedRoute>
}
