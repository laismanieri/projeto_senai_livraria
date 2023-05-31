import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import styles from "../adm/ListaPedido.module.css";

function ListaPedido() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [pedidos, setPedidos] = useState([]);

  const [usuario, setUsuario] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8082/pedido/dto")
      .then((response) => response.json())
      .then((data) => setPedidos(data))
      .catch((error) => console.log(error));
  }, []);

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  useEffect(() => {
    fetch("http://localhost:8082/pedido")
      .then((response) => response.json())
      .then((data) => setUsuario(data))
      .catch((error) => console.log(error));
  }, []);

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
          <table className={styles.tableListarPedido}>
            <thead className={styles.theadListarPedido}>
              <tr className={styles.trListarPedido}>
                <th className={styles.thListarPedido}>ID do Pedido</th>
                <th className={styles.thListarPedido}>Data do Pedido</th>
                <th className={styles.thListarPedido}>Usuário ID</th>
                <th className={styles.thListarPedido}>Valor Total</th>
                <th className={styles.thListarPedido}>Valor Unitário</th>
                <th className={styles.thListarPedido}>Quantidade</th>
                <th className={styles.thListarPedido}>
                  ID do Detalhe do Livro
                </th>
                <th className={styles.thListarPedido}>Tipo de Livro</th>
                <th className={styles.thListarPedido}>ID do Livro</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.length > 0 ? (
                pedidos.map((pedido) => (
                  <tr key={pedido.id} className={styles.trListarPedido}>
                    <td className={styles.tdListarPedido}>{pedido.id}</td>
                    <td className={styles.tdListarPedido}>
                      {pedido.dataPedido}
                    </td>
                    <td className={styles.tdListarPedido}>
                      {pedido.usuario_id}
                    </td>
                    {pedido.itensDTO && pedido.itensDTO.length > 0 ? (
                      pedido.itensDTO.map((item) => (
                        <React.Fragment key={item.id}>
                          <td className={styles.tdListarPedido}>
                            {item.valorTotal}
                          </td>
                          <td className={styles.tdListarPedido}>
                            {item.valorUnid}
                          </td>
                          <td className={styles.tdListarPedido}>
                            {item.qtdeItens}
                          </td>
                          <td className={styles.tdListarPedido}>
                            {item.detalheLivroDTO.id}
                          </td>
                          <td className={styles.tdListarPedido}>
                            {item.detalheLivroDTO.tipoLivro}
                          </td>
                          <td className={styles.tdListarPedido}>
                            {item.detalheLivroDTO.livroId}
                          </td>
                        </React.Fragment>
                      ))
                    ) : (
                      <React.Fragment>
                        <td className={styles.tdListarPedido} colSpan={4}>
                          Nenhum item disponível.
                        </td>
                      </React.Fragment>
                    )}
                  </tr>
                ))
              ) : (
                <tr>
                  <td className={styles.tdListarPedido} colSpan={7}>
                    Nenhum pedido encontrado.
                  </td>
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
