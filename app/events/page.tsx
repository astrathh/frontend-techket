import Link from "next/link"
import { ArrowLeft, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import EventCard from "@/components/event-card"

export default function EventsPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="text-xl font-semibold tracking-tight">
            ticketly
          </Link>
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/events" className="text-sm font-medium text-blue-600">
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

      {/* Main Content */}
      <main className="container py-8">
        <div className="flex items-center gap-2 mb-6">
          <Link href="/" className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>

        <h1 className="text-3xl font-bold mb-8">All Events</h1>

        {/* Filters */}
        <div className="grid gap-4 md:grid-cols-4 mb-8">
          <div className="relative md:col-span-2">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search events..."
              className="pl-10 rounded-full border-gray-200 bg-gray-50 focus-visible:ring-gray-200"
            />
          </div>
          <Select>
            <SelectTrigger className="rounded-full border-gray-200 bg-gray-50 focus:ring-gray-200">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              <SelectItem value="music">Music</SelectItem>
              <SelectItem value="sports">Sports</SelectItem>
              <SelectItem value="theater">Theater</SelectItem>
              <SelectItem value="comedy">Comedy</SelectItem>
            </SelectContent>
          </Select>
          <Select>
            <SelectTrigger className="rounded-full border-gray-200 bg-gray-50 focus:ring-gray-200">
              <SelectValue placeholder="Date" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any Date</SelectItem>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="tomorrow">Tomorrow</SelectItem>
              <SelectItem value="weekend">This Weekend</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Events Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 mb-12">
          {Array.from({ length: 12 }).map((_, i) => (
            <EventCard key={i} />
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center">
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="rounded-full">
              Previous
            </Button>
            {[1, 2, 3, 4, 5].map((page) => (
              <Button
                key={page}
                variant={page === 1 ? "default" : "outline"}
                size="sm"
                className={`rounded-full ${page === 1 ? "bg-black text-white hover:bg-gray-800" : ""}`}
              >
                {page}
              </Button>
            ))}
            <Button variant="outline" size="sm" className="rounded-full">
              Next
            </Button>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 bg-white">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
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

