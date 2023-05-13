import styles from "../modals/ModalCarrinho.module.css";
import { AiFillDelete, AiOutlineClose } from "react-icons/ai";
import { useEffect, useState } from "react";

const ModalCarrinho = ({ isOpen, onClose }) => {
  const [quantidade, setQuantidade] = useState(1);
  const [carrinho, setCarrinho] = useState([]);

  useEffect(() => {
    const carrinhoSalvo = localStorage.getItem('carrinho');
    if (carrinhoSalvo) {
      setCarrinho(JSON.parse(carrinhoSalvo));
    }
  }, []);
  

  const handleIncrementQuantidade = (id) => {
    const item = carrinho[id];
    item.quantidade += 1;
    setCarrinho({ ...carrinho, [id]: item });
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
  };

  const handleDecrementQuantidade = (id) => {
    const item = carrinho[id];
    if (item.quantidade > 1) {
      setQuantidade(item.quantidade - 1);
    }
    setCarrinho({ ...carrinho, [id]: item });
    localStorage.setItem('carrinho', JSON.stringify(carrinho));
  };

  if (!isOpen) {
    return null;
  }

  return (
    <>
      <div className={styles.modalCarrinhoContainer}>
        <div className={styles.modalBackground} />
        <div className={styles.modalCarrinho}>
          <div className={styles.navBarCarrinho}>
            <ul className={styles.navBarCarrinhoUl}>
              <li>
                <img
                  src="/img/cesta-compras.png"
                  alt="cesta"
                  className={styles.navbarCesta}
                />
              </li>
              <li className={styles.navBarCarrinhoLi}>
                <h1 className={styles.sacolaH1}>Minha Sacola</h1>
              </li>
            </ul>
            <div>
              <button className={styles.navBarCarrinhoButton} onClick={onClose}>
                <AiOutlineClose className={styles.imgFechar} />
              </button>
            </div>
          </div> 
          {carrinho.map((livro) => (
          <div className={styles.listaItemCarrinho}>     

            <div key={livro.id}>

            </div>
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
                    <div className={styles.divtituloExcluir}>
                    <p>{livro.tipoLivro}</p>
                      <h1 className={styles.tituloItem}>
                      {livro.titulo}
                      </h1>
                      <button className={styles.imgExcluirItemCarrinho}>
                        <AiFillDelete />
                      </button>
                    </div>
                    <div className={styles.divPreco}></div>

                    <div className={styles.qtde}>
                      <button
                        className={styles.buttonQtde}
                        onClick={handleDecrementQuantidade}
                      >
                        -
                      </button>
                      <span className={styles.spanQtde}>{quantidade}</span>
                      <button
                        className={styles.buttonQtde}
                        onClick={handleIncrementQuantidade}
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          ))}
          {/* <div className={styles.linhaHorizontal} /> */}
          <div className={styles.totalCarrinho}>
            <div className={styles.valorCarrinho}>
              <ul className={styles.valorSubtotal}>
                <li>
                  <span>Subtotal:</span>
                </li>
                <li>
                  <span>
                    {/* {subtotal.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })} */}
                  </span>
                </li>
              </ul>
              <ul className={styles.valorTotal}>
                <li>
                  <span>Total:</span>
                </li>
                <li>
                  <span>
                    {/* {total.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })} */}
                  </span>
                </li>
              </ul>
              <button className={styles.carrinhoButtonComprar}>Comprar</button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalCarrinho;
