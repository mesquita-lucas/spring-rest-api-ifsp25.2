package br.edu.ifsp.lucasdmesquita.springprojectifsp.conserto;

import br.edu.ifsp.lucasdmesquita.springprojectifsp.conserto.Entity.Conserto;

public record ConsertoResumo(
        Long id,
        String dataEntrada,
        String dataSaida,
        String mecanicoNome,
        String veiculoMarca,
        String veiculoModelo
) {
    public static ConsertoResumo fromEntity(Conserto c) {
        return new ConsertoResumo(
                c.getId(),
                c.getDataEntrada(),
                c.getDataSaida(),
                c.getMecanico().getNome(),
                c.getVeiculo().getMarca(),
                c.getVeiculo().getModelo()
        );
    }
}