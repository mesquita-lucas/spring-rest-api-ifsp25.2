package br.edu.ifsp.lucasdmesquita.springprojectifsp.conserto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record ConsertoRequest(

        @Pattern(regexp = "^(\\d{2})/(\\d{2})/(\\d{4})$",
                message = "data deve estar no formato dd/mm/aaaa")
        String dataEntrada,

        @Pattern(regexp = "^(\\d{2})/(\\d{2})/(\\d{4})$",
                message = "data deve estar no formato dd/mm/aaaa")
        String dataSaida,

        @NotBlank(message = "nome do mecânico é obrigatório")
        @Size(max = 120, message = "nome do mecânico pode ter no máximo 120 caracteres")
        String mecanicoNome,

        Integer mecanicoAnosExperiencia,

        @NotBlank(message = "marca do veículo é obrigatório")
        @Size(max = 80, message = "marca do veículo pode ter no máximo 80 caracteres")
        String veiculoMarca,

        @NotBlank(message = "modelo do veículo é obrigatório")
        @Size(max = 40, message = "modelo do veículo pode ter no máximo 40 caracteres")
        String veiculoModelo,

        @NotBlank(message = "ano do veículo é obrigatório")
        @Pattern(regexp = "^\\d{4}$", message = "ano do veículo deve estar no formato aaaa")
        String veiculoAno,

        String veiculoCor
) { }