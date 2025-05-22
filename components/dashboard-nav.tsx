"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BarChart3,
  FileText,
  Home,
  LayoutDashboard,
  LifeBuoy,
  LogOut,
  Wallet,
  User,
  Users,
  MessageSquare,
} from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

export function DashboardNav() {
  const pathname = usePathname()
  const { user, logout } = useAuth()

  // Get user initials for avatar
  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .toUpperCase()
      .substring(0, 2)
  }

  return (
    <div className="flex flex-col h-full border-r bg-muted/40">
      <div className="flex h-14 items-center border-b px-4">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="text-lg text-flare-blue">Flare Hub</span>
        </Link>
      </div>

      {/* User info */}
      <div className="border-b py-4 px-4">
        <div className="flex items-center gap-3">
          <Avatar className="h-9 w-9 bg-flare-blue/20">
            <AvatarFallback>{user?.name ? getInitials(user.name) : "U"}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-medium text-sm">{user?.name}</span>
            <span className="text-xs text-muted-foreground capitalize">{user?.role}</span>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-auto py-2">
        <nav className="grid items-start px-2 text-sm font-medium">
          <Link href="/dashboard">
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-start",
                pathname === "/dashboard" ? "bg-flare-blue/10 text-flare-blue" : "",
              )}
            >
              <LayoutDashboard className="mr-2 h-4 w-4" />
              Dashboard
            </Button>
          </Link>

          {/* Admin-only navigation */}
          {user?.role === "admin" && (
            <>
              <Link href="/dashboard/applications">
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start",
                    pathname?.includes("/dashboard/applications") ? "bg-flare-blue/10 text-flare-blue" : "",
                  )}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Applications
                </Button>
              </Link>
              <Link href="/dashboard/projects">
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start",
                    pathname?.includes("/dashboard/projects") ? "bg-flare-blue/10 text-flare-blue" : "",
                  )}
                >
                  <Home className="mr-2 h-4 w-4" />
                  Projects
                </Button>
              </Link>
              <Link href="/dashboard/donors">
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start",
                    pathname?.includes("/dashboard/donors") ? "bg-flare-blue/10 text-flare-blue" : "",
                  )}
                >
                  <Wallet className="mr-2 h-4 w-4" />
                  Donors
                </Button>
              </Link>
              <Link href="/dashboard/mentors">
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start",
                    pathname?.includes("/dashboard/mentors") ? "bg-flare-blue/10 text-flare-blue" : "",
                  )}
                >
                  <Users className="mr-2 h-4 w-4" />
                  Mentors
                </Button>
              </Link>
              <Link href="/dashboard/reports">
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start",
                    pathname?.includes("/dashboard/reports") ? "bg-flare-blue/10 text-flare-blue" : "",
                  )}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Reports
                </Button>
              </Link>
              <Link href="/dashboard/users">
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start",
                    pathname?.includes("/dashboard/users") ? "bg-flare-blue/10 text-flare-blue" : "",
                  )}
                >
                  <User className="mr-2 h-4 w-4" />
                  Users
                </Button>
              </Link>
              <Link href="/dashboard/analytics">
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start",
                    pathname?.includes("/dashboard/analytics") ? "bg-flare-blue/10 text-flare-blue" : "",
                  )}
                >
                  <BarChart3 className="mr-2 h-4 w-4" />
                  Analytics
                </Button>
              </Link>
            </>
          )}

          {/* Startup-only navigation */}
          {user?.role === "startup" && (
            <>
              <Link href="/dashboard/my-projects">
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start",
                    pathname?.includes("/dashboard/my-projects") ? "bg-flare-blue/10 text-flare-blue" : "",
                  )}
                >
                  <Home className="mr-2 h-4 w-4" />
                  My Projects
                </Button>
              </Link>
              <Link href="/dashboard/apply-for-project">
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start",
                    pathname?.includes("/dashboard/apply-for-project") ? "bg-flare-blue/10 text-flare-blue" : "",
                  )}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Apply for Project
                </Button>
              </Link>
              <Link href="/dashboard/messages">
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start",
                    pathname?.includes("/dashboard/messages") ? "bg-flare-blue/10 text-flare-blue" : "",
                  )}
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Messages
                </Button>
              </Link>
              <Link href="/dashboard/profile">
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start",
                    pathname?.includes("/dashboard/profile") ? "bg-flare-blue/10 text-flare-blue" : "",
                  )}
                >
                  <User className="mr-2 h-4 w-4" />
                  Profile & Team
                </Button>
              </Link>
            </>
          )}

          {/* Mentor-only navigation */}
          {user?.role === "mentor" && (
            <>
              <Link href="/mentor">
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start",
                    pathname === "/mentor" ? "bg-flare-blue/10 text-flare-blue" : "",
                  )}
                >
                  <LayoutDashboard className="mr-2 h-4 w-4" />
                  Dashboard
                </Button>
              </Link>
              <Link href="/mentor/startups">
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start",
                    pathname?.includes("/mentor/startups") ? "bg-flare-blue/10 text-flare-blue" : "",
                  )}
                >
                  <Users className="mr-2 h-4 w-4" />
                  My Startups
                </Button>
              </Link>
              <Link href="/mentor/opportunities">
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start",
                    pathname?.includes("/mentor/opportunities") ? "bg-flare-blue/10 text-flare-blue" : "",
                  )}
                >
                  <FileText className="mr-2 h-4 w-4" />
                  Opportunities
                </Button>
              </Link>
              <Link href="/mentor/messages">
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start",
                    pathname?.includes("/mentor/messages") ? "bg-flare-blue/10 text-flare-blue" : "",
                  )}
                >
                  <MessageSquare className="mr-2 h-4 w-4" />
                  Messages
                </Button>
              </Link>
              <Link href="/mentor/profile">
                <Button
                  variant="ghost"
                  className={cn(
                    "w-full justify-start",
                    pathname?.includes("/mentor/profile") ? "bg-flare-blue/10 text-flare-blue" : "",
                  )}
                >
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Button>
              </Link>
            </>
          )}
        </nav>
      </div>
      <div className="mt-auto p-4">
        <nav className="grid items-start px-2 text-sm font-medium">
          <Link href="/support">
            <Button variant="ghost" className="w-full justify-start">
              <LifeBuoy className="mr-2 h-4 w-4" />
              Support
            </Button>
          </Link>
          <Button variant="ghost" className="w-full justify-start" onClick={logout}>
            <LogOut className="mr-2 h-4 w-4" />
            Logout
          </Button>
        </nav>
      </div>
    </div>
  )
}
