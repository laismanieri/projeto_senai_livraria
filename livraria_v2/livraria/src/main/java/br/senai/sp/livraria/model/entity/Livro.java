package br.senai.sp.livraria.model.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table( name = "livro")
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Livro {
	

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String titulo;
	
	private String autor;

	private int anoPublicacao;

	@Lob
	@Column(name = "sinopse", columnDefinition = "LONGTEXT")
	private String sinopse;

	private String genero;
	
	private String editora;

	private int qtdePagina;

	private Boolean oferta;
	
	private Boolean destaque;
	
	private String imagem;

}
