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

  const formatDate = (value) => {
    // Remove tudo exceto números
    const numbers = value.replace(/\D/g, '');
    
    if (numbers.length === 0) return '';
    
    let day = numbers.slice(0, 2);
    let month = numbers.slice(2, 4);
    let year = numbers.slice(4, 8);
    
    // Valida dia (01-31)
    if (day.length === 1) {
      // Se o primeiro dígito for maior que 3, adiciona 0 na frente
      if (parseInt(day) > 3) {
        day = '0' + day;
      }
    } else if (day.length === 2) {
      const dayNum = parseInt(day);
      if (dayNum === 0) {
        day = '01';
      } else if (dayNum > 31) {
        day = '31';
      }
    }
    
    // Valida mês (01-12)
    if (month.length === 1) {
      // Se o primeiro dígito for maior que 1, adiciona 0 na frente
      if (parseInt(month) > 1) {
        month = '0' + month;
      }
    } else if (month.length === 2) {
      const monthNum = parseInt(month);
      if (monthNum === 0) {
        month = '01';
      } else if (monthNum > 12) {
        month = '12';
      }
    }
    
    // Monta a data formatada
    let formatted = day;
    if (numbers.length >= 3) {
      formatted += '/' + month;
    }
    if (numbers.length >= 5) {
      formatted += '/' + year;
    }
    
    return formatted;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Máscaras e validações específicas por campo
    if (name === 'dataEntrada' || name === 'dataSaida') {
      // Aplica máscara de data dd/mm/aaaa
      const formatted = formatDate(value);
      setFormData(prev => ({
        ...prev,
        [name]: formatted
      }));
    } else if (name === 'veiculoAno') {
      // Remove caracteres não numéricos e limita a 4 dígitos
      const sanitized = value.replace(/\D/g, '').slice(0, 4);
      setFormData(prev => ({
        ...prev,
        [name]: sanitized
      }));
    } else if (name === 'mecanicoAnosExperiencia') {
      // Remove caracteres não numéricos e limita a 100
      const sanitized = value.replace(/\D/g, '');
      const limited = sanitized ? Math.min(parseInt(sanitized), 100).toString() : '';
      setFormData(prev => ({
        ...prev,
        [name]: limited
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }));
    }
    
    // Limpa erro do campo
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const currentYear = new Date().getFullYear();
    const currentDate = new Date();

    // Validação de data (dd/mm/aaaa)
    const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
    
    // Validação de Data Entrada
    if (!formData.dataEntrada) {
      newErrors.dataEntrada = 'Data de entrada é obrigatória';
    } else if (!dateRegex.test(formData.dataEntrada)) {
      newErrors.dataEntrada = 'Formato deve ser dd/mm/aaaa';
    } else {
      const [dia, mes, ano] = formData.dataEntrada.split('/').map(Number);
      const dataEntrada = new Date(ano, mes - 1, dia);
      const dataMinima = new Date(2015, 0, 1); // 01/01/2015
      
      if (dataEntrada < dataMinima) {
        newErrors.dataEntrada = 'Data mínima: 01/01/2015';
      } else if (dataEntrada > currentDate) {
        newErrors.dataEntrada = 'Data não pode ser futura';
      }
    }

    // Validação de Data Saída
    if (formData.dataSaida && !dateRegex.test(formData.dataSaida)) {
      newErrors.dataSaida = 'Formato deve ser dd/mm/aaaa';
    } else if (formData.dataSaida) {
      const [dia, mes, ano] = formData.dataSaida.split('/').map(Number);
      const dataSaida = new Date(ano, mes - 1, dia);
      const dataMaxima = new Date(currentYear + 1, 11, 31); // 31/12/(ano atual + 1)
      
      if (dataSaida > dataMaxima) {
        newErrors.dataSaida = `Data máxima: 31/12/${currentYear + 1}`;
      }
      
      // Valida se data de saída é posterior à data de entrada
      if (formData.dataEntrada && dateRegex.test(formData.dataEntrada)) {
        const [diaEnt, mesEnt, anoEnt] = formData.dataEntrada.split('/').map(Number);
        const dataEntrada = new Date(anoEnt, mesEnt - 1, diaEnt);
        
        if (dataSaida < dataEntrada) {
          newErrors.dataSaida = 'Data de saída deve ser posterior à entrada';
        }
      }
    }

    // Validação de mecânico
    if (!formData.mecanicoNome || formData.mecanicoNome.trim() === '') {
      newErrors.mecanicoNome = 'Nome do mecânico é obrigatório';
    } else if (formData.mecanicoNome.length > 120) {
      newErrors.mecanicoNome = 'Máximo 120 caracteres';
    }

    // Validação de anos de experiência (máximo 100)
    if (formData.mecanicoAnosExperiencia) {
      const anos = parseInt(formData.mecanicoAnosExperiencia);
      if (anos > 100) {
        newErrors.mecanicoAnosExperiencia = 'Máximo 100 anos';
      }
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

    // Validação de ano do veículo (1886 até ano atual + 1)
    const yearRegex = /^\d{4}$/;
    if (!formData.veiculoAno) {
      newErrors.veiculoAno = 'Ano do veículo é obrigatório';
    } else if (!yearRegex.test(formData.veiculoAno)) {
      newErrors.veiculoAno = 'Formato deve ser aaaa';
    } else {
      const ano = parseInt(formData.veiculoAno);
      const anoMinimo = 1886; // Primeiro automóvel
      const anoMaximo = currentYear + 1; // Permite pré-lançamentos
      
      if (ano < anoMinimo) {
        newErrors.veiculoAno = `Ano mínimo: ${anoMinimo}`;
      } else if (ano > anoMaximo) {
        newErrors.veiculoAno = `Ano máximo: ${anoMaximo}`;
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    // Prepara dados para envio
    const dataToSubmit = {
      dataEntrada: formData.dataEntrada.trim(),
      dataSaida: formData.dataSaida && formData.dataSaida.trim() !== '' 
        ? formData.dataSaida.trim() 
        : null,
      mecanicoNome: formData.mecanicoNome.trim(),
      mecanicoAnosExperiencia: formData.mecanicoAnosExperiencia 
        ? parseInt(formData.mecanicoAnosExperiencia) 
        : null,
      veiculoMarca: formData.veiculoMarca.trim(),
      veiculoModelo: formData.veiculoModelo.trim(),
      veiculoAno: formData.veiculoAno.trim(),
      veiculoCor: formData.veiculoCor && formData.veiculoCor.trim() !== '' 
        ? formData.veiculoCor.trim() 
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
              placeholder="dd/mm/aaaa (mín: 01/01/2015)"
              disabled={loading}
              maxLength={10}
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
              placeholder={`dd/mm/aaaa (máx: 31/12/${new Date().getFullYear() + 1})`}
              disabled={loading}
              maxLength={10}
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
              type="text"
              name="mecanicoAnosExperiencia"
              value={formData.mecanicoAnosExperiencia}
              onChange={handleChange}
              placeholder="Ex: 5 (máx: 100)"
              disabled={loading}
              inputMode="numeric"
              maxLength={3}
            />
            {errors.mecanicoAnosExperiencia && <span className="error">{errors.mecanicoAnosExperiencia}</span>}
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
              placeholder={`aaaa (1886-${new Date().getFullYear() + 1})`}
              disabled={loading}
              maxLength={4}
              inputMode="numeric"
              pattern="\d{4}"
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
