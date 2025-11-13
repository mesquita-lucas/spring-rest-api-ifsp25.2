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

// Serviço de autenticação
export const authService = {
  login: (username, password) => {
    const encoded = btoa(`${username}:${password}`);
    localStorage.setItem('auth', encoded);
    localStorage.setItem('username', username);
    return { success: true, username };
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
