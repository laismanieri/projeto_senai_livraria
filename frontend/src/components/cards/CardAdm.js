import React from "react";
import styles from "../cards/Card.module.css";
import { Link } from "react-router-dom";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";

function CardAdm({ livro }) {
  const ebookDetalhe = livro.detalhesDTO.find(
    (detalhe) => detalhe.tipoLivro === "EBOOK"
  );
  const fisicoDetalhe = livro.detalhesDTO.find(
    (detalhe) => detalhe.tipoLivro === "FISICO"
  );

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
            <button className={styles.buttonCardAdm}>Deletar</button>
            <Link
            to={{
              pathname: `/informacao-livro-adm/${livro.id}`,
              state: { livro, detalhelivro: [ebookDetalhe, fisicoDetalhe] },
            }}
          >
            <button className={styles.buttonCardAdm}>
              Editar
            </button>
            </Link>
        </div>
      </div>
    </div>
  );
}

export default CardAdm;
