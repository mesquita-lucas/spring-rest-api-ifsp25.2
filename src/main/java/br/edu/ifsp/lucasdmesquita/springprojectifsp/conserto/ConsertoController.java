package br.edu.ifsp.lucasdmesquita.springprojectifsp.conserto;

import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.util.UriComponentsBuilder;

@RestController
@RequestMapping("/consertos")
public class ConsertoController {

    private final ConsertoRepository repository;

    public ConsertoController(ConsertoRepository repository) {
        this.repository = repository;
    }

    @PostMapping
    public ResponseEntity<ConsertoResponse> criar(@Valid @RequestBody ConsertoRequest request,
                                                  UriComponentsBuilder uriBuilder) {
        Conserto entity = Conserto.fromDto(request);
        Conserto salvo = repository.save(entity);

        var uri = uriBuilder.path("/consertos/{id}")
                .buildAndExpand(salvo.getId())
                .toUri();

        return ResponseEntity.created(uri).body(ConsertoResponse.fromEntity(salvo));
    }
}