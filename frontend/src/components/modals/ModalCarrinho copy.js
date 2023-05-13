import styles from "../modals/ModalCarrinho.module.css";
import { AiFillDelete, AiOutlineClose } from "react-icons/ai";
import { useEffect, useState } from "react";

function ModalCarrinho({ isOpen,
  onClose,
  imagem,
  titulo,
  preco,
  precoOferta,
  quantidade
}) {
  const [quantidadeCarrinho, setQuantidadeCarrinho] = useState(quantidade);
  const [subtotal, setSubtotal] = useState(preco);
  const [total, setTotal] = useState(precoOferta);
  const isPrecoRegular = preco !== precoOferta;

  const handleIncrementQuantidadeCarrinho = () => {
    setQuantidadeCarrinho(quantidadeCarrinho + 1);
    setSubtotal((quantidadeCarrinho + 1) * preco);
    if (precoOferta) {
      setTotal((quantidadeCarrinho + 1) * precoOferta);
    } else {
      setTotal((quantidadeCarrinho + 1) * preco);
    }
  };

  const handleDecrementQuantidadeCarrinho = () => {
    if (quantidadeCarrinho > 1) {
      setQuantidadeCarrinho(quantidadeCarrinho - 1);
      setSubtotal((quantidadeCarrinho - 1) * preco);
      if (precoOferta) {
        setTotal((quantidadeCarrinho - 1) * precoOferta);
      } else {
        setTotal((quantidadeCarrinho - 1) * preco);
      }
    }
  };

  return (
    <>
      {isOpen && (
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
                <button
                  className={styles.navBarCarrinhoButton}
                  onClick={onClose}
                >
                  <AiOutlineClose className={styles.imgFechar} />
                </button>
              </div>
            </div>
            <div className={styles.listaItemCarrinho}>
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
                      <div className={styles.divtituloExcluir}>
                        <h1 className={styles.tituloItem}>{titulo}</h1>
                        <button className={styles.imgExcluirItemCarrinho}>
                          <AiFillDelete />
                        </button>
                      </div>
                      <div className={styles.divPreco}>
                        {isPrecoRegular ? (
                          <div className={styles.cardOferta}>
                            <h1 className={styles.precoAntigo}>
                              {preco.toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              })}
                            </h1>
                            <h2 className={styles.precoOferta}>
                              {precoOferta.toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              })}
                            </h2>
                          </div>
                        ) : (
                          <div className={styles.cardRegular}>
                            <h2 className={styles.precoRegular}>
                              {preco.toLocaleString("pt-BR", {
                                style: "currency",
                                currency: "BRL",
                              })}
                            </h2>
                          </div>
                        )}
                      </div>

                      <div className={styles.qtde}>
                        <button
                          onClick={() => handleDecrementQuantidadeCarrinho(quantidade - 1)}
                          className={styles.buttonQtde}
                        >
                          -
                        </button>
                        <span className={styles.spanQtde}>
                          {quantidadeCarrinho + (quantidade - 1)}
                        </span>
                        <button
                          onClick={() => handleIncrementQuantidadeCarrinho(quantidade + 1)}
                          className={styles.buttonQtde}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* <div className={styles.linhaHorizontal} /> */}

            <div className={styles.totalCarrinho}>
              <div className={styles.valorCarrinho}>
                <ul className={styles.valorSubtotal}>
                  <li>
                    <span>Subtotal:</span>
                  </li>
                  <li>
                    <span>
                      {subtotal.toLocaleString("pt-BR", {
                        style: "currency",
                        currency: "BRL",
                      })}
                    </span>
                  </li>
                </ul>
                <ul className={styles.valorTotal}>
                  <li>
                    <span>Total:</span>
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
                <button className={styles.carrinhoButtonComprar}>
                  Comprar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ModalCarrinho;
