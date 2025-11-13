package br.edu.ifsp.lucasdmesquita.springprojectifsp.conserto;

import br.edu.ifsp.lucasdmesquita.springprojectifsp.conserto.Entity.Mecanico;
import jakarta.validation.constraints.NotNull;

public record DadosAlteracaoConserto(
        @NotNull
        Long id,
        String dataSaida,
        DadosAlteracaoMecanico mecanico
        ) {

}
