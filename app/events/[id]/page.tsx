import Link from "next/link"
import { ArrowLeft, Calendar, Clock, MapPin, Share2, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import EventCard from "@/components/event-card"

export default function EventDetailsPage() {
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
          <Link href="/events" className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back to Events
          </Link>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <div className="relative rounded-2xl overflow-hidden mb-6">
              <img src="/placeholder.svg?height=600&width=1200" alt="Event" className="w-full h-[400px] object-cover" />
              <Badge className="absolute top-4 left-4 bg-blue-600 hover:bg-blue-700">Music</Badge>
              <div className="absolute top-4 right-4 flex gap-2">
                <Button
                  size="icon"
                  variant="outline"
                  className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
                >
                  <Heart className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="outline"
                  className="rounded-full bg-white/80 backdrop-blur-sm hover:bg-white"
                >
                  <Share2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <h1 className="text-3xl font-bold mb-4">World Tour 2025: Live in Concert</h1>

            <div className="flex flex-wrap gap-4 mb-6">
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">Date</p>
                  <p className="text-sm">April 22, 2025</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">Time</p>
                  <p className="text-sm">8:00 PM - 11:00 PM</p>
                </div>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin className="h-5 w-5 text-gray-500" />
                <div>
                  <p className="text-sm font-medium">Location</p>
                  <p className="text-sm">Madison Square Garden, New York</p>
                </div>
              </div>
            </div>

            <Tabs defaultValue="details" className="mb-8">
              <TabsList className="grid w-full grid-cols-3 bg-gray-50">
                <TabsTrigger value="details">Details</TabsTrigger>
                <TabsTrigger value="venue">Venue</TabsTrigger>
                <TabsTrigger value="organizer">Organizer</TabsTrigger>
              </TabsList>
              <TabsContent value="details" className="pt-4">
                <h3 className="text-xl font-medium mb-3">About This Event</h3>
                <p className="text-gray-600 mb-4">
                  Don't miss the most anticipated concert of the year! Join us for an unforgettable night of music and
                  entertainment featuring chart-topping hits and spectacular performances.
                </p>
                <p className="text-gray-600 mb-4">
                  This world tour has been selling out venues across the globe, with critics calling it "the must-see
                  musical event of the decade." The show features state-of-the-art production, stunning visuals, and a
                  full backing band.
                </p>
                <h3 className="text-xl font-medium mb-3 mt-6">What to Expect</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
                  <li>3+ hours of live music</li>
                  <li>Special guest appearances</li>
                  <li>Exclusive merchandise</li>
                  <li>State-of-the-art sound and lighting</li>
                </ul>
                <p className="text-gray-600">
                  Please note that photography and recording are not permitted during the performance. Doors open at
                  7:00 PM, and we recommend arriving early to avoid lines.
                </p>
              </TabsContent>
              <TabsContent value="venue" className="pt-4">
                <h3 className="text-xl font-medium mb-3">Madison Square Garden</h3>
                <p className="text-gray-600 mb-4">
                  Madison Square Garden is a multi-purpose indoor arena in New York City. Located in Midtown Manhattan
                  between 7th and 8th Avenues from 31st to 33rd Streets, it is situated atop Pennsylvania Station.
                </p>
                <div className="rounded-xl overflow-hidden h-[300px] mb-4">
                  <img
                    src="/placeholder.svg?height=600&width=1200"
                    alt="Madison Square Garden"
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-medium mb-3">Facilities</h3>
                <ul className="list-disc list-inside text-gray-600 space-y-2">
                  <li>Accessible seating</li>
                  <li>Food and beverage concessions</li>
                  <li>Merchandise stands</li>
                  <li>Restrooms on all levels</li>
                  <li>ATMs</li>
                </ul>
              </TabsContent>
              <TabsContent value="organizer" className="pt-4">
                <h3 className="text-xl font-medium mb-3">Event Organizer</h3>
                <div className="flex items-center gap-4 mb-4">
                  <div className="h-16 w-16 rounded-full overflow-hidden bg-gray-100">
                    <img
                      src="/placeholder.svg?height=100&width=100"
                      alt="Organizer logo"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-medium">Global Entertainment Group</h4>
                    <p className="text-sm text-gray-600">Premier event organizer since 2005</p>
                  </div>
                </div>
                <p className="text-gray-600 mb-4">
                  Global Entertainment Group specializes in producing world-class concerts, festivals, and live
                  entertainment events. With over 500 successful events across 30 countries, they are known for their
                  exceptional production quality and unforgettable experiences.
                </p>
                <Button variant="outline" className="rounded-full">
                  Contact Organizer
                </Button>
              </TabsContent>
            </Tabs>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-xl border border-gray-100 overflow-hidden bg-white shadow-sm">
              <div className="p-6">
                <h2 className="text-xl font-bold mb-4">Get Tickets</h2>
                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                    <div>
                      <p className="font-medium">General Admission</p>
                      <p className="text-sm text-gray-600">Standing room only</p>
                    </div>
                    <p className="font-bold">$89.99</p>
                  </div>

                  <div className="flex justify-between items-center pb-4 border-b border-gray-100">
                    <div>
                      <p className="font-medium">VIP Package</p>
                      <p className="text-sm text-gray-600">Premium seating + meet & greet</p>
                    </div>
                    <p className="font-bold">$199.99</p>
                  </div>

                  <div className="flex justify-between items-center">
                    <div>
                      <p className="font-medium">Premium Seats</p>
                      <p className="text-sm text-gray-600">Reserved seating</p>
                    </div>
                    <p className="font-bold">$129.99</p>
                  </div>
                </div>

                <div className="space-y-2 mb-6">
                  <p className="text-sm font-medium">Select Quantity</p>
                  <div className="flex border border-gray-200 rounded-full overflow-hidden">
                    <button className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-600">-</button>
                    <div className="flex-1 text-center py-2">2</div>
                    <button className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-gray-600">+</button>
                  </div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Ticket Price (x2)</span>
                    <span>$179.98</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Service Fee</span>
                    <span>$15.00</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Facility Fee</span>
                    <span>$5.00</span>
                  </div>
                  <div className="flex justify-between font-medium pt-4 border-t border-gray-100">
                    <span>Total</span>
                    <span>$199.98</span>
                  </div>
                </div>

                <Button className="w-full rounded-full bg-black text-white hover:bg-gray-800">Checkout</Button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  By purchasing tickets, you agree to our Terms of Service and Privacy Policy.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Similar Events */}
        <section className="mt-16">
          <h2 className="text-2xl font-bold mb-6">You Might Also Like</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 4 }).map((_, i) => (
              <EventCard key={i} />
            ))}
          </div>
        </section>
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

