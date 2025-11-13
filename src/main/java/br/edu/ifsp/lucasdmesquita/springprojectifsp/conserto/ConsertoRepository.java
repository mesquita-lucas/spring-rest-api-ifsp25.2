package br.edu.ifsp.lucasdmesquita.springprojectifsp.conserto;

import br.edu.ifsp.lucasdmesquita.springprojectifsp.conserto.Entity.Conserto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ConsertoRepository extends JpaRepository<Conserto, Long> {

    @Query("""
        select new br.edu.ifsp.lucasdmesquita.springprojectifsp.conserto.ConsertoResumo(
            c.id, c.dataEntrada, c.dataSaida, c.mecanico.nome, c.veiculo.marca, c.veiculo.modelo
        )
        from Conserto c where c.ativo = true
    """)
    List<ConsertoResumo> listarResumo();
    Page<Conserto> findAllByAtivoTrue(Pageable pageable);
}