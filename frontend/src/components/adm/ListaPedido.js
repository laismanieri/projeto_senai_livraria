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
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Data do Pedido</th>
                <th>Usuário ID</th>
                <th>Usuário Nome</th>
                <th>CPF</th>
                <th>Itens</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.length > 0 ? (
                pedidos.map((pedido) => (
                  <tr key={pedido.id}>
                    <td>{pedido.id}</td>
                    <td>{pedido.dataPedido}</td>
                    <td>{pedido.usuario.id}
                    </td>
                    <td>{pedido.usuario.nome}
                    </td>
                    <td>{pedido.usuario.cpf}
                    </td>
                    <td>
                      {pedido.itens && pedido.itens.length > 0 ? (
                        <ul>
                          {pedido.itens.map((item) => (
                            <li key={item.id}>
                              <ul>
                              <li>Valor Total: {item.valorTotal}</li>
                              <li>Valor Unitário: {item.valorUnid}</li>
                              <li>Quantidade: {item.qtdeItens}</li>
                                <li>Tipo de Livro: {item.detalheLivro.tipoLivro}</li>
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
