import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [marca, setMarca] = useState('');
  const [modelo, setModelo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(marca, modelo);
  };

  const handleClear = () => {
    setMarca('');
    setModelo('');
    onSearch('', '');
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Marca do veículo"
          value={marca}
          onChange={(e) => setMarca(e.target.value)}
        />
        <input
          type="text"
          placeholder="Modelo do veículo"
          value={modelo}
          onChange={(e) => setModelo(e.target.value)}
        />
        <button type="submit" className="btn btn-info">
          🔍 Buscar
        </button>
        {(marca || modelo) && (
          <button type="button" onClick={handleClear} className="btn btn-secondary">
            🔄 Limpar
          </button>
        )}
      </form>
    </div>
  );
}

export default SearchBar;
