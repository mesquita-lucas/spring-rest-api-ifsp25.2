# Spring REST API – Sistema de Consertos de Veículos

API REST desenvolvida em Spring Boot para gerenciar consertos de veículos conforme requisitos das Avaliações 1, 2, 3 e Spring Security do curso.

---

## 📦 O QUE ESTAMOS ENTREGANDO HOJE

### ✅ Backend Completo e Funcional

**Todas as avaliações implementadas e testadas:**

1. **Avaliação 1** - JPA, Modelagem e POST
2. **Avaliação 2** - Validações, Paginação e Buscas
3. **Avaliação 3** - CRUD Completo com Exclusão Lógica
4. **Spring Security** - Autenticação e Autorização

**Tecnologias:**
- ✅ Spring Boot 3.5.6
- ✅ Spring Data JPA
- ✅ Spring Security (Basic Auth)
- ✅ Bean Validation
- ✅ H2 Database
- ✅ Flyway Migrations
- ✅ Lombok

**Pronto para uso:**
- API REST totalmente funcional
- Documentação completa
- Script de testes automatizado
- H2 Console para inspeção do banco

---

## 🎁 EXTRA - Frontend Web Interativo

### Interface Gráfica Completa (Para o Professor Brincar!)

**O que desenvolvemos além do requisito:**

Um **frontend web moderno e completo** para facilitar a demonstração e teste da API!

**Recursos implementados:**
- ✅ **Dashboard interativo** com listagem paginada
- ✅ **Formulários com validação em tempo real**
- ✅ **Máscaras automáticas** para datas e campos numéricos
- ✅ **Sistema de login** integrado com Spring Security
- ✅ **Busca e filtros** por marca e modelo
- ✅ **CRUD completo** (criar, editar, excluir)
- ✅ **Feedback visual** para todas as operações
- ✅ **Design responsivo** e intuitivo

**Validações avançadas no frontend:**
- Data Entrada: mínima 01/01/2015, máxima data atual
- Data Saída: máxima 1 ano à frente da data atual
- Anos de Experiência: máximo 100 anos
- Ano do Veículo: 1886 (primeiro automóvel) até ano atual + 1
- Máscaras automáticas para dd/mm/aaaa

**Stack Frontend:**
- React 19.2.0
- Vite 7.2.2
- Axios 1.13.2
- CSS moderno e responsivo

**Como executar o frontend:**
```bash
cd frontend
npm install
npm run dev
```
Acesse: http://localhost:3000

**Credenciais para teste:**
- **Admin:** admin / admin123 (pode criar, editar, excluir)
- **User:** user / user123 (apenas visualizar)

> 🎯 **Objetivo:** Facilitar a demonstração e avaliação do projeto com uma interface visual completa!

## 📋 Índice

**Backend (Entrega Oficial):**
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Requisitos do Sistema](#requisitos-do-sistema)
- [Como Executar o Backend](#como-executar-o-backend)
- [Avaliações Implementadas](#avaliações-implementadas)
- [Endpoints da API](#endpoints-da-api)
- [Autenticação e Segurança](#autenticação-e-segurança)
- [Exemplos de Uso](#exemplos-de-uso)
- [Testes Automatizados](#testes-automatizados)

**Frontend (Extra - Para Demonstração):**
- [Como Executar o Frontend](#como-executar-o-frontend)
- [Funcionalidades do Frontend](#funcionalidades-do-frontend)
- [Estrutura do Projeto](#estrutura-do-projeto)

## 🚀 Tecnologias Utilizadas

- **Java 21**
- **Spring Boot 3.5.6**
  - Spring Web (REST API)
  - Spring Data JPA (Persistência)
  - Spring Security (Autenticação e Autorização)
  - Bean Validation (Validação de dados)
- **H2 Database** (Banco em memória)
- **Flyway** (Versionamento de schema)
- **Lombok** (Redução de boilerplate)
- **Maven** (Gerenciamento de dependências)

## 📦 Requisitos do Sistema

- **JDK 21 ou superior**
- **Maven 3.9+**
- **IDE** com suporte a Annotation Processing (para Lombok)

## ▶️ Como Executar o Backend

### No Windows:
```cmd
mvnw.cmd spring-boot:run
```

### No Linux/Mac:
```bash
./mvnw spring-boot:run
```

### Acessos:
- **API REST**: http://localhost:8080
- **H2 Console**: http://localhost:8080/h2-console
  - JDBC URL: `jdbc:h2:mem:pw3api`
  - Username: `sa`
  - Password: _(deixar vazio)_

### Compilar e Testar:
```cmd
mvnw.cmd clean compile
mvnw.cmd test
```

## ✅ Avaliações Implementadas

### **Avaliação 1 (Aulas 1-3) - JPA e Modelagem**
- ✅ **Criar classes de domínio** (Conserto, Mecanico, Veiculo)
- ✅ **Requisição POST** para criar consertos
- ✅ **Persistência com JPA** e H2
- ✅ **Flyway Migration V1** - Criação da tabela conserto

### **Avaliação 2 (Aulas 4-7) - REST API Completa**
- ✅ **Validação de dados** com Bean Validation
  - dataEntrada obrigatória (formato: dd/mm/aaaa)
  - dataSaida opcional (formato: dd/mm/aaaa)
  - mecanicoNome obrigatório (máx. 120 caracteres)
  - mecanicoAnosExperiencia opcional
  - veiculoMarca obrigatória (máx. 80 caracteres)
  - veiculoModelo obrigatório (máx. 120 caracteres)
  - veiculoAno obrigatório (formato: aaaa)
  - veiculoCor opcional (máx. 20 caracteres)
- ✅ **Migration V2** - Adição do campo `veiculo_cor`
- ✅ **GET paginado** - Lista todos os consertos ativos
- ✅ **GET parcial** - Busca por marca e modelo do veículo

### **Avaliação 3 (Aulas 8-10) - CRUD Completo**
- ✅ **Migration V3** - Adição do campo `ativo` (exclusão lógica)
- ✅ **Repository com filtro** - Métodos que filtram apenas registros ativos
- ✅ **GET por ID** - Busca um conserto específico
- ✅ **PUT** - Atualização completa de conserto
- ✅ **DELETE lógico** - Marca `ativo=false` sem excluir do banco
- ✅ **Filtros em GET parcial** - Apenas registros ativos são retornados

### **Spring Security (Aulas 14-17)**
- ✅ **Basic Authentication** configurada
- ✅ **Controle de acesso baseado em roles**
- ✅ **Usuários em memória** (admin/user)
- ✅ **BCrypt** para encoding de senhas
- ✅ **Stateless sessions** (ideal para REST APIs)

## 📊 Modelagem de Dados

### Entidade Conserto
```
Conserto {
  id: Long (gerado automaticamente)
  dataEntrada: String (formato: dd/mm/aaaa)
  dataSaida: String (formato: dd/mm/aaaa)
  mecanicoNome: String
  mecanicoAnosExperiencia: Integer
  veiculoMarca: String
  veiculoModelo: String
  veiculoAno: String (formato: aaaa)
  veiculoCor: String (opcional)
  ativo: Boolean (padrão: true)
}
```

### Migrations Flyway

**V1__criar_tabela_conserto.sql**
- Cria tabela `conserto` com todos os campos exceto `veiculo_cor` e `ativo`

**V2__adicionar_cor_em_veiculo.sql**
- Adiciona coluna `veiculo_cor VARCHAR(20)`

**V3__add-column-ativo-conserto.sql**
- Adiciona coluna `ativo BOOLEAN DEFAULT TRUE NOT NULL`

## 🔌 Endpoints da API

### 1️⃣ POST - Criar Conserto
**Endpoint:** `POST /consertos`  
**Autenticação:** Requer role ADMIN  
**Content-Type:** application/json

**Exemplo de requisição:**
```json
{
  "dataEntrada": "10/11/2025",
  "dataSaida": "15/11/2025",
  "mecanicoNome": "João Silva",
  "mecanicoAnosExperiencia": 5,
  "veiculoMarca": "Toyota",
  "veiculoModelo": "Corolla",
  "veiculoAno": "2020",
  "veiculoCor": "Preto"
}
```

**Respostas:**
- `201 Created` - Conserto criado com sucesso (retorna Location header e corpo)
- `400 Bad Request` - Falha de validação
- `401 Unauthorized` - Sem autenticação
- `403 Forbidden` - Usuário sem permissão ADMIN

---

### 2️⃣ GET - Listar Todos (Paginado)
**Endpoint:** `GET /consertos?page=0&size=10`  
**Autenticação:** Pública (não requer autenticação)  
**Retorna:** Apenas consertos com `ativo=true`

**Exemplo de resposta:**
```json
{
  "content": [
    {
      "id": 1,
      "dataEntrada": "10/11/2025",
      "dataSaida": "15/11/2025",
      "mecanicoNome": "João Silva",
      "mecanicoAnosExperiencia": 5,
      "veiculoMarca": "Toyota",
      "veiculoModelo": "Corolla",
      "veiculoAno": "2020",
      "veiculoCor": "Preto",
      "ativo": true
    }
  ],
  "pageable": { ... },
  "totalPages": 1,
  "totalElements": 1
}
```

---

### 3️⃣ GET - Buscar por Marca e Modelo (Filtrado)
**Endpoint:** `GET /consertos?marca={marca}&modelo={modelo}`  
**Autenticação:** Pública  
**Retorna:** Consertos ativos que correspondem aos filtros (case-insensitive)

**Exemplo:**
```
GET /consertos?marca=Toyota&modelo=Corolla
```

---

### 4️⃣ GET - Buscar por ID
**Endpoint:** `GET /consertos/{id}`  
**Autenticação:** Pública  
**Retorna:** Conserto específico se estiver ativo

**Respostas:**
- `200 OK` - Conserto encontrado
- `404 Not Found` - Conserto não existe ou está inativo

---

### 5️⃣ PUT - Atualizar Conserto
**Endpoint:** `PUT /consertos/{id}`  
**Autenticação:** Requer role ADMIN  
**Content-Type:** application/json

**Exemplo:**
```json
{
  "dataEntrada": "10/11/2025",
  "dataSaida": "20/11/2025",
  "mecanicoNome": "João Silva Júnior",
  "mecanicoAnosExperiencia": 6,
  "veiculoMarca": "Toyota",
  "veiculoModelo": "Corolla",
  "veiculoAno": "2020",
  "veiculoCor": "Vermelho"
}
```

**Respostas:**
- `200 OK` - Atualizado com sucesso
- `404 Not Found` - Conserto não existe ou está inativo
- `401 Unauthorized` - Sem autenticação
- `403 Forbidden` - Sem permissão ADMIN

---

### 6️⃣ DELETE - Exclusão Lógica
**Endpoint:** `DELETE /consertos/{id}`  
**Autenticação:** Requer role ADMIN  
**Ação:** Marca `ativo=false` (não exclui do banco)

**Respostas:**
- `204 No Content` - Excluído com sucesso
- `404 Not Found` - Conserto não existe
- `401 Unauthorized` - Sem autenticação
- `403 Forbidden` - Sem permissão ADMIN

---

## 🔐 Autenticação e Segurança

### Usuários Disponíveis (Em Memória)

| Username | Password | Role | Permissões |
|----------|----------|------|------------|
| admin | admin123 | ADMIN | POST, PUT, DELETE |
| user | user123 | USER | Apenas GET |

### Configuração de Acesso

- **GET** `/consertos/**` → **PÚBLICO** (sem autenticação)
- **POST** `/consertos` → **ADMIN** apenas
- **PUT** `/consertos/**` → **ADMIN** apenas
- **DELETE** `/consertos/**` → **ADMIN** apenas
- **H2 Console** → **PÚBLICO** (apenas em desenvolvimento)

### Como Autenticar (HTTP Basic)

**Com curl:**
```bash
curl -u admin:admin123 -X POST http://localhost:8080/consertos \
  -H "Content-Type: application/json" \
  -d '{"dataEntrada":"10/11/2025","mecanicoNome":"João","veiculoMarca":"Toyota","veiculoModelo":"Corolla","veiculoAno":"2020"}'
```

**Com Postman/Insomnia:**
- Selecione **Basic Auth**
- Username: `admin`
- Password: `admin123`

---

## 🧪 Testes Automatizados

### Script Completo de Testes

Incluímos um script `test-endpoints.bat` (Windows) que testa todos os endpoints automaticamente:

```bash
test-endpoints.bat
```

**O que o script testa:**
1. ✅ POST - Criação de conserto com validação
2. ✅ GET paginado - Lista todos os consertos
3. ✅ GET por ID - Busca específica
4. ✅ GET filtrado - Busca por marca e modelo
5. ✅ PUT - Atualização de conserto
6. ✅ DELETE - Exclusão lógica
7. ✅ Validações - Testa campos obrigatórios
8. ✅ Autenticação - Testa controle de acesso

---

## 💻 Como Executar o Frontend

### Pré-requisitos
- Node.js 18+ instalado
- Backend rodando em http://localhost:8080

### Passos

1. **Navegue até a pasta frontend:**
```bash
cd frontend
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Inicie o servidor de desenvolvimento:**
```bash
npm run dev
```

4. **Acesse no navegador:**
```
http://localhost:3000
```

### Credenciais de Teste

- **Administrador:** 
  - Usuário: `admin`
  - Senha: `admin123`
  - Pode: criar, editar e excluir consertos

- **Usuário comum:**
  - Usuário: `user`
  - Senha: `user123`
  - Pode: apenas visualizar consertos

---

## ✨ Funcionalidades do Frontend

### Dashboard Principal
- 📊 Visualização paginada de todos os consertos
- 🔍 Busca por marca e modelo do veículo
- 🎨 Interface limpa e intuitiva
- 📱 Design responsivo (funciona em mobile)

### Formulário de Conserto
- ✏️ Criação e edição de consertos
- ✅ Validações em tempo real
- 🎭 Máscaras automáticas para datas (dd/mm/aaaa)
- 🚗 Validações específicas:
  - **Data Entrada:** entre 01/01/2015 e hoje
  - **Data Saída:** até 1 ano à frente
  - **Anos Experiência:** máximo 100
  - **Ano Veículo:** 1886 até 2026 (ano atual + 1)

### Sistema de Autenticação
- 🔐 Login integrado com Spring Security
- 👤 Controle de permissões por role
- 🚪 Logout seguro
- 🔒 Proteção de rotas sensíveis

### Feedback Visual
- ✅ Mensagens de sucesso
- ❌ Mensagens de erro
- ⏳ Indicadores de carregamento
- 🎨 Cores intuitivas para ações

---

## 📝 Exemplos de Uso

### 1. Criar um conserto (como ADMIN)
```bash
curl -u admin:admin123 -X POST http://localhost:8080/consertos \
  -H "Content-Type: application/json" \
  -d '{
    "dataEntrada": "10/11/2025",
    "dataSaida": "15/11/2025",
    "mecanicoNome": "João Silva",
    "mecanicoAnosExperiencia": 5,
    "veiculoMarca": "Toyota",
    "veiculoModelo": "Corolla",
    "veiculoAno": "2020",
    "veiculoCor": "Preto"
  }'
```

### 2. Listar todos os consertos (público)
```bash
curl http://localhost:8080/consertos
```

### 3. Buscar por marca e modelo (público)
```bash
curl "http://localhost:8080/consertos?marca=Toyota&modelo=Corolla"
```

### 4. Buscar conserto por ID (público)
```bash
curl http://localhost:8080/consertos/1
```

### 5. Atualizar conserto (como ADMIN)
```bash
curl -u admin:admin123 -X PUT http://localhost:8080/consertos/1 \
  -H "Content-Type: application/json" \
  -d '{
    "dataEntrada": "10/11/2025",
    "dataSaida": "20/11/2025",
    "mecanicoNome": "João Silva Júnior",
    "mecanicoAnosExperiencia": 6,
    "veiculoMarca": "Toyota",
    "veiculoModelo": "Corolla",
    "veiculoAno": "2020",
    "veiculoCor": "Vermelho"
  }'
```

### 6. Deletar conserto (como ADMIN)
```bash
curl -u admin:admin123 -X DELETE http://localhost:8080/consertos/1
```

### 7. Testar validação (deve retornar 400)
```bash
curl -u admin:admin123 -X POST http://localhost:8080/consertos \
  -H "Content-Type: application/json" \
  -d '{"dataSaida": "15/11/2025"}'
```

---

## 📁 Estrutura do Projeto

### Backend
```
src/
└─ main/
    ├─ java/br/edu/ifsp/lucasdmesquita/springprojectifsp/
    │   ├─ conserto/
    │   │   ├─ Conserto.java              # Entidade JPA
    │   │   ├─ ConsertoRequest.java       # DTO de entrada (POST/PUT)
    │   │   ├─ ConsertoResponse.java      # DTO de saída
    │   │   ├─ ConsertoRepository.java    # Interface JPA Repository
    │   │   └─ ConsertoController.java    # REST Controller
    │   ├─ security/
    │   │   └─ SecurityConfig.java        # Configuração Spring Security
    │   └─ SpringProjectIfspApplication.java
    └─ resources/
        ├─ application.properties         # Configurações da aplicação
        └─ db/migration/
            ├─ V1__criar_tabela_conserto.sql
            ├─ V2__adicionar_cor_em_veiculo.sql
            └─ V3__add-column-ativo-conserto.sql
```

### Frontend (Extra)
```
frontend/
├─ src/
│   ├─ components/
│   │   ├─ Dashboard.jsx          # Componente principal
│   │   ├─ ConsertoForm.jsx       # Formulário com validações
│   │   ├─ ConsertoList.jsx       # Lista de consertos
│   │   ├─ SearchBar.jsx          # Barra de busca
│   │   ├─ Login.jsx              # Tela de login
│   │   └─ *.css                  # Estilos
│   ├─ services/
│   │   └─ api.js                 # Cliente HTTP (Axios)
│   ├─ App.jsx                    # Componente raiz
│   └─ main.jsx                   # Entry point
├─ vite.config.js                 # Config Vite + Proxy
└─ package.json                   # Dependências
```

---

## ❓ Troubleshooting

### Problema: "No migrations found"
**Solução:** Verifique se os arquivos estão em `src/main/resources/db/migration` e seguem o padrão `V{número}__{descrição}.sql`

### Problema: Erro 400 ao criar conserto
**Solução:** Verifique o formato dos dados:
- `dataEntrada` e `dataSaida`: `dd/mm/aaaa` (ex: 10/11/2025)
- `veiculoAno`: `aaaa` (ex: 2020)
- Campos obrigatórios não podem ser vazios

### Problema: Erro 401 Unauthorized
**Solução:** Adicione autenticação Basic Auth com usuário `admin` e senha `admin123`

### Problema: Erro 403 Forbidden
**Solução:** Certifique-se de usar o usuário `admin` (role ADMIN) para operações POST/PUT/DELETE

### Problema: H2 Console não abre
**Solução:** Verifique se `spring.h2.console.enabled=true` está em `application.properties`

---

## 🎯 Status das Entregas

### ✅ BACKEND - ENTREGA OFICIAL (COMPLETO)

**Avaliação 1 - COMPLETA**
- [x] Classes de domínio criadas
- [x] POST implementado
- [x] Migration V1

**Avaliação 2 - COMPLETA**  
- [x] Validação com Bean Validation
- [x] Migration V2 (cor do veículo)
- [x] GET paginado
- [x] GET parcial com filtros

**Avaliação 3 - COMPLETA**
- [x] Migration V3 (campo ativo)
- [x] Repository filtra por ativo=true
- [x] GET por ID
- [x] PUT (atualização)
- [x] DELETE lógico
- [x] Filtros consideram apenas ativos

**Spring Security - COMPLETA**
- [x] Basic Authentication
- [x] Controle de acesso por roles
- [x] Usuários em memória (admin/user)
- [x] BCrypt para senhas
- [x] Stateless sessions

### 🎁 FRONTEND - EXTRA (BONUS)

**Interface Web Completa**
- [x] Dashboard com listagem paginada
- [x] Formulários com validações avançadas
- [x] Sistema de autenticação integrado
- [x] Busca e filtros
- [x] CRUD completo (criar, editar, excluir)
- [x] Máscaras automáticas para datas
- [x] Validações de regras de negócio
- [x] Design responsivo
- [x] Feedback visual (success/error)

**Integração Frontend + Backend**
- [x] Comunicação via Axios
- [x] Proxy configurado (Vite)
- [x] CORS configurado no backend
- [x] Autenticação Basic Auth
- [x] Tratamento de erros

---

## 📝 Notas Finais

### Para o Professor

**Entrega Oficial (Hoje):**
- ✅ Backend completo com todas as avaliações implementadas
- ✅ Spring Security configurado e funcional
- ✅ Testes via script automatizado
- ✅ Documentação completa

**Extra - Frontend Web:**
- 🎁 Interface gráfica completa para facilitar a demonstração
- 🎯 Totalmente funcional e integrada com o backend
- 🎨 Validações avançadas e máscaras automáticas
- 💻 Disponível para demonstração se houver interesse

**Como testar:**
1. **Backend apenas:** Execute `mvnw.cmd spring-boot:run` e use Postman/curl
2. **Backend + Frontend:** Execute o backend, depois `cd frontend && npm run dev`
3. **Testes automatizados:** Execute `test-endpoints.bat`

---

## 📄 Licença

Projeto desenvolvido para fins acadêmicos/educacionais - IFSP 2025.2