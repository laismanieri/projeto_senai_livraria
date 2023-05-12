import React from "react";
import styles from "../cards/Card.module.css";
import { Link } from "react-router-dom";

function Card({ livro }) {
  const ebookDetalhe = livro.detalhes.find(
    (detalhe) => detalhe.tipoLivro === "EBOOK"
  );
  const fisicoDetalhe = livro.detalhes.find(
    (detalhe) => detalhe.tipoLivro === "FISICO"
  );

  const ebookPreco = ebookDetalhe ? ebookDetalhe.preco : null;
  const fisicoPreco = fisicoDetalhe ? fisicoDetalhe.preco : null;

  return (
    <div className={styles.containerCard}>
      <div className={styles.card}>
        <div className={styles.containerCardImage}>
          <Link
            to={{
              pathname: `/informacao-livro/${livro.id}`,
              state: { livro, detalhelivro: [ebookDetalhe, fisicoDetalhe] },
            }}
          >
            <img
              src={livro.imagem}
              alt={livro.titulo}
              className={styles.cardImageLivro}
            />
          </Link>
        </div>
        <h2 className={styles.h2TituloCard}>{livro.titulo}</h2>
        <div className={styles.cardTitulo}>
          <h2 className={styles.h2TituloCard}>
            {fisicoDetalhe && (
              <>
                <span>{fisicoDetalhe.tipoLivro}</span>
              </>
            )}
            {ebookDetalhe && (
              <>
                <span>{ebookDetalhe.tipoLivro}</span>
              </>
            )}
          </h2>
        </div>
        <div className={styles.cardPreco}>
          {fisicoPreco && (
            <span>
              {fisicoPreco.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          )}
          {ebookPreco && (
            <span>
              {ebookPreco.toLocaleString("pt-BR", {
                style: "currency",
                currency: "BRL",
              })}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;
