import React, { useState, useEffect } from 'react';

function ConsertoForm({ conserto, onSubmit, onCancel, loading }) {
  const [formData, setFormData] = useState({
    dataEntrada: '',
    dataSaida: '',
    mecanicoNome: '',
    mecanicoAnosExperiencia: '',
    veiculoMarca: '',
    veiculoModelo: '',
    veiculoAno: '',
    veiculoCor: '',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (conserto) {
      setFormData({
        dataEntrada: conserto.dataEntrada || '',
        dataSaida: conserto.dataSaida || '',
        mecanicoNome: conserto.mecanicoNome || '',
        mecanicoAnosExperiencia: conserto.mecanicoAnosExperiencia || '',
        veiculoMarca: conserto.veiculoMarca || '',
        veiculoModelo: conserto.veiculoModelo || '',
        veiculoAno: conserto.veiculoAno || '',
        veiculoCor: conserto.veiculoCor || '',
      });
    }
  }, [conserto]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Limpa erro do campo
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Validação de data (dd/mm/aaaa)
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    if (!formData.dataEntrada) {
      newErrors.dataEntrada = 'Data de entrada é obrigatória';
    } else if (!dateRegex.test(formData.dataEntrada)) {
      newErrors.dataEntrada = 'Formato deve ser dd/mm/aaaa';
    }

    if (formData.dataSaida && !dateRegex.test(formData.dataSaida)) {
      newErrors.dataSaida = 'Formato deve ser dd/mm/aaaa';
    }

    // Validação de mecânico
    if (!formData.mecanicoNome || formData.mecanicoNome.trim() === '') {
      newErrors.mecanicoNome = 'Nome do mecânico é obrigatório';
    } else if (formData.mecanicoNome.length > 120) {
      newErrors.mecanicoNome = 'Máximo 120 caracteres';
    }

    // Validação de veículo
    if (!formData.veiculoMarca || formData.veiculoMarca.trim() === '') {
      newErrors.veiculoMarca = 'Marca do veículo é obrigatória';
    } else if (formData.veiculoMarca.length > 80) {
      newErrors.veiculoMarca = 'Máximo 80 caracteres';
    }

    if (!formData.veiculoModelo || formData.veiculoModelo.trim() === '') {
      newErrors.veiculoModelo = 'Modelo do veículo é obrigatório';
    } else if (formData.veiculoModelo.length > 120) {
      newErrors.veiculoModelo = 'Máximo 120 caracteres';
    }

    // Validação de ano (aaaa)
    const yearRegex = /^\d{4}$/;
    if (!formData.veiculoAno) {
      newErrors.veiculoAno = 'Ano do veículo é obrigatório';
    } else if (!yearRegex.test(formData.veiculoAno)) {
      newErrors.veiculoAno = 'Formato deve ser aaaa';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Converte anos de experiência para número ou null
    const dataToSubmit = {
      ...formData,
      mecanicoAnosExperiencia: formData.mecanicoAnosExperiencia 
        ? parseInt(formData.mecanicoAnosExperiencia) 
        : null,
    };

    if (conserto) {
      onSubmit(conserto.id, dataToSubmit);
    } else {
      onSubmit(dataToSubmit);
    }
  };

  return (
    <div className="card">
      <h2>{conserto ? '✏️ Editar Conserto' : '➕ Novo Conserto'}</h2>
      
      <form onSubmit={handleSubmit} className="conserto-form">
        <div className="form-row">
          <div className="form-group">
            <label>Data Entrada: *</label>
            <input
              type="text"
              name="dataEntrada"
              value={formData.dataEntrada}
              onChange={handleChange}
              placeholder="dd/mm/aaaa"
              disabled={loading}
            />
            {errors.dataEntrada && <span className="error">{errors.dataEntrada}</span>}
          </div>

          <div className="form-group">
            <label>Data Saída:</label>
            <input
              type="text"
              name="dataSaida"
              value={formData.dataSaida}
              onChange={handleChange}
              placeholder="dd/mm/aaaa"
              disabled={loading}
            />
            {errors.dataSaida && <span className="error">{errors.dataSaida}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Nome do Mecânico: *</label>
            <input
              type="text"
              name="mecanicoNome"
              value={formData.mecanicoNome}
              onChange={handleChange}
              placeholder="Ex: João Silva"
              disabled={loading}
              maxLength={120}
            />
            {errors.mecanicoNome && <span className="error">{errors.mecanicoNome}</span>}
          </div>

          <div className="form-group">
            <label>Anos de Experiência:</label>
            <input
              type="number"
              name="mecanicoAnosExperiencia"
              value={formData.mecanicoAnosExperiencia}
              onChange={handleChange}
              placeholder="Ex: 5"
              disabled={loading}
              min="0"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Marca do Veículo: *</label>
            <input
              type="text"
              name="veiculoMarca"
              value={formData.veiculoMarca}
              onChange={handleChange}
              placeholder="Ex: Toyota"
              disabled={loading}
              maxLength={80}
            />
            {errors.veiculoMarca && <span className="error">{errors.veiculoMarca}</span>}
          </div>

          <div className="form-group">
            <label>Modelo do Veículo: *</label>
            <input
              type="text"
              name="veiculoModelo"
              value={formData.veiculoModelo}
              onChange={handleChange}
              placeholder="Ex: Corolla"
              disabled={loading}
              maxLength={120}
            />
            {errors.veiculoModelo && <span className="error">{errors.veiculoModelo}</span>}
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Ano do Veículo: *</label>
            <input
              type="text"
              name="veiculoAno"
              value={formData.veiculoAno}
              onChange={handleChange}
              placeholder="aaaa (Ex: 2020)"
              disabled={loading}
              maxLength={4}
            />
            {errors.veiculoAno && <span className="error">{errors.veiculoAno}</span>}
          </div>

          <div className="form-group">
            <label>Cor do Veículo:</label>
            <input
              type="text"
              name="veiculoCor"
              value={formData.veiculoCor}
              onChange={handleChange}
              placeholder="Ex: Preto"
              disabled={loading}
              maxLength={20}
            />
          </div>
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className="btn btn-success"
            disabled={loading}
          >
            {loading ? 'Salvando...' : conserto ? '💾 Atualizar' : '➕ Criar'}
          </button>
          <button 
            type="button" 
            onClick={onCancel}
            className="btn btn-secondary"
            disabled={loading}
          >
            ❌ Cancelar
          </button>
        </div>

        <p className="form-hint">* Campos obrigatórios</p>
      </form>
    </div>
  );
}

export default ConsertoForm;
