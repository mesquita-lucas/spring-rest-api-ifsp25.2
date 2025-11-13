import React, { useState, useEffect } from 'react';
import { consertoService, authService } from '../services/api';
import ConsertoForm from './ConsertoForm';
import ConsertoList from './ConsertoList';
import SearchBar from './SearchBar';
import './Dashboard.css';

function Dashboard({ username, onLogout }) {
  const [consertos, setConsertos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingConserto, setEditingConserto] = useState(null);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalPages, setTotalPages] = useState(0);
  const [totalElements, setTotalElements] = useState(0);

  const isAdmin = username === 'admin';

  useEffect(() => {
    loadConsertos();
  }, [currentPage]);

  const loadConsertos = async () => {
    setLoading(true);
    setError('');
    try {
      const data = await consertoService.getAll(currentPage, 10);
      setConsertos(data.content || []);
      setTotalPages(data.totalPages || 0);
      setTotalElements(data.totalElements || 0);
    } catch (err) {
      if (err.response?.status === 401) {
        handleLogout();
        return;
      }
      setError('Erro ao carregar consertos');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (marca, modelo) => {
    if (!marca && !modelo) {
      loadConsertos();
      return;
    }

    setLoading(true);
    setError('');
    try {
      const data = await consertoService.search(marca, modelo, currentPage, 10);
      setConsertos(data.content || []);
      setTotalPages(data.totalPages || 0);
      setTotalElements(data.totalElements || 0);
    } catch (err) {
      if (err.response?.status === 401) {
        handleLogout();
        return;
      }
      setError('Erro ao buscar consertos');
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async (conserto) => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await consertoService.create(conserto);
      setSuccess('Conserto criado com sucesso!');
      setShowForm(false);
      loadConsertos();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      if (err.response?.status === 401) {
        handleLogout();
        return;
      }
      setError(err.response?.data?.message || 'Erro ao criar conserto');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (id, conserto) => {
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await consertoService.update(id, conserto);
      setSuccess('Conserto atualizado com sucesso!');
      setShowForm(false);
      setEditingConserto(null);
      loadConsertos();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      if (err.response?.status === 401) {
        handleLogout();
        return;
      }
      setError(err.response?.data?.message || 'Erro ao atualizar conserto');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Tem certeza que deseja excluir este conserto?')) {
      return;
    }

    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await consertoService.delete(id);
      setSuccess('Conserto excluído com sucesso!');
      loadConsertos();
      setTimeout(() => setSuccess(''), 3000);
    } catch (err) {
      if (err.response?.status === 401) {
        handleLogout();
        return;
      }
      setError('Erro ao excluir conserto');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (conserto) => {
    setEditingConserto(conserto);
    setShowForm(true);
  };

  const handleCancelForm = () => {
    setShowForm(false);
    setEditingConserto(null);
  };

  const handleLogout = () => {
    authService.logout();
    onLogout();
  };

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <div className="header-content">
          <h1>🔧 Sistema de Consertos</h1>
          <div className="user-info">
            <span>👤 {username}</span>
            <span className="role-badge">{isAdmin ? 'Admin' : 'Usuário'}</span>
            <button onClick={handleLogout} className="btn-logout">
              Sair
            </button>
          </div>
        </div>
      </header>

      <div className="container">
        {error && <div className="alert alert-error">{error}</div>}
        {success && <div className="alert alert-success">{success}</div>}

        <div className="toolbar">
          <SearchBar onSearch={handleSearch} />
          {isAdmin && (
            <button 
              onClick={() => setShowForm(!showForm)} 
              className="btn btn-primary"
            >
              {showForm ? '📋 Ver Lista' : '➕ Novo Conserto'}
            </button>
          )}
        </div>

        {showForm ? (
          <ConsertoForm
            conserto={editingConserto}
            onSubmit={editingConserto ? handleUpdate : handleCreate}
            onCancel={handleCancelForm}
            loading={loading}
          />
        ) : (
          <>
            <div className="stats">
              <span>Total de consertos: <strong>{totalElements}</strong></span>
              <span>Página {currentPage + 1} de {totalPages || 1}</span>
            </div>

            <ConsertoList
              consertos={consertos}
              onEdit={isAdmin ? handleEdit : null}
              onDelete={isAdmin ? handleDelete : null}
              loading={loading}
            />

            {totalPages > 1 && (
              <div className="pagination">
                <button
                  onClick={() => setCurrentPage(p => Math.max(0, p - 1))}
                  disabled={currentPage === 0}
                  className="btn btn-secondary"
                >
                  ← Anterior
                </button>
                <span>Página {currentPage + 1} de {totalPages}</span>
                <button
                  onClick={() => setCurrentPage(p => Math.min(totalPages - 1, p + 1))}
                  disabled={currentPage >= totalPages - 1}
                  className="btn btn-secondary"
                >
                  Próxima →
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default Dashboard;
