import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import styles from "../adm/ListaPedido.module.css";

function ListaPedido() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8082/pedido')
      .then((response) => response.json())
      .then((data) => setPedidos(data))
      .catch((error) => console.log(error));
  }, []);

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div className={styles.containerCadastroLivro}>
        <h2 className={styles.tituloListarPedido}>Listar Pedidos</h2>
        <div className="linhaHorizontal" />
        <Button
          className={styles.buttonExpandir}
          variant="secondary"
          onClick={handleToggleExpand}
        >
          {isExpanded ? "Recolher" : "Expandir"} Lista
        </Button>
        <br />
        <br />
        {isExpanded && (
          <table  className={styles.tableListarPedido}> 
            <thead  className={styles.theadListarPedido}>
              <tr className={styles.trListarPedido}>
                <th className={styles.thListarPedido}>ID</th>
                <th className={styles.thListarPedido}>Data do Pedido</th>
                <th className={styles.thListarPedido}>Usuário ID</th>
                <th className={styles.thListarPedido}>Usuário Nome</th>
                <th className={styles.thListarPedido}>CPF</th>
                <th className={styles.thListarPedido}>Itens</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.length > 0 ? (
                pedidos.map((pedido) => (
                  <tr key={pedido.id} className={styles.trListarPedido}>
                    <td className={styles.tdListarPedido}>{pedido.id}</td>
                    <td className={styles.tdListarPedido}>{pedido.dataPedido}</td>
                    <td className={styles.tdListarPedido}>{pedido.usuario.id}
                    </td>
                    <td className={styles.tdListarPedido}>{pedido.usuario.nome}
                    </td>
                    <td className={styles.tdListarPedido}>{pedido.usuario.cpf}
                    </td>
                    <td className={styles.tdListarPedido}>
                      {pedido.itens && pedido.itens.length > 0 ? (
                        <ul>
                          {pedido.itens.map((item) => (
                            <li key={item.id} className={styles.liListarPedido}>
                              <ul className={styles.ulListarPedido}>
                              <li className={styles.liListarPedido}>Valor Total: {item.valorTotal}</li>
                              <li className={styles.liListarPedido}>Valor Unitário: {item.valorUnid}</li>
                              <li className={styles.liListarPedido}>Quantidade: {item.qtdeItens}</li>
                                <li className={styles.liListarPedido}>Tipo de Livro: {item.detalheLivro.tipoLivro}</li>
                              </ul>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p>Nenhum item disponível.</p>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4}>Nenhum pedido encontrado.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
      <div className="linhaHorizontal" />
    </>
  );
}

export default ListaPedido;
