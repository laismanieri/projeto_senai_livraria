import styles from "../modals/ModalCarrinho.module.css";
import { AiFillDelete, AiOutlineClose, AiFillEdit } from "react-icons/ai";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import PaymentMethodSelect from "../../components/layout/PaymentMethodSelect";

const ModalCarrinho = ({ isOpen, onClose }) => {
  const [quantidade, setQuantidade] = useState(1);
  const [carrinho, setCarrinho] = useState([]);
  const [qtdeTotal, setQtdeTotal] = useState(0);
  const [total, setTotal] = useState(0);

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
          <div className={styles.bodyLista}>
            <br></br>
            <table className={styles.tableSecao}>
              <tr>
                <th className={styles.thSecaoTitN}>1</th>
                <th className={styles.thSecaoTit}>Revisar itens</th>
              </tr>
            </table>
            {carrinho.map((livro, index) => (
              <div className={styles.listaItemCarrinho}>
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

                        <div className={styles.qtde}>
                          <div>
                            {livro.oferta ? (
                              <p className={styles.precoTit}>
                                <span className={styles.precoTit}>Total: </span>
                                <span className={styles.precoRegular}>
                                  {(
                                    livro.preco *
                                    0.8 *
                                    livro.quantidade
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
                                    livro.preco * livro.quantidade
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
                              {livro.quantidade}
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
              </div>
            ))}
          </div>

          <div className={styles.linhaHorizontal} />

          <div className={styles.containerEndereco}>
            <table className={styles.tableSecao}>
              <tr>
                <th className={styles.thSecaoTitN}>2</th>
                <th className={styles.thSecaoTit}>Endereço de entrega</th>
                <th className={styles.thSecaoInf}>
                  <p>Nome do usuario</p>
                  <p>Rua, Numero</p>
                  <p>Complemento</p>
                  <p>Bairro</p>
                  <p>Cidade, UF, CEP</p>
                </th>
                <th className={styles.thSecao}>              <AiFillEdit/></th>
              </tr>
            </table>
          </div>

          <div className={styles.linhaHorizontal} />

          <div className={styles.containerFormaPgto}>
            <table className={styles.tableSecao}>
              <tr>
                <th className={styles.thSecaoTitN}>3</th>
                <th className={styles.thSecaoTit}>Método de pagamento</th>
                <th className={styles.thSecaoInf}>
                  <div>
                    <p>Selecione o Método de Pagamento</p>
                    <PaymentMethodSelect />
                  </div>
                  <div>
                    <p for="cards">Selecione as opções de parcelamento</p>

                    <select name="parcelas" id="parcelas">
                      <option value="1x sem juros">1x sem juros</option>
                      <option value="2x sem juros">2x sem juros</option>
                      <option value="3x sem juros">3x sem juros</option>
                      <option value="4x sem juros">4x sem juros</option>
                      <option value="5x sem juros">5x sem juros</option>
                      <option value="6x sem juros">6x sem juros</option>
                    </select>
                  </div>
                </th>
                <th className={styles.thSecao}><AiFillEdit/></th>
              </tr>
            </table>
          </div>

          <div className={styles.linhaHorizontal} />
          {/* <div className={styles.linhaHorizontal} /> */}
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
              <Link
                to={{
                  pathname: "/pagamento",
                  state: { carrinho: carrinho },
                }}
              >
                <button className={styles.carrinhoButtonComprar}>
                  Finalizar Pedido
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalCarrinho;
