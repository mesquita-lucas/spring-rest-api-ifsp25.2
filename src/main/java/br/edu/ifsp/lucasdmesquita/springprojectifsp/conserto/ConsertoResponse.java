package br.edu.ifsp.lucasdmesquita.springprojectifsp.conserto;

import br.edu.ifsp.lucasdmesquita.springprojectifsp.conserto.Entity.Conserto;

public record ConsertoResponse(
        Long id,
        String dataEntrada,
        String dataSaida,
        String mecanicoNome,
        Integer mecanicoAnosExperiencia,
        String veiculoMarca,
        String veiculoModelo,
        String veiculoAno,
        String veiculoCor
) {
    public static ConsertoResponse fromEntity(Conserto c) {
        return new ConsertoResponse(
                c.getId(),
                c.getDataEntrada(),
                c.getDataSaida(),
                c.getMecanico().getNome(),
                c.getMecanico().getAnosExperiencia(),
                c.getVeiculo().getMarca(),
                c.getVeiculo().getModelo(),
                c.getVeiculo().getAno(),
                c.getVeiculo().getCor()
        );
    }
}