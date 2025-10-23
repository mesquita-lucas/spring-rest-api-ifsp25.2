package br.edu.ifsp.lucasdmesquita.springprojectifsp.conserto;

import jakarta.persistence.Embeddable;
import lombok.Getter;

@Getter
@Embeddable
public class Mecanico {
    private String nome;
    private String anosExperiencia;

    public Mecanico() { }

    public Mecanico(String nome, String anosExperiencia) {
        this.nome = nome;
        this.anosExperiencia = anosExperiencia;
    }

}