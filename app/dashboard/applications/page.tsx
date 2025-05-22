import type { Metadata } from "next"
import ApplicationsPageClient from "./ApplicationsPageClient"

export const metadata: Metadata = {
  title: "Applications",
  description: "Manage applications to your incubator program",
}

export default function ApplicationsPage() {
  return <ApplicationsPageClient />
}
