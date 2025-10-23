package br.edu.ifsp.lucasdmesquita.springprojectifsp.conserto;

public record ConsertoResumo(
        String dataEntrada,
        String dataSaida,
        String mecanicoNome,
        String veiculoMarca,
        String veiculoModelo
) {
    public static ConsertoResumo fromEntity(Conserto c) {
        return new ConsertoResumo(
                c.getDataEntrada(),
                c.getDataSaida(),
                c.getMecanico().getNome(),
                c.getVeiculo().getMarca(),
                c.getVeiculo().getModelo()
        );
    }
}