package br.edu.ifsp.lucasdmesquita.springprojectifsp.conserto;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ConsertoRepository extends JpaRepository<Conserto, Long> {

    @Query("""
        select new br.edu.ifsp.lucasdmesquita.springprojectifsp.conserto.ConsertoResumo(
            c.dataEntrada, c.dataSaida, c.mecanico.nome, c.veiculo.marca, c.veiculo.modelo
        )
        from Conserto c
    """)
    List<ConsertoResumo> listarResumo();
}