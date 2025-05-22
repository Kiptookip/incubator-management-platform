import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/contexts/auth-context"
import { EmailNotifications } from "@/components/email-notification"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Flare Hub - Startup Incubator Platform",
  description: "Empowering startups to grow and succeed through grants, mentorship, and resources.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          {children}
          <EmailNotifications />
        </AuthProvider>
      </body>
    </html>
  )
}
