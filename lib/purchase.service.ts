// app/lib/purchase.service.ts
import { API_URL } from '../app/api/api';
import { AuthService } from './auth.service';

export const PurchaseService = {
  async addToCart(eventId: number) {
    const token = AuthService.getToken();
    if (!token) {
      throw new Error('Você precisa estar logado');
    }
    
    const response = await fetch(`${API_URL}/purchase/cart`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ eventId }),
    });
    
    if (!response.ok) {
      throw new Error('Erro ao adicionar ao carrinho');
    }
    
    return await response.json();
  },
  
  async getCart() {
    const token = AuthService.getToken();
    if (!token) {
      throw new Error('Você precisa estar logado');
    }
    
    const response = await fetch(`${API_URL}/purchase/cart`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Erro ao buscar carrinho');
    }
    
    return await response.json();
  },
  
  async purchase(eventId: number) {
    const token = AuthService.getToken();
    if (!token) {
      throw new Error('Você precisa estar logado');
    }
    
    const response = await fetch(`${API_URL}/purchase`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({ eventId }),
    });
    
    if (!response.ok) {
      throw new Error('Erro ao realizar a compra');
    }
    
    return await response.json();
  },
  
  async getPurchaseHistory() {
    const token = AuthService.getToken();
    if (!token) {
      throw new Error('Você precisa estar logado');
    }
    
    const response = await fetch(`${API_URL}/purchase/history`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });
    
    if (!response.ok) {
      throw new Error('Erro ao buscar histórico de compras');
    }
    
    return await response.json();
  },
};