import Link from "next/link"
import { ArrowRight, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import EventCard from "@/components/event-card"
import FeaturedEvent from "@/components/featured-event"

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="text-xl font-semibold tracking-tight">
            ticketly
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/events" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Events
            </Link>
            <Link href="/venues" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              Venues
            </Link>
            <Link href="/about" className="text-sm font-medium text-gray-600 hover:text-gray-900">
              About
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <Link href="/auth/login">
              <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                Sign In
              </Button>
            </Link>
            <Link href="/auth/register">
              <Button size="sm" className="rounded-full bg-black text-white hover:bg-gray-800">
                Sign Up
              </Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="container py-20">
        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
              Experience live events like never before
            </h1>
            <p className="text-lg text-gray-600 max-w-md">
              Discover and book tickets for the most exciting concerts, shows, and events happening near you.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search events, artists, venues..."
                  className="pl-10 rounded-full border-gray-200 bg-gray-50 focus-visible:ring-gray-200"
                />
              </div>
              <Button className="rounded-full bg-black text-white hover:bg-gray-800">Find Events</Button>
            </div>
          </div>
          <div className="relative h-[400px] rounded-2xl overflow-hidden">
            <img
              src="/placeholder.svg?height=800&width=600"
              alt="Concert crowd"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"></div>
          </div>
        </div>
      </section>

      {/* Featured Event */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold tracking-tight">Featured Event</h2>
            <Link
              href="/events"
              className="text-sm font-medium flex items-center gap-1 text-gray-600 hover:text-gray-900"
            >
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <FeaturedEvent />
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="container py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold tracking-tight">Upcoming Events</h2>
          <Link
            href="/events"
            className="text-sm font-medium flex items-center gap-1 text-gray-600 hover:text-gray-900"
          >
            View all <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {[1, 2, 3, 4].map((i) => (
            <EventCard key={i} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="py-16 bg-gray-50">
        <div className="container">
          <h2 className="text-2xl font-bold tracking-tight mb-8">Browse by Category</h2>
          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {["Concerts", "Sports", "Theater", "Festivals", "Comedy", "Arts", "Family", "Workshops"].map((category) => (
              <Link
                key={category}
                href={`/category/${category.toLowerCase()}`}
                className="group relative h-40 overflow-hidden rounded-xl bg-gray-100 hover:shadow-md transition-shadow"
              >
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-0 left-0 p-4">
                  <h3 className="text-lg font-medium text-white">{category}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="container py-16">
        <div className="rounded-2xl bg-gray-50 p-8 md:p-12">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div className="space-y-4">
              <h2 className="text-2xl font-bold tracking-tight">Never miss an event</h2>
              <p className="text-gray-600">
                Subscribe to our newsletter and be the first to know about upcoming events and exclusive offers.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <Input
                placeholder="Enter your email"
                className="rounded-full border-gray-200 bg-white focus-visible:ring-gray-200"
              />
              <Button className="rounded-full bg-black text-white hover:bg-gray-800 whitespace-nowrap">
                Subscribe
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-12 bg-white">
        <div className="container">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div>
              <h3 className="text-lg font-semibold mb-4">ticketly</h3>
              <p className="text-sm text-gray-600 mb-4">
                The easiest way to discover and book tickets for live events.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase text-gray-500 mb-4">Company</h3>
              <ul className="space-y-2">
                {["About", "Careers", "Press", "Blog"].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase text-gray-500 mb-4">Support</h3>
              <ul className="space-y-2">
                {["Help Center", "Contact Us", "FAQs", "Refund Policy"].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-sm font-semibold uppercase text-gray-500 mb-4">Legal</h3>
              <ul className="space-y-2">
                {["Terms of Service", "Privacy Policy", "Cookie Policy", "Accessibility"].map((item) => (
                  <li key={item}>
                    <Link href="#" className="text-sm text-gray-600 hover:text-gray-900">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600">© {new Date().getFullYear()} ticketly. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {["Twitter", "Facebook", "Instagram", "LinkedIn"].map((social) => (
                <Link key={social} href="#" className="text-sm text-gray-600 hover:text-gray-900">
                  {social}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

