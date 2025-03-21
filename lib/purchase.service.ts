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
    try {
      console.log(`[PurchaseService] Iniciando compra do evento ID: ${eventId}`);
      
      const token = AuthService.getToken();
      console.log(`[PurchaseService] Token obtido: ${token ? 'Sim' : 'Não'}`);
      
      if (!token) {
        console.error('[PurchaseService] Erro: Usuário não está logado');
        throw new Error('Você precisa estar logado');
      }
      
      console.log(`[PurchaseService] Enviando requisição para: ${API_URL}/purchase`);
      console.log(`[PurchaseService] Corpo da requisição:`, { eventId });
      
      const response = await fetch(`${API_URL}/purchase`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ eventId }),
      });
      
      console.log(`[PurchaseService] Status da resposta: ${response.status} ${response.statusText}`);
      
      if (!response.ok) {
        // Tentar extrair mensagem de erro da resposta
        try {
          const errorData = await response.json();
          console.error('[PurchaseService] Detalhes do erro:', errorData);
          throw new Error(errorData.message || 'Erro ao realizar a compra');
        } catch (parseError) {
          console.error('[PurchaseService] Erro ao processar resposta de erro:', parseError);
          throw new Error(`Erro ao realizar a compra: ${response.status}`);
        }
      }
      
      const data = await response.json();
      console.log('[PurchaseService] Resposta bem-sucedida:', data);
      return data;
    } catch (error) {
      console.error('[PurchaseService] Erro durante a compra:', error);
      throw error;
    }
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