import { useEffect, useState } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { AiOutlineClose, AiFillHeart, AiFillDelete } from "react-icons/ai";
import { useParams, Link } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Modal from "react-modal";

import Navbar from "../../components/layout/NavBar";
import Footer from "../../components/layout/Footer";

import styles from "../styles/InformacaoLivro.module.css";
import ButtonCestaCompra from "../../components/buttons/ButtonCestaCompra";

function InformacaoLivro() {
  const { id } = useParams();
  const [livro, setLivro] = useState(null);

  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  function closeModal() {
    setModalOpen(false);
  }

  const [carrinho, setCarrinho] = useState([]);



  const [quantidade, setQuantidade] = useState(1);

  const [qtdeTotal, setQtdeTotal] = useState(0);
  const [total, setTotal] = useState(0);

  const [modalIsOpenLivroAdd, setModalIsOpenLivroAdd] = useState(false);

  useEffect(() => {
    let qtde = 0;
    let valor = 0;
    carrinho.forEach((item) => {
      qtde += item.quantidade;
      valor += item.oferta
        ? item.preco * 0.8 * item.quantidade
        : item.preco * item.quantidade;
    });
    setQtdeTotal(qtde);
    setTotal(valor);
  }, [carrinho]);

  useEffect(() => {
    const carrinhoSalvo = localStorage.getItem("carrinho");
    if (carrinhoSalvo) {
      setCarrinho(JSON.parse(carrinhoSalvo));
    }
    console.log(carrinhoSalvo);
  }, []);

  const handleIncrementQuantidade = (index) => {
    const novoCarrinho = [...carrinho];
    novoCarrinho[index].quantidade++;
    setCarrinho(novoCarrinho);
    localStorage.setItem("carrinho", JSON.stringify(novoCarrinho));
  };

  const handleDecrementQuantidade = (index) => {
    const novoCarrinho = [...carrinho];
    novoCarrinho[index].quantidade--;
    if (novoCarrinho[index].quantidade === 0) {
      novoCarrinho.splice(index, 1);
    }
    setCarrinho(novoCarrinho);
    localStorage.setItem("carrinho", JSON.stringify(novoCarrinho));
  };

  const handleRemoveItem = (indexToRemove) => {
    const novoCarrinho = [...carrinho];
    novoCarrinho.splice(indexToRemove, 1);
    setCarrinho(novoCarrinho);
    localStorage.setItem("carrinho", JSON.stringify(novoCarrinho));
  };


  const onFinalizarPedido = () => {
    
    // Criar objeto com os dados do pedido
    const pedido = {
      id: -1,
      dataPedido: new Date().toISOString().slice(0, 10),
      usuario_id: 1,
      itensDTO: carrinho.map((livro) => ({
        id: -1,
        valorUnid: livro.oferta ? livro.preco * 0.8 : livro.preco,
        valorTotal: livro.oferta
          ? livro.preco * 0.8 * livro.quantidade
          : livro.preco * livro.quantidade,
        qtdeItens: livro.quantidade,
        detalhe_livro_id: livro.id,
        detalhe_id: livro.idDetalhe
      })),
    };

    console.log(pedido)
    // Transformar objeto em JSON
    const pedidoJSON = JSON.stringify(pedido);

    // Enviar pedidoJSON para a API gravar no banco
    // Exemplo de envio de dados para uma API usando o método POST
    fetch("http://localhost:8082/pedido", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: pedidoJSON,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Pedido gravado no banco:", data);
        // Limpar carrinho após finalizar o pedido
        setCarrinho([]);
        localStorage.removeItem("carrinho");
      })
      .catch((error) => {
        console.error("Erro ao gravar pedido no banco:", error);
      });
  };

  



  useEffect(() => {
    const carrinhoSalvo = localStorage.getItem("carrinho");
    if (carrinhoSalvo) {
      setCarrinho(JSON.parse(carrinhoSalvo));
    }
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8082/livro/${id}?_embed=detalhes`)
      .then((response) => response.json())
      .then((data) => setLivro(data))
      .catch((error) => console.log(error));
  }, [id]);

  if (!livro) {
    return <p>Carregando...</p>;
  }

  const ebookDetalhe = livro.detalhes.find(
    (detalhe) => detalhe.tipoLivro === "EBOOK"
  );
  const fisicoDetalhe = livro.detalhes.find(
    (detalhe) => detalhe.tipoLivro === "FISICO"
  );

  const isPrecoRegular = livro.oferta === true || livro.oferta === true;

  const adicionarAoCarrinho = (detalheId) => {
    const detalheSelecionado = livro.detalhes.find(
      (detalhe) => detalhe.id === detalheId
    );
    if (detalheSelecionado) {
      if (detalheSelecionado.qtdeEstoque > 0) {
        setModalOpen(true);

        const novoItem = {
          id: livro.id,
          titulo: livro.titulo,
          detalheSelecionado,
          quantidade: 1,
          imagem: livro.imagem,
          oferta: livro.oferta,
        };

        const novoCarrinho = [...carrinho, novoItem];
        setCarrinho(novoCarrinho);
        localStorage.setItem("carrinho", JSON.stringify(novoCarrinho));

        toast.success("Livro adicionado ao carrinho!");
        localStorage.setItem("carrinho", JSON.stringify(carrinho));
      } else {
        if (detalheSelecionado.tipoLivro === "FISICO") {
          toast.error("Livro sem estoque!");
        } else if (detalheSelecionado.tipoLivro === "EBOOK") {
          toast.error("Ebook sem estoque!");
        }
      }
    }
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: "9999",
    },
  };

  const {
    titulo,
    autor,
    anoPublicacao,
    sinopse,
    genero,
    editora,
    qtdePagina,
    oferta,
    destaque,
    imagem,
    detalhes,
  } = livro;

  return (
    <>
      <Navbar />
      <div className={styles.container}>
        <Link to={"/"}>
          <h1 className={styles.voltarHome}>
            <AiOutlineArrowLeft />
            Voltar
          </h1>
        </Link>
        <div className={styles.linhaHorizontal} />

        <div className={styles.gridContainer}>
          <div className={styles.gridItemLong}>
            <img
              className={styles.imagemLivro}
              src={livro.imagem}
              alt={livro.titulo}
            />
          </div>
          <div className={styles.gridItemLong}>
            <div className={styles.containerInfoLivro}>
              <p className={styles.titulo}>{titulo}</p>
              <p className={styles.autor}>{autor}</p>
              <p className={styles.editora}>{editora}</p>
              <div className={styles.tipoLivroDetalhe}></div>
              <div className={styles.linhaHorizontalDetalhe} />
              <p className={styles.sinopse}>{sinopse}</p>
            </div>
          </div>

          <div className={styles.comprarLivros}>
            <div className={styles.divComprarLivros}>
              <div className={styles.compra}></div>
              <div>
                <h2>Detalhes do Livro:</h2>
                {detalhes.map((detalhe) => (
                  <div key={detalhe.id}>
                    <p>Tipo de Livro: {detalhe.tipoLivro}</p>
                    <p>Preço: {detalhe.preco}</p>
                    <p>Quantidade em Estoque: {detalhe.qtdeEstoque}</p>
                    <button onClick={() => adicionarAoCarrinho(detalhe.id)}>
                      Comprar
                    </button>


                  </div>
                ))}
              </div>

              <Modal
                      isOpen={modalOpen}
                      onRequestClose={handleCloseModal}
                      contentLabel="Carrinho de Compras"
                    >
                      <h2>Carrinho de Compras:</h2>
                      {detalhes.map((detalhe) => (
                  <div key={detalhe.id}>
                    <p>Tipo de Livro: {detalhe.tipoLivro}</p>
                    <p>Preço: {detalhe.preco}</p>
                    <p>Id: {detalhe.id}</p>


                    <div className={styles.bodyLista}>
            <br></br>
            <table className={styles.tableSecao}>
              <tr>
                <th className={styles.thSecaoTitN}>1</th>
                <th className={styles.thSecaoTit}>Revisar itens</th>
              </tr>
            </table>
            {detalhes.map((detalhe, index) => (
              <div className={styles.listaItemCarrinho}>
                <div key={livro.id}></div>
                <div className={styles.containerLista}>
                  <div className={styles.gridListaImg}>
                    <div className={styles.divImg}>
                      <img
                        className={styles.imagemGrid}
                        src={imagem}
                        alt={titulo}
                      />
                    </div>
                  </div>
                  <div className={styles.containerListaInfo}>
                    <div className={styles.gridListaInfo}>
                      <div className={styles.divComprarLivros}>
                        <div className={styles.divTituloExcluir}>
                          <p className={styles.tituloTipoLivro}>
                            {detalhe.tipoLivro}
                          </p>
                          <p className={styles.tituloItem}>
                            {titulo}
                            <button
                              className={styles.imgExcluirItemCarrinho}
                              onClick={() => handleRemoveItem(index)}
                            >
                              <AiFillDelete />
                            </button>
                          </p>
                        </div>

                        <div className={styles.divPreco}>
                          {livro.oferta ? (
                            <div className={styles.divPrecoOferta}>
                              <p className={styles.precoTit}>
                                <span className={styles.precoTit}>Preço: </span>
                                <span className={styles.precoAntigo}>
                                  {detalhe.preco}
                                </span>
                              </p>

                              <p className={styles.precoTit}>
                                <span className={styles.precoTit}>
                                  Preço em Oferta:{" "}
                                </span>
                                <span className={styles.precoOferta}>
                                  {(detalhe.preco * 0.8).toLocaleString("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                  })}
                                </span>
                              </p>
                            </div>
                          ) : (
                            <p className={styles.precoTit}>
                              <span className={styles.precoTit}>Preço: </span>
                              <span className={styles.precoRegular}>
                                {detalhe.preco.toLocaleString("pt-BR", {
                                  style: "currency",
                                  currency: "BRL",
                                })}
                              </span>
                            </p>
                          )}
                        </div>

                        <div className={styles.qtde}>
                          <div>
                            {livro.oferta ? (
                              <p className={styles.precoTit}>
                                <span className={styles.precoTit}>Total: </span>
                                <span className={styles.precoRegular}>
                                  {(
                                    detalhe.preco *
                                    0.8 *
                                    quantidade
                                  ).toLocaleString("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                  })}
                                </span>
                              </p>
                            ) : (
                              <p className={styles.precoTit}>
                                <span className={styles.precoTit}>Total: </span>
                                <span className={styles.precoRegular}>
                                  {(
                                    detalhe.preco * quantidade
                                  ).toLocaleString("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                  })}
                                </span>
                              </p>
                            )}
                          </div>
                          <div>
                            <button
                              className={styles.buttonQtde}
                              onClick={() => handleDecrementQuantidade(index)}
                            >
                              -
                            </button>
                            <span className={styles.spanQtde}>
                              {quantidade}
                            </span>
                            <button
                              className={styles.buttonQtde}
                              onClick={() => handleIncrementQuantidade(index)}
                            >
                              +
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                          <div className={styles.totalCarrinho}>
            <div className={styles.valorCarrinho}>
              <ul className={styles.valorSubtotal}>
                <li>
                  <span>Resumo do Pedido</span>
                </li>
              </ul>
              <div className={styles.linhaHorizontal} />
              <ul className={styles.valorSubtotal}>
                <li>
                  <span>Entrega GRÁTIS:</span>
                </li>
                <li>
                  <span>2 dias úteis</span>
                </li>
              </ul>

              <ul className={styles.valorSubtotal}>
                <li>
                  <span>Total de Livros:</span>
                </li>
                <li>
                  <span>{qtdeTotal}</span>
                </li>
              </ul>
              <div className={styles.linhaHorizontal} />
              <ul className={styles.valorTotal}>
                <li>
                  <span>Valor Total:</span>
                </li>
                <li>
                  <span>
                    {total.toLocaleString("pt-BR", {
                      style: "currency",
                      currency: "BRL",
                    })}
                  </span>
                </li>
              </ul>
              <div>
                <button
                  className={styles.carrinhoButtonComprar}
                  onClick={() => {
                    setModalIsOpenLivroAdd(true); // Abre o modal
                    onFinalizarPedido(); // Realiza a ação de finalizar o pedido
                  }}
                >
                  Finalizar Pedido
                </button>
              </div>
            </div>
          </div>
              </div>

              
            ))}
          </div>


                    
                  </div>
                ))}
                      <button onClick={closeModal}>Fechar</button>
                    </Modal>
            </div>
          </div>
        </div>

        <div className={styles.linhaHorizontal} />
        <div className={styles.fichaTecnica}>
          <h1 className={styles.fichaH1}>Ficha Técnica</h1>
          <div className={styles.ficha}>
            <ul className={styles.ficha2}>
              <li className={styles.fichaInfo}>
                <span className={styles.fichaTh}>Titulo:</span>
              </li>
              <li>
                <span className={styles.fichaTr}>{titulo}</span>
              </li>
            </ul>
            <ul className={styles.ficha1}>
              <li className={styles.fichaInfo}>
                <span className={styles.fichaTh}>Autor(a):</span>
              </li>
              <li>
                <span className={styles.fichaTr}>{autor}</span>
              </li>
            </ul>
            <ul className={styles.ficha2}>
              <li className={styles.fichaInfo}>
                <span className={styles.fichaTh}>Gênero:</span>
              </li>
              <li>
                <span className={styles.fichaTr}>{genero}</span>
              </li>
            </ul>
            <ul className={styles.ficha1}>
              <li className={styles.fichaInfo}>
                <span className={styles.fichaTh}>Editora:</span>
              </li>
              <li>
                <span className={styles.fichaTr}>{editora}</span>
              </li>
            </ul>
            <ul className={styles.ficha2}>
              <li className={styles.fichaInfo}>
                <span className={styles.fichaTh}>Ano:</span>
              </li>
              <li>
                <span className={styles.fichaTr}>{anoPublicacao}</span>
              </li>
            </ul>
            <ul className={styles.ficha1}>
              <li className={styles.fichaInfo}>
                <span className={styles.fichaTh}>Quantidade de Páginas:</span>
              </li>
              <li>
                <span className={styles.fichaTr}>{qtdePagina}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default InformacaoLivro;
