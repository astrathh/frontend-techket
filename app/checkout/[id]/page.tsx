"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowLeft, CreditCard, Info } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Mock event data - in a real app, this would be fetched based on the ID
const eventData = {
  id: "world-tour-2025",
  name: "World Tour 2025: Live in Concert",
  date: "April 22, 2025",
  time: "8:00 PM",
  venue: "Madison Square Garden, New York",
  image: "/placeholder.svg?height=600&width=800",
  ticketTypes: [
    { id: "general", name: "General Admission", price: 89.99, description: "Standing room only" },
    { id: "premium", name: "Premium Seats", price: 129.99, description: "Reserved seating" },
    { id: "vip", name: "VIP Package", price: 199.99, description: "Premium seating + meet & greet" },
  ],
}

export default function CheckoutPage({ params }) {
  const { id } = params
  const [selectedTicket, setSelectedTicket] = useState(eventData.ticketTypes[0].id)
  const [quantity, setQuantity] = useState(2)
  const [paymentMethod, setPaymentMethod] = useState("credit-card")

  const selectedTicketType = eventData.ticketTypes.find((ticket) => ticket.id === selectedTicket)

  const subtotal = selectedTicketType.price * quantity
  const serviceFee = 15.0
  const facilityFee = 5.0
  const total = subtotal + serviceFee + facilityFee

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle checkout submission
    console.log("Checkout submitted")
    // Redirect to confirmation page
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="text-xl font-semibold tracking-tight">
            ticketly
          </Link>
          <div className="flex items-center space-x-4">
            <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
              Sign In
            </Button>
            <Button size="sm" className="rounded-full bg-black text-white hover:bg-gray-800">
              Sign Up
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container py-8">
        <div className="flex items-center gap-2 mb-6">
          <Link href={`/events/${id}`} className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back to Event
          </Link>
        </div>

        <h1 className="text-2xl font-bold mb-8">Checkout</h1>

        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Ticket Selection */}
              <div className="bg-white rounded-xl border border-gray-100 overflow-hidden p-6">
                <h2 className="text-lg font-semibold mb-4">Select Tickets</h2>

                <RadioGroup value={selectedTicket} onValueChange={setSelectedTicket} className="space-y-4">
                  {eventData.ticketTypes.map((ticket) => (
                    <div
                      key={ticket.id}
                      className="flex items-center justify-between border border-gray-100 rounded-xl p-4 hover:bg-gray-50 transition-colors"
                    >
                      <div className="flex items-start gap-3">
                        <RadioGroupItem value={ticket.id} id={ticket.id} className="mt-1" />
                        <div>
                          <Label htmlFor={ticket.id} className="font-medium">
                            {ticket.name}
                          </Label>
                          <p className="text-sm text-gray-600">{ticket.description}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">${ticket.price.toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </RadioGroup>

                <div className="mt-6">
                  <Label htmlFor="quantity" className="text-sm font-medium">
                    Quantity
                  </Label>
                  <div className="flex items-center mt-2">
                    <button
                      type="button"
                      className="h-10 w-10 rounded-l-lg border border-gray-200 bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    >
                      -
                    </button>
                    <div className="h-10 px-4 border-t border-b border-gray-200 flex items-center justify-center min-w-[60px]">
                      {quantity}
                    </div>
                    <button
                      type="button"
                      className="h-10 w-10 rounded-r-lg border border-gray-200 bg-gray-50 flex items-center justify-center text-gray-600 hover:bg-gray-100"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Billing Information */}
              <div className="bg-white rounded-xl border border-gray-100 overflow-hidden p-6">
                <h2 className="text-lg font-semibold mb-4">Billing Information</h2>

                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First name</Label>
                    <Input id="firstName" className="rounded-xl border-gray-200 focus-visible:ring-gray-200" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last name</Label>
                    <Input id="lastName" className="rounded-xl border-gray-200 focus-visible:ring-gray-200" required />
                  </div>
                </div>

                <div className="space-y-2 mt-4">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    className="rounded-xl border-gray-200 focus-visible:ring-gray-200"
                    required
                  />
                  <p className="text-xs text-gray-500">Your tickets will be sent to this email address</p>
                </div>

                <div className="space-y-2 mt-4">
                  <Label htmlFor="phone">Phone number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    className="rounded-xl border-gray-200 focus-visible:ring-gray-200"
                    required
                  />
                </div>

                <div className="grid gap-4 sm:grid-cols-2 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="address">Address</Label>
                    <Input id="address" className="rounded-xl border-gray-200 focus-visible:ring-gray-200" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" className="rounded-xl border-gray-200 focus-visible:ring-gray-200" required />
                  </div>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 mt-4">
                  <div className="space-y-2">
                    <Label htmlFor="state">State</Label>
                    <Select defaultValue="ny">
                      <SelectTrigger id="state" className="rounded-xl border-gray-200 focus:ring-gray-200">
                        <SelectValue placeholder="Select state" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="ny">New York</SelectItem>
                        <SelectItem value="ca">California</SelectItem>
                        <SelectItem value="tx">Texas</SelectItem>
                        <SelectItem value="fl">Florida</SelectItem>
                        <SelectItem value="il">Illinois</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="zipCode">ZIP code</Label>
                    <Input id="zipCode" className="rounded-xl border-gray-200 focus-visible:ring-gray-200" required />
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-white rounded-xl border border-gray-100 overflow-hidden p-6">
                <h2 className="text-lg font-semibold mb-4">Payment Method</h2>

                <Tabs defaultValue="credit-card" onValueChange={setPaymentMethod} className="w-full">
                  <TabsList className="grid w-full grid-cols-3 bg-gray-50 rounded-xl p-1">
                    <TabsTrigger value="credit-card" className="rounded-lg data-[state=active]:bg-white">
                      Credit Card
                    </TabsTrigger>
                    <TabsTrigger value="paypal" className="rounded-lg data-[state=active]:bg-white">
                      PayPal
                    </TabsTrigger>
                    <TabsTrigger value="apple-pay" className="rounded-lg data-[state=active]:bg-white">
                      Apple Pay
                    </TabsTrigger>
                  </TabsList>

                  <TabsContent value="credit-card" className="mt-4 space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="cardNumber">Card number</Label>
                      <div className="relative">
                        <Input
                          id="cardNumber"
                          placeholder="1234 5678 9012 3456"
                          className="rounded-xl border-gray-200 focus-visible:ring-gray-200 pl-10"
                          required
                        />
                        <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                      </div>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-3">
                      <div className="space-y-2 sm:col-span-2">
                        <Label htmlFor="expiryDate">Expiry date</Label>
                        <Input
                          id="expiryDate"
                          placeholder="MM / YY"
                          className="rounded-xl border-gray-200 focus-visible:ring-gray-200"
                          required
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cvc">CVC</Label>
                        <Input
                          id="cvc"
                          placeholder="123"
                          className="rounded-xl border-gray-200 focus-visible:ring-gray-200"
                          required
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="nameOnCard">Name on card</Label>
                      <Input
                        id="nameOnCard"
                        className="rounded-xl border-gray-200 focus-visible:ring-gray-200"
                        required
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="paypal" className="mt-4">
                    <div className="text-center py-6">
                      <p className="text-gray-600 mb-4">
                        You will be redirected to PayPal to complete your purchase securely.
                      </p>
                      <Button
                        variant="outline"
                        className="rounded-full border-gray-200 hover:bg-gray-50 hover:text-gray-900"
                      >
                        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                          <path
                            d="M20.067 8.478c.492.88.493 2.053.025 3.34-1.116 3.306-4.27 4.3-8.365 4.247h-.758l-.544 3.342H6.16L8.27 6.61h5.708c2.875.004 5.173.99 6.09 1.868z"
                            fill="#253B80"
                          />
                          <path
                            d="M9.536 18.406l.544-3.342h.758c4.095.054 7.25-.94 8.365-4.247.468-1.287.467-2.46-.025-3.34-.917-.877-3.215-1.864-6.09-1.868H7.38L5.27 19.407h4.266z"
                            fill="none"
                          />
                          <path
                            d="M7.38 6.61H13.088c2.875.003 5.173.99 6.09 1.868.492.88.493 2.053.025 3.34-1.116 3.306-4.27 4.3-8.365 4.247h-.758l-.544 3.342H6.16L8.27 6.61H7.38z"
                            fill="none"
                          />
                          <path
                            d="M6.16 19.407l2.11-12.797 2.11-12.797h4.476c2.07 0 3.77.287 4.86 1.067.395.282.732.603 1 .957-1.143-1.322-3.394-1.834-6.05-1.834H8.272L6.16 6.61h5.708c2.875.003 5.173.99 6.09 1.868.492.88.493 2.053.025 3.34-1.116 3.306-4.27 4.3-8.365 4.247h-.758l-.544 3.342H6.16z"
                            fill="#179BD7"
                          />
                        </svg>
                        Continue with PayPal
                      </Button>
                    </div>
                  </TabsContent>

                  <TabsContent value="apple-pay" className="mt-4">
                    <div className="text-center py-6">
                      <p className="text-gray-600 mb-4">Click the button below to pay with Apple Pay.</p>
                      <Button
                        variant="outline"
                        className="rounded-full border-gray-200 hover:bg-gray-50 hover:text-gray-900"
                      >
                        <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                          <path
                            d="M13.066 7.292c1.754 0 2.92.82 3.592 1.508.683.63 1.186 1.513 1.375 2.438h-2.875c-.187-.488-.683-1.313-2.092-1.313-1.587 0-2.913 1.313-2.913 3.25 0 1.938 1.326 3.25 2.913 3.25 1.409 0 1.905-.825 2.092-1.313h2.875c-.189.925-.692 1.808-1.375 2.438-.672.688-1.838 1.508-3.592 1.508-2.996 0-5.792-2.313-5.792-5.883s2.796-5.883 5.792-5.883z"
                            fill="currentColor"
                          />
                        </svg>
                        Pay with Apple Pay
                      </Button>
                    </div>
                  </TabsContent>
                </Tabs>
              </div>

              <div className="flex items-start gap-2">
                <div className="flex items-center h-5 mt-0.5">
                  <input
                    id="terms"
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-black focus:ring-gray-200"
                    required
                  />
                </div>
                <Label htmlFor="terms" className="text-sm font-normal">
                  I agree to the{" "}
                  <Link href="/terms" className="text-blue-600 hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-blue-600 hover:underline">
                    Privacy Policy
                  </Link>
                </Label>
              </div>

              <Button type="submit" className="w-full rounded-full bg-black text-white hover:bg-gray-800">
                Complete Purchase
              </Button>
            </form>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-24 bg-white rounded-xl border border-gray-100 overflow-hidden">
              <div className="p-6">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>

                <div className="flex gap-4 pb-4 border-b border-gray-100">
                  <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                    <img
                      src={eventData.image || "/placeholder.svg"}
                      alt={eventData.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium">{eventData.name}</h3>
                    <p className="text-sm text-gray-600">
                      {eventData.date} • {eventData.time}
                    </p>
                    <p className="text-sm text-gray-600">{eventData.venue}</p>
                  </div>
                </div>

                <div className="py-4 border-b border-gray-100">
                  <div className="flex justify-between mb-2">
                    <span className="text-gray-600">{selectedTicketType.name}</span>
                    <span>${selectedTicketType.price.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Quantity</span>
                    <span>{quantity}</span>
                  </div>
                </div>

                <div className="py-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <span className="text-gray-600">Service Fee</span>
                      <button className="ml-1 text-gray-400 hover:text-gray-600">
                        <Info className="h-3 w-3" />
                      </button>
                    </div>
                    <span>${serviceFee.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <div className="flex items-center">
                      <span className="text-gray-600">Facility Fee</span>
                      <button className="ml-1 text-gray-400 hover:text-gray-600">
                        <Info className="h-3 w-3" />
                      </button>
                    </div>
                    <span>${facilityFee.toFixed(2)}</span>
                  </div>
                </div>

                <Separator className="my-4" />

                <div className="flex justify-between font-medium text-lg">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-gray-100 py-8 bg-white mt-12">
        <div className="container">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-sm text-gray-600">© {new Date().getFullYear()} ticketly. All rights reserved.</p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              {["Terms", "Privacy", "Help"].map((link) => (
                <Link key={link} href="#" className="text-sm text-gray-600 hover:text-gray-900">
                  {link}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

