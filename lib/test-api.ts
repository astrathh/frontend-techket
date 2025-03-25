// Função para testar diretamente a API
export async function testDirectApiCall() {
    console.log("=== INICIANDO TESTE DIRETO DA API ===");
    
    try {
      // Credenciais de teste
      const credenciais = {
        email: "teste@example.com",
        password: "123456"
      };
  
      // Fazer a requisição para o endpoint de login
      const response = await fetch('${API_URL}/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(credenciais),
      });
  
      console.log("Status da resposta:", response.status, response.statusText);
      console.log("Headers da resposta: ", response.headers);
  
      // Obter o texto bruto da resposta
      const responseText = await response.text();
      console.log("Resposta de texto bruto:", responseText);
  
      // Tentar parsear como JSON
      let data;
      try {
        data = JSON.parse(responseText);
        console.log("Resposta parseada como JSON: ", data);
        
        // Verificar se o token está presente
        if (data && data.access_token) {
          console.log("Token encontrado:", data.access_token);
          // Armazenar o token no localStorage para demonstração
          localStorage.setItem('authToken', data.access_token);
          console.log("Token armazenado no localStorage");
        } else {
          console.log("Nenhum token encontrado no objeto de resposta");
        }
      } catch (error) {
        console.error("Erro ao parsear resposta como JSON:", error);
      }
  
    } catch (error) {
      console.error("Erro ao fazer requisição:", error);
    }
    
    console.log("=== FIM DO TESTE ===");
  }
  
  // Função para testar login direto com credenciais fornecidas
  export async function testDirectLoginWith(email: string, password: string) {
    console.log("=== TESTANDO LOGIN COM CREDENCIAIS FORNECIDAS ===");
    console.log(`Email: ${email}, Senha: ${password}`);
    
    try {
      // Fazer a requisição para o endpoint de login
      const response = await fetch('${API_URL}/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
  
      console.log("Status da resposta:", response.status, response.statusText);
  
      // Obter o texto bruto da resposta
      const responseText = await response.text();
      console.log("Resposta de texto bruto:", responseText);
  
      // Tentar parsear como JSON
      let data;
      try {
        data = JSON.parse(responseText);
        console.log("Resposta parseada como JSON: ", data);
        
        // Verificar se o token está presente
        if (data && data.access_token) {
          console.log("Token encontrado:", data.access_token);
          // Armazenar o token no localStorage para demonstração
          localStorage.setItem('authToken', data.access_token);
          console.log("Token armazenado no localStorage");
        } else {
          console.log("Nenhum token encontrado no objeto de resposta");
        }
      } catch (error) {
        console.error("Erro ao parsear resposta como JSON:", error);
      }
  
    } catch (error) {
      console.error("Erro ao fazer requisição:", error);
    }
    
    console.log("=== FIM DO TESTE ===");
  }