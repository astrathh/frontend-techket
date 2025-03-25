"use client";

import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthService } from './auth.service';
import { useRouter } from 'next/navigation';
import { API_URL } from '../app/api/api';
import "../app/globals.css"

type User = {
  id: string;
  email: string;
  firstName?: string;
};

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<any>;
  logout: () => void;
  isAuthenticated: boolean;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>
        <AuthProvider>
          {children}
        </AuthProvider>
      </body>
    </html>
  )
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  // Função para verificar autenticação e atualizar o estado
  const checkAndUpdateAuth = () => {
    const isAuth = AuthService.getToken() !== null;
    setIsAuthenticated(isAuth);
    
    if (isAuth && !user) {
      // Se temos um token mas não temos dados do usuário, usamos dados temporários
      setUser({ id: 'temp-id', email: 'user@example.com' });
    } else if (!isAuth && user) {
      // Se não temos token mas temos dados de usuário, limpamos os dados
      setUser(null);
    }
    
    return isAuth;
  };

  useEffect(() => {
    // Verificar token ao carregar a página
    const checkAuth = async () => {
      try {
        console.log('AuthProvider: Verificando autenticação...');
        const isAuth = checkAndUpdateAuth();
        
        if (isAuth) {
          console.log('AuthProvider: Token encontrado, considerando usuário autenticado');
          const token = AuthService.getToken();
          console.log('AuthProvider: Token atual:', token ? `${token.substring(0, 15)}...` : 'nenhum');
        } else {
          console.log('AuthProvider: Nenhum token encontrado, usuário não está autenticado');
        }
      } catch (error) {
        console.error('AuthProvider: Erro ao verificar autenticação:', error);
        AuthService.logout();
        setUser(null);
        setIsAuthenticated(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);
      
      // Chamada direta ao endpoint usando fetch
      const response = await fetch('${API_URL}/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      // Processar a resposta da API
      if (!response.ok) {
        throw new Error(`Login failed: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      
      // Verificar se o token está na propriedade 'access_token'
      if (data && data.access_token) {
        console.log('Token encontrado na resposta:', data.access_token.substring(0, 15) + '...');
        AuthService.setToken(data.access_token);
        
        // Extrair dados do usuário ou usar dados temporários
        const userData = {
          id: data.id || data.user?.id || 'temp-id',
          email: data.email || data.user?.email || email,
          firstName: data.firstName || data.user?.firstName || 'Usuário'
        };
        
        // Armazenar o nome do usuário no localStorage para fácil acesso pelo cabeçalho
        if (typeof window !== 'undefined') {
          localStorage.setItem('user_firstName', userData.firstName);
        }
        
        setUser(userData);
        
        // Atualizar o estado de autenticação
        setIsAuthenticated(true);
        
        console.log('Login bem-sucedido, usuário definido:', userData);
        
        // Redirecionar para a página principal em vez do dashboard
        router.push('/');
        
        return data;
      } else {
        console.error('Token não encontrado na resposta:', data);
        throw new Error('Token não encontrado na resposta');
      }
    } catch (error) {
      console.error('Erro durante login:', error);
      setUser(null);
      setIsAuthenticated(false);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    console.log('AuthProvider: Realizando logout');
    AuthService.logout();
    setUser(null);
    setIsAuthenticated(false);
    console.log('AuthProvider: Estado do usuário definido como null');
    router.push('/auth/login');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        isAuthenticated,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}