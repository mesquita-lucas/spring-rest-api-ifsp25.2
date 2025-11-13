@echo off
echo ======================================
echo TESTING SPRING REST API - CONSERTOS
echo ======================================
echo.
echo Make sure the application is running on http://localhost:8080
echo.
pause

echo.
echo ======================================
echo 1. POST - Criar Conserto (Aula 1)
echo ======================================
curl -X POST http://localhost:8080/consertos ^
  -H "Content-Type: application/json" ^
  -d "{\"dataEntrada\":\"10/11/2025\",\"dataSaida\":\"15/11/2025\",\"mecanicoNome\":\"João Silva\",\"mecanicoAnosExperiencia\":5,\"veiculoMarca\":\"Toyota\",\"veiculoModelo\":\"Corolla\",\"veiculoAno\":\"2020\",\"veiculoCor\":\"Preto\"}"
echo.
echo.
pause

echo.
echo ======================================
echo 2. POST - Criar Outro Conserto
echo ======================================
curl -X POST http://localhost:8080/consertos ^
  -H "Content-Type: application/json" ^
  -d "{\"dataEntrada\":\"11/11/2025\",\"dataSaida\":\"16/11/2025\",\"mecanicoNome\":\"Maria Santos\",\"mecanicoAnosExperiencia\":8,\"veiculoMarca\":\"Honda\",\"veiculoModelo\":\"Civic\",\"veiculoAno\":\"2021\",\"veiculoCor\":\"Branco\"}"
echo.
echo.
pause

echo.
echo ======================================
echo 3. POST - Criar Conserto Toyota Camry
echo ======================================
curl -X POST http://localhost:8080/consertos ^
  -H "Content-Type: application/json" ^
  -d "{\"dataEntrada\":\"12/11/2025\",\"dataSaida\":\"17/11/2025\",\"mecanicoNome\":\"Pedro Costa\",\"mecanicoAnosExperiencia\":3,\"veiculoMarca\":\"Toyota\",\"veiculoModelo\":\"Camry\",\"veiculoAno\":\"2019\",\"veiculoCor\":\"Azul\"}"
echo.
echo.
pause

echo.
echo ======================================
echo 4. GET - Listar Todos (Paginado) (Aula 2)
echo ======================================
curl http://localhost:8080/consertos?page=0^&size=10
echo.
echo.
pause

echo.
echo ======================================
echo 5. GET - Buscar por ID (Aula 3)
echo ======================================
echo Testing GET /consertos/1
curl http://localhost:8080/consertos/1
echo.
echo.
pause

echo.
echo ======================================
echo 6. GET - Busca Parcial por Marca e Modelo (Aula 2)
echo ======================================
echo Testing search by marca=Toyota and modelo=Corolla
curl "http://localhost:8080/consertos?marca=Toyota&modelo=Corolla"
echo.
echo.
pause

echo.
echo ======================================
echo 7. PUT - Atualizar Conserto (Aula 3)
echo ======================================
echo Updating conserto ID 1
curl -X PUT http://localhost:8080/consertos/1 ^
  -H "Content-Type: application/json" ^
  -d "{\"dataEntrada\":\"10/11/2025\",\"dataSaida\":\"20/11/2025\",\"mecanicoNome\":\"João Silva Júnior\",\"mecanicoAnosExperiencia\":6,\"veiculoMarca\":\"Toyota\",\"veiculoModelo\":\"Corolla\",\"veiculoAno\":\"2020\",\"veiculoCor\":\"Vermelho\"}"
echo.
echo.
pause

echo.
echo ======================================
echo 8. GET - Verificar Atualização
echo ======================================
curl http://localhost:8080/consertos/1
echo.
echo.
pause

echo.
echo ======================================
echo 9. DELETE - Exclusão Lógica (Aula 3)
echo ======================================
echo Deleting conserto ID 2 (logical delete)
curl -X DELETE http://localhost:8080/consertos/2
echo.
echo.
pause

echo.
echo ======================================
echo 10. GET - Verificar que ID 2 não aparece mais
echo ======================================
curl http://localhost:8080/consertos/2
echo.
echo Should return 404 Not Found
echo.
pause

echo.
echo ======================================
echo 11. GET - Listar Todos (só deve mostrar ativos)
echo ======================================
curl http://localhost:8080/consertos
echo.
echo Note: Conserto ID 2 should NOT appear in the list
echo.
pause

echo.
echo ======================================
echo 12. POST - Teste de Validação (deve falhar)
echo ======================================
echo Testing validation - missing required fields
curl -X POST http://localhost:8080/consertos ^
  -H "Content-Type: application/json" ^
  -d "{\"dataSaida\":\"15/11/2025\"}"
echo.
echo Should return 400 Bad Request with validation errors
echo.
pause

echo.
echo ======================================
echo TODOS OS TESTES CONCLUÍDOS!
echo ======================================
pause
