import React from "react";
import styles from "../cards/Card.module.css";
import { Link } from "react-router-dom";

function Card({ livro }) {
  // const isPrecoRegular = livro.preco !== livro.precoOferta;

  return (
    <div className={styles.containerCard}>
      <div className={styles.card}>
        <div className={styles.containerCardImage}>
          <Link
            to={{
              pathname: `/informacao-livro/${livro.id}`,
              state: { id: livro.id },
            }}
          >
            <img
              src={livro.imagem}
              alt={livro.titulo}
              className={styles.cardImageLivro}
            />
          </Link>
        </div>
        <div className={styles.cardTitulo}>
          <h2 className={styles.h2TituloCard}>{livro.titulo}</h2>
        </div>
        {/* <div className={styles.divPreco}>
          {isPrecoRegular ? (
            <div className={styles.cardOferta}>
              <h1 className={styles.precoAntigo}>
                {livro.preco.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </h1>
              <h2 className={styles.precoOferta}>
                {livro.precoOferta.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </h2>
            </div>
          ) : (
            <div className={styles.cardRegular}>
              <h1 className={styles.spanRegular} />
              <h2 className={styles.precoRegular}>
                {livro.preco.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}
              </h2>
            </div>
          )}
        </div> */}
      </div>
    </div>
  );
}

export default Card;
