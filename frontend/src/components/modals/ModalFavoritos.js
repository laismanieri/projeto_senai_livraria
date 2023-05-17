import styles from "./ModalFavoritos.module.css";
import { AiFillDelete, AiFillHeart, AiOutlineClose } from "react-icons/ai";
import { useEffect, useState } from "react";

const ModalFavoritos = ({ isOpen, onClose }) => {

  const [favorito, setFavorito] = useState([]);

  useEffect(() => {
    const favoritoSalvo = localStorage.getItem("favorito");
    if (favoritoSalvo) {
      setFavorito(JSON.parse(favoritoSalvo));
    }
  }, []);

  const handleRemoveItem = (indexToRemove) => {
    const novoFavorito = [...favorito];
    novoFavorito.splice(indexToRemove, 1);
    setFavorito(novoFavorito);
    localStorage.setItem("favorito", JSON.stringify(novoFavorito));
  };

  if (!isOpen) {
    return null;
  }
  return (
    <>
      <div className={styles.modalFavoritoContainer}>
        <div className={styles.modalBackground} />
        <div className={styles.modalFavorito}>
          <div className={styles.navBarfavorito}>
            <ul className={styles.navBarFavoritoUl}>
              <li>
                <p className={styles.iconFavoritos}>
                  <AiFillHeart />
                </p>
              </li>
              <li className={styles.navBarFavoritoButton}>
                <h1 className={styles.sacolaH1}>Meus Favoritos</h1>
              </li>
            </ul>
            <div>
              <button className={styles.navBarfavoritoButton} onClick={onClose}>
                <AiOutlineClose className={styles.imgFechar} />
              </button>
            </div>
          </div>
          <div className={styles.bodyLista}>
            {favorito.map((livro, index) => (
              <div className={styles.listaItemFavorito}>
                <div key={livro.id}></div>
                <div className={styles.containerLista}>
                  <div className={styles.gridListaImg}>
                    <div className={styles.divImg}>
                      <img
                        className={styles.imagemGrid}
                        src={livro.imagem}
                        alt={livro.titulo}
                      />
                    </div>
                  </div>
                  <div className={styles.containerListaInfo}>
                    <div className={styles.gridListaInfo}>
                      <div className={styles.divComprarLivros}>
                        <div className={styles.divTituloExcluir}>
                          <p className={styles.tituloTipoLivro}>
                            {livro.tipoLivro}
                          </p>
                          <p className={styles.tituloItem}>
                            {livro.titulo}
                            <button
                              className={styles.listaItemFavorito}
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
                                  {livro.preco.toLocaleString("pt-BR", {
                                    style: "currency",
                                    currency: "BRL",
                                  })}
                                </span>
                              </p>

                              <p className={styles.precoTit}>
                                <span className={styles.precoTit}>
                                  Preço em Oferta:{" "}
                                </span>
                                <span className={styles.precoOferta}>
                                  {(livro.preco * 0.8).toLocaleString("pt-BR", {
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
                                {livro.preco.toLocaleString("pt-BR", {
                                  style: "currency",
                                  currency: "BRL",
                                })}
                              </span>
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
          {/* <div className={styles.linhaHorizontal} /> */}
        </div>
      </div>
    </>
  );
};

export default ModalFavoritos;
