import { Form, Button, Row, Col } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import styles from "../adm/CadastroLivro.module.css";

function CadastroLivro() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [tipoLivroAdd, setTipoLivroAdd] = useState(false);

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
  const [detalhes, setDetalhes] = useState([]);

  const tipoLivroFisico = tipoLivro === "FISICO";
  const tipoLivroEbook = tipoLivro === "EBOOK";

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
      detalhes: detalhes,
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
        setDetalhes([]);
        setTipoLivro("");
        setPreco("");
        setQtdeEstoque("");

        window.alert("Livro cadastrado!");
      })
      .catch((error) => {
        console.error("Erro ao cadastrar livro:", error);
        window.alert("Erro ao cadastrar livro!");
      });
  };

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <div className={styles.containerCadastroLivro}>
        <h2 className={styles.tituloCadastroLivro}>Cadastrar Livros</h2>
        <div className="linhaHorizontal" />
        <Button
          className={styles.buttonExpandir}
          variant="secondary"
          onClick={handleToggleExpand}
        >
          {isExpanded ? "Recolher" : "Expandir"} Formulário
        </Button>
        {isExpanded && (
          <>
            <Form onSubmit={handleSubmit}>
              <br />
              <div className={styles.containerSmall}>
                <Row>
                  <Col>
                    <Form.Group controlId="formTitulo">
                      <Form.Label className={styles.labelCadastro}>
                        Título
                      </Form.Label>
                      <Form.Control
                        className={styles.inputCadastrar}
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
                      <Form.Label className={styles.labelCadastro}>
                        Autor
                      </Form.Label>
                      <Form.Control
                        className={styles.inputCadastrar}
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
                    <Form.Group controlId="formGenero" as={Row}>
                      <Form.Label
                        column
                        sm="12"
                        className={styles.labelCadastro}
                      >
                        Gênero
                      </Form.Label>
                      <Col sm="12">
                        <Form.Control
                          className={styles.inputCadastrar}
                          as="select"
                          value={genero}
                          onChange={(e) => setGenero(e.target.value)}
                        >
                          <option value="">Selecione um gênero</option>
                          <option value="Ação">Ação</option>
                          <option value="Aventura">Aventura</option>
                          <option value="Romance">Romance</option>
                          <option value="Ficção Científica">
                            Ficção Científica
                          </option>
                          <option value="Fantasia">Fantasia</option>
                          <option value="Suspense">Suspense</option>
                          <option value="Mistério">Mistério</option>
                          <option value="Horror">Horror</option>
                          <option value="Drama">Drama</option>
                          <option value="Comédia">Comédia</option>
                          <option value="Biografia">Biografia</option>
                          <option value="Autobiografia">Autobiografia</option>
                          <option value="História">História</option>
                          <option value="Autoajuda">Autoajuda</option>
                          <option value="Negócios">Negócios</option>
                          <option value="Autoconhecimento">
                            Autoconhecimento
                          </option>
                          <option value="Autores Nacionais">
                            Autores Nacionais
                          </option>
                          <option value="Poesia">Poesia</option>
                          <option value="Poesia">Outros</option>
                        </Form.Control>
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <Form.Group controlId="formEditora">
                      <Form.Label className={styles.labelCadastro}>
                        Editora
                      </Form.Label>
                      <Form.Control
                        className={styles.inputCadastrar}
                        type="text"
                        rows={3}
                        placeholder="Digite a editora do livro"
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
                      <Form.Label className={styles.labelCadastro}>
                        Ano de Publicação
                      </Form.Label>
                      <Form.Control
                        className={styles.inputCadastrar}
                        type="text"
                        rows={3}
                        placeholder="Digite a ano de publicação do livro"
                        value={anoPublicacao}
                        onChange={(e) => setAnoPublicacao(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group controlId="formPaginas">
                      <Form.Label className={styles.labelCadastro}>
                        Páginas
                      </Form.Label>
                      <Form.Control
                        className={styles.inputCadastrar}
                        type="text"
                        rows={3}
                        placeholder="Digite a quantidade de páginas do livro"
                        value={qtdePagina}
                        onChange={(e) => setQtdePagina(e.target.value)}
                      />
                    </Form.Group>
                  </Col>
                </Row>
              </div>

              <div className={styles.containerSmall}>
                <Row>
                  <Col>
                    <Form.Group controlId="formOferta" as={Row}>
                      <Form.Label
                        column
                        sm="12"
                        className={styles.labelCadastro}
                      >
                        Oferta
                      </Form.Label>
                      <Col sm="12">
                        <Form.Control
                          className={styles.inputCadastrar}
                          as="select"
                          value={oferta}
                          onChange={(e) => setOferta(e.target.value)}
                        >
                          <option value="">Selecione uma opção</option>
                          <option value="true">True</option>
                          <option value="false">False</option>
                        </Form.Control>
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Form.Group controlId="formDestaque" as={Row}>
                      <Form.Label
                        column
                        sm="12"
                        className={styles.labelCadastro}
                      >
                        Destaque
                      </Form.Label>
                      <Col sm="12">
                        <Form.Control
                          className={styles.inputCadastrar}
                          as="select"
                          value={destaque}
                          onChange={(e) => setDestaque(e.target.value)}
                        >
                          <option value="">Selecione uma opção</option>
                          <option value="true">True</option>
                          <option value="false">False</option>
                        </Form.Control>
                      </Col>
                    </Form.Group>
                  </Col>
                </Row>
              </div>

              <Row>
                <Col>
                  <Form.Group controlId="formImagem">
                    <Form.Label className={styles.labelCadastro}>
                      Imagem
                    </Form.Label>
                    <Form.Control
                      className={styles.inputImagemCadastrar}
                      type="text"
                      rows={3}
                      placeholder="Digite a imagem do livro"
                      value={imagem}
                      onChange={(e) => setImagem(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <Form.Group as={Row} controlId="formSinopse">
                <Form.Label column sm={2} className={styles.labelCadastro}>
                  Sinopse
                </Form.Label>
                <Col sm={10}>
                  <Form.Control
                    as="textarea"
                    rows={10}
                    placeholder="Digite a sinopse do livro"
                    value={sinopse}
                    onChange={(e) => setSinopse(e.target.value)}
                    className={styles.textArea}
                  />
                </Col>
              </Form.Group>

              <div className={styles.containerTtipoLivro}>
                <div>
                  <Row>
                    <Col>
                      <Form.Group controlId="formTipoLivro" as={Row}>
                        <Form.Label
                          column
                          sm="12"
                          className={styles.labelCadastro}
                        >
                          Tipo do Livro
                        </Form.Label>
                        <Col sm="12">
                          <Form.Control
                            className={styles.inputCadastrar}
                            as="select"
                            value={tipoLivro}
                            onChange={(e) => setTipoLivro(e.target.value)}
                          >
                            <option value="">Selecione uma opção</option>
                            <option value="true">FISICO</option>
                            <option value="false">EBOOK</option>
                          </Form.Control>
                        </Col>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group controlId="formPaginas">
                        <Form.Label className={styles.labelCadastro}>
                          Preço
                        </Form.Label>
                        <Form.Control
                          className={styles.inputCadastrar}
                          type="number"
                          rows={4}
                          placeholder=""
                          value={preco}
                          onChange={(e) => setPreco(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group controlId="formPaginas">
                        <Form.Label className={styles.labelCadastro}>
                          Estoque
                        </Form.Label>
                        <Form.Control
                          className={styles.inputCadastrar}
                          type="number"
                          rows={4}
                          placeholder=""
                          value={qtdeEstoque}
                          onChange={(e) => setQtdeEstoque(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </div>

                <div>
                  <Row>
                    <Col>
                      <Form.Group controlId="formTipoLivro" as={Row}>
                        <Form.Label
                          column
                          sm="12"
                          className={styles.labelCadastro}
                        >
                          Tipo do Livro
                        </Form.Label>
                        <Col sm="12">
                          <Form.Control
                            className={styles.inputCadastrar}
                            as="select"
                            value={tipoLivro}
                            onChange={(e) => setTipoLivro(e.target.value)}
                          >
                            <option value="">Selecione uma opção</option>
                            <option value="true">FISICO</option>
                            <option value="false">EBOOK</option>
                          </Form.Control>
                        </Col>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group controlId="formPaginas">
                        <Form.Label className={styles.labelCadastro}>
                          Preço
                        </Form.Label>
                        <Form.Control
                          className={styles.inputCadastrar}
                          type="number"
                          rows={4}
                          placeholder=""
                          value={preco}
                          onChange={(e) => setPreco(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <Form.Group controlId="formPaginas">
                        <Form.Label className={styles.labelCadastro}>
                          Estoque
                        </Form.Label>
                        <Form.Control
                          className={styles.inputCadastrar}
                          type="number"
                          rows={4}
                          placeholder=""
                          value={qtdeEstoque}
                          onChange={(e) => setQtdeEstoque(e.target.value)}
                        />
                      </Form.Group>
                    </Col>
                  </Row>
                </div>
              </div>

              <Button
                className={styles.buttonCadastrar}
                variant="primary"
                type="submit"
              >
                Cadastrar
              </Button>
            </Form>
          </>
        )}
      </div>

      <div className="linhaHorizontal" />
    </>
  );
}

export default CadastroLivro;
