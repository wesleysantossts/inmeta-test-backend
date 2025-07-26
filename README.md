
# 🚀 Desafio Técnico - Desenvolvedor Back-end

> **API RESTful desenvolvida para o processo seletivo da InMeta**

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![PostgreSQL](https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white)](https://www.postgresql.org/)
[![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)](https://www.docker.com/)
[![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=white)](https://jwt.io/)

## 📋 Sobre o Projeto

Esta API foi desenvolvida como parte do desafio técnico para a vaga de Desenvolvedor Back-End na **InMeta**. O projeto demonstra minha experiência em desenvolvimento de APIs RESTful, arquitetura limpa, segurança e boas práticas de desenvolvimento.

### ✨ Principais Funcionalidades

- 🔐 **Autenticação JWT** - Sistema completo de login e registro
- 👤 **Gerenciamento de Colaboradores** - CRUD completo com validações
- 🛡️ **Segurança** - Middleware de autenticação e autorização
- 📚 **Documentação Swagger** - API totalmente documentada
- 🧪 **Testes Automatizados** - Cobertura de testes unitários
- 🐳 **Containerização** - Estruturado em Docker

## 🛠️ Stack Tecnológica

| Tecnologia     | Versão | Descrição                      |
| -------------- | ------ | ------------------------------ |
| **Node.js**    | 20+    | Runtime JavaScript             |
| **TypeScript** | 5.x    | Superset tipado do JavaScript  |
| **Express**    | 5.x    | Framework web minimalista      |
| **PostgreSQL** | 16+    | Banco de dados relacional      |
| **Docker**     | 28+    | Containerização da aplicação   |
| **JWT**        | -      | Autenticação baseada em tokens |
| **Swagger**    | 3.0    | Documentação interativa da API |

## 🚀 Início Rápido

### Pré-requisitos

- [Docker](https://docs.docker.com/get-docker/) e [Docker Compose](https://docs.docker.com/compose/install/)
- [Node.js](https://nodejs.org/) 20+ (para desenvolvimento local)
- [Git](https://git-scm.com/)

### 🐳 Configuração com Docker (Recomendado)

```bash
# 1. Clone o repositório
git clone <url-do-repositorio>
cd desafio-inmeta-backend

# 2. Configure as variáveis de ambiente
cp .env.example .env

# 3. Inicie os containers
docker compose up --build -d

# 4. Aguarde alguns segundos enquanto o proxy é configurado e entre na rota da documentação
🌐 http://localhost:8080/documentation

```

### 🔧 Desenvolvimento Local

```bash
# Instalar dependências
npm install

# Executar o banco de dados no Docker Compose
docker compose up database -d

# Alterar a variável de ambiente para identificar o container
DATABASE_URL - alterar onde está "database" para "localhost" # Manter como "database" apenas se você for iniciar conforme a seção **Configuração com Docker**

# Executar migrations
npm run db:deploy

# Modo desenvolvimento
npm run db:generate

# Executar testes
npm run dev
```

## 📖 Documentação da API

Após iniciar a aplicação, acesse a documentação interativa:

**🌐 [http://localhost:8080/documentation](http://localhost:3000/documentation)**

### Exemplo de Uso

```bash
# Criar novo usuário
curl -X POST http://localhost:8080/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Wesley Santos",
    "email": "teste@exemplo.com",
    "password": "123456"
  }'
```

## 🧪 Testes

```bash
# Executar todos os testes
npm run test

# Testes com coverage
npm run test:coverage

# Testes em modo watch
npm run test:watch
```

## 📁 Estrutura do Projeto

```
src/
├── application/
├───── dtos/
├───── services/
├── domain/
├───── entities/
├── infrastructure/
├───── config/
├───── repositories/
├── main/
├── presentation/
├───── controllers/
├───── middlewares/
├───── routes/
├── shared/
├───── errors/
├───── factories/
├───── types/
├───── utils/
tests/
```

## 🔒 Segurança

- ✅ Autenticação JWT
- ✅ Validação de entrada de dados
- ✅ Sanitização de queries via ORM
- ✅ Rate limiting
- ✅ CORS configurado (para testes em ambiente de desenvolvimento)
- ✅ Variáveis de ambiente protegidas

## 👨‍💻 Desenvolvedor

<div align="center">
  <table>
    <tr>
      <td align="center">
        <a href="https://github.com/wesleysantossts">
          <img src="https://avatars.githubusercontent.com/u/56703526?v=4" width="120px" alt="Wesley Santos" style="border-radius: 50%"/>
          <br/>
          <sub><b>Wesley Santos</b></sub>
          <br/>
          <sub>Desenvolvedor Back-end</sub>
        </a>
        <br/>
        <a href="https://linkedin.com/in/wesleysantossts" target="_blank">
          <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn"/>
        </a>
      </td>
    </tr>
  </table>
</div>

---

<div align="center">
  <p>💡 <strong>Desenvolvido com dedicação para o desafio técnico da InMeta</strong></p>
</div>
