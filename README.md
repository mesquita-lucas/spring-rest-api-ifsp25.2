# Spring REST API – Sistema de Consertos de Veículos

API REST desenvolvida em Spring Boot para gerenciar consertos de veículos conforme requisitos das Avaliações 1, 2 e 3 do curso.

## 📋 Índice
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Requisitos do Sistema](#requisitos-do-sistema)
- [Como Executar](#como-executar)
- [Avaliações Implementadas](#avaliações-implementadas)
- [Endpoints da API](#endpoints-da-api)
- [Autenticação e Segurança](#autenticação-e-segurança)
- [Exemplos de Uso](#exemplos-de-uso)
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

## ▶️ Como Executar

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

### ✅ Avaliação 1 - COMPLETA
- [x] Classes de domínio criadas
- [x] POST implementado

### ✅ Avaliação 2 - COMPLETA  
- [x] Validação com Bean Validation
- [x] Migration V2 (cor do veículo)
- [x] GET paginado
- [x] GET parcial com filtros

### ✅ Avaliação 3 - COMPLETA
- [x] Migration V3 (campo ativo)
- [x] Repository filtra por ativo=true
- [x] GET por ID
- [x] PUT (atualização)
- [x] DELETE lógico
- [x] Filtros consideram apenas ativos

### ✅ Spring Security - COMPLETA
- [x] Basic Authentication
- [x] Controle de acesso por roles
- [x] Usuários em memória
- [x] BCrypt para senhas

---

## 📄 Licença

Projeto desenvolvido para fins acadêmicos/educacionais - IFSP 2025.2