"use client"

import { useAuth } from "@/contexts/auth-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock } from "lucide-react"

export default function PendingApprovalPage() {
  const { logout } = useAuth()

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <div className="flex justify-center mb-4">
            <div className="rounded-full bg-yellow-100 p-3">
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </div>
          <CardTitle className="text-center text-flare-blue">Application Under Review</CardTitle>
          <CardDescription className="text-center">
            Your application is currently being reviewed by our team
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-center text-sm text-muted-foreground">
            Thank you for applying to Flare Hub. Your application is currently under review by our team. This process
            typically takes 5-7 business days.
          </p>

          <div className="bg-blue-50 p-4 rounded-lg">
            <h3 className="font-medium text-flare-blue mb-2">What happens next?</h3>
            <ul className="text-sm space-y-2">
              <li className="flex items-start">
                <span className="bg-flare-blue text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                  1
                </span>
                <span>Our team reviews your application</span>
              </li>
              <li className="flex items-start">
                <span className="bg-flare-blue text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                  2
                </span>
                <span>You'll receive an email notification about your application status</span>
              </li>
              <li className="flex items-start">
                <span className="bg-flare-blue text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                  3
                </span>
                <span>If approved, you'll gain access to your startup dashboard</span>
              </li>
            </ul>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button variant="outline" onClick={logout}>
            Logout
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}
