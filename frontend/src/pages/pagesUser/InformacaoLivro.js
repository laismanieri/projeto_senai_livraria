import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

function InformacaoLivro() {
  const { id } = useParams();
  const [livro, setLivro] = useState(null);
  const [carrinho, setCarrinho] = useState([]);

  const [modalIsOpenLivroAdd, setModalIsOpenLivroAdd] = useState(false);

  useEffect(() => {
    fetch(`http://localhost:8082/livro/${id}?_embed=detalhes`)
      .then((response) => response.json())
      .then((data) => setLivro(data))
      .catch((error) => console.log(error));
  }, [id]);
  
  const adicionarAoCarrinho = (detalheId) => {
    const detalheSelecionado = livro.detalhes.find((detalhe) => detalhe.id === detalheId);
    if (detalheSelecionado) {
      if (detalheSelecionado.qtdeEstoque > 0) {
        setCarrinho([...carrinho, detalheSelecionado]);
        toast.success("Livro adicionado ao carrinho!");
      } else {
        if (detalheSelecionado.tipoLivro === "FISICO") {
          toast.error("Livro sem estoque!");
        } else if (detalheSelecionado.tipoLivro === "EBOOK") {
          toast.error("Ebook sem estoque!");
        }
      }
    }
  };
  if (!livro) {
    return <div>Loading...</div>;
  }

  const { titulo, autor, anoPublicacao, sinopse, genero, editora, qtdePagina, oferta, destaque, imagem, detalhes } = livro;

  return (
    <div>
      <h1>{titulo}</h1>
      <p>Autor: {autor}</p>
      <p>Ano de Publicação: {anoPublicacao}</p>
      <p>Sinopse: {sinopse}</p>
      <p>Gênero: {genero}</p>
      <p>Editora: {editora}</p>
      <p>Quantidade de Páginas: {qtdePagina}</p>
      <img src={imagem} alt={titulo} />

      <h2>Detalhes do Livro:</h2>
      {detalhes.map((detalhe) => (
        <div key={detalhe.id}>
          <p>Tipo de Livro: {detalhe.tipoLivro}</p>
          <p>Preço: {detalhe.preco}</p>
          <p>Quantidade em Estoque: {detalhe.qtdeEstoque}</p>
          <button onClick={() => adicionarAoCarrinho(detalhe.id)}>Comprar</button>
        </div>
      ))}

      <h2>Carrinho de Compras:</h2>
      {carrinho.length > 0 ? (
        <ul>
          {carrinho.map((item) => (
            <li key={item.id}>{item.tipoLivro} - Preço: {item.preco} id: {item.id}</li>
          ))}
        </ul>
      ) : (
        <p>O carrinho está vazio.</p>
      )}
    </div>
  );
}

export default InformacaoLivro;
