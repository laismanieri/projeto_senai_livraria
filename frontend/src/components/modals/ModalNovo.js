import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

import styles from "../modals/ModalNovo.module.css";

function ModalNovo({ isOpen, onClose }) {
  const [livro, setLivro] = useState({
    titulo: "",
    autor: "",
    anoPublicacao: "",
    sinopse: "",
    genero: "",
    editora: "",
    qtdePagina: "",
    oferta: "",
    destaque: "",
    imagem: "",
    tipoLivro: "",
    preco: "",
    qtdeEstoque: "",
  });

  const clearForm = () => {
    setLivro({
      titulo: "",
      autor: "",
      anoPublicacao: "",
      sinopse: "",
      genero: "",
      editora: "",
      qtdePagina: "",
      oferta: "",
      destaque: "",
      imagem: "",
      tipoLivro: "",
      preco: "",
      qtdeEstoque: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`http://localhost:8082/livro`, livro)
      .then((response) => {
        console.log(response.data);
        onClose();
        window.location.reload();
        clearForm();
      })
      .catch((error) => console.log(error));
  };

  const handleChange = (e) => {
    setLivro({ ...livro, [e.target.name]: e.target.value });
  };

  return (
    <>
      {isOpen && (
        <div>
          <div className={styles.modalBackground}>
            <div className={styles.divContainerNovo}>
              <form className={styles.formModal} onSubmit={handleSubmit}>
                <label className={styles.labelModal}> TITULO</label>

                <input
                  className={styles.inputModal}
                  name="titulo"
                  value={livro.titulo}
                  onChange={handleChange}
                  required
                />

                <label className={styles.labelModal}> AUTOR</label>

                <input
                  className={styles.inputModal}
                  name="autor"
                  value={livro.autor}
                  onChange={handleChange}
                  required
                />

                <label className={styles.labelModal}> EDITORA</label>

                <input
                  className={styles.inputModal}
                  name="editora"
                  value={livro.editora}
                  onChange={handleChange}
                  required
                />

                <label className={styles.labelModal}> GÊNERO</label>

                <input
                  className={styles.inputModal}
                  name="genero"
                  value={livro.genero}
                  onChange={handleChange}
                  required
                />

                <label className={styles.labelModal}> SINOPSE</label>

                <textarea
                  className={styles.inputModal}
                  name="descricao"
                  value={livro.descricao}
                  onChange={handleChange}
                  required
                />

                <label className={styles.labelModal}> ANO DE PUBLICAÇÃO</label>

                <input
                  className={styles.inputModal}
                  name="anoPublicacao"
                  value={livro.anoPublicacao}
                  onChange={handleChange}
                  required
                />

                <label className={styles.labelModal}> IMAGEM</label>

                <input
                  className={styles.inputModal}
                  name="imagem"
                  value={livro.imagem}
                  onChange={handleChange}
                  required
                />

                <label className={styles.labelModal}>
                  {" "}
                  QUANTIDADE DE PÁGINAS
                </label>

                <input
                  className={styles.inputModal}
                  name="qtdePagina"
                  value={livro.qtdePagina}
                  onChange={handleChange}
                  required
                />
                <label className={styles.labelModal}> OFERTA</label>

                <input
                  className={styles.inputModal}
                  name="oferta"
                  value={livro.oferta}
                  onChange={handleChange}
                  required
                />
                <label className={styles.labelModal}>DESTAQUE</label>

                <input
                  className={styles.inputModal}
                  name="destaque"
                  value={livro.destaque}
                  onChange={handleChange}
                  required
                />

                <div className={styles.linhaHorizontal} />

                <div className={styles.containerTipoLivro}>
                  <div className={styles.divTipoLivro}>
                    <label className={styles.labelModal}>LIVRO FISICO</label>

                    <input
                      className={styles.inputModal}
                      name="fisico"
                      value={livro.tipoLivro}
                      onChange={handleChange}

                    />

                    <label className={styles.labelModal}>PREÇO</label>

                    <input
                      className={styles.inputModal}
                      name="preco"
                      value={livro.preco}
                      onChange={handleChange}
                    />
                    <label className={styles.labelModal}>ESTOQUE</label>

                    <input
                      className={styles.inputModal}
                      name="qtdeEstoque"
                      value={livro.qtdeEstoque}
                      onChange={handleChange}
                    />
                  </div>
                  <div className={styles.divTipoLivro}>
                    <label className={styles.labelModal}>EBOOK</label>
                    <input
                      className={styles.inputModal}
                      name="tipoLivro"
                      value={livro.tipoLivro}
                      onChange={handleChange}
                    />

                    <label className={styles.labelModal}>PREÇO</label>

                    <input
                      className={styles.inputModal}
                      name="preco"
                      value={livro.preco}
                      onChange={handleChange}
                    />
                    <label className={styles.labelModal}>ESTOQUE</label>

                    <input
                      className={styles.inputModal}
                      name="qtdeEstoque"
                      value={livro.qtdeEstoque}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className={styles.linhaHorizontal} />

                <div className={styles.buttonContainer}>
                  <button onClick={onClose}>Fechar</button>
                  <button type="submit">Salvar</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default ModalNovo;
