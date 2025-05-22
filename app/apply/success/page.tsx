import Link from "next/link"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ApplicationSuccessPage() {
  return (
    <div className="container max-w-4xl py-10">
      <div className="flex flex-col items-center justify-center text-center space-y-6">
        <div className="rounded-full bg-green-100 p-3">
          <CheckCircle className="h-12 w-12 text-green-600" />
        </div>

        <h1 className="text-3xl font-bold text-flare-blue">Application Submitted Successfully!</h1>

        <p className="text-muted-foreground max-w-md">
          Thank you for applying to Flare Hub. Your application has been received and is now pending review.
        </p>

        <div className="bg-blue-50 p-6 rounded-lg max-w-md">
          <h2 className="font-semibold text-flare-blue mb-2">What happens next?</h2>
          <ol className="text-left space-y-2 text-sm">
            <li className="flex items-start">
              <span className="bg-flare-blue text-white rounded-full w-5 h-5 flex items-center justify-center text-xs mr-2 mt-0.5">
                1
              </span>
              <span>Our team will review your application (typically within 5-7 business days)</span>
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
          </ol>
        </div>

        <div className="flex flex-col sm:flex-row gap-4">
          <Link href="/login">
            <Button variant="outline" className="border-flare-blue text-flare-blue">
              Login to Your Account
            </Button>
          </Link>
          <Link href="/">
            <Button className="bg-flare-blue hover:bg-flare-blue/90">Return to Home</Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
