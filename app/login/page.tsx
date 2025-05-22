import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { LoginForm } from "@/components/login-form"

export default function LoginPage() {
  return (
    <div className="container max-w-4xl py-10">
      <div className="mb-8">
        <Link href="/" className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-2">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Home
        </Link>
        <h1 className="text-3xl font-bold text-flare-blue">Login to Flare Hub</h1>
        <p className="text-muted-foreground mt-2">
          Access your dashboard to manage your startup applications and projects.
        </p>
      </div>

      <LoginForm />

      <div className="mt-8 text-center">
        <p className="text-sm text-muted-foreground">For demo purposes, you can use these credentials:</p>
        <div className="mt-2 text-sm">
          <p>
            <strong>Admin:</strong> admin@flarehub.com / password
          </p>
          <p>
            <strong>Startup:</strong> startup@example.com / password
          </p>
        </div>
      </div>
    </div>
  )
}
