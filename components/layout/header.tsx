"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShoppingCart, User, Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";

export default function Header() {
  const { isAuthenticated, logout } = useAuth();
  const [userName, setUserName] = useState("");
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    setMounted(true);
    // Recuperar o nome do usuário do localStorage
    if (typeof window !== "undefined") {
      const firstName = localStorage.getItem("user_firstName");
      setUserName(firstName || "Usuário");
    }
  }, [isAuthenticated]); // Adicionar isAuthenticated como dependência para atualizar quando o status mudar

  // Evitar problemas de hidratação
  if (!mounted) {
    return (
      <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <Link href="/" className="text-xl font-semibold tracking-tight">
            Techket
          </Link>
          <div className="flex items-center space-x-4">
            {/* Espaço reservado para os botões que serão renderizados no cliente */}
            <div className="h-9 w-20"></div>
          </div>
        </div>
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between">
        <Link href="/" className="text-xl font-semibold tracking-tight">
          Techket
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
          {isAuthenticated ? (
            <>
              <Link href="/cart">
                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                  <ShoppingCart className="h-5 w-5" />
                </Button>
              </Link>
              <div className="flex items-center">
                <User className="h-5 w-5 text-gray-600 mr-2" />
                <span className="text-sm font-medium">Olá, {userName}</span>
              </div>
            </>
          ) : (
            <>
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
            </>
          )}
          
          {/* Menu para mobile */}
          <div className="md:hidden">
            <Button 
              variant="ghost" 
              size="sm" 
              className="text-gray-600 hover:text-gray-900"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <Menu className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </div>
      
      {/* Menu mobile */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white">
          <div className="container py-4 space-y-4">
            <Link 
              href="/events" 
              className="block text-sm font-medium text-gray-600 hover:text-gray-900"
              onClick={() => setMobileMenuOpen(false)}
            >
              Events
            </Link>
            <Link 
              href="/venues" 
              className="block text-sm font-medium text-gray-600 hover:text-gray-900"
              onClick={() => setMobileMenuOpen(false)}
            >
              Venues
            </Link>
            <Link 
              href="/about" 
              className="block text-sm font-medium text-gray-600 hover:text-gray-900"
              onClick={() => setMobileMenuOpen(false)}
            >
              About
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}