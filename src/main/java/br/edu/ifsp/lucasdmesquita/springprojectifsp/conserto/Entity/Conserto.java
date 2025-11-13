package br.edu.ifsp.lucasdmesquita.springprojectifsp.conserto.Entity;

import br.edu.ifsp.lucasdmesquita.springprojectifsp.conserto.DadosAlteracaoConserto;
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

    private Boolean ativo;

    public Conserto() { }

    public Conserto(String dataEntrada, String dataSaida, Mecanico mecanico, Veiculo veiculo) {
        this.ativo = true;
        this.dataEntrada = dataEntrada;
        this.dataSaida = dataSaida;
        this.mecanico = mecanico;
        this.veiculo = veiculo;
    }

    public void excluir(){
        this.ativo = false;
    }

    public void atualizar(DadosAlteracaoConserto dados){
        if(dados.mecanico().nome() != null){
            this.mecanico.atualizar(dados.mecanico());
        }
        if(dados.dataSaida() != null){
            this.dataSaida = dados.dataSaida();
        }
        if(dados.mecanico().anosExperiencia() != null){
            this.mecanico.atualizar(dados.mecanico());
        }
    }
}