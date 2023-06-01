import styles from "../modals/ModalCarrinho.module.css";
import { AiFillDelete, AiOutlineClose, AiFillEdit, AiFillHeart } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

const ModalFavoritos = ({ isOpen, onClose }) => {
  const [quantidade, setQuantidade] = useState(1);
  const [favorito, setFavorito] = useState([]);
  const [qtdeTotal, setQtdeTotal] = useState(0);
  const [total, setTotal] = useState(0);

  const [modalIsOpenLivroAdd, setModalIsOpenLivroAdd] = useState(false);

  useEffect(() => {
    let qtde = 0;
    let valor = 0;
    favorito.forEach((item) => {
      qtde += item.quantidade;
      valor += item.livro.oferta
        ? item.detalhe.preco * 0.8 * item.quantidade
        : item.detalhe.preco * item.quantidade;
    });
    setQtdeTotal(qtde);
    setTotal(valor);
  }, [favorito]);

  useEffect(() => {
    const favoritoSalvo = localStorage.getItem("carrinho");
    if (favoritoSalvo) {
      setFavorito(JSON.parse(favoritoSalvo));
    }
    console.log(favoritoSalvo);
  }, []);

  const handleRemoveItem = (indexToRemove) => {
    const novoFavorito = [...favorito];
    novoFavorito.splice(indexToRemove, 1);
    setFavorito(novoFavorito);
    localStorage.setItem("carrinho", JSON.stringify(novoFavorito));
    window.location.reload();
  };

  if (!isOpen) {
    return null;
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
      <div className={styles.modalCarrinhoContainer}>
        <div className={styles.modalBackground} />
        <div className={styles.modalCarrinho}>
          <div className={styles.navBarCarrinho}>
            <ul className={styles.navBarCarrinhoUl}>
              <li>
                <AiFillHeart alt="coração" className={styles.navbarCesta} />
              </li>
              <li className={styles.navBarCarrinhoLi}>
                <h1 className={styles.sacolaH1}>Meus livros favoritos</h1>
              </li>
            </ul>
            <div>
              <button className={styles.navBarCarrinhoButton} onClick={onClose}>
                <AiOutlineClose className={styles.imgFechar} />
              </button>
            </div>
          </div>
          <div className={styles.bodyLista}>
            <br></br>
            <table className={styles.tableSecao}>
              <tr>
                <th className={styles.thSecaoTitN}>1</th>
                <th className={styles.thSecaoTit}>Revisar meus favoritos</th>
              </tr>
            </table>

            {favorito.map((item, index) => (
              <div className={styles.listaItemCarrinho}>
                <div key={item.livro.id}></div>
                <div className={styles.containerLista}>
                  <div className={styles.gridListaImg}>
                    <div className={styles.divImg}>
                      <img
                        className={styles.imagemGrid}
                        src={item.livro.imagem}
                        alt={item.livro.titulo}
                      />
                    </div>
                  </div>
                  <div className={styles.containerListaInfo}>
                    <div className={styles.gridListaInfo}>
                      <div className={styles.divComprarLivros}>
                        <div className={styles.divTituloExcluir}>
                          <p className={styles.tituloItem}>
                            {item.livro.titulo}
                            <button
                              className={styles.imgExcluirItemCarrinho}
                              onClick={() => handleRemoveItem(index)}
                            >
                              <AiFillDelete />
                            </button>
                          </p>
                        </div>

                       </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className={styles.linhaHorizontal} />

       </div>
      </div>
    </>
  );
};

export default ModalFavoritos;
