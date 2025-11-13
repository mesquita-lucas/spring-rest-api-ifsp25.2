package br.edu.ifsp.lucasdmesquita.springprojectifsp.conserto.Entity;

import br.edu.ifsp.lucasdmesquita.springprojectifsp.conserto.DadosAlteracaoMecanico;
import jakarta.persistence.Embeddable;
import lombok.Getter;

@Getter
@Embeddable
public class Mecanico {
    private String nome;
    private Integer anosExperiencia;

    public Mecanico() { }

    public Mecanico(String nome, Integer anosExperiencia) {
        this.nome = nome;
        this.anosExperiencia = anosExperiencia;
    }

    public void atualizar(DadosAlteracaoMecanico dados){
        if(dados.nome() != null){
            this.nome = dados.nome();
        }
        if(dados.anosExperiencia() != null){
            this.anosExperiencia = dados.anosExperiencia();
        }
    }

}