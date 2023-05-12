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
    (detalhe) => detalhe.tipoLivro === 'EBOOK'
  );
  const fisicoDetalhe = livro.detalhes.find(
    (detalhe) => detalhe.tipoLivro === 'FISICO'
  );

  const ebookPreco = ebookDetalhe ? ebookDetalhe.preco : null;
  const fisicoPreco = fisicoDetalhe ? fisicoDetalhe.preco : null;

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
                <p className={styles.sinopse}>{livro.sinopse}</p>
              </div>
            </div>
            <div className={styles.comprarLivros}>
              <div className={styles.divComprarLivros}>
                <div className={styles.compra}>
                  <div className={styles.preco}>
                    <div className={styles.divPreco}>
                      <div>
                      {fisicoDetalhe && (
              <>
                <span>{fisicoDetalhe.tipoLivro}</span>
              </>
            )}
            {ebookDetalhe && (
              <>
                <span>{ebookDetalhe.tipoLivro}</span>
              </>
            )}

                      </div>
                      <div>
                      {fisicoPreco && (
                        <span>{fisicoPreco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                      )}
                      {ebookPreco && (
                        <span>{ebookPreco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                      )}
                      </div>
                    </div>
                  </div>
                  <div className={styles.qtde}>
                    <button
                      // onClick={handleDecrementQuantidade}
                      className={styles.buttonQtde}
                    >
                      -
                    </button>
                    {/* <span className={styles.spanQtde}>{quantidade}</span> */}
                    <button
                      // onClick={handleIncrementQuantidade}
                      className={styles.buttonQtde}
                    >
                      +
                    </button>
                  </div>
                </div>
                <div>
                  <button
                    className={styles.buttonCompra}
                    // onClick={handleAddToCart}
                  >
                    <h1 className={styles.h1AdicionarSacola}>
                      Adicionar à sacola
                    </h1>
                  </button>
                  <Link to={"/pagamento"}>
                    <button className={styles.buttonAdicionarSacola}>
                      <h1 className={styles.h1AdicionarSacola}>Comprar</h1>
                    </button>
                  </Link>
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
