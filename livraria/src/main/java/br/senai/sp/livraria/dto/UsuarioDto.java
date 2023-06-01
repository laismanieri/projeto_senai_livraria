package br.senai.sp.livraria.dto;

import br.senai.sp.livraria.model.enums.TipoLivro;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UsuarioDto {
	private String email;
}
