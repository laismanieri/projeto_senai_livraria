package br.senai.sp.livraria.service;

import java.time.LocalDate;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import br.senai.sp.livraria.model.entity.ItemPedido;
import br.senai.sp.livraria.model.entity.Pedido;
import br.senai.sp.livraria.model.repository.PedidoRepository;

@Service
public class PedidoService {

    @Autowired
    private PedidoRepository pedidoRepository;

    @Transactional
    public Pedido salvar(Pedido pedido) {
        return pedidoRepository.save(pedido);
    }

    @Transactional(readOnly = true)
    public List<Pedido> listarTodos() {
        return pedidoRepository.findAll();
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
