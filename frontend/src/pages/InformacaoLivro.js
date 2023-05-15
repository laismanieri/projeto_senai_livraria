import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import styles from "./InformacaoLivro.module.css";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Container from "../components/layout/Container";
import Navbar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";
import { Link } from "react-router-dom";
import { AiOutlineClose, AiFillHeart } from "react-icons/ai";
import Modal from "react-modal";

function InformacaoLivro() {
  const { id } = useParams();
  const [livro, setLivro] = useState(null);
  const [tipoLivroSelecionado, setTipoLivroSelecionado] = useState("FISICO");

  const [modalIsOpenLivroAdd, setModalIsOpenLivroAdd] = useState(false);

  const [carrinho, setCarrinho] = useState([]);

  useEffect(() => {
    const carrinhoSalvo = localStorage.getItem("carrinho");
    if (carrinhoSalvo) {
      setCarrinho(JSON.parse(carrinhoSalvo));
    }
  }, []);

  useEffect(() => {
    axios
      .get(`http://localhost:8082/livro/${id}?_embed=detalhes`)
      .then((response) => {
        setLivro(response.data);
        // Inicializa o estado tipoLivroSelecionado com "EBOOK" se o livro não tiver detalhes físicos
        if (
          !response.data.detalhes.some(
            (detalhe) => detalhe.tipoLivro === "FISICO"
          )
        ) {
          setTipoLivroSelecionado("EBOOK");
        }
      })
      .catch((error) => {
        console.error(error);
      });
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

  const ebookPreco = ebookDetalhe ? ebookDetalhe.preco : null;
  const fisicoPreco = fisicoDetalhe ? fisicoDetalhe.preco : null;

  const isPrecoRegular = livro.oferta === true || livro.oferta === true;

  const fisicoEstoque = livro.detalhes.find(
    (detalhe) =>
      detalhe.tipoLivro === "FISICO" &&
      (detalhe.qtdeEstoque === 0 || detalhe.qtdeEstoque > 0)
  );

  const ebookEstoque = livro.detalhes.find(
    (detalhe) =>
      detalhe.tipoLivro === "EBOOK" &&
      (detalhe.qtdeEstoque === 0 || detalhe.qtdeEstoque > 0)
  );

  function adicionarAoCarrinho() {
    if (tipoLivroSelecionado === "FISICO" && fisicoEstoque.qtdeEstoque === 0) {
      window.alert("Livro físico sem estoque!");
      return;
    } else if (
      tipoLivroSelecionado === "EBOOK" &&
      ebookEstoque.qtdeEstoque === 0
    ) {
      window.alert("Livro ebook sem estoque!");
      return;
    } else {
      setModalIsOpenLivroAdd(true);
      const novoItem = {
        id: livro.id,
        titulo: livro.titulo,
        tipoLivro: tipoLivroSelecionado,
        quantidade: 1,
        imagem: livro.imagem,
        oferta: livro.oferta,
        preco: tipoLivroSelecionado === "FISICO" ? fisicoPreco : ebookPreco,
      };
      const novoCarrinho = [...carrinho, novoItem];
      setCarrinho(novoCarrinho);
      localStorage.setItem("carrinho", JSON.stringify(novoCarrinho));
    }
  }

  function closeModal() {
    setModalIsOpenLivroAdd(false);
  }

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

  return (
    <>
      <Navbar />
      <Container>
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
                <div className={styles.tituloFavorito}>
                  <div>
                    <p className={styles.titulo}>{livro.titulo}</p>
                  </div>
                  <div>
                    <p>
                      <AiFillHeart />
                    </p>
                  </div>
                </div>

                <p className={styles.autor}>{livro.autor}</p>
                <p className={styles.editora}>{livro.editora}</p>
                <div className={styles.tipoLivroDetalhe}>
                  {fisicoDetalhe && fisicoDetalhe.tipoLivro && (
                    <button
                      className={styles.buttonTipoLivroFisico}
                      onClick={() => setTipoLivroSelecionado("FISICO")}
                    >
                      {fisicoDetalhe && (
                        <>
                          <p>{fisicoDetalhe.tipoLivro}</p>
                        </>
                      )}
                      <p>
                        {fisicoPreco.toLocaleString("pt-BR", {
                          style: "currency",
                          currency: "BRL",
                        })}
                      </p>
                    </button>
                  )}
                  {ebookDetalhe && ebookDetalhe.tipoLivro && (
                    <button
                      className={styles.buttonTipoLivroEbook}
                      onClick={() => setTipoLivroSelecionado("EBOOK")}
                    >
                      {ebookDetalhe && (
                        <>
                          <p>{ebookDetalhe.tipoLivro}</p>
                        </>
                      )}
                      {ebookPreco && (
                        <p>
                          {ebookPreco.toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                          })}
                        </p>
                      )}
                    </button>
                  )}
                </div>
                <div className={styles.linhaHorizontalDetalhe} />
                <p className={styles.sinopse}>{livro.sinopse}</p>
              </div>
            </div>

            <div className={styles.comprarLivros}>
              <div className={styles.divComprarLivros}>
                <div className={styles.compra}>
                  {tipoLivroSelecionado === "FISICO" && (
                    <div className={styles.divPreco}>
                      <ul className={styles.ulCompraInfoTipo}>
                        <li>
                          {fisicoDetalhe && (
                            <>
                              <span></span>
                              <>
                                <span className={styles.liCompraInfoTit}>
                                  {fisicoDetalhe.tipoLivro}
                                </span>
                              </>
                            </>
                          )}
                        </li>
                      </ul>
                      {livro.oferta ? (
                        <>
                          <ul className={styles.ulCompraInfo}>
                            <li>
                              <span className={styles.liCompraInfoTit}>
                                Preco:
                              </span>
                            </li>
                            <li>
                              <span className={styles.precoAntigo}>
                                {fisicoDetalhe.preco.toLocaleString("pt-BR", {
                                  style: "currency",
                                  currency: "BRL",
                                })}
                              </span>
                            </li>
                          </ul>

                          <ul className={styles.ulCompraInfo}>
                            <li>
                              <span className={styles.liCompraInfoTit}>
                                Preco Oferta:
                              </span>
                            </li>
                            <li>
                              <span className={styles.precoOferta}>
                                {(fisicoDetalhe.preco * 0.8).toLocaleString(
                                  "pt-BR",
                                  {
                                    style: "currency",
                                    currency: "BRL",
                                  }
                                )}
                              </span>
                            </li>
                          </ul>
                        </>
                      ) : (
                        <ul className={styles.ulCompraInfo}>
                          <li>
                            <span className={styles.liCompraInfoTit}>
                              Preco:
                            </span>
                          </li>
                          <li>
                            <span className={styles.precoRegular}>
                              {fisicoDetalhe.preco.toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              })}
                            </span>
                          </li>
                        </ul>
                      )}
                      <ul className={styles.ulCompraInfoEntrega}>
                        <li>
                          <span className={styles.liEntrega}>
                            Entrega GRÁTIS:
                          </span>
                        </li>
                        <li>
                          <span className={styles.liCompraInfo}>
                            2 dias utéis
                          </span>
                        </li>
                      </ul>
                      <ul className={styles.ulCompraInfo}>
                        <li>
                          <span className={styles.estoque}>
                            {fisicoEstoque.qtdeEstoque === 0
                              ? "Sem estoque"
                              : "Em estoque"}
                          </span>
                        </li>
                      </ul>
                    </div>
                  )}
                  {tipoLivroSelecionado === "EBOOK" && (
                    <div className={styles.divPreco}>
                      <ul className={styles.ulCompraInfoTipo}>
                        <li>
                          {ebookDetalhe && (
                            <>
                              <span className={styles.liCompraInfoTit}>
                                {ebookDetalhe.tipoLivro}
                              </span>
                            </>
                          )}
                        </li>
                      </ul>
                      {livro.oferta ? (
                        <>
                          <ul className={styles.ulCompraInfo}>
                            <li>
                              <span className={styles.liCompraInfoTit}>
                                Preco:
                              </span>
                            </li>
                            <li>
                              <span className={styles.precoAntigo}>
                                {ebookDetalhe.preco.toLocaleString("pt-BR", {
                                  style: "currency",
                                  currency: "BRL",
                                })}
                              </span>
                            </li>
                          </ul>

                          <ul className={styles.ulCompraInfo}>
                            <li>
                              <span className={styles.liCompraInfoTit}>
                                Preco Oferta:
                              </span>
                            </li>
                            <li>
                              <span className={styles.precoOferta}>
                                {(ebookDetalhe.preco * 0.8).toLocaleString(
                                  "pt-BR",
                                  {
                                    style: "currency",
                                    currency: "BRL",
                                  }
                                )}
                              </span>
                            </li>
                          </ul>
                        </>
                      ) : (
                        <ul className={styles.ulCompraInfo}>
                          <li>
                            <span className={styles.liCompraInfoTit}>
                              Preco:
                            </span>
                          </li>
                          <li>
                            <span className={styles.precoRegular}>
                              {ebookDetalhe.preco.toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              })}
                            </span>
                          </li>
                        </ul>
                      )}
                      <ul className={styles.ulCompraInfoEntrega}>
                        <li>
                          <span className={styles.liEntrega}>
                            Entrega GRÁTIS:
                          </span>
                        </li>
                        <li>
                          <span className={styles.liCompraInfo}>
                            2 dias utéis
                          </span>
                        </li>
                      </ul>
                      <ul className={styles.ulCompraInfo}>
                        <li>
                          <span className={styles.estoque}>
                            {ebookEstoque.qtdeEstoque === 0
                              ? "Sem estoque"
                              : "Em estoque"}
                          </span>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
                <div>
                  <button
                    className={styles.buttonCompra}
                    onClick={adicionarAoCarrinho}
                  >
                    <h1 className={styles.h1AdicionarSacola}>
                      Adicionar à sacola
                    </h1>
                  </button>

                  <Modal
                    className={styles.modalCompra}
                    isOpen={modalIsOpenLivroAdd}
                    onRequestClose={closeModal}
                    contentLabel="Livro adicionado à sacola"
                    style={customStyles}
                    overlayStyle={customStyles.overlay}
                  >
                    <button
                      className={styles.buttonFecharModal}
                      onClick={() => {
                        closeModal();
                        window.location.reload();
                      }}
                    >
                      {" "}
                      <AiOutlineClose className={styles.imgFechar} />
                    </button>
                    <h2 className={styles.h2AdicionarSacola}>
                      Livro adicionado à sacola!
                    </h2>
                  </Modal>
                </div>
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
                  <span className={styles.fichaTr}>{livro.titulo}</span>
                </li>
              </ul>
              <ul className={styles.ficha1}>
                <li className={styles.fichaInfo}>
                  <span className={styles.fichaTh}>Autor(a):</span>
                </li>
                <li>
                  <span className={styles.fichaTr}>{livro.autor}</span>
                </li>
              </ul>
              <ul className={styles.ficha2}>
                <li className={styles.fichaInfo}>
                  <span className={styles.fichaTh}>Gênero:</span>
                </li>
                <li>
                  <span className={styles.fichaTr}>{livro.genero}</span>
                </li>
              </ul>
              <ul className={styles.ficha1}>
                <li className={styles.fichaInfo}>
                  <span className={styles.fichaTh}>Editora:</span>
                </li>
                <li>
                  <span className={styles.fichaTr}>{livro.editora}</span>
                </li>
              </ul>
              <ul className={styles.ficha2}>
                <li className={styles.fichaInfo}>
                  <span className={styles.fichaTh}>Ano:</span>
                </li>
                <li>
                  <span className={styles.fichaTr}>{livro.anoPublicacao}</span>
                </li>
              </ul>
              <ul className={styles.ficha1}>
                <li className={styles.fichaInfo}>
                  <span className={styles.fichaTh}>Quantidade de Páginas:</span>
                </li>
                <li>
                  <span className={styles.fichaTr}>{livro.qtdePagina}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </Container>

      <Footer />
    </>
  );
}

export default InformacaoLivro;
