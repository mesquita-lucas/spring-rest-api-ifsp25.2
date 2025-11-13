package br.edu.ifsp.lucasdmesquita.springprojectifsp.conserto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;

public record ConsertoRequest(

        // Datas: apenas formato dd/mm/aaaa (não valida data real)
        @NotBlank(message = "dataEntrada é obrigatória")
        @Pattern(regexp = "^(\\d{2})/(\\d{2})/(\\d{4})$",
                message = "dataEntrada deve estar no formato dd/mm/aaaa")
        String dataEntrada,

        @Pattern(regexp = "^(\\d{2})/(\\d{2})/(\\d{4})$",
                message = "dataSaida deve estar no formato dd/mm/aaaa")
        String dataSaida,

        // Mecânico
        @NotBlank(message = "mecanicoNome é obrigatório")
        @Size(max = 120, message = "mecanicoNome pode ter no máximo 120 caracteres")
        String mecanicoNome,

        Integer mecanicoAnosExperiencia,

        // Veículo
        @NotBlank(message = "veiculoMarca é obrigatório")
        @Size(max = 80, message = "veiculoMarca pode ter no máximo 80 caracteres")
        String veiculoMarca,

        @NotBlank(message = "veiculoModelo é obrigatório")
        @Size(max = 120, message = "veiculoModelo pode ter no máximo 120 caracteres")
        String veiculoModelo,

        @NotBlank(message = "veiculoAno é obrigatório")
        @Pattern(regexp = "^\\d{4}$", message = "veiculoAno deve estar no formato aaaa")
        String veiculoAno,
        
        String veiculoCor
) { }