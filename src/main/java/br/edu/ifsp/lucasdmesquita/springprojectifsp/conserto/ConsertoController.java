package br.edu.ifsp.lucasdmesquita.springprojectifsp.conserto;

import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
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

    // POST — cria ativo=true por padrão
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

    // GET paginado — apenas registros ativos
    @GetMapping
    public ResponseEntity<Page<ConsertoResponse>> listar(Pageable paginacao) {
        Page<ConsertoResponse> page = repository
                .findAllByAtivoTrue(paginacao)
                .map(ConsertoResponse::fromEntity);
        return ResponseEntity.ok(page);
    }

    // DELETE lógico — marca ativo=false
    @DeleteMapping("/{id}")
    @jakarta.transaction.Transactional
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        var opt = repository.findById(id);
        if (opt.isEmpty()) {
            // 404 sem corpo — tipo é ResponseEntity<Void>
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        }

        var conserto = opt.get();
        conserto.setAtivo(false);    // exclusão lógica (dirty checking faz o UPDATE no commit)
        return ResponseEntity.noContent().build(); // 204
    }
}