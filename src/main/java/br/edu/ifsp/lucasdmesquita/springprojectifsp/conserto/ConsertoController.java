package br.edu.ifsp.lucasdmesquita.springprojectifsp.conserto;

import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

import java.net.URI;
import java.util.List;

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

    @GetMapping
    public Page<ConsertoResponse> listar(Pageable pageable) {
        return repository.findAll(pageable).map(ConsertoResponse::fromEntity);
    }

    @GetMapping("/resumo")
    public List<ConsertoResumo> listarResumo() {
        return repository.listarResumo();
    }
}