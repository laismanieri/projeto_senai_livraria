import { Table } from "react-bootstrap";

import axios from "axios";
import { useEffect, useState } from "react";

import styles from "../adm/Tabela.module.css";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import ModalEditar from "../modals/ModalEditar";

function Tabela() {
  const [livro, setLivro] = useState({});

  const [modalOPenEdit, setModalOpenEdit] = useState(false);

  const [lista, setLista] = useState([]);

  const handleOpenModalEdit = (livro) => {
    console.log(livro);
    setModalOpenEdit(true);
    setLivro(livro);
  };

  const handleCloseModalEdit = () => {
    setModalOpenEdit(false);
  };

  const handleDeleteLivro = (id) => {
    axios
      .delete(`http://localhost:8082/livro/${id}`)
      .then((response) => {
        // atualiza a lista de livros para excluir o livro deletado
        setLista(lista.filter((livro) => livro.id !== id));
      })
      .catch((error) => console.log(error));
  };

  //Fazer a conexão com o banco o banco para pegar os livros e inserir no setLista
  useEffect(() => {
    getLivro();
  }, []);

  const getLivro = () => {
    axios
      .get("http://localhost:8082/livro/tabela")
      .then((response) => setLista(response.data))
      .catch((error) => console.log(error));
  };

  return (
    <>
    <div className={styles.tableContainer}>
      <Table className={styles.table} striped bordered hover>
        <thead className={styles.cabecalho}>
          <tr className={styles.trCabecalho}>
            <th className={styles.cabecalhoLeft}>TITULO</th>
            <th>AUTOR</th>
            <th>EDITORA</th>
            <th>GÊNERO</th>
            <th>SINOPSE</th>
            <th>ANO</th>
            <th>IMAGEM</th>
            <th>QTDE PAGINAS</th>
            <th>OFERTA</th>
            <th>DESTAQUE</th>
            <th>TIPO LIVRO</th>
            <th>PREÇO</th>
            <th>ESTOQUE</th>

            <th>
              <AiFillDelete />
            </th>
            <th className={styles.cabecalhoRight}>
              <AiFillEdit />
            </th>
          </tr>
        </thead>
        <tbody>
          {
            //mapear cada livro
            lista.map((livro, index) => {
              return (
                <tr key={index}>
                  <td id="nomeTab">{livro.titulo}</td>
                  <td>{livro.autor}</td>
                  <td>{livro.editora}</td>
                  <td>{livro.genero}</td>
                  <td className={styles.descricao}>{livro.sinopse}</td>
                  <td>{livro.anoPublicacao}</td>
                  <td>{livro.imagem} className={styles.imagemTabela}</td>
                  <td>{livro.qtdePagina}</td>
                  <td>{livro.oferta ? 'Sim' : 'Não'}</td>
                  <td>{livro.destaque ? 'Sim' : 'Não'}</td>
                  <td>{livro.tipoLivro}</td>
                  <td>{livro.preco}</td>
                  <td>{livro.qtdeEstoque}</td>
                  <td>
                    <AiFillDelete
                      onClick={() => handleDeleteLivro(livro.id)}
                    />
                  </td>
                  <td>
                    <AiFillEdit onClick={() => handleOpenModalEdit(livro)} />
                  </td>
                </tr>
              );
            })
          }
        </tbody>
      </Table>
      </div>
      <ModalEditar
        isOpenEdit={modalOPenEdit}
        onCloseEdit={handleCloseModalEdit}
        livro={livro}
      />
    </>
  );
}

export default Tabela;
