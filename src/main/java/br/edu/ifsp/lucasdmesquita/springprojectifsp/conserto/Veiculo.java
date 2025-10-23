package br.edu.ifsp.lucasdmesquita.springprojectifsp.conserto;

import jakarta.persistence.Embeddable;
import lombok.Getter;

@Getter
@Embeddable
public class Veiculo {
    private String marca;
    private String modelo;
    private String ano;
    private String cor;

    public Veiculo() { }

    public Veiculo(String marca, String modelo, String ano, String cor) {
        this.marca = marca;
        this.modelo = modelo;
        this.ano = ano;
        this.cor = cor;
    }
}