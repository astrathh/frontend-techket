import Link from "next/link"
import { Calendar, MapPin } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export default function EventCard() {
  return (
    <Link href="/events/1" className="group">
      <div className="overflow-hidden rounded-xl bg-white border border-gray-100 transition-all hover:shadow-md">
        <div className="relative h-48 overflow-hidden">
          <img
            src="/placeholder.svg?height=400&width=600"
            alt="Event"
            className="object-cover w-full h-full transition-transform group-hover:scale-105"
          />
          <Badge className="absolute top-3 right-3 bg-white text-black hover:bg-gray-100">Music</Badge>
        </div>
        <div className="p-4">
          <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
            <div className="flex items-center gap-1">
              <Calendar className="h-3 w-3" />
              <span>Mar 15, 2025</span>
            </div>
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              <span>New York</span>
            </div>
          </div>
          <h3 className="font-medium text-lg mb-1 line-clamp-1 group-hover:text-blue-600">
            Summer Music Festival 2025
          </h3>
          <p className="text-sm text-gray-600 line-clamp-2 mb-3">
            Join us for an unforgettable day of music, food, and fun at the annual Summer Music Festival.
          </p>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">From $49.99</span>
            <span className="text-xs text-gray-500">Limited tickets</span>
          </div>
        </div>
      </div>
    </Link>
  )
}

