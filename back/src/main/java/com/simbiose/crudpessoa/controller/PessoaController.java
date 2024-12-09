package com.simbiose.crudpessoa.controller;

import com.simbiose.crudpessoa.model.Pessoa; // Classe Pessoa, que representa o modelo de dados
import com.simbiose.crudpessoa.repository.PessoaRepository; // Repositório para interagir com o banco de dados
import org.springframework.beans.factory.annotation.Autowired; // Anotação para injeção de dependências
import org.springframework.http.ResponseEntity; // Classe para manipular respostas HTTP
import org.springframework.http.HttpStatus; // Informa o código de status HTTP
import org.springframework.web.bind.annotation.*; // Anotações para mapeamento de rotas e manipulação de requisições

import java.util.List;

@RestController // Define que esta classe é um controlador REST
@CrossOrigin(origins = "http://127.0.0.1:5500") // Permite acesso apenas da URL específica
@RequestMapping("/pessoas") // Mapeia todas as rotas iniciadas por "/pessoas"
public class PessoaController {

    @Autowired
    private PessoaRepository pessoaRepository;

    // Criar pessoa
    @PostMapping
    public ResponseEntity<Pessoa> criarPessoa(@RequestBody Pessoa pessoa) {
        Pessoa novaPessoa = pessoaRepository.save(pessoa);
        return ResponseEntity.status(201).body(novaPessoa); // Status 201 Created
    }

    // Listar pessoas
    @GetMapping
    public List<Pessoa> listarPessoas() {
        return pessoaRepository.findAll();
    }

    // Buscar uma pessoa
    @GetMapping("/{id}") 
    public ResponseEntity<Pessoa> buscarPessoaPorId(@PathVariable Long id) {
        return pessoaRepository.findById(id)
            .map(pessoa -> ResponseEntity.ok(pessoa)) // Retorna 200 OK se encontrar a pessoa
            .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build()); // Retorna 404 se não encontrar a pessoa
    }

    // Atualizar pessoa
    @PutMapping("/{id}")
    public ResponseEntity<Pessoa> atualizarPessoa(@PathVariable Long id, @RequestBody Pessoa novaPessoa) {
        return pessoaRepository.findById(id)
            .map(pessoa -> {
                pessoa.setNome(novaPessoa.getNome());
                pessoa.setEmail(novaPessoa.getEmail());
                pessoa.setDataNascimento(novaPessoa.getDataNascimento());
                pessoaRepository.save(pessoa);
                return ResponseEntity.ok(pessoa); // Retorna 200 OK com a pessoa atualizada
            })
            .orElse(ResponseEntity.notFound().build()); // Retorna 404 se não encontrar a pessoa
    }

    // Remover pessoa
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> removerPessoa(@PathVariable Long id) {
        return pessoaRepository.findById(id)
            .map(pessoa -> {
                pessoaRepository.delete(pessoa);
                return ResponseEntity.noContent().build(); // Retorna 204 No Content se deletado com sucesso
            })
            .orElse(ResponseEntity.notFound().build()); // Retorna 404 se não encontrar a pessoa
    }
}
