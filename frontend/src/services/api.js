import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Adiciona autenticação Basic Auth em todas as requisições
api.interceptors.request.use((config) => {
  const auth = localStorage.getItem('auth');
  if (auth) {
    config.headers.Authorization = `Basic ${auth}`;
  }
  return config;
});

// Interceptor para tratar erros de autenticação
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Limpa credenciais inválidas
      localStorage.removeItem('auth');
      localStorage.removeItem('username');
    }
    return Promise.reject(error);
  }
);

// Serviço de autenticação
export const authService = {
  login: async (username, password) => {
    try {
      const encoded = btoa(`${username}:${password}`);
      
      // Testa as credenciais fazendo uma requisição ao backend
      const testApi = axios.create({
        baseURL: '/api',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${encoded}`
        },
      });
      
      // Faz uma requisição de teste
      await testApi.get('/consertos?page=0&size=1');
      
      // Se chegou aqui, as credenciais são válidas
      localStorage.setItem('auth', encoded);
      localStorage.setItem('username', username);
      return { success: true, username };
    } catch (error) {
      // Limpa qualquer credencial anterior
      localStorage.removeItem('auth');
      localStorage.removeItem('username');
      
      if (error.response?.status === 401) {
        throw new Error('Usuário ou senha inválidos');
      }
      throw new Error('Erro ao fazer login. Tente novamente.');
    }
  },
  
  logout: () => {
    localStorage.removeItem('auth');
    localStorage.removeItem('username');
  },
  
  isAuthenticated: () => {
    return !!localStorage.getItem('auth');
  },
  
  getUsername: () => {
    return localStorage.getItem('username');
  },
};

// Serviço de consertos
export const consertoService = {
  // GET todos os consertos (paginado)
  getAll: async (page = 0, size = 10) => {
    const response = await api.get(`/consertos?page=${page}&size=${size}`);
    return response.data;
  },

  // GET conserto por ID
  getById: async (id) => {
    const response = await api.get(`/consertos/${id}`);
    return response.data;
  },

  // GET busca parcial (por marca e modelo)
  search: async (marca, modelo, page = 0, size = 10) => {
    const response = await api.get(`/consertos`, {
      params: { marca, modelo, page, size }
    });
    return response.data;
  },

  // POST criar conserto
  create: async (conserto) => {
    const response = await api.post('/consertos', conserto);
    return response.data;
  },

  // PUT atualizar conserto
  update: async (id, conserto) => {
    const response = await api.put(`/consertos/${id}`, conserto);
    return response.data;
  },

  // DELETE exclusão lógica
  delete: async (id) => {
    await api.delete(`/consertos/${id}`);
  },
};

export default api;
