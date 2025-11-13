package br.edu.ifsp.lucasdmesquita.springprojectifsp.conserto.Controller;

import br.edu.ifsp.lucasdmesquita.springprojectifsp.conserto.*;
import br.edu.ifsp.lucasdmesquita.springprojectifsp.conserto.Entity.Conserto;
import br.edu.ifsp.lucasdmesquita.springprojectifsp.conserto.Entity.Mecanico;
import br.edu.ifsp.lucasdmesquita.springprojectifsp.conserto.Entity.Veiculo;
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/consertos")
public class ConsertoController {

    private final ConsertoRepository repository;

    public ConsertoController(ConsertoRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public ResponseEntity<ConsertoResponse> criar(@RequestBody @Valid ConsertoRequest req,
                                                  UriComponentsBuilder uriBuilder) {
        var mecanico = new Mecanico(req.mecanicoNome(), req.mecanicoAnosExperiencia());
        var veiculo  = new Veiculo(req.veiculoMarca(), req.veiculoModelo(), req.veiculoAno(), req.veiculoCor());

        var conserto = new Conserto(req.dataEntrada(), req.dataSaida(), mecanico, veiculo);
        repository.save(conserto);

        URI location = uriBuilder.path("/consertos/{id}").buildAndExpand(conserto.getId()).toUri();
        return ResponseEntity.created(location).body(ConsertoResponse.fromEntity(conserto));
    }

    @GetMapping("/{id}")
    public ResponseEntity<ConsertoResponse> findById(@PathVariable long id) {
        Optional<Conserto> consertoOptional = repository.findById(id);

        if (consertoOptional.isPresent()) {
            return ResponseEntity.ok(ConsertoResponse.fromEntity(consertoOptional.get()));
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping
    @Transactional
    public ResponseEntity<ConsertoResponse> alterar(@RequestBody @Valid DadosAlteracaoConserto dados){
        Conserto conserto = repository.getReferenceById(dados.id());
        conserto.atualizar(dados);

        return ResponseEntity.ok().build();
    }

    @GetMapping
    public Page<ConsertoResponse> listar(Pageable pageable) {
        return repository.findAllByAtivoTrue(pageable).map(ConsertoResponse::fromEntity);
    }

    @GetMapping("/resumo")
    public List<ConsertoResumo> listarResumo() {
        return repository.listarResumo();
    }

    @DeleteMapping("/{id}")
    public void excluir(@PathVariable long id) {
        Conserto conserto = repository.getReferenceById(id);

        conserto.excluir();
    }
}