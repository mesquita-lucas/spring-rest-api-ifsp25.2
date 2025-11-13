package br.edu.ifsp.lucasdmesquita.springprojectifsp.conserto;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface ConsertoRepository extends JpaRepository<Conserto, Long> {

    Page<Conserto> findAllByAtivoTrue(Pageable pageable);
    
    Page<Conserto> findByVeiculoMarcaContainingIgnoreCaseAndVeiculoModeloContainingIgnoreCaseAndAtivoTrue(
        String marca, String modelo, Pageable pageable);
        
    Optional<Conserto> findByIdAndAtivoTrue(Long id);
}