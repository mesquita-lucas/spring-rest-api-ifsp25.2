package br.edu.ifsp.lucasdmesquita.springprojectifsp.conserto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;

public record ConsertoRequest(
        @Pattern(regexp = "\\d{2}/\\d{2}/\\d{4}") String dataEntrada,
        @Pattern(regexp = "\\d{2}/\\d{2}/\\d{4}") String dataSaida,

        @NotBlank String mecanicoNome,
        @NotBlank Integer mecanicoAnosExperiencia,

        @NotBlank String veiculoMarca,
        @NotBlank String veiculoModelo,
        @Pattern(regexp = "\\d{4}") String veiculoAno,

        String veiculoCor
) { }