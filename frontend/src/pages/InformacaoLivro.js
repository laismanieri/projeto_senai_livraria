import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import styles from "./InformacaoLivro.module.css";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Container from "../components/layout/Container";
import Navbar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";
import { Link } from "react-router-dom";
import ModalCarrinho from "../components/modals/ModalCarrinho";

function InformacaoLivro() {
  const { id } = useParams();
  const [livro, setLivro] = useState(null);
  const [tipoLivroSelecionado, setTipoLivroSelecionado] = useState("FISICO");

  useEffect(() => {
    axios
      .get(`http://localhost:8082/livro/${id}?_embed=detalhes`)
      .then((response) => {
        setLivro(response.data);
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

  const fisicoEstoque = livro.detalhes.find(
    (detalhe) =>
      detalhe.tipoLivro === "FISICO" &&
      (detalhe.qtdeEstoque === 0 || detalhe.qtdeEstoque !== 0)
  );

  const ebookEstoque = livro.detalhes.find(
    (detalhe) =>
      detalhe.tipoLivro === "EBOOK" &&
      (detalhe.qtdeEstoque === 0 || detalhe.qtdeEstoque !== 0)
  );

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
                <h1 className={styles.titulo}>{livro.titulo}</h1>
                <p className={styles.autor}>{livro.autor}</p>
                <p className={styles.editora}>{livro.editora}</p>
                <div className={styles.tipoLivroDetalhe}>
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
                  <button
                    className={`${styles.buttonTipoLivroEbook} ${
                      tipoLivroSelecionado === "EBOOK" ? "active" : ""
                    }`}
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
                                <span className={styles.liCompraInfoTit}>{fisicoDetalhe.tipoLivro}</span>
                              </>
                            )}
                        </li>
                      </ul>
                      <ul className={styles.ulCompraInfo}>
                        <li>
                          <span className={styles.liCompraInfoTit}>Preco:</span>
                        </li>
                        <li>
                          <span className={styles.liCompraInfo}>
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
                          <span className={styles.liCompraInfo}> 9.00</span>
                        </li>
                      </ul>
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
                                <span className={styles.liCompraInfoTit}>{ebookDetalhe.tipoLivro}</span>
                              </>
                            )}
                        </li>
                      </ul>
                      <ul className={styles.ulCompraInfo}>
                        <li>
                          <span className={styles.liCompraInfoTit}>Preco:</span>
                        </li>
                        <li>
                          <span className={styles.liCompraInfo}>
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
                          <span className={styles.liCompraInfo}> 9.00</span>
                        </li>
                      </ul>
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
                  <button className={styles.buttonCompra}>
                    <h1 className={styles.h1AdicionarSacola}>
                      Adicionar à sacola
                    </h1>
                  </button>
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
