package br.senai.sp.livraria.service;

import java.util.Arrays;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.senai.sp.livraria.model.entity.DetalheLivro;
import br.senai.sp.livraria.model.entity.Livro;
import br.senai.sp.livraria.model.repository.LivroRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.persistence.TypedQuery;


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
    
    @PersistenceContext
    private EntityManager entityManager;

    public Livro findLivroById(Long id) {
        TypedQuery<Object[]> query = entityManager.createQuery("SELECT l, d FROM Livro l JOIN l.detalhes d WHERE l.id = :livroId GROUP BY l.id", Object[].class);
        query.setParameter("livroId", id);
        Object[] result = query.getSingleResult();
        Livro livro = (Livro) result[0];
        List<DetalheLivro> detalhes = Arrays.asList((DetalheLivro[]) result[1]);
        livro.setDetalhes(detalhes);
        return livro;
    }
}
