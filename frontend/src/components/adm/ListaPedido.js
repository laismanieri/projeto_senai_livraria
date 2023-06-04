import React, { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import styles from "../adm/ListaPedido.module.css";

function ListaPedido() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [pedidos, setPedidos] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8082/pedido/dto')
      .then((response) => response.json())
      .then((data) => setPedidos(data))
      .catch((error) => console.log(error));
  }, []);

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div className={`${styles.containerCadastroLivro} ${styles.customClass}`}>
        <h2 className={`${styles.tituloListarPedido} ${styles.customClass}`}>Listar Pedidos</h2>
        <div className={`${styles.linhaHorizontal} ${styles.customClass}`} />
        <Button
          className={`${styles.buttonExpandir} ${styles.customClass}`}
          variant="secondary"
          onClick={handleToggleExpand}
        >
          {isExpanded ? "Recolher" : "Expandir"} Lista
        </Button>
        <br />
        <br />
        {isExpanded && (
          <table className={`${styles.customClass}`}>
            <thead>
              <tr className={`${styles.customClass}`}>
                <th className={`${styles.customClass}`}>ID</th>
                <th className={`${styles.customClass}`}>Data do Pedido</th>
                <th className={`${styles.customClass}`}>Valor Total do Pedido</th>
                <th className={`${styles.customClass}`}>Itens</th>
              </tr>
            </thead>
            <tbody>
              {pedidos.length > 0 ? (
                pedidos.map((pedido) => (
                  <tr key={pedido.id} className={`${styles.customClass}`}>
                    <td className={`${styles.customClass}`}>{pedido.id}</td>
                    <td className={`${styles.customClass}`}>{pedido.dataPedido}</td>
                    <td className={`${styles.customClass}`}>{pedido.valorTotal}</td>
                    <td className={`${styles.customClass}`}>
                      {pedido.itensDTO && pedido.itensDTO.length > 0 ? (
                        <ul className={`${styles.customClass}`}>
                          {pedido.itensDTO.map((item) => (
                            <li key={item.id} className={`${styles.customClass}`}>
                              <span>Detalhe Livro ID: {item.detalheLivroDTO.id}</span>
                              <span>Quantidade: {item.qtdeItens}</span>
                              <span>Valor Unitário: {item.valorUnid}</span>
                              <span>Valor Total: {item.valorTotal}</span>
                                <span>Tipo de Livro: {item.detalheLivroDTO.tipoLivro}</span>
                                <span>Id do Livro: {item.detalheLivroDTO.livroId}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className={`${styles.customClass}`}>Nenhum item disponível.</p>
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr className={`${styles.customClass}`}>
                  <td colSpan={4} className={`${styles.customClass}`}>Nenhum pedido encontrado.</td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
      <div className={`${styles.linhaHorizontal} ${styles.customClass}`} />
    </>
  );
}

export default ListaPedido;
