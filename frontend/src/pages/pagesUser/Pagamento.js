import { Link } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import Footer from "../../components/layout/Footer";
import Navbar from "../../components/layout/NavBar";
import PaymentMethodSelect from "../../components/layout/PaymentMethodSelect";
import styles from "../styles/Pagamento.module.css";


function Pagamento() {
    
  return (
    <>
      <Navbar />

      <div className={styles.container}>
        <div>
          <div className={styles.containerVoltar}>
            <Link to={"/"}>
              <p className={styles.voltarHome}>
                <AiOutlineArrowLeft />
                Voltar
              </p>
            </Link>
            <div className={styles.linhaHorizontal} />
          </div>
          <div>
            <div className={styles.containerPagto}>
              <div>
                <div>
                  <div className={styles.containerEndereco}>
                    <table className={styles.tableSecao}>
                      <tr>
                        <th className={styles.thSecaoTitN}>1</th>
                        <th className={styles.thSecaoTit}>
                          Endereço de entrega
                        </th>
                        <th className={styles.thSecaoInf}>
                          <p>Nome do usuario</p>
                          <p>Rua, Numero</p>
                          <p>Complemento</p>
                          <p>Bairro</p>
                          <p>Cidade, UF, CEP</p>
                        </th>
                        <th className={styles.thSecao}>Alterar</th>
                      </tr>
                    </table>
                  </div>
                  <div className={styles.linhaHorizontal} />
                  <div className={styles.containerFormaPgto}>
                    <table className={styles.tableSecao}>
                      <tr>
                        <th className={styles.thSecaoTitN}>2</th>
                        <th className={styles.thSecaoTit}>
                          Método de pagamento
                        </th>
                        <th className={styles.thSecaoInf}>
                          <div>
                            <p>Selecione o Método de Pagamento</p>
                            <PaymentMethodSelect />
                          </div>
                          <div>
                            <p for="cards">
                              Selecione as opções de parcelamento
                            </p>

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
                        <th className={styles.thSecao}>Alterar</th>
                      </tr>
                    </table>
                  </div>
                  <div className={styles.linhaHorizontal} />
                  <div className={styles.containerTable}>
                    <table className={styles.tableSecao}>
                      <tr>
                        <th className={styles.thSecaoTitN}>3</th>
                        <th className={styles.thSecaoTit}>
                          Revisar itens e envio
                        </th>
                      </tr>
                    </table>

                    <table className={styles.tablePagamento}>
                      <thead className={styles.theadPagamento}>
                        <tr className={styles.thPagamento}>
                          <th className={styles.thPagamento}>Livro</th>
                          <th className={styles.thPagamento}>Titulo</th>
                          <th className={styles.thPagamento}>Entrega</th>
                          <th className={styles.thPagamento}>Preco</th>
                          <th className={styles.thPagamento}>Quantidade</th>
                          <th className={styles.thPagamento}>Total</th>
                          <th className={styles.thPagamento}>Excluir</th>
                        </tr>
                      </thead>
                      <tbody className={styles.tbodyPagamento}>
                        <tr className={styles.trPagamento}>
                          <td className={styles.tdPagamento}>
                            <img
                              className={styles.imgLivroPagamento}
                              src="https://m.media-amazon.com/images/I/51lnvNcEFbL._SY344_BO1,204,203,200_QL70_ML2_.jpg"
                              alt=""
                            />
                          </td>
                          <td className={styles.tdPagamento}>A Escolha</td>
                          <td className={styles.tdPagamento}>2 dias uteis</td>
                          <td className={styles.tdPagamento}>R$ 22,90</td>
                          <td className={styles.tdPagamento}>1</td>
                          <td className={styles.tdPagamento}>R$ 22,90</td>
                          <td className={styles.tdPagamento}>
                            <button className={styles.buttonPgtoDelete}>
                              <AiFillDelete />
                            </button>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>

              <div className={styles.containerResumo}>
                <div className={styles.ficha}>
                  <ul className={styles.ficha1}>
                    <li className={styles.fichaInfo}>
                      <span className={styles.fichaTh}>Resumo do Pedido</span>
                    </li>
                  </ul>
                  <ul className={styles.ficha2}>
                    <li className={styles.fichaInfo}>
                      <span className={styles.fichaTh}>Total Livros</span>
                    </li>
                    <li>
                      <span className={styles.fichaTr}>1</span>
                    </li>
                  </ul>
                  <ul className={styles.ficha1}>
                    <li className={styles.fichaInfo}>
                      <span className={styles.fichaThTit}>Entrega GRÁTIS:</span>
                    </li>
                    <li>
                      <span className={styles.fichaTr}>2 dias utéis</span>
                    </li>
                  </ul>
                  <ul className={styles.ficha2}>
                    <li className={styles.fichaInfo}>
                      <span className={styles.fichaTh}>Valor Total</span>
                    </li>
                    <li>
                      <span className={styles.fichaTr}>R$ 25,00</span>
                    </li>
                  </ul>
                  <div>
                    <button className={styles.buttonPagamento}>
                      Finalizar Pedido
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Pagamento;
