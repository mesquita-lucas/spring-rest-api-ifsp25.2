# 🎨 Frontend - Sistema de Consertos

Interface web moderna desenvolvida com React para integração com a API REST de Gerenciamento de Consertos.

## 🚀 Tecnologias

- **React** 19.2.0 - Biblioteca JavaScript para interfaces
- **Vite** 7.2.2 - Build tool moderna e rápida
- **Axios** 1.13.2 - Cliente HTTP para requisições à API
- **CSS3** - Estilização customizada

## 📋 Funcionalidades

### 🔐 Autenticação
- Login com Basic Authentication
- Dois tipos de usuários:
  - **Admin** (admin/admin123) - Acesso total CRUD
  - **User** (user/user123) - Somente leitura
- Autenticação persistente com localStorage

### 📊 Dashboard
- **Listagem paginada** de consertos
- **Busca avançada** por marca e modelo
- **Visualização detalhada** com todos os campos
- **Estatísticas** em tempo real

### ✏️ Operações CRUD (Admin)
- ✅ **CREATE** - Criar novo conserto
- 📖 **READ** - Visualizar consertos (paginado)
- 🔄 **UPDATE** - Editar conserto existente
- 🗑️ **DELETE** - Exclusão lógica (campo ativo)

### ✨ Validações Client-Side
- Data no formato dd/mm/aaaa
- Campos obrigatórios marcados
- Validação de comprimento máximo
- Feedback visual de erros

### 🎯 UX/UI Features
- Design responsivo (mobile-friendly)
- Mensagens de sucesso/erro
- Loading states
- Confirmação antes de deletar
- Botões de acesso rápido no login

## 🛠️ Como Executar

### Pré-requisitos
- Node.js 18+ instalado
- Backend Spring Boot rodando na porta 8080

### Instalação

```bash
# Entre no diretório do frontend
cd frontend

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

O aplicativo estará disponível em: **http://localhost:3000**

### Build para Produção

```bash
npm run build
```

Os arquivos otimizados estarão em `dist/`

## 🔌 Integração com Backend

### Proxy Configuration
O Vite está configurado para fazer proxy das requisições `/api` para `http://localhost:8080`:

```javascript
// vite.config.js
proxy: {
  '/api': {
    target: 'http://localhost:8080',
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api/, '')
  }
}
```

### CORS
O backend Spring Boot está configurado para aceitar requisições de `http://localhost:3000`

### Autenticação
Todas as requisições incluem o header `Authorization: Basic <base64>` automaticamente após o login.

## 📁 Estrutura do Projeto

```
frontend/
├── src/
│   ├── components/
│   │   ├── Login.jsx           # Tela de login
│   │   ├── Login.css
│   │   ├── Dashboard.jsx       # Dashboard principal
│   │   ├── Dashboard.css
│   │   ├── ConsertoList.jsx    # Tabela de consertos
│   │   ├── ConsertoForm.jsx    # Formulário CRUD
│   │   └── SearchBar.jsx       # Barra de busca
│   ├── services/
│   │   └── api.js              # Serviços HTTP (Axios)
│   ├── App.jsx                 # Componente raiz
│   ├── App.css
│   ├── main.jsx                # Entry point
│   └── index.css               # Estilos globais
├── index.html
├── vite.config.js
└── package.json
```

## 🧪 Testando a Integração

### 1. Inicie o Backend
```bash
# No diretório raiz do projeto Spring
mvnw.cmd spring-boot:run
```

### 2. Inicie o Frontend
```bash
# No diretório frontend
npm run dev
```

### 3. Acesse a Aplicação
Abra http://localhost:3000 no navegador

### 4. Faça Login
- Use **admin/admin123** para acesso completo
- Ou **user/user123** para somente leitura

### 5. Teste as Funcionalidades
- ✅ Criar conserto (Admin)
- ✅ Listar e paginar
- ✅ Buscar por marca/modelo
- ✅ Editar conserto (Admin)
- ✅ Excluir conserto (Admin)

## 🎨 Screenshots

### Tela de Login
- Login form com validação
- Botões de acesso rápido
- Design gradient moderno

### Dashboard
- Header com informações do usuário
- Barra de busca inteligente
- Tabela responsiva
- Paginação funcional
- Botões de ação (Admin)

### Formulário
- Validação em tempo real
- Campos organizados em grid
- Feedback visual de erros
- Botões de ação claros

## 🚀 Próximos Passos (Futuro)

- [ ] Migrar para JWT Authentication
- [ ] Adicionar testes unitários (Jest/Vitest)
- [ ] Implementar dark mode
- [ ] Adicionar gráficos e relatórios
- [ ] PWA (Progressive Web App)
- [ ] Deploy em produção

## 👥 Credenciais de Teste

| Usuário | Senha | Permissões |
|---------|-------|------------|
| admin   | admin123 | CRUD completo |
| user    | user123  | Somente leitura |

## 📝 Notas Técnicas

- **Proxy**: Todas as requisições para `/api/*` são redirecionadas para `http://localhost:8080/*`
- **CORS**: Backend configurado para aceitar `localhost:3000`
- **Auth**: Basic Auth com Base64 encoding
- **Estado**: React Hooks (useState, useEffect)
- **HTTP**: Axios com interceptors para autenticação automática

---

**Desenvolvido para:** IFSP - Avaliação Spring REST API  
**Branch:** `dev`  
**Status:** ✅ Funcional e integrado
