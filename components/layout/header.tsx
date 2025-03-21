"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ShoppingCart, User, Menu, LogOut, Ticket } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/auth-context";
import { useRouter } from "next/navigation";

export default function Header() {
  const { isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [userName, setUserName] = useState("");
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  // Fechar dropdown quando clicar fora dele
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setMounted(true);
    // Recuperar o nome do usuário do localStorage
    if (typeof window !== "undefined") {
      const firstName = localStorage.getItem("user_firstName");
      setUserName(firstName || "Usuário");
    }
  }, [isAuthenticated]); // Adicionar isAuthenticated como dependência para atualizar quando o status mudar

  const handleLogout = () => {
    logout();
    setUserDropdownOpen(false);
    router.push('/');
  };

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
            Eventos
          </Link>
          <Link href="" className="text-sm font-medium text-gray-600 hover:text-gray-900">
            Locais
          </Link>
          <Link href="" className="text-sm font-medium text-gray-600 hover:text-gray-900">
            Sobre
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
              
              {/* User dropdown */}
              <div className="relative" ref={dropdownRef}>
                <div 
                  className="flex items-center cursor-pointer p-1 rounded-full hover:bg-gray-100"
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                >
                  <User className="h-5 w-5 text-gray-600 mr-2" />
                  <span className="text-sm font-medium">Olá, {userName}</span>
                </div>
                
                {/* Dropdown menu */}
                {userDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 border border-gray-100">
                    <Link 
                      href="/purchase" 
                      className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setUserDropdownOpen(false)}
                    >
                      <Ticket className="h-4 w-4 mr-3 text-gray-500" />
                      Meus Ingressos
                    </Link>
                    <div className="border-t border-gray-100 my-1"></div>
                    <button 
                      onClick={handleLogout}
                      className="flex items-center w-full text-left px-4 py-2 text-sm text-gray-800 hover:bg-gray-100"
                    >
                      <LogOut className="h-4 w-4 mr-3 text-gray-500" />
                      Sair
                    </button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <>
              <Link href="/auth/login">
                <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900">
                  Entrar
                </Button>
              </Link>
              <Link href="/auth/register">
                <Button size="sm" className="rounded-full bg-black text-white hover:bg-gray-800">
                  Criar Conta
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
              Eventos
            </Link>
            <Link 
              href="/venues" 
              className="block text-sm font-medium text-gray-600 hover:text-gray-900"
              onClick={() => setMobileMenuOpen(false)}
            >
              Locais
            </Link>
            <Link 
              href="/about" 
              className="block text-sm font-medium text-gray-600 hover:text-gray-900"
              onClick={() => setMobileMenuOpen(false)}
            >
              Sobre
            </Link>
            
            {isAuthenticated && (
              <>
                <div className="border-t border-gray-100 pt-4 mt-4">
                  <Link 
                    href="/purchase" 
                    className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 mb-3"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <Ticket className="h-4 w-4 mr-2" />
                    Meus Ingressos
                  </Link>
                  <button 
                    onClick={handleLogout}
                    className="flex items-center text-sm font-medium text-gray-800 hover:text-gray-900"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sair
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}