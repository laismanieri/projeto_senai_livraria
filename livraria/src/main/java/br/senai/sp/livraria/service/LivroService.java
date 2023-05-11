package br.senai.sp.livraria.service;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.senai.sp.livraria.model.entity.DetalheLivro;
import br.senai.sp.livraria.model.entity.Livro;
import br.senai.sp.livraria.model.repository.LivroRepository;


@Service
public class LivroService {

    @Autowired
    private LivroRepository livroRepository;

    @Transactional
    public Livro salvar(Livro livro) {
        return livroRepository.save(livro);
    }

    @Transactional(readOnly = true)
    public List<Livro> listarTodos() {
        return livroRepository.findAll();
    }

    @Transactional(readOnly = true)
    public Livro buscarPorId(Long id) {
    	
        return livroRepository.findById(id).orElse(null); 
    }
    
    @Transactional
    public Livro editar(Livro livro) {
        return livroRepository.save(livro);
    }

    @Transactional
    public void excluir(Long id) {
        livroRepository.deleteById(id);
    }
    
    @Transactional()
    public List<Livro> buscarOferta() {
    	
    	List<Livro> listaOfertas = livroRepository.findByOferta(true);
    	for (Livro livro : listaOfertas) {
    			
    		for (DetalheLivro detLivro : livro.getDetalhes()) {
    			float precoComDesconto = (detLivro.getPreco() * 0.1F);
				detLivro.setPreco(precoComDesconto);
			}
			
		}
    	
        return listaOfertas;
    }
}
