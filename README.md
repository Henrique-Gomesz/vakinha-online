# 🎯 Vakinha Online - Sistema Completo

Sistema completo de vakinhas online com Frontend (Vue.js), Backend (Express.js) e MongoDB, totalmente dockerizado.

## 📁 Estrutura do Projeto

```
vakinha-online/
├── frontend/               # Aplicação Vue.js
├── backend/               # API Express.js + MongoDB
├── docker-compose.yaml    # Orquestração Docker
└── DOCKER.md             # Documentação Docker completa
```

## 🚀 Início Rápido com Docker

### 1. Iniciar todos os serviços
```bash
docker-compose up
```

### 2. Popular banco de dados (opcional)
Em outro terminal:
```bash
docker-compose exec backend npm run seed
```

### 3. Acessar a aplicação
- **Frontend:** http://localhost:5173
- **Backend API:** http://localhost:3000
- **MongoDB:** localhost:27017

### 4. Parar os containers
```bash
docker-compose down
```

## 📊 Serviços Incluídos

| Serviço  | Porta | Descrição |
|----------|-------|-----------|
| Frontend | 5173  | Interface Vue.js |
| Backend  | 3000  | API Express.js |
| MongoDB  | 27017 | Banco de dados |

## 🛠️ Comandos Úteis

```bash
# Iniciar em background
docker-compose up -d

# Reconstruir containers
docker-compose up --build

# Ver logs
docker-compose logs -f

# Ver logs de um serviço
docker-compose logs backend

# Parar e remover volumes
docker-compose down -v

# Acessar shell do backend
docker-compose exec backend sh

# Acessar MongoDB shell
docker-compose exec mongodb mongosh vakinha-online
```

## 📚 Documentação Completa

- **Guia Rápido:** Ver [GUIA_RAPIDO.md](./GUIA_RAPIDO.md) - Tudo que você precisa saber
- **Docker:** Ver [DOCKER.md](./DOCKER.md) - Guia completo Docker
- **Frontend:** Ver [frontend/README.md](./frontend/README.md) - Documentação Vue.js
- **Backend:** Ver [backend/README.md](./backend/README.md) - Documentação da API
- **Exemplos API:** Ver [backend/EXEMPLOS_API.md](./backend/EXEMPLOS_API.md)
- **Início Rápido Backend:** Ver [backend/INICIO_RAPIDO.md](./backend/INICIO_RAPIDO.md)

## 🎯 Funcionalidades

### Frontend (Vue.js + TypeScript)
- ✅ Cadastro de usuários com validação
- ✅ Criação de vakinhas
- ✅ Listagem com filtros por categoria
- ✅ Detalhes da vakinha
- ✅ Sistema de contribuições
- ✅ Contribuição anônima
- ✅ Cálculo de progresso e dias restantes
- ✅ Preview de imagens
- ✅ Formatação automática (CPF, telefone)

### Backend (Express.js + MongoDB)
- ✅ API RESTful completa
- ✅ CRUD de usuários, vakinhas e contribuições
- ✅ Autenticação com bcrypt
- ✅ Validações de dados
- ✅ Soft delete
- ✅ Filtros e queries
- ✅ CORS e Helmet configurados
- ✅ Seeds para dados de teste

### Integração
- ✅ Frontend totalmente integrado com Backend
- ✅ Services TypeScript para todas as entidades
- ✅ Tratamento de erros
- ✅ Mensagens de feedback ao usuário
- ✅ Atualização em tempo real dos dados

## 🔐 Credenciais de Teste

Após executar o seed:
```
Email: joao@email.com
Senha: senha123
```

## 🐛 Problemas Comuns

Consulte [DOCKER.md](./DOCKER.md) para soluções de problemas comuns.

## ✅ Requisitos

- Docker
- Docker Compose
- Portas 3000, 5173 e 27017 disponíveis
