import { http, HttpResponse } from 'msw'

export const handlers = [
  // GET all consertos
  http.get('/api/consertos', ({ request }) => {
    const url = new URL(request.url)
    const page = url.searchParams.get('page') || '0'
    const marca = url.searchParams.get('marca')
    const modelo = url.searchParams.get('modelo')

    let consertos = mockConsertos

    // Filter by marca/modelo if provided
    if (marca) {
      consertos = consertos.filter(c => c.veiculoMarca.toLowerCase().includes(marca.toLowerCase()))
    }
    if (modelo) {
      consertos = consertos.filter(c => c.veiculoModelo.toLowerCase().includes(modelo.toLowerCase()))
    }

    return HttpResponse.json({
      content: consertos,
      totalPages: 1,
      totalElements: consertos.length,
      number: parseInt(page),
      size: 10
    })
  }),

  // GET conserto by ID
  http.get('/api/consertos/:id', ({ params }) => {
    const conserto = mockConsertos.find(c => c.id === parseInt(params.id))
    if (conserto) {
      return HttpResponse.json(conserto)
    }
    return new HttpResponse(null, { status: 404 })
  }),

  // POST create conserto
  http.post('/api/consertos', async ({ request }) => {
    const body = await request.json()
    const newConserto = {
      id: mockConsertos.length + 1,
      ...body,
      ativo: true
    }
    mockConsertos.push(newConserto)
    return HttpResponse.json(newConserto, { status: 201 })
  }),

  // PUT update conserto
  http.put('/api/consertos/:id', async ({ params, request }) => {
    const body = await request.json()
    const index = mockConsertos.findIndex(c => c.id === parseInt(params.id))
    if (index !== -1) {
      mockConsertos[index] = { ...mockConsertos[index], ...body }
      return HttpResponse.json(mockConsertos[index])
    }
    return new HttpResponse(null, { status: 404 })
  }),

  // DELETE conserto
  http.delete('/api/consertos/:id', ({ params }) => {
    const index = mockConsertos.findIndex(c => c.id === parseInt(params.id))
    if (index !== -1) {
      mockConsertos[index].ativo = false
      return new HttpResponse(null, { status: 204 })
    }
    return new HttpResponse(null, { status: 404 })
  }),
]

export const mockConsertos = [
  {
    id: 1,
    dataEntrada: '10/11/2024',
    dataSaida: '15/11/2024',
    mecanicoNome: 'João Silva',
    mecanicoAnosExperiencia: 5,
    veiculoMarca: 'Toyota',
    veiculoModelo: 'Corolla',
    veiculoAno: '2020',
    veiculoCor: 'Preto',
    ativo: true
  },
  {
    id: 2,
    dataEntrada: '11/11/2024',
    dataSaida: null,
    mecanicoNome: 'Maria Santos',
    mecanicoAnosExperiencia: 3,
    veiculoMarca: 'Honda',
    veiculoModelo: 'Civic',
    veiculoAno: '2019',
    veiculoCor: 'Branco',
    ativo: true
  },
  {
    id: 3,
    dataEntrada: '12/11/2024',
    dataSaida: null,
    mecanicoNome: 'Pedro Costa',
    mecanicoAnosExperiencia: 10,
    veiculoMarca: 'Ford',
    veiculoModelo: 'Focus',
    veiculoAno: '2021',
    veiculoCor: 'Azul',
    ativo: true
  },
]
