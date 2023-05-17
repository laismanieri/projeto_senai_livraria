package br.senai.sp.livraria.controller;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import br.senai.sp.livraria.dto.LivroOfertaDTO;
import br.senai.sp.livraria.dto.LivroTabelaDTO;
import br.senai.sp.livraria.model.entity.DetalheLivro;
import br.senai.sp.livraria.model.entity.Livro;
import br.senai.sp.livraria.service.LivroService;
import br.senai.sp.livraria.service.DetalheLivroService;

@RestController
@RequestMapping("/livro")
public class LivroController {

    @Autowired
    private LivroService livroService;

    @GetMapping("")
    public ResponseEntity<List<LivroOfertaDTO>> listarTodos() {
        //List<Livro> livros = livroService.listarTodos();
    	List<LivroOfertaDTO> livros = livroService.buscarTambemOferta();
        return ResponseEntity.ok(livros);
    }
    
    @GetMapping("/ofertas")
    public ResponseEntity<List<Livro>> listarOfertas() {
        List<Livro> livros = null; //livroService.buscarOferta();
        
        return ResponseEntity.ok(livros);
    } 
    
    @GetMapping("/tabela")
    public ResponseEntity<List<LivroTabelaDTO>> listarTodosTabela() {
        List<Livro> livros = livroService.listarTodos();

        List<LivroTabelaDTO> lista = new ArrayList<>();
        for (Livro livro : livros) {
            for (DetalheLivro detalhe : livro.getDetalhes()) {
                lista.add(new LivroTabelaDTO(detalhe));
            }
        }

        return ResponseEntity.ok(lista);
    }


    @GetMapping("/{id}")
    public ResponseEntity<Livro> buscarPorId(@PathVariable Long id) {
        Livro livro = livroService.buscarPorId(id);
        return ResponseEntity.ok(livro);
    }
    
    @PostMapping
    public ResponseEntity<Livro> criar(@RequestBody Livro livro) {
        Livro livroSalvo = livroService.salvar(livro);
        return ResponseEntity.status(HttpStatus.CREATED).body(livroSalvo);
    }

    @Autowired
    private DetalheLivroService detalheLivroService;
    
    @PutMapping("/{id}")
    public ResponseEntity<Livro> atualizar(@PathVariable Long id, @RequestBody Livro livroAtualizado) {
        Livro livroExistente = livroService.buscarPorId(id);

        livroExistente.setTitulo(livroAtualizado.getTitulo());
        livroExistente.setAutor(livroAtualizado.getAutor());
        livroExistente.setAnoPublicacao(livroAtualizado.getAnoPublicacao());
        livroExistente.setSinopse(livroAtualizado.getSinopse());
        livroExistente.setGenero(livroAtualizado.getGenero());
        livroExistente.setEditora(livroAtualizado.getEditora());
        livroExistente.setQtdePagina(livroAtualizado.getQtdePagina());
        livroExistente.setOferta(livroAtualizado.getOferta());
        livroExistente.setDestaque(livroAtualizado.getDestaque());
        livroExistente.setImagem(livroAtualizado.getImagem());

        // Atualiza os detalhes do livro
        for (DetalheLivro detalheLivro : livroAtualizado.getDetalhes()) {
            if (detalheLivro.getId() != null) {
                DetalheLivro detalheExistente = detalheLivroService.buscarPorId(detalheLivro.getId());
                detalheExistente.setTipoLivro(detalheLivro.getTipoLivro());
                detalheExistente.setPreco(detalheLivro.getPreco());
                detalheExistente.setQtdeEstoque(detalheLivro.getQtdeEstoque());
            } else {
                detalheLivro.setLivro(livroExistente);
                livroExistente.getDetalhes().add(detalheLivro);
            }
        }

        Livro livroAtualizadoSalvo = livroService.salvar(livroExistente);
        return ResponseEntity.ok(livroAtualizadoSalvo);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Void> excluir(@PathVariable Long id) {
        livroService.excluir(id);
        return ResponseEntity.noContent().build();
    }
}
