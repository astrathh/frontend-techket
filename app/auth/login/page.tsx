"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowLeft, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [formState, setFormState] = useState({
    email: "",
    password: "",
    rememberMe: false,
  })

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormState({
      ...formState,
      [name]: type === "checkbox" ? checked : value,
    })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // Handle login logic here
    console.log("Form submitted:", formState)
  }

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="container max-w-md mx-auto px-4 py-8 flex-1 flex flex-col">
        <div className="mb-8">
          <Link href="/" className="text-sm text-gray-600 hover:text-gray-900 flex items-center gap-1">
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-gray-600 mt-2">Sign in to your ticketly account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formState.email}
              onChange={handleChange}
              className="rounded-xl border-gray-200 focus-visible:ring-gray-200"
              required
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link href="/auth/forgot-password" className="text-xs text-blue-600 hover:underline">
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formState.password}
                onChange={handleChange}
                className="rounded-xl border-gray-200 focus-visible:ring-gray-200 pr-10"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <input
              id="rememberMe"
              name="rememberMe"
              type="checkbox"
              checked={formState.rememberMe}
              onChange={handleChange}
              className="h-4 w-4 rounded border-gray-300 text-black focus:ring-gray-200"
            />
            <Label htmlFor="rememberMe" className="text-sm font-normal">
              Remember me
            </Label>
          </div>

          <Button type="submit" className="w-full rounded-full bg-black text-white hover:bg-gray-800">
            Sign in
          </Button>
        </form>

        <div className="mt-6 flex items-center gap-2">
          <Separator className="flex-1" />
          <span className="text-xs text-gray-500">OR</span>
          <Separator className="flex-1" />
        </div>

        <div className="mt-6 space-y-4">
          <Button
            variant="outline"
            className="w-full rounded-full border-gray-200 hover:bg-gray-50 hover:text-gray-900"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
              <path d="M1 1h22v22H1z" fill="none" />
            </svg>
            Continue with Google
          </Button>
          <Button
            variant="outline"
            className="w-full rounded-full border-gray-200 hover:bg-gray-50 hover:text-gray-900"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                fill="#1877F2"
              />
              <path
                d="M15.893 14.89l.443-2.89h-2.773v-1.876c0-.791.387-1.562 1.63-1.562h1.26v-2.46s-1.144-.195-2.238-.195c-2.285 0-3.777 1.384-3.777 3.89V12h-2.54v2.89h2.54v6.988a10.04 10.04 0 003.124 0v-6.988h2.33z"
                fill="white"
              />
            </svg>
            Continue with Facebook
          </Button>
          <Button
            variant="outline"
            className="w-full rounded-full border-gray-200 hover:bg-gray-50 hover:text-gray-900"
          >
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path
                d="M13.066 7.292c1.754 0 2.92.82 3.592 1.508.683.63 1.186 1.513 1.375 2.438h-2.875c-.187-.488-.683-1.313-2.092-1.313-1.587 0-2.913 1.313-2.913 3.25 0 1.938 1.326 3.25 2.913 3.25 1.409 0 1.905-.825 2.092-1.313h2.875c-.189.925-.692 1.808-1.375 2.438-.672.688-1.838 1.508-3.592 1.508-2.996 0-5.792-2.313-5.792-5.883s2.796-5.883 5.792-5.883z"
                fill="currentColor"
              />
            </svg>
            Continue with Apple
          </Button>
        </div>

        <p className="text-center text-sm text-gray-600 mt-8">
          Don't have an account?{" "}
          <Link href="/auth/register" className="text-blue-600 hover:underline">
            Sign up
          </Link>
        </p>
      </div>

      <footer className="border-t border-gray-100 py-6 bg-white">
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

