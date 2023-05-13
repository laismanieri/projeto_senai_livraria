package br.senai.sp.livraria.dto;

import br.senai.sp.livraria.model.entity.Livro;
import br.senai.sp.livraria.model.enums.TipoLivro;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class DetalheLivroDTO {

	private Long id;

	private TipoLivro tipoLivro;

	private float preco;

	private Float precoDesc;
	
	private int qtdeEstoque;

}