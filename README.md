# Spring REST API – Consertos de Veículos

API REST em Spring Boot para registrar e consultar consertos de veículos. O domínio segue o enunciado da Avaliação 3 (parte 1 e 2): o Conserto possui os componentes embutidos Mecanico e Veiculo. Persistência em H2 (memória) com versionamento de esquema via Flyway.

## Principais recursos

* Java 21+, Spring Boot 3.x, Maven
* Spring Web, Spring Data JPA, Bean Validation
* H2 em memória com H2 Console
* Flyway (migrations)
* Lombok (getters/setters, construtores)

### Endpoints:

* `POST /consertos` – cria um conserto
* `GET /consertos` – lista paginada com todos os campos
* `GET /consertos/resumo` – lista enxuta (sem paginação)

## Requisitos

* JDK 21+
* Maven 3.9+
* IDE com Annotation Processing habilitado (para Lombok)

## Executando

```bash
mvn spring-boot:run
Aplicação: http://localhost:8080 H2 Console: http://localhost:8080/h2-console

Configuração padrão (arquivo src/main/resources/application.properties):
Properties

spring.application.name=SpringProjectIFSP
spring.datasource.url=jdbc:h2:mem:pw3api
spring.datasource.username=sa
spring.datasource.password=
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console
No H2 Console, use JDBC URL jdbc:h2:mem:pw3api e usuário sa (sem senha).

Modelagem
Conserto é uma entidade JPA. Mecanico e Veiculo são @Embeddable e não possuem sobrescritas de colunas.

As datas são tratadas como String conforme o enunciado.

Campos principais:
Conserto: id, dataEntrada, dataSaida, mecanico, veiculo

Mecanico: nome, anosExperiencia

Veiculo: marca, modelo, ano, cor (opcional)

Migrations (Flyway)
Arquivos em src/main/resources/db/migration:

V1__criar_tabela_conserto.sql
Cria a tabela conserto com colunas:

id

data_entrada

data_saida

nome

anos_experiencia

marca

modelo

ano

V2__adicionar_cor_em_veiculo.sql
Adiciona a coluna opcional cor à tabela conserto.

Para verificar no H2 Console:

SQL

SHOW TABLES;
SELECT * FROM flyway_schema_history;
SELECT * FROM conserto;
Validações
ConsertoRequest utiliza Bean Validation:

Datas: dd/MM/yyyy (@Pattern("\\d{2}/\\d{2}/\\d{4}"))

Campos obrigatórios: mecanicoNome, mecanicoAnosExperiencia, veiculoMarca, veiculoModelo

Ano do veículo: yyyy (@Pattern("\\d{4}"))

Requisições inválidas retornam 400 Bad Request com mensagens de validação.

Endpoints
Criar conserto
POST /consertos Content-Type: application/json

Exemplo de corpo:

JSON

{
  "dataEntrada": "01/10/2025",
  "dataSaida": "05/10/2025",
  "mecanicoNome": "Marcos Silva",
  "mecanicoAnosExperiencia": "8",
  "veiculoMarca": "Ford",
  "veiculoModelo": "Ka",
  "veiculoAno": "2018",
  "veiculoCor": "Preto"
}
Respostas:

201 Created com Location: /consertos/{id} e corpo ConsertoResponse

400 Bad Request em caso de falha de validação

Listar (paginado, todos os campos)
GET /consertos?page=0&size=10

Retorno: Page<ConsertoResponse> no padrão Spring Data, com metadados de paginação.

Listar resumo (sem paginação)
GET /consertos/resumo

Retorno: List<ConsertoResumo> com campos:

dataEntrada

dataSaida

mecanicoNome

veiculoMarca

veiculoModelo

Estrutura de diretórios (essencial)
src/
 └─ main/
     ├─ java/br/edu/ifsp/lucasdmesquita/springprojectifsp/conserto/
     │   ├─ Conserto.java
     │   ├─ Mecanico.java
     │   ├─ Veiculo.java
     │   ├─ ConsertoRequest.java
     │   ├─ ConsertoResponse.java
     │   ├─ ConsertoResumo.java
     │   ├─ ConsertoRepository.java
     │   └─ ConsertoController.java
     └─ resources/
         ├─ application.properties
         └─ db/migration/
             ├─ V1__criar_tabela_conserto.sql
             └─ V2__adicionar_cor_em_veiculo.sql
Troubleshooting
“No migrations found”: confirme o caminho src/main/resources/db/migration e os prefixos V1__, V2__.

Erros de validação (400): verifique o formato das datas e do ano.

H2 Console: confirme spring.h2.console.enabled=true e o path configurado.

Licença
Uso acadêmico/educacional.