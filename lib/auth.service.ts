import { ApiClient } from './api-client';

type LoginResponse = {
  token?: string;
  accessToken?: string; 
  access_token?: string;
  user?: {
    id?: string;
    email?: string;
  };
  id?: string;
  email?: string;
};

export const AuthService = {
  async login(email: string, password: string): Promise<LoginResponse> {
    try {
      console.log('Tentando fazer login com payload exato:', JSON.stringify({ email, password }, null, 2));
      const response = await ApiClient.post<any>('/auth/login', { email, password });
      console.log('Resposta do login (formato bruto):', response);
      
      // Lidar com diferentes formatos de resposta
      let token = null;
      if (response.token) {
        token = response.token;
      } else if (response.accessToken) {
        token = response.accessToken;
      } else if (response.access_token) {
        token = response.access_token;
      } else if (response.data && response.data.token) {
        token = response.data.token;
      } else if (response.data && response.data.accessToken) {
        token = response.data.accessToken;
      } else if (response.data && response.data.access_token) {
        token = response.data.access_token;
      } else if (typeof response === 'string') {
        token = response;
      }
      
      console.log('Verificação de token na resposta:', {
        hasToken: !!response.token,
        hasAccessToken: !!response.accessToken,
        hasAccess_token: !!response.access_token,
        responseType: typeof response,
        responseKeys: typeof response === 'object' ? Object.keys(response) : 'not an object'
      });
      
      if (!token) {
        console.error('Nenhum token identificado na resposta:', response);
        throw new Error('Token não recebido do servidor. Verifique o formato da resposta.');
      }
      
      localStorage.setItem('auth_token', token);
      console.log('Token armazenado no localStorage:', token);
      
      // Diagnóstico completo após login
      this.diagnosticCheck();
      
      // Formatar a resposta de acordo com o que o frontend espera
      const formattedResponse: LoginResponse = { 
        token: token,
        accessToken: token,
        access_token: token,
        id: response.id || response.user?.id || 'unknown-id',
        email: response.email || response.user?.email || email
      };
      
      return formattedResponse;
    } catch (error: any) {
      console.error('Erro detalhado do login:', error);
      throw new Error(error?.message || 'Falha na autenticação. Verifique suas credenciais.');
    }
  },

  async register(email: string, password: string, firstName: string, lastName: string, agreeToTerms: boolean) {
    try {
      console.log('Tentando registrar:', { email, firstName, lastName, agreeToTerms });
      const response = await ApiClient.post('/auth/register', { 
        email, 
        password, 
        firstName, 
        lastName, 
        agreeToTerms 
      });
      console.log('Resposta do registro:', response);
      return response;
    } catch (error: any) {
      console.error('Erro detalhado do registro:', error);
      throw new Error(error?.message || 'Falha ao registrar. Este email pode já estar em uso.');
    }
  },

  // Adicionando método de logout que estava faltando
  logout() {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('auth_token');
      console.log('Usuário deslogado, token removido');
    }
  },

  getToken() {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token');
      return token;
    }
    return null;
  },

  setToken(token: string) {
    if (typeof window !== 'undefined') {
      localStorage.setItem('auth_token', token);
      console.log('Token definido manualmente:', token.substring(0, 15) + '...');
    }
  },

  isAuthenticated() {
    return !!this.getToken();
  },

  diagnosticCheck() {
    console.log('=== DIAGNÓSTICO DE AUTENTICAÇÃO ===');
    
    // Verificar localStorage
    const token = this.getToken();
    console.log('Token no localStorage:', token ? `${token.substring(0, 15)}...` : 'Nenhum token encontrado');
    console.log('Usuário está autenticado:', this.isAuthenticated() ? 'SIM' : 'NÃO');
    
    // Verificar todos os itens no localStorage
    console.log('Todos os itens no localStorage:');
    if (typeof window !== 'undefined') {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        let value = localStorage.getItem(key || '');
        if (key === 'auth_token' && value) {
          // Mascarar o token para segurança
          value = `${value.substring(0, 15)}...`;
        }
        console.log(`- ${key}: ${value}`);
      }
    }
    
    console.log('===============================');
    return true;
  }
};