import React, { useState } from 'react';
import { authService } from '../services/api';
import './Login.css';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!username || !password) {
      setError('Por favor, preencha usuário e senha');
      return;
    }

    try {
      const result = authService.login(username, password);
      onLogin(result.username);
    } catch (err) {
      setError('Erro ao fazer login');
    }
  };

  const handleQuickLogin = (user, pass) => {
    setUsername(user);
    setPassword(pass);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>🔧 Sistema de Consertos</h1>
        <p className="subtitle">IFSP - Spring REST API</p>
        
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Usuário:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Digite seu usuário"
            />
          </div>

          <div className="form-group">
            <label>Senha:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Digite sua senha"
            />
          </div>

          {error && <div className="error-message">{error}</div>}

          <button type="submit" className="btn-login">
            Entrar
          </button>
        </form>

        <div className="quick-login">
          <p>Acesso rápido:</p>
          <button 
            className="btn-quick admin"
            onClick={() => handleQuickLogin('admin', 'admin123')}
          >
            👤 Admin (CRUD Completo)
          </button>
          <button 
            className="btn-quick user"
            onClick={() => handleQuickLogin('user', 'user123')}
          >
            👁️ Usuário (Somente Leitura)
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login;
