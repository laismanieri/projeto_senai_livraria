import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { BiBook, BiCalendar } from "react-icons/bi";
import styles from "../styles/InformacaoLivro.module.css";

import Footer from "../../components/layout/Footer";
import NavbarAdm from "../../components/adm/NavBarAdm";

function InformacaoLivroAdm() {
  const { id } = useParams();
  const [livro, setLivro] = useState(null);
  const [detalheSelecionado, setDetalheSelecionado] = useState(null);
  const [novoTipoLivro, setNovoTipoLivro] = useState(false);

  useEffect(() => {
    axios
      .get(`http://localhost:8082/livro/${id}?_embed=detalhes`)
      .then((response) => {
        setLivro(response.data);
        // Inicializa o estado detalheSelecionado com o primeiro detalhe do livro
        if (response.data.detalhes.length > 0) {
          setDetalheSelecionado(response.data.detalhes[0].id);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, [id]);

  const handleLivroChange = (field, value) => {
    setLivro((prevLivro) => ({
      ...prevLivro,
      [field]: value,
    }));
  };

  const handleDetalheChange = (detalheId, field, value) => {
    if (field === "tipoLivro" && value === "" && novoTipoLivro) {
      setLivro((prevLivro) => ({
        ...prevLivro,
        detalhes: [
          ...prevLivro.detalhes,
          {
            id: Date.now(), // Gere um ID único para o novo tipoLivro
            tipoLivro: "",
            preco: "",
          },
        ],
      }));
    } else {
      setLivro((prevLivro) => ({
        ...prevLivro,
        detalhes: prevLivro.detalhes.map((detalhe) => {
          if (detalhe.id === detalheId) {
            return {
              ...detalhe,
              [field]: value,
            };
          }
          return detalhe;
        }),
      }));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();

    // Remova os detalhes com campos vazios antes de enviar a requisição PUT
    const detalhesFiltrados = livro.detalhes.filter(
      (detalhe) => detalhe.tipoLivro !== "" && detalhe.preco !== ""
    );

    const livroAtualizado = {
      ...livro,
      detalhes: detalhesFiltrados,
    };

    axios
      .put(`http://localhost:8082/livro/${id}`, livroAtualizado)
      .then((response) => {
        console.log("Livro atualizado:", response.data);
        // Faça algo com a resposta do servidor, se necessário
      })
      .catch((error) => {
        console.error(error);
      });
  };

  if (!livro) {
    return <p>Carregando...</p>;
  }

  const detalheSelecionadoObj = livro.detalhes.find(
    (detalhe) => detalhe.id === detalheSelecionado
  );

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
      <NavbarAdm />
      <div className={styles.container}>
        <Link to={"/adm"}>
          <h1 className={styles.voltarHome}>
            <AiOutlineArrowLeft />
            Voltar
          </h1>
        </Link>

        <div className={styles.linhaHorizontal} />
        <form onSubmit={handleFormSubmit}>
        <div className={styles.gridContainerAdm}>
          <div className={styles.gridItemLongAdm}>
            {livro.id}
            <img
              className={styles.imagemLivro}
              src={livro.imagem}
              alt={livro.titulo}
            />

            <ul className={styles.fichaAdm}>
              <li className={styles.fichaInfo}>
                <label htmlFor="imagem" className={styles.fichaTh}>
                  Link da Imagem:
                </label>
              </li>
              <li>
                <textarea
                  className={styles.inputAdmSinopse}
                  type="text"
                  value={livro.imagem}
                  onChange={(e) => handleLivroChange("imagem", e.target.value)}
                />
              </li>
            </ul>
          </div>

          <div className={styles.gridItemLongAdm}>
            <div className={styles.containerInfoLivroAdm}>
              <h1 className={styles.titulo}>{livro.titulo}</h1>

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
                        className={styles.inputAdm}
                        type="text"
                        value={livro.titulo}
                        onChange={(e) =>
                          handleLivroChange("titulo", e.target.value)
                        }
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
                        className={styles.inputAdm}
                        value={livro.autor}
                        onChange={(e) =>
                          handleLivroChange("autor", e.target.value)
                        }
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
                        className={styles.inputAdm}
                        value={livro.editora}
                        onChange={(e) =>
                          handleLivroChange("editora", e.target.value)
                        }
                      />
                    </li>
                  </ul>
                  <ul className={styles.fichaAdm}>
                    <li className={styles.fichaInfo}>
                      <label htmlFor="genero" className={styles.fichaTh}>
                        Gênero:
                      </label>
                      <select
                        className={styles.inputCadastrar}
                        name="genero"
                        value={livro.genero}
                        onChange={(e) =>
                          handleLivroChange("genero", e.target.value)
                        }
                      >
                        <option value="">Selecione um gênero</option>
                        <option value="Ação">Ação</option>
                        <option value="Aventura">Aventura</option>
                        <option value="Romance">Romance</option>
                        <option value="Ficção Científica">
                          Ficção Científica
                        </option>
                        <option value="Fantasia">Fantasia</option>
                        <option value="Suspense">Suspense</option>
                        <option value="Mistério">Mistério</option>
                        <option value="Horror">Horror</option>
                        <option value="Drama">Drama</option>
                        <option value="Comédia">Comédia</option>
                        <option value="Biografia">Biografia</option>
                        <option value="Autobiografia">Autobiografia</option>
                        <option value="História">História</option>
                        <option value="Autoajuda">Autoajuda</option>
                        <option value="Negócios">Negócios</option>
                        <option value="Autoconhecimento">
                          Autoconhecimento
                        </option>
                        <option value="Autores Nacionais">
                          Autores Nacionais
                        </option>
                        <option value="Poesia">Poesia</option>
                        <option value="Poesia">Outros</option>
                      </select>
                    </li>
                  </ul>

                  <ul className={styles.fichaBolean}>
                    <li className={styles.fichaInfo}>
                      <label htmlFor="anoPublicacao" className={styles.fichaTh}>
                        Ano Publicação:
                      </label>
                      <input
                        type="text"
                        className={styles.inputAdm}
                        value={livro.anoPublicacao}
                        onChange={(e) =>
                          handleLivroChange("anoPublicacao", e.target.value)
                        }
                      />
                    </li>
                    <li className={styles.fichaInfo}>
                      <label htmlFor="qtdePagina" className={styles.fichaTh}>
                        Páginas:
                      </label>
                      <input
                        type="text"
                        className={styles.inputAdm}
                        value={livro.qtdePagina}
                        onChange={(e) =>
                          handleLivroChange("qtdePagina", e.target.value)
                        }
                      />
                    </li>
                    <li className={styles.fichaInfo}>
                      <label htmlFor="oferta" className={styles.fichaTh}>
                        Oferta:
                      </label>
                      <input
                        type="checkbox"
                        className={styles.inputAdm}
                        value={livro.oferta}
                        onChange={(e) =>
                          handleLivroChange("oferta", e.target.value)
                        }
                      />
                    </li>
                    <li className={styles.fichaInfo}>
                      <label htmlFor="destaque" className={styles.fichaTh}>
                        Destaque:
                      </label>
                      <input
                        type="checkbox"
                        className={styles.inputAdm}
                        value={livro.destaque}
                        onChange={(e) =>
                          handleLivroChange("destaque", e.target.value)
                        }
                      />
                    </li>
                  </ul>
                  <ul className={styles.fichaBolean}></ul>
                  <ul className={styles.fichaAdm}>
                    <li className={styles.fichaInfo}>
                      <label htmlFor="sinopse" className={styles.fichaTh}>
                        Sinopse:
                      </label>
                    </li>
                    <li>
                      <textarea
                        type="textarea"
                        className={styles.inputAdmSinopse}
                        value={livro.sinopse}
                        onChange={(e) =>
                          handleLivroChange("sinopse", e.target.value)
                        }
                      />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className={styles.gridItemLong}>
            <div className={styles.containerInfoLivro}>
              <div className={styles.tipoLivroDetalhe}>
                {novoTipoLivro && (
                  <input
                    type="text"
                    value=""
                    onChange={(e) =>
                      handleDetalheChange(null, "tipoLivro", e.target.value)
                    }
                  />
                )}
                {!novoTipoLivro && <p>{detalhes.tipoLivro}</p>}

                <p>{detalhes.preco}</p>
              </div>
              {/* Restante do código... */}
            </div>
          </div>

          <div className={styles.comprarLivros}>
            {livro.detalhes.map((detalhe) => (
              <div className={styles.divComprarLivros} key={detalhe.id}>
                <li>
                  <input
                    type="text"
                    className={styles.inputAdm}
                    value={detalhe.tipoLivro}
                    onChange={(e) =>
                      handleLivroChange("tipoLivro", e.target.value)
                    }
                  />
                </li>

                <li className={styles.fichaInfo}>
                  <label htmlFor="detalhe" className={styles.fichaTh}>
                    Preco:
                  </label>
                </li>
                <li>
                  <input
                    type="text"
                    className={styles.inputAdm}
                    value={detalhe.preco}
                    onChange={(e) => handleLivroChange("preco", e.target.value)}
                  />
                </li>
                <li className={styles.fichaInfo}>
                  <label htmlFor="detalhe" className={styles.fichaTh}>
                    Preco:
                  </label>
                </li>
                <li>
                  <input
                    type="text"
                    className={styles.inputAdm}
                    value={detalhe.preco}
                    onChange={(e) => handleLivroChange("preco", e.target.value)}
                  />
                </li>
              </div>
            ))}
          </div>

          <div className={styles.linhaHorizontal} />

          <div>
            
              <div className={styles.gridFichaTecnica}>
                <div className={styles.gridItemFichaTecnica}>
                  <p className={styles.tituloFichaTecnica}>Livro</p>
                  <BiBook className={styles.iconFichaTecnica} />
                  <input
                    type="text"
                    value={livro.titulo}
                    onChange={(e) =>
                      handleLivroChange("titulo", e.target.value)
                    }
                  />
                </div>
                <div className={styles.gridItemFichaTecnica}>
                  <p className={styles.tituloFichaTecnica}>Ano de publicação</p>
                  <BiCalendar className={styles.iconFichaTecnica} />
                  <input
                    type="text"
                    value={livro.anoPublicacao}
                    onChange={(e) =>
                      handleLivroChange("anoPublicacao", e.target.value)
                    }
                  />
                </div>
                {/* Restante do código... */}
              </div>

              {/* Restante do código... */}

              <button type="submit">Salvar</button>
            
          </div>
        </div>
        </form>
      </div>
    </>
  );
}

export default InformacaoLivroAdm;
