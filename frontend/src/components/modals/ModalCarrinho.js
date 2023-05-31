import styles from "../modals/ModalCarrinho.module.css";
import { AiFillDelete, AiOutlineClose, AiFillEdit } from "react-icons/ai";
import { FaShoppingCart } from "react-icons/fa";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "react-modal";

import PaymentMethodSelect from "../../components/layout/PaymentMethodSelect";
import { toast } from "react-toastify";

const ModalCarrinho = ({ isOpen, onClose}) => {
  const [quantidade, setQuantidade] = useState(1);
  const [carrinho, setCarrinho] = useState([]);
  const [qtdeTotal, setQtdeTotal] = useState(0);
  const [total, setTotal] = useState(0);

  const [modalIsOpenLivroAdd, setModalIsOpenLivroAdd] = useState(false);

  useEffect(() => {
    let qtde = 0;
    let valor = 0;
    carrinho.forEach((item) => {
      qtde += item.quantidade;
      valor += item.livro.oferta
        ? item.detalhe.preco * 0.8 * item.quantidade
        : item.detalhe.preco * item.quantidade;
    });
    setQtdeTotal(qtde);
    setTotal(valor);
  }, [carrinho]);

  useEffect(() => {
    const carrinhoSalvo = localStorage.getItem("carrinho");
    if (carrinhoSalvo) {
      setCarrinho(JSON.parse(carrinhoSalvo));
    }
    console.log(carrinhoSalvo);
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
    window.location.reload();
  };
  

  if (!isOpen) {
    return null;
  }

  const onFinalizarPedido = () => {
    // Criar objeto com os dados do pedido
    const pedido = {
      id: -1,
      dataPedido: new Date().toISOString().slice(0, 10),
      usuario_id: 1,
      itensDTO: carrinho.map((item) => ({
        id: -1,
        valorUnid: item.livro.oferta ? item.detalhe.preco * 0.8 : item.detalhe.preco,
        valorTotal: item.livro.oferta
          ? item.detalhe.preco * 0.8 * item.quantidade
          : item.detalhe.preco * item.quantidade,
        qtdeItens: item.quantidade,
        detalhe_id: item.detalhe.id, // Usar o ID do detalhe do livro aqui
        detalhe_livro_id: item.detalhe.id, // Usar o ID do detalhe do livro aqui
      })),
    };

    console.log(pedido);
    // Transformar objeto em JSON
    const pedidoJSON = JSON.stringify(pedido);

    // Enviar pedidoJSON para a API gravar no banco
    // Exemplo de envio de dados para uma API usando o método POST
    fetch("http://localhost:8082/pedido", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: pedidoJSON,
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("Pedido gravado no banco:", data);
        // Limpar carrinho após finalizar o pedido
        setCarrinho([]);
        localStorage.removeItem("carrinho");
        // toast.success("Recebemos seu pedido!");
        // setTimeout(() => {
        //   window.location.reload();
        // },3000);
      })
      .catch((error) => {
        console.error("Erro ao gravar pedido no banco:", error);
      });
  };

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
                <FaShoppingCart alt="cesta" className={styles.navbarCesta} />
              </li>
              <li className={styles.navBarCarrinhoLi}>
                <h1 className={styles.sacolaH1}>Meu Carrinho</h1>
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
          
            {carrinho.map((item, index) => (
              <div className={styles.listaItemCarrinho}>
                <div key={item.livro.id}></div>
                <div className={styles.containerLista}>
                  <div className={styles.gridListaImg}>
                    <div className={styles.divImg}>
                    {item.livro.id}
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
                          <p className={styles.tituloTipoLivro}>
                            
                            {item.detalhe.tipoLivro} ID detalhe:{item.detalhe.id}
                                                        
                          </p>
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

                        <div className={styles.divPreco}>
                          {item.livro.oferta ? (
                            <div className={styles.divPrecoOferta}>
                              <p className={styles.precoTit}>
                                <span className={styles.precoTit}>Preço: </span>
                                <span className={styles.precoAntigo}>
                                  {item.detalhe.preco}
                                </span>
                              </p>

                              <p className={styles.precoTit}>
                                <span className={styles.precoTit}>
                                  Preço em Oferta:{" "}
                                </span>
                                <span className={styles.precoOferta}>
                                  {item.detalhe.preco * 0.8}
                                </span>
                              </p>
                            </div>
                          ) : (
                            <p className={styles.precoTit}>
                              <span className={styles.precoTit}>Preço: </span>
                              <span className={styles.precoRegular}>
                                {item.detalhe.preco}
                              </span>
                            </p>
                          )}
                        </div>

                        <div className={styles.qtde}>
                          <div>
                            {item.livro.oferta ? (
                              <p className={styles.precoTit}>
                                <span className={styles.precoTit}>Total: </span>
                                <span className={styles.precoRegular}>
                                  {item.detalhe.preco * 0.8 * item.quantidade}
                                </span>
                              </p>
                            ) : (
                              <p className={styles.precoTit}>
                                <span className={styles.precoTit}>Total: </span>

                                <span className={styles.precoRegular}>
                                  {item.detalhe.preco * item.quantidade}
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
                              {item.quantidade}
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
                <th className={styles.thSecao}>
                  {" "}
                  <AiFillEdit />
                </th>
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
                <th className={styles.thSecao}>
                  <AiFillEdit />
                </th>
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
              <div>
                <button
                  className={styles.carrinhoButtonComprar}
                  onClick={() => {
                    setModalIsOpenLivroAdd(true); // Abre o modal
                    onFinalizarPedido(); // Realiza a ação de finalizar o pedido
                  }}
                >
                  Finalizar Pedido
                </button>

                <Modal
                  className={styles.modalCompra}
                  isOpen={modalIsOpenLivroAdd}
                  onRequestClose={closeModal}
                  contentLabel="Pedido realizado com sucesso!"
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
                    <AiOutlineClose className={styles.imgFechar} />
                  </button>
                  <h2 className={styles.h2AdicionarSacola}>
                    Pedido realizado com sucesso!
                  </h2>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ModalCarrinho;
