package br.edu.ifsp.lucasdmesquita.springprojectifsp.conserto;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Builder.Default;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "conserto")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class Conserto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Datas como String (avaliação pede apenas formato)
    @Column(name = "data_entrada", nullable = false, length = 10)
    private String dataEntrada;

    @Column(name = "data_saida", length = 10)
    private String dataSaida;

    // Mecânico (embutido)
    @Column(name = "mecanico_nome", nullable = false, length = 120)
    private String mecanicoNome;

    @Column(name = "mecanico_anos_experiencia")
    private Integer mecanicoAnosExperiencia;

    // Veículo (embutido)
    @Column(name = "veiculo_marca", nullable = false, length = 80)
    private String veiculoMarca;

    @Column(name = "veiculo_modelo", nullable = false, length = 120)
    private String veiculoModelo;

    @Column(name = "veiculo_ano", nullable = false, length = 4)
    private String veiculoAno;

    @Column(name = "veiculo_cor", length = 20)
    private String veiculoCor;

    // Exclusão lógica
    @Default
    @Column(name = "ativo", nullable = false)
    private Boolean ativo = true;

    // Helper para mapear do DTO de entrada
    public static Conserto fromDto(ConsertoRequest dto) {
        return Conserto.builder()
                .dataEntrada(dto.dataEntrada())
                .dataSaida(dto.dataSaida())
                .mecanicoNome(dto.mecanicoNome())
                .mecanicoAnosExperiencia(dto.mecanicoAnosExperiencia())
                .veiculoMarca(dto.veiculoMarca())
                .veiculoModelo(dto.veiculoModelo())
                .veiculoAno(dto.veiculoAno())
                .veiculoCor(dto.veiculoCor())
                .ativo(Boolean.TRUE) // garante ativo=true na criação
                .build();
    }
}