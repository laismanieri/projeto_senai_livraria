import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import styles from "./InformacaoLivro.module.css";
import { AiOutlineArrowLeft } from "react-icons/ai";
import Container from "../components/layout/Container";
import Navbar from "../components/layout/NavBar";
import Footer from "../components/layout/Footer";
import { Link } from "react-router-dom";

function InformacaoLivroAdm() {
  const { id } = useParams();
  const [livro, setLivro] = useState(null);
  const [tipoLivroSelecionado, setTipoLivroSelecionado] = useState("FISICO");

  function handleChangeEdit() {
    const novoLivro = {
      titulo: livro.titulo,
      autor: livro.autor,
      editora: livro.editora,
      genero: livro.genero,
      sinopse: livro.sinopse,
      anoPublicacao: livro.anoPublicacao,
      imagem: livro.imagem,
      oferta: livro.oferta,
      destaque: livro.destaque,
      qtdePagina: livro.qtdePagina,
      detalhes: [
        {
          preco: livro.preco,
          qtdeEstoque: livro.qtdeEstoque,
          tipoLivro: livro.tipoLivro,
        },
      ],
    };

    axios
      .put(`http://localhost:8082/livro/${id}`, novoLivro)
      .then((response) => {
        console.log("Livro atualizado:", response.data);
        window.alert("Livro atualizado!");
        window.location.reload();
      })
      .catch((error) => {
        console.error("Erro ao atualizar ao atualizar livro:", error);
        window.alert("Erro ao atualizar!");
      });
  }

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

  const fisicoEstoque =
    livro &&
    livro.detalhes.find(
      (detalhe) =>
        detalhe.tipoLivro === "FISICO" &&
        (detalhe.qtdeEstoque === 0 || detalhe.qtdeEstoque > 0)
    );

  const ebookEstoque =
    livro &&
    livro.detalhes.find(
      (detalhe) =>
        detalhe.tipoLivro === "EBOOK" &&
        (detalhe.qtdeEstoque === 0 || detalhe.qtdeEstoque > 0)
    );

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
          <Link to={"/adm"}>
            <h1 className={styles.voltarHome}>
              <AiOutlineArrowLeft />
              Voltar
            </h1>
          </Link>
          <div className={styles.linhaHorizontal} />
          <div className={styles.gridContainerAdm}>
            <div className={styles.gridItemLongAdm}>
              <img
                className={styles.imagemLivro}
                src={livro.imagem}
                alt={livro.titulo}
              />
            </div>
            <div className={styles.gridItemLongAdm}>
              <div className={styles.containerInfoLivroAdm}>
                <h1 className={styles.titulo}>{livro.titulo}</h1>
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
                    </button>
                  )}
                </div>
                <div className={styles.fichaTecnica}>
                  <div className={styles.ficha}>
                    <ul className={styles.fichaAdm}>
                      <li className={styles.fichaInfo}>
                        <label htmlFor="titulo" className={styles.fichaTh}>
                          Titulo:
                        </label>
                      </li>
                      <li>
                        <input
                          type="text"
                          id="titulo"
                          className={styles.inputAdm}
                          defaultValue={livro.titulo}
                        />
                      </li>
                    </ul>
                    <ul className={styles.fichaAdm}>
                      <li className={styles.fichaInfo}>
                        <label htmlFor="autor" className={styles.fichaTh}>
                          Autor(a):
                        </label>
                      </li>
                      <li>
                        <input
                          type="text"
                          id="autor"
                          className={styles.inputAdm}
                          defaultValue={livro.autor}
                        />
                      </li>
                    </ul>
                    <ul className={styles.fichaAdm}>
                      <li className={styles.fichaInfo}>
                        <label htmlFor="genero" className={styles.fichaTh}>
                          Gênero:
                        </label>
                      </li>
                      <li>
                        <input
                          type="text"
                          id="genero"
                          className={styles.inputAdm}
                          defaultValue={livro.genero}
                        />
                      </li>
                    </ul>
                    <ul className={styles.fichaAdm}>
                      <li className={styles.fichaInfo}>
                        <label htmlFor="editora" className={styles.fichaTh}>
                          Editora:
                        </label>
                      </li>
                      <li>
                        <input
                          type="text"
                          id="editora"
                          className={styles.inputAdm}
                          defaultValue={livro.editora}
                        />
                      </li>
                    </ul>
                    <ul className={styles.fichaBolean}>
                      <li className={styles.fichaInfo}>
                        <label htmlFor="oferta" className={styles.fichaTh}>
                          Oferta:
                        </label>
                        <input
                          type="text"
                          id="oferta"
                          className={styles.inputAdm}
                          defaultValue={livro.oferta}
                        />
                      </li>
                      <li className={styles.fichaInfo}>
                        <label htmlFor="destaque" className={styles.fichaTh}>
                          Destaque:
                        </label>
                        <input
                          type="text"
                          id="destaque"
                          className={styles.inputAdm}
                          defaultValue={livro.destaque}
                        />
                      </li>
                    </ul>
                    <ul className={styles.fichaBolean}>
                      <li className={styles.fichaInfo}>
                        <label htmlFor="anoPublicacao" className={styles.fichaTh}>
                        Ano Publicação:
                        </label>
                        <input
                          type="text"
                          id="anoPublicacao"
                          className={styles.inputAdm}
                          defaultValue={livro.anoPublicacao}
                        />
                      </li>
                      <li className={styles.fichaInfo}>
                        <label htmlFor="qtdePagina" className={styles.fichaTh}>
                        Páginas:
                        </label>
                        <input
                          type="text"
                          id="Páginas"
                          className={styles.inputAdm}
                          defaultValue={livro.qtdePagina}
                        />
                      </li>
                    </ul>
                    <ul className={styles.fichaAdm}>
                      <li className={styles.fichaInfo}>
                        <label htmlFor="sinopse" className={styles.fichaTh}>
                          Sinopse:
                        </label>
                      </li>
                      <li>
                        <textarea
                          type="textarea"
                          id="sinopse"
                          className={styles.inputAdmSinopse}
                          defaultValue={livro.sinopse}
                        />
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div className={styles.comprarLivros}>
              <div className={styles.divTipoLivros}>
                <div className={styles.compra}>
                  {tipoLivroSelecionado === "FISICO" && (
                    <div className={styles.divPreco}>
                      <ul className={styles.ulCompraInfoTipo}>
                        <li>
                          {fisicoDetalhe && (
                            <>
                              <label className={styles.liInfoTit}>
                                {fisicoDetalhe.tipoLivro}
                              </label>
                            </>
                          )}
                        </li>
                      </ul>
                      <ul className={styles.ulCompraInfo}>
                        <li>
                          <label className={styles.liInfoTit}>Preco:</label>
                        </li>
                        <li>
                          <input
                            type="text"
                            id="preco"
                            className={styles.inputAdm}
                            defaultValue={fisicoPreco}
                          />
                        </li>
                      </ul>
                      <ul className={styles.ulCompraInfo}>
                        <li>
                          <label className={styles.liInfoTit}>Estoque:</label>
                        </li>
                        <li>
                          <input
                            type="text"
                            id="qtdeEstoque"
                            className={styles.inputAdm}
                            defaultValue={(fisicoEstoque.qtdeEstoque)}
                          />
                        </li>
                      </ul>
                      <ul className={styles.ulCompraInfo}>
                        <li>
                          <p
                            type="text"
                            id="qtdeEstoque"
                            className={styles.estoque}
                         
                          >{fisicoEstoque.qtdeEstoque === 0
                              ? "Sem estoque"
                              : "Em estoque"}</p>
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
                              <label className={styles.liInfoTit}>
                                {ebookDetalhe.tipoLivro}
                              </label>
                            </>
                          )}
                        </li>
                      </ul>
                      <ul className={styles.ulCompraInfo}>
                        <li>
                          <label className={styles.liInfoTit}>Preco:</label>
                        </li>
                        <li>
                          <input
                            type="text"
                            id="preco"
                            className={styles.inputAdm}
                            defaultValue={ebookPreco}
                          />
                        </li>
                      </ul>
                      <ul className={styles.ulCompraInfo}>
                        <li>
                          <label className={styles.liInfoTit}>Estoque:</label>
                        </li>
                        <li>
                          <input
                            type="text"
                            id="qtdeEstoque"
                            className={styles.inputAdm}
                            defaultValue={(ebookEstoque.qtdeEstoque)}
                          />
                        </li>
                      </ul>
                      <ul className={styles.ulCompraInfo}>
                        <li>
                          <p
                            type="text"
                            id="qtdeEstoque"
                            className={styles.estoque}
                         
                          >{ebookEstoque.qtdeEstoque === 0
                              ? "Sem estoque"
                              : "Em estoque"}</p>
                        </li>
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.linhaHorizontal} />
          <div className={styles.containerButtonAdm}>
            <Link
              to={{
                pathname: '/adm',
                state: { livro, detalhelivro: [ebookDetalhe, fisicoDetalhe] },
              }}
            >
              <button className={styles.buttonCardAdm}>Cancelar</button>
            </Link>
            <button
              className={styles.buttonCardAdm}
              // onClick={() => {handleDeleteLivro(livro.id);
              //   window.alert("Livro deletado!");
              //   window.location.reload();
              // }}
            >
              Salvar
                      </button>
          </div>
        </div>
      </Container>

      <Footer />
    </>
  );
}

export default InformacaoLivroAdm;
