import Link from "next/link"
import Image from "next/image"
import { ArrowRight, Calendar, Quote, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-background border-b">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-semibold">
            <span className="text-xl text-flare-blue">Flare Hub</span>
          </div>
          <nav className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Login</Button>
            </Link>
            <Link href="/apply">
              <Button className="bg-flare-blue hover:bg-flare-blue/90">Apply Now</Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1">
        <section className="py-12 md:py-24 lg:py-32 bg-gradient-to-r from-flare-blue/10 to-flare-blue/5">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 xl:grid-cols-2">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter text-flare-blue sm:text-4xl md:text-5xl">
                    Empowering Startups to Grow and Succeed
                  </h1>
                  <p className="max-w-[600px] text-muted-foreground md:text-xl">
                    Flare Hub provides grants, mentorship, and resources to help innovative startups reach their full
                    potential.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Link href="/apply">
                    <Button size="lg" className="gap-1 bg-flare-blue hover:bg-flare-blue/90">
                      Apply Now <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                  <Link href="/dashboard">
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-flare-blue text-flare-blue hover:bg-flare-blue/10"
                    >
                      See Recent Projects
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <Image
                  src="/images/startup-hero.jpeg"
                  alt="Flare Hub - Empowering Startups"
                  width={550}
                  height={310}
                  className="rounded-xl shadow-lg"
                  priority
                />
              </div>
            </div>
          </div>
        </section>

        {/* How It Works section */}
        <section className="py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter text-flare-blue sm:text-4xl md:text-5xl">
                  How It Works
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Our platform streamlines the entire incubation process from application to graduation.
                </p>
              </div>
            </div>

            {/* Workflow steps */}
            <div className="relative mt-16 mb-12">
              <div className="mx-auto grid max-w-5xl items-start gap-6 py-8 lg:grid-cols-3 lg:gap-12">
                <div className="flex flex-col justify-start space-y-4 relative">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-flare-blue text-white">
                    <span className="text-2xl font-bold">1</span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-flare-blue">Apply</h3>
                    <p className="text-muted-foreground">
                      Fill out our comprehensive application form and submit your startup for consideration.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col justify-start space-y-4 relative">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-flare-blue/70 text-white">
                    <span className="text-2xl font-bold">2</span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-flare-blue">Get Selected</h3>
                    <p className="text-muted-foreground">
                      Our team reviews applications and selects promising startups for the incubation program.
                    </p>
                  </div>
                </div>
                <div className="flex flex-col justify-start space-y-4">
                  <div className="flex h-16 w-16 items-center justify-center rounded-full bg-flare-yellow text-flare-blue">
                    <span className="text-2xl font-bold">3</span>
                  </div>
                  <div className="space-y-2">
                    <h3 className="text-xl font-bold text-flare-blue">Grow</h3>
                    <p className="text-muted-foreground">
                      Receive funding, mentorship, and resources to accelerate your startup's growth.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Benefits cards */}
            <div className="grid gap-6 mt-12 md:grid-cols-2 lg:grid-cols-3">
              <Card className="bg-white border-flare-blue/20 hover:border-flare-blue/50 transition-colors">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="rounded-full bg-flare-blue/10 p-3 mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-flare-blue"
                      >
                        <path d="M17 18a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v12Z" />
                        <path d="M12 9h.01" />
                        <path d="M12 13h.01" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-semibold">Mentorship</h4>
                    <p className="text-sm text-muted-foreground">
                      Learn from experienced entrepreneurs and industry experts
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-flare-blue/20 hover:border-flare-blue/50 transition-colors">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="rounded-full bg-flare-blue/10 p-3 mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-flare-blue"
                      >
                        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                        <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-semibold">Network</h4>
                    <p className="text-sm text-muted-foreground">
                      Connect with investors, partners, and fellow entrepreneurs
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-white border-flare-blue/20 hover:border-flare-blue/50 transition-colors">
                <CardContent className="p-6">
                  <div className="flex flex-col items-center text-center space-y-2">
                    <div className="rounded-full bg-flare-blue/10 p-3 mb-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-flare-blue"
                      >
                        <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                        <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-semibold">Resources</h4>
                    <p className="text-sm text-muted-foreground">
                      Access tools, workshops, and support for your business
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Rest of the home page content remains the same */}
        {/* Upcoming Events Section */}
        <section className="py-12 md:py-16 bg-gray-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter text-flare-blue sm:text-4xl">Upcoming Events</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-lg">
                  Join our workshops, networking sessions, and pitch events to accelerate your startup journey.
                </p>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {/* Event 1 */}
              <Card className="overflow-hidden">
                <div className="h-48 bg-flare-blue/20 flex items-center justify-center">
                  <Calendar className="h-16 w-16 text-flare-blue" />
                </div>
                <CardContent className="p-6">
                  <Badge className="mb-2 bg-flare-blue text-white">Workshop</Badge>
                  <h3 className="text-xl font-bold mb-2">Pitch Perfect Workshop</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Learn how to create and deliver a compelling pitch that will attract investors.
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="text-sm">
                      <p className="font-medium">August 15, 2023</p>
                      <p className="text-muted-foreground">2:00 PM - 4:00 PM</p>
                    </div>
                    <Button variant="outline" className="text-flare-blue border-flare-blue">
                      Register
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Event 2 */}
              <Card className="overflow-hidden">
                <div className="h-48 bg-flare-yellow/20 flex items-center justify-center">
                  <Calendar className="h-16 w-16 text-flare-yellow" />
                </div>
                <CardContent className="p-6">
                  <Badge className="mb-2 bg-flare-yellow text-flare-blue">Networking</Badge>
                  <h3 className="text-xl font-bold mb-2">Startup Mixer</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Connect with fellow entrepreneurs, investors, and industry experts in a casual setting.
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="text-sm">
                      <p className="font-medium">August 25, 2023</p>
                      <p className="text-muted-foreground">6:00 PM - 9:00 PM</p>
                    </div>
                    <Button variant="outline" className="text-flare-blue border-flare-blue">
                      Register
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Event 3 */}
              <Card className="overflow-hidden">
                <div className="h-48 bg-flare-lightblue/30 flex items-center justify-center">
                  <Calendar className="h-16 w-16 text-flare-lightblue" />
                </div>
                <CardContent className="p-6">
                  <Badge className="mb-2 bg-flare-lightblue text-white">Demo Day</Badge>
                  <h3 className="text-xl font-bold mb-2">Startup Showcase</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Watch our incubated startups present their progress and achievements.
                  </p>
                  <div className="flex justify-between items-center">
                    <div className="text-sm">
                      <p className="font-medium">September 10, 2023</p>
                      <p className="text-muted-foreground">10:00 AM - 2:00 PM</p>
                    </div>
                    <Button variant="outline" className="text-flare-blue border-flare-blue">
                      Register
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            <div className="flex justify-center mt-8">
              <Button className="bg-flare-blue hover:bg-flare-blue/90">
                View All Events <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials Section - What People Say */}
        <section className="py-12 md:py-24 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-10">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter text-flare-blue sm:text-4xl">What People Say</h2>
                <p className="max-w-[700px] text-muted-foreground md:text-lg">
                  Hear from startups that have gone through our incubation program.
                </p>
              </div>
            </div>

            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Testimonial 1 */}
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 shadow-sm">
                <div className="flex items-center mb-4">
                  <Quote className="h-8 w-8 text-flare-blue/30 mr-2" />
                  <div className="flex text-yellow-400">
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">
                  "Flare Hub provided us with the resources, mentorship, and funding we needed to take our startup to
                  the next level. The connections we made through the program have been invaluable."
                </p>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-flare-blue/20 flex items-center justify-center text-flare-blue font-bold">
                    JD
                  </div>
                  <div className="ml-3">
                    <h4 className="font-semibold">John Doe</h4>
                    <p className="text-sm text-muted-foreground">CEO, TechInnovate</p>
                  </div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 shadow-sm">
                <div className="flex items-center mb-4">
                  <Quote className="h-8 w-8 text-flare-blue/30 mr-2" />
                  <div className="flex text-yellow-400">
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">
                  "The structured approach to growth and the expert mentorship helped us refine our business model and
                  go-to-market strategy. We've grown our user base by 300% since joining Flare Hub."
                </p>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-flare-blue/20 flex items-center justify-center text-flare-blue font-bold">
                    JS
                  </div>
                  <div className="ml-3">
                    <h4 className="font-semibold">Jane Smith</h4>
                    <p className="text-sm text-muted-foreground">Founder, GreenGrow</p>
                  </div>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 shadow-sm">
                <div className="flex items-center mb-4">
                  <Quote className="h-8 w-8 text-flare-blue/30 mr-2" />
                  <div className="flex text-yellow-400">
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                    <Star className="h-4 w-4 fill-current" />
                  </div>
                </div>
                <p className="text-muted-foreground mb-4">
                  "As a healthcare startup, we faced unique challenges. Flare Hub connected us with industry-specific
                  mentors who understood our market and helped us navigate regulatory hurdles."
                </p>
                <div className="flex items-center">
                  <div className="h-10 w-10 rounded-full bg-flare-blue/20 flex items-center justify-center text-flare-blue font-bold">
                    MO
                  </div>
                  <div className="ml-3">
                    <h4 className="font-semibold">Michael Ochieng</h4>
                    <p className="text-sm text-muted-foreground">CTO, HealthPlus</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="border-t py-6 md:py-8 bg-flare-blue/5">
        <div className="container flex flex-col items-center justify-between gap-4 md:flex-row">
          <div className="flex flex-col items-center gap-4 md:flex-row md:gap-6">
            <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
              © 2025 Flare Hub. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
