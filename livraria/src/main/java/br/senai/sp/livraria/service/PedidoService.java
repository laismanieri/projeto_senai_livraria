package br.senai.sp.livraria.service;

import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.senai.sp.livraria.dto.DetalheLivroDTO;
import br.senai.sp.livraria.dto.ItemPedidoSelectDTO;
import br.senai.sp.livraria.dto.LivroOfertaDTO;
import br.senai.sp.livraria.dto.PedidoDTO;
import br.senai.sp.livraria.dto.PedidoSelectDTO;
import br.senai.sp.livraria.model.entity.ItemPedido;
import br.senai.sp.livraria.model.entity.Livro;
import br.senai.sp.livraria.model.entity.Pedido;
import br.senai.sp.livraria.model.repository.LivroRepository;
import br.senai.sp.livraria.model.repository.PedidoRepository;

@Service
public class PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;
    
    @Autowired
    private LivroRepository livroRepository;
    
    @Autowired
    private LivroService livroService;

    @Transactional
    public Pedido salvar(Pedido pedido) {
        return pedidoRepository.save(pedido);
    }
    
    @Transactional(readOnly = true)
    public List<Pedido> listarTodos() {

        return pedidoRepository.findAll();
    }

    @Transactional(readOnly = true)
    public List<PedidoSelectDTO> listarTodosDTO() {
    	
    	List<PedidoSelectDTO> listaRespostaPedidoSelectDTO = new ArrayList<>();
    	
    	PedidoSelectDTO pedidoSelectDTO;
    	
    	List<ItemPedidoSelectDTO> listaItemPedidoSelectDTO;
    	
    	ItemPedidoSelectDTO itemPedidoSelectDTO;
    	
    	for (Pedido pedido : pedidoRepository.findAll()) {
    		pedidoSelectDTO = new PedidoSelectDTO();
    		
    		pedidoSelectDTO.setId(pedido.getId());
    		pedidoSelectDTO.setUsuario_id(pedido.getUsuario().getId());
    		pedidoSelectDTO.setDataPedido(pedido.getDataPedido());
    		pedidoSelectDTO.setValorTotal(pedido.getValorTotal());
    		
    		listaItemPedidoSelectDTO = new ArrayList<>();
    		for (ItemPedido item : pedido.getItens()) {
    			itemPedidoSelectDTO = new ItemPedidoSelectDTO();
    			
    			itemPedidoSelectDTO.setId(item.getId());
    			itemPedidoSelectDTO.setQtdeItens(item.getQtdeItens());
    			itemPedidoSelectDTO.setValorUnid(item.getValorUnid());
    			itemPedidoSelectDTO.setValorTotal(item.getValorTotalItem());
    			
    			 //Livro livro = livroRepository.findById(item.getDetalheLivro().getLivro().getId()).orElseThrow(() -> new RuntimeException("Livro não encontrado"));
    			
    			List<LivroOfertaDTO> lista = livroService.buscarTambemOferta();
    			
    			LivroOfertaDTO livroEncontrado = null;
    	        for (LivroOfertaDTO livro : lista) {
    	            if (livro.getId().equals(item.getDetalheLivro().getLivro().getId()) ) {
    	                livroEncontrado = livro;
    	                break;
    	            }
    	        }
    	        
    	        DetalheLivroDTO detalheEncontrado = null;
    	        for (DetalheLivroDTO det : livroEncontrado.getDetalhesDTO()) {
    	            if (det.getId().equals(item.getDetalheLivro().getId()) ) {
    	            	detalheEncontrado = det;
    	                break;
    	            }
    	        }    
    	        
    	        detalheEncontrado.setLivroId(livroEncontrado.getId());
    	        detalheEncontrado.setPrecoDesc(detalheEncontrado.getPrecoDesc());

    	        
    	        /*
				DetalheLivroDTO detDTO = new DetalheLivroDTO();
				detDTO.setId(item.getDetalheLivro().getId());
				detDTO.setLivroId(livroEncontrado.getId());
				detDTO.setPreco(item.getDetalheLivro().getPreco());
				detDTO.setQtdeEstoque(item.getDetalheLivro().getQtdeEstoque());
				detDTO.setTipoLivro(item.getDetalheLivro().getTipoLivro());
				detDTO.setPrecoDesc(objetoEncontrado.);
				
				
				itemPedidoSelectDTO.setDetalheLivroDTO(detDTO);
				*/

    			itemPedidoSelectDTO.setDetalheLivroDTO(detalheEncontrado);
    			
    			listaItemPedidoSelectDTO.add(itemPedidoSelectDTO);
			}
    		
    		pedidoSelectDTO.setItensDTO(listaItemPedidoSelectDTO);
    		listaRespostaPedidoSelectDTO.add(pedidoSelectDTO);
    		
		}
    	
        return listaRespostaPedidoSelectDTO;
    }    
    
    @Transactional(readOnly = true)
    public Pedido buscarPorId(Long id) {
        return pedidoRepository.findById(id).orElseThrow(() -> new RuntimeException("pedido não encontrado"));
    }

    @Transactional
    public Pedido salvarPedidoComItens(Pedido pedido, List<ItemPedido> itens) {
        pedido.setDataPedido(LocalDate.now());
        pedido.setItens(itens);

        for (ItemPedido item : itens) {
            item.setPedido(pedido);
        }

        return pedidoRepository.save(pedido);
    }

    
    @Transactional
    public void excluir(Long id) {
    	pedidoRepository.deleteById(id);
    }

}
