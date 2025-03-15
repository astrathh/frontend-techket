import { Calendar, MapPin, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

export default function FeaturedEvent() {
  return (
    <div className="overflow-hidden rounded-2xl bg-white border border-gray-100 shadow-sm">
      <div className="grid md:grid-cols-2">
        <div className="relative h-64 md:h-auto overflow-hidden">
          <img
            src="/placeholder.svg?height=600&width=800"
            alt="Featured event"
            className="object-cover w-full h-full"
          />
          <Badge className="absolute top-4 left-4 bg-blue-600 hover:bg-blue-700">Featured</Badge>
        </div>
        <div className="p-6 md:p-8 flex flex-col">
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>April 22, 2025</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              <span>8:00 PM</span>
            </div>
          </div>
          <h2 className="text-2xl font-bold mb-2">World Tour 2025: Live in Concert</h2>
          <div className="flex items-center gap-1 mb-4">
            <MapPin className="h-4 w-4 text-gray-500" />
            <span className="text-sm text-gray-600">Madison Square Garden, New York</span>
          </div>
          <p className="text-gray-600 mb-6 flex-grow">
            Don't miss the most anticipated concert of the year! Join us for an unforgettable night of music and
            entertainment featuring chart-topping hits and spectacular performances.
          </p>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <p className="text-sm text-gray-500">Tickets starting at</p>
              <p className="text-2xl font-bold">$89.99</p>
            </div>
            <Button className="rounded-full bg-black text-white hover:bg-gray-800 px-6">Get Tickets</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

