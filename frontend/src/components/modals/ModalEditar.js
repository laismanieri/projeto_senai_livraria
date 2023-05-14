import styles from "../modals/ModalEditar.module.css";
import { useEffect, useState } from "react";
import axios from "axios";

function ModalEditar({ isOpenEdit, onCloseEdit, livro }) {
  const [livroEditState, setLivroEditState] = useState({});

  useEffect(() => {
    setLivroEditState({
      titulo: livro.titulo,
      autor: livro.autor,
      editora: livro.editora,
      genero: livro.genero,
      sinopse: livro.sinopse,
      anoPublicacao: livro.anoPublicacao,
      imagem: livro.imagem,
      oferta: livro.oferta,
      destaque: livro.destaque,
      preco: livro.preco,
      qtdePagina: livro.qtdePagina,
      qtdeEstoque: livro.qtdeEstoque,
      tipoLivro: livro.tipoLivro,
    });
  }, [isOpenEdit, livro]);

  const handleChangeEdit = (event) => {
    const { name, value } = event.target;
    setLivroEditState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmitEdit = (event) => {
    event.preventDefault();

    axios
      .put(`http://localhost:8082/livro/${livro.id}`, {
        ...livro,
        ...livroEditState,
      })
      .then((response) => {
        onCloseEdit();
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      {isOpenEdit && (
        <div className={styles.modalBackgroundEdit}>
          <div className={styles.divContainerEdit}>
            <form className={styles.formModalEdit} onSubmit={handleSubmitEdit}>
              <label className={styles.labelModal}> TITULO</label>
              <input
                className={styles.inputModalEdit}
                name="titulo"
                defaultValue={livro.titulo}
                onChange={handleChangeEdit}
              />
              <label className={styles.labelModal}> AUTOR</label>
              <input
                className={styles.inputModalEdit}
                name="autor"
                defaultValue={livro.autor}
                onChange={handleChangeEdit}
              />
              <label className={styles.labelModal}> EDITORA</label>
              <input
                className={styles.inputModalEdit}
                name="editora"
                defaultValue={livro.editora}
                onChange={handleChangeEdit}
              />
              <label className={styles.labelModal}> GÊNERO</label>
              <input
                className={styles.inputModalEdit}
                name="genero"
                defaultValue={livro.genero}
                onChange={handleChangeEdit}
              />

              <label className={styles.labelModal}> SINOPSE</label>
              <input
                className={styles.inputModalEdit}
                name="sinopse"
                defaultValue={livro.sinopse}
                onChange={handleChangeEdit}
              />
              <label className={styles.labelModal}> ANO DE PUBLICAÇÃO</label>
              <input
                className={styles.inputModalEdit}
                name="anoPublicacao"
                defaultValue={livro.anoPublicacao}
                onChange={handleChangeEdit}
              />
              <label className={styles.labelModal}> IMAGEM</label>
              <input
                className={styles.inputModalEdit}
                name="imagem"
                defaultValue={livro.imagem}
                onChange={handleChangeEdit}
              />

              <label className={styles.labelModal}>
                {" "}
                QUANTIDADE DE PÁGINAS
              </label>
              <input
                className={styles.inputModalEdit}
                name="qtdePagina"
                defaultValue={livro.qtdePagina}
                onChange={handleChangeEdit}
              />
              <label className={styles.labelModal}> OFERTA</label>
              <input
                className={styles.inputModalEdit}
                name="oferta"
                defaultValue={livro.oferta}
                onChange={handleChangeEdit}
              />
              <label className={styles.labelModal}>DESTAQUE</label>
              <input
                className={styles.inputModalEdit}
                name="destaque"
                defaultValue={livro.destaque}
                onChange={handleChangeEdit}
              />
              <label className={styles.labelModal}>PREÇO</label>
              <input
                className={styles.inputModalEdit}
                name="preco"
                defaultValue={livro.preco}
                onChange={handleChangeEdit}
              />

              <label className={styles.labelModal}>ESTOQUE</label>
              <input
                className={styles.inputModalEdit}
                name="qtdeEstoque"
                defaultValue={livro.qtdeEstoque}
                onChange={handleChangeEdit}
              />

              <div className={styles.linhaHorizontal} />

              <div className={styles.containerTipoLivro}>
                <div className={styles.divTipoLivro}>
                  <label className={styles.labelModal}>LIVRO FISICO</label>

                  <input
                    className={styles.inputModalEdit}
                    name="fisico"
                    value={livro.tipoLivro}
                    onChange={handleChangeEdit}
                  />

                  <label className={styles.labelModal}>PREÇO</label>

                  <input
                    className={styles.inputModalEdit}
                    name="preco"
                    value={livro.preco}
                    onChange={handleChangeEdit}
                  />
                  <label className={styles.labelModal}>ESTOQUE</label>

                  <input
                    className={styles.inputModalEdit}
                    name="qtdeEstoque"
                    value={livro.qtdeEstoque}
                    onChange={handleChangeEdit}
                  />
                </div>
                <div className={styles.divTipoLivro}>
                  <label className={styles.labelModal}>TIPO LIVRO</label>
                  <input
                    className={styles.inputModalEdit}
                    name="tipoLivro"
                    value={livro.tipoLivro}
                    onChange={handleChangeEdit}
                  />

                  <label className={styles.labelModal}>PREÇO</label>

                  <input
                    className={styles.inputModalEdit}
                    name="preco"
                    value={livro.preco}
                    onChange={handleChangeEdit}
                  />
                  <label className={styles.labelModal}>ESTOQUE</label>

                  <input
                    className={styles.inputModalEdit}
                    name="qtdeEstoque"
                    value={livro.qtdeEstoque}
                    onChange={handleChangeEdit}
                  />
                </div>
              </div>

              <div className={styles.linhaHorizontal} />

               <div className={styles.buttonContainerEdit}>
                <button onClick={onCloseEdit}>Fechar</button>
                <button type="submit">Salvar</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default ModalEditar;
