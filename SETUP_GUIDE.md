# 🚀 Guia de Inicialização - Frontend + Backend

## 📋 Pré-requisitos

- ✅ **Java 21+** instalado
- ✅ **Node.js 18+** instalado
- ✅ **Git** instalado

## 🔧 Passo a Passo

### 1️⃣ Clone o Repositório (se ainda não clonou)

```bash
git clone https://github.com/RaFeltrim/spring-rest-api-ifsp25.2.git
cd spring-rest-api-ifsp25.2
```

### 2️⃣ Checkout na Branch Dev

```bash
git checkout dev
```

### 3️⃣ Inicie o Backend (Spring Boot)

**Em um terminal:**

```bash
# Windows
mvnw.cmd spring-boot:run

# Linux/Mac
./mvnw spring-boot:run
```

**Aguarde a mensagem:**
```
Started SpringProjectIfspApplication in X.XXX seconds
```

O backend estará rodando em: **http://localhost:8080**

### 4️⃣ Inicie o Frontend (React)

**Em OUTRO terminal (mantenha o backend rodando):**

```bash
# Entre no diretório frontend
cd frontend

# Instale as dependências (apenas na primeira vez)
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

**Aguarde a mensagem:**
```
Local:   http://localhost:3000/
```

O frontend estará rodando em: **http://localhost:3000**

## 🌐 Acesse a Aplicação

1. Abra seu navegador
2. Acesse: **http://localhost:3000**
3. Você verá a tela de login

## 🔐 Credenciais de Acesso

### Administrador (CRUD Completo)
- **Usuário:** `admin`
- **Senha:** `admin123`
- **Permissões:** Criar, Ler, Editar, Excluir

### Usuário (Somente Leitura)
- **Usuário:** `user`
- **Senha:** `user123`
- **Permissões:** Apenas visualizar

## ✅ Testando a Integração

### Teste 1: Login
1. Na tela de login, clique em **"Admin (CRUD Completo)"**
2. Clique em **"Entrar"**
3. Você será redirecionado para o Dashboard

### Teste 2: Criar Conserto
1. Clique em **"➕ Novo Conserto"**
2. Preencha os campos:
   - Data Entrada: `13/11/2024`
   - Mecânico: `João Silva`
   - Marca: `Toyota`
   - Modelo: `Corolla`
   - Ano: `2020`
   - Cor: `Preto`
3. Clique em **"➕ Criar"**
4. Você verá a mensagem de sucesso

### Teste 3: Buscar
1. No campo "Marca do veículo", digite: `Toyota`
2. Clique em **"🔍 Buscar"**
3. Veja os resultados filtrados

### Teste 4: Editar
1. Clique no ícone **✏️** em um conserto
2. Modifique algum campo
3. Clique em **"💾 Atualizar"**
4. Veja a mensagem de sucesso

### Teste 5: Excluir
1. Clique no ícone **🗑️** em um conserto
2. Confirme a exclusão
3. O registro será removido (exclusão lógica)

## 🛑 Parando os Servidores

### Parar o Backend
No terminal do Spring Boot:
- **Windows:** Pressione `Ctrl + C`
- **Linux/Mac:** Pressione `Ctrl + C`

### Parar o Frontend
No terminal do Vite:
- Pressione `Ctrl + C`
- Confirme com `Y`

## 🐛 Troubleshooting

### Porta 8080 em uso
Se a porta 8080 já estiver em uso:

**Windows:**
```cmd
netstat -ano | findstr :8080
taskkill /PID <PID> /F
```

**Linux/Mac:**
```bash
lsof -ti:8080 | xargs kill -9
```

### Porta 3000 em uso
Se a porta 3000 já estiver em uso, o Vite perguntará se quer usar outra porta. Digite `Y`.

### Erro de CORS
Se tiver erro de CORS:
1. Verifique se o backend está rodando
2. Verifique se a porta é **8080**
3. Limpe o cache do navegador (`Ctrl + Shift + Del`)

### Erro 401 Unauthorized
1. Verifique se as credenciais estão corretas
2. Limpe o localStorage: Abra DevTools (F12) → Console → Digite: `localStorage.clear()`

### Frontend não conecta
1. Verifique se ambos (backend e frontend) estão rodando
2. Verifique o console do navegador (F12)
3. Verifique se o proxy está configurado em `vite.config.js`

## 📚 Documentação Adicional

- **Backend README:** Ver arquivo `README.md` na raiz
- **Frontend README:** Ver arquivo `frontend/README.md`

## 🎯 Próximos Passos

Agora que tudo está funcionando, você pode:

1. ✅ Testar todos os endpoints
2. ✅ Explorar a UI/UX
3. ✅ Verificar as validações
4. ✅ Testar a paginação
5. ✅ Demonstrar para o professor 🎓

---

**Desenvolvido para:** IFSP - Avaliação Spring REST API  
**Branch:** `dev`  
**Status:** ✅ 100% Funcional
