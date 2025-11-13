import React from 'react';

function ConsertoList({ consertos, onEdit, onDelete, loading }) {
  if (loading) {
    return <div className="loading">Carregando...</div>;
  }

  if (!consertos || consertos.length === 0) {
    return (
      <div className="empty-state">
        <p>📭 Nenhum conserto encontrado</p>
      </div>
    );
  }

  return (
    <div className="conserto-list">
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Data Entrada</th>
            <th>Data Saída</th>
            <th>Mecânico</th>
            <th>Experiência</th>
            <th>Veículo</th>
            <th>Ano</th>
            <th>Cor</th>
            {(onEdit || onDelete) && <th>Ações</th>}
          </tr>
        </thead>
        <tbody>
          {consertos.map((conserto) => (
            <tr key={conserto.id}>
              <td>{conserto.id}</td>
              <td>{conserto.dataEntrada}</td>
              <td>{conserto.dataSaida || '-'}</td>
              <td>{conserto.mecanicoNome}</td>
              <td>{conserto.mecanicoAnosExperiencia || '-'} anos</td>
              <td>{conserto.veiculoMarca} {conserto.veiculoModelo}</td>
              <td>{conserto.veiculoAno}</td>
              <td>{conserto.veiculoCor || '-'}</td>
              {(onEdit || onDelete) && (
                <td className="actions">
                  {onEdit && (
                    <button
                      onClick={() => onEdit(conserto)}
                      className="btn-action edit"
                      title="Editar"
                    >
                      ✏️
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={() => onDelete(conserto.id)}
                      className="btn-action delete"
                      title="Excluir"
                    >
                      🗑️
                    </button>
                  )}
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ConsertoList;
