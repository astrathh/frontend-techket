# Techket - Sistema de Venda de Ingressos para Eventos
![techket](https://github.com/user-attachments/assets/01c3068c-7779-463c-8bae-fbc7254b2795)


# 📋 Sobre o Projeto
Techket é uma plataforma completa para venda de ingressos online onde usuários podem descobrir, comprar e gerenciar ingressos para uma variedade de eventos. O sistema oferece uma experiência intuitiva e segura, permitindo que organizadores de eventos divulguem seus eventos e que usuários encontrem facilmente experiências incríveis.

# 🚀 Tecnologias Utilizadas
# Frontend
- Next.js 15 - Framework React com renderização híbrida
- React 18 - Biblioteca JavaScript para construção de interfaces
- TypeScript - Superset tipado de JavaScript
- Tailwind CSS - Framework CSS utilitário
- Radix UI - Componentes acessíveis e sem estilo
- Lucide React - Ícones personalizáveis
- React Hook Form - Gerenciamento de formulários
- Zod - Validação de esquemas TypeScript
- date-fns - Manipulação de datas
- Embla Carousel - Componente de carrossel

# Backend
- NestJS - Framework Node.js progressivo
- PostgreSQL - Banco de dados relacional
- Prisma ORM - ORM para Node.js e TypeScript
- JWT - Autenticação baseada em tokens
- Passport - Autenticação para Node.js

# 🔧 Configuração do Projeto
Pré-requisitos
- Node.js (v18 ou superior)
- npm ou yarn
- PostgreSQL

# Instalação do Frontend
1 - Clone o repositório
- git clone https://github.com/seu-usuario/techket.git
cd techket/frontend-techket

2 - Instale as dependências
- npm install
ou
yarn install

3 - Configure as variáveis de ambiente Crie um arquivo .env.local na raiz do projeto frontend com as seguintes variáveis:
- NEXT_PUBLIC_API_URL=http://localhost:3000

4 - Inicie o servidor de desenvolvimento
- npm run dev
ou
yarn dev
- O frontend estará disponível em http://localhost:3001

# Instalação do Backend

1 - Navegue para a pasta do backend
- cd ../backend-techket

2 - Instale as dependências
- npm install
ou
yarn install

3 - Configure as variáveis de ambiente Crie um arquivo .env na raiz do projeto backend com as seguintes variáveis:
- DATABASE_URL="postgresql://usuario:senha@localhost:5432/techket?schema=public"
SHADOW_DATABASE_URL="postgresql://usuario:senha@localhost:5432/techket_shadow?schema=public"
JWT_SECRET=seu_jwt_secret_aqui

4 - Execute as migrações do banco de dados
- npx prisma migrate dev
ou
yarn prisma migrate dev

5 - Inicie o servidor de desenvolvimento
- npm run start:dev
ou
yarn start:dev
- O backend estará disponível em http://localhost:3000

# 🌟 Funcionalidades
Para Usuários
Cadastro e autenticação segura
Navegação e busca por eventos
Compra de ingressos
Carrinhos de compras
Visualização de ingressos comprados
Histórico de compras
Para Organizadores
Cadastro de eventos
Gerenciamento de ingressos
Análise de vendas
Personalização de páginas de eventos

# 📦 Estrutura do Projeto
- techket/
├── frontend-techket/       # Projeto Next.js (Frontend)
│   ├── app/                # Rotas e páginas
│   ├── components/         # Componentes React
│   ├── lib/                # Funções utilitárias
│   └── hooks/              # Hooks personalizados
│
└── backend-techket/        # Projeto NestJS (Backend)
    ├── src/                # Código fonte
    │   ├── auth/           # Autenticação
    │   ├── events/         # Gerenciamento de eventos
    │   ├── purchase/       # Compras e carrinho
    │   ├── users/          # Gerenciamento de usuários
    │   └── prisma/         # Configuração e schema do Prisma
    └── test/               # Testes automatizados

# 🤝 Contribuição
Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests para melhorar o projeto.

- Faça um fork do projeto
- Crie sua branch de feature (git checkout -b feature/amazing-feature)
- Faça commit das suas alterações (git commit -m 'Add some amazing feature')
- Faça push para a branch (git push origin feature/amazing-feature)
- Abra um Pull Request

# 📞 Contato
- E-mail: astratnho@hotmail.com
- LinkedIn: Victor Astrath (https://www.linkedin.com/in/victor-astrath-681410a0/)
- GitHub: astrathh (https://github.com/astrathh)
