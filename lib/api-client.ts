import { API_URL } from '../app/api/api';
import { AuthService } from './auth.service';

export const ApiClient = {
  async get<T>(endpoint: string): Promise<T> {
    return this.request<T>('GET', endpoint);
  },

  async post<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>('POST', endpoint, data);
  },

  async put<T>(endpoint: string, data?: any): Promise<T> {
    return this.request<T>('PUT', endpoint, data);
  },

  async delete<T>(endpoint: string): Promise<T> {
    return this.request<T>('DELETE', endpoint);
  },

  async request<T>(method: string, endpoint: string, data?: any): Promise<T> {
    const url = `${API_URL}${endpoint}`;
    console.log(`Fazendo requisição ${method} para: ${url}`);
    if (data) {
      console.log('Payload enviado:', JSON.stringify(data, null, 2));
    }
    
    const token = AuthService.getToken();
    
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
    };

    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
      console.log('Token incluído no header de autorização');
    } else {
      console.log('Nenhum token disponível para a requisição');
    }

    const options: RequestInit = {
      method,
      headers,
      body: data ? JSON.stringify(data) : undefined,
    };

    try {
      // Log completo da requisição
      console.log('Requisição completa:', {
        url,
        method,
        headers,
        body: options.body ? JSON.parse(options.body as string) : undefined
      });
      
      const response = await fetch(url, options);
      console.log(`Resposta recebida: Status ${response.status} ${response.statusText}`);

      // Para depuração, vamos imprimir os cabeçalhos
      const responseHeaders: Record<string, string> = {};
      response.headers.forEach((value, key) => {
        responseHeaders[key] = value;
      });
      console.log('Cabeçalhos da resposta:', responseHeaders);

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Resposta de erro completa:', errorText);
        
        let errorMessage = 'Ocorreu um erro na requisição';
        
        try {
          const errorData = JSON.parse(errorText);
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          console.error('Erro ao parsear resposta de erro:', e);
        }
        
        console.error(`Erro na requisição (${response.status}):`, errorMessage);
        throw new Error(errorMessage);
      }

      // Verificar o content-type para determinar como processar a resposta
      const contentType = response.headers.get('content-type');
      
      // Se a resposta for 204 No Content ou similar
      if (response.status === 204 || response.headers.get('content-length') === '0') {
        console.log('Resposta sem conteúdo');
        return {} as T;
      }
      
      let jsonResponse: any;
      
      if (contentType && contentType.includes('application/json')) {
        jsonResponse = await response.json();
      } else {
        // Tentar tratar como texto
        const textResponse = await response.text();
        console.log('Resposta em formato texto:', textResponse);
        
        try {
          // Tentar converter para JSON mesmo assim
          jsonResponse = JSON.parse(textResponse);
        } catch (e) {
          // Se não for JSON, retornar como string em um objeto
          jsonResponse = { response: textResponse };
        }
      }
      
      console.log('Resposta parseada:', jsonResponse);
      return jsonResponse;
    } catch (error) {
      console.error('Erro durante a requisição:', error);
      throw error;
    }
  },
};
