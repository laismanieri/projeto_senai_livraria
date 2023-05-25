import React, { useState } from "react";
import styles from "../cards/Card.module.css";
import { Link } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css"
import { toast } from "react-toastify";
import axios from "axios";

function CardAdm({ livro }) {
  const ebookDetalhe = livro.detalhesDTO.find(
    (detalhe) => detalhe.tipoLivro === "EBOOK"
  );
  const fisicoDetalhe = livro.detalhesDTO.find(
    (detalhe) => detalhe.tipoLivro === "FISICO"
  );

  const [lista, setLista] = useState([]);

  const handleDeleteLivro = (id) => {
    axios
      .delete(`http://localhost:8082/livro/${id}`)
      .then((response) => {
        // atualiza a lista de livros para excluir o livro deletado
        setLista(lista.filter((livro) => livro.id !== id));
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className={styles.containerCardAdm}>
      <div className={styles.cardAdm}>
        <div className={styles.containerCardImage}>
          <img
            src={livro.imagem}
            alt={livro.titulo}
            className={styles.cardImageLivro}
          />
        </div>
        <div className={styles.cardTitulo}>
          <h2 className={styles.h2TituloCardAdm}>{livro.titulo}</h2>
        </div>
        <div className={styles.containerButtonAdm}>
          <Link
            to={{
              pathname: `/informacao-livro-adm/${livro.id}`,
              state: { livro, detalhelivro: [ebookDetalhe, fisicoDetalhe] },
            }}
          >
            <button className={styles.buttonCardAdm}>Editar</button>
          </Link>
          <button
            className={styles.buttonCardAdm}
            onClick={() => {handleDeleteLivro(livro.id); 
              toast.success("Livro excluído com sucesso!", {
                position: toast.POSITION.TOP_CENTER, // Posição centralizada na parte superior
              });
            }}
          >
            Deletar
          </button>
        </div>
      </div>
    </div>
  );
}

export default CardAdm;
