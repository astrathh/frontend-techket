// app/lib/events.service.ts
import { API_URL } from '../app/api/api';
import { AuthService } from './auth.service';

export const EventsService = {
  async getAllEvents() {
    const response = await fetch(`${API_URL}/events`);
    
    if (!response.ok) {
      throw new Error('Erro ao buscar eventos');
    }
    
    return await response.json();
  },
  
  async getEventById(id: number) {
    const response = await fetch(`${API_URL}/events/${id}`);
    
    if (!response.ok) {
      throw new Error('Evento não encontrado');
    }
    
    return await response.json();
  },
};