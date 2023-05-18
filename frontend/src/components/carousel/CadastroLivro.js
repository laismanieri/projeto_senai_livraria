import { Form, Button, Row, Col } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import styles from "./CadastroLivro.module.css"


function CadastroLivro() {
  const [titulo, setTitulo] = useState("");
  const [anoPublicacao, setAnoPublicacao] = useState("");
  const [autor, setAutor] = useState("");
  const [sinopse, setSinopse] = useState("");
  const [genero, setGenero] = useState("");
  const [editora, setEditora] = useState("");
  const [qtdePagina, setQtdePagina] = useState("");
  const [oferta, setOferta] = useState("");
  const [destaque, setDestaque] = useState("");
  const [imagem, setImagem] = useState("");
  const [tipoLivro, setTipoLivro] = useState("");
  const [preco, setPreco] = useState("");
  const [qtdeEstoque, setQtdeEstoque] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const novoLivro = {
      titulo: titulo,
      autor: autor,
      anoPublicacao: anoPublicacao,
      sinopse: sinopse,
      genero: genero,
      editora: editora,
      qtdePagina: qtdePagina,
      oferta: oferta,
      destaque: destaque,
      imagem: imagem,
      // detalhes: [
      //   {
      //     tipoLivro: tipoLivro,
      //     preco: preco,
      //     qtdeEstoque: qtdeEstoque
      // },
      // ],
    };

    axios
      .post("http://localhost:8082/livro", novoLivro)
      .then((response) => {
        console.log("Livro cadastrado com sucesso:", response.data);
        // Resetar os campos do formulário
        setTitulo("");
        setAutor("");
        setAnoPublicacao("");
        setSinopse("");
        setGenero("");
        setEditora("");
        setQtdePagina("");
        setOferta("");
        setDestaque("");
      })
      .catch((error) => {
        console.error("Erro ao cadastrar livro:", error);
      });
  };

  return (
    <div className="containerLivro">
      <div className="container">
        <div className="tituloCarousel">
          <h2>Cadastrar Livros</h2>
        </div>
        <div className="linhaHorizontal" />
        <div className="containerDestaque">
          <Form onSubmit={handleSubmit}>

          <div className={styles.containerSmall}>
            <Row>
              <Col>
                <Form.Group controlId="formTitulo">
                  <Form.Label>Título</Form.Label>
                  <Form.Control className={styles.inputCadastrar}
                    type="text"
                    placeholder="Digite o título do livro"
                    value={titulo}
                    onChange={(e) => setTitulo(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group controlId="formAutor">
                  <Form.Label>Autor</Form.Label>
                  <Form.Control className={styles.inputCadastrar}
                    type="text"
                    placeholder="Digite o nome do autor"
                    value={autor}
                    onChange={(e) => setAutor(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

          </div>

          <div className={styles.containerSmall}>
            <Row>
              <Col>
                <Form.Group controlId="formGenero">
                  <Form.Label>Gênero</Form.Label>
                  <Form.Control className={styles.inputCadastrar}
                    type="text"
                    rows={3}
                    placeholder="Digite a descrição do livro"
                    value={genero}
                    onChange={(e) => setGenero(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group controlId="formEditora">
                  <Form.Label>Editora</Form.Label>
                  <Form.Control className={styles.inputCadastrar}
                    type="text"
                    rows={3}
                    placeholder="Digite a descrição do livro"
                    value={editora}
                    onChange={(e) => setEditora(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            </div>

            <div className={styles.containerSmall}>

            <Row>
              <Col>
                <Form.Group controlId="formAnoPublicacao">
                  <Form.Label>Ano de Publicação</Form.Label>
                  <Form.Control className={styles.inputCadastrar}
                    type="text"
                    rows={3}
                    placeholder="Digite a descrição do livro"
                    value={anoPublicacao}
                    onChange={(e) => setAnoPublicacao(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group controlId="formPaginas">
                  <Form.Label>Páginas</Form.Label>
                  <Form.Control className={styles.inputCadastrar}
                    type="text"
                    rows={3}
                    placeholder="Digite a descrição do livro"
                    value={qtdePagina}
                    onChange={(e) => setQtdePagina(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group controlId="formOferta">
                  <Form.Label>Oferta</Form.Label>
                  <Form.Control className={styles.inputCadastrar}
                    type="text"
                    rows={3}
                    placeholder="Digite a descrição do livro"
                    value={oferta}
                    onChange={(e) => setOferta(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row>
              <Col>
                <Form.Group controlId="formDestaque">
                  <Form.Label>Destaque</Form.Label>
                  <Form.Control className={styles.inputCadastrar} 
                    type="text"
                    rows={3}
                    placeholder="Digite a descrição do livro"
                    value={destaque}
                    onChange={(e) => setDestaque(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>
            </div>

            <Row>
              <Col>
                <Form.Group controlId="formImagem">
                  <Form.Label>Imagem</Form.Label>
                  <Form.Control className={styles.inputImagemCadastrar} 
                    type="text"
                    rows={3}
                    placeholder="Digite a descrição do livro"
                    value={imagem}
                    onChange={(e) => setImagem(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            
            <Row>
              <Col>
                <Form.Group controlId="formSinopse">
                  <Form.Label>Sinopse</Form.Label>
                  <Form.Control className={styles.inputSinopseCadastrar} 
                    type="textarea"
                    rows={20}
                    placeholder="Digite a descrição do livro"
                    value={sinopse}
                    onChange={(e) => setSinopse(e.target.value)}
                  />
                </Form.Group>
              </Col>
            </Row>

            <Button className={styles.buttonCadastrar} variant="primary" type="submit">
              Cadastrar
            </Button>
          </Form>
        </div>
      </div>
    </div>
  );
}

export default CadastroLivro;
