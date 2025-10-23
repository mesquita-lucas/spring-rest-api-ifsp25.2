package br.edu.ifsp.lucasdmesquita.springprojectifsp.conserto;

import jakarta.persistence.*;
import lombok.Getter;

@Getter
@Entity
public class Conserto {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String dataEntrada;
    private String dataSaida;

    @Embedded
    private Mecanico mecanico;

    @Embedded
    private Veiculo veiculo;

    public Conserto() { }

    public Conserto(String dataEntrada, String dataSaida, Mecanico mecanico, Veiculo veiculo) {
        this.dataEntrada = dataEntrada;
        this.dataSaida = dataSaida;
        this.mecanico = mecanico;
        this.veiculo = veiculo;
    }
}