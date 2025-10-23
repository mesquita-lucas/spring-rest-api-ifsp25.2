package br.edu.ifsp.lucasdmesquita.springprojectifsp.conserto;

public record ConsertoResponse(
        Long id,
        String dataEntrada,
        String dataSaida,
        String mecanicoNome,
        Integer mecanicoAnosExperiencia,
        String veiculoMarca,
        String veiculoModelo,
        String veiculoAno,
        Boolean ativo
) {
    public static ConsertoResponse fromEntity(Conserto c) {
        return new ConsertoResponse(
                c.getId(),
                c.getDataEntrada(),
                c.getDataSaida(),
                c.getMecanicoNome(),
                c.getMecanicoAnosExperiencia(),
                c.getVeiculoMarca(),
                c.getVeiculoModelo(),
                c.getVeiculoAno(),
                c.getAtivo()
        );
    }
}
