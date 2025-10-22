package br.edu.ifsp.lucasdmesquita.springprojectifsp.conserto;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "conserto")
@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class Conserto {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "data_entrada", nullable = false, length = 10)
    private String dataEntrada;

    @Column(name = "data_saida", length = 10)
    private String dataSaida;

    @Column(name = "mecanico_nome", nullable = false, length = 120)
    private String mecanicoNome;

    @Column(name = "mecanico_anos_experiencia")
    private Integer mecanicoAnosExperiencia;

    @Column(name = "veiculo_marca", nullable = false, length = 80)
    private String veiculoMarca;

    @Column(name = "veiculo_modelo", nullable = false, length = 120)
    private String veiculoModelo;

    @Column(name = "veiculo_ano", nullable = false, length = 4)
    private String veiculoAno;

    @Column(name = "veiculo_cor", length = 40)
    private String veiculoCor;

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
                .build();
    }
}