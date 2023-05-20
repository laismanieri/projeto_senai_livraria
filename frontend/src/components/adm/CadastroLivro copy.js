import { Form, Button, Row, Col } from "react-bootstrap";
import { useState } from "react";
import axios from "axios";
import styles from "./CadastroLivro.module.css";

function CadastroLivro() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [listaLivros, setListaLivros] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [anoPublicacao, setAnoPublicacao] = useState("");
  const [sinopse, setSinopse] = useState("");
  const [genero, setGenero] = useState("");
  const [editora, setEditora] = useState("");
  const [qtdePagina, setQtdePagina] = useState("");
  const [oferta, setOferta] = useState(false);
  const [destaque, setDestaque] = useState(false);
  const [imagem, setImagem] = useState("");
  const [tipoLivro, setTipoLivro] = useState("FISICO");
  const [preco, setPreco] = useState("");
  const [qtdeEstoque, setQtdeEstoque] = useState("");
  const [precoEbook, setPrecoEbook] = useState("");
  const [qtdeEstoqueEbook, setQtdeEstoqueEbook] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const detalheLivro = {
      tipoLivro: tipoLivro,
      preco: tipoLivro === "FISICO" ? preco : precoEbook,
      qtdeEstoque: tipoLivro === "FISICO" ? qtdeEstoque : qtdeEstoqueEbook,
    };

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
      detalhes: [detalheLivro], // Cria um array com o detalheLivro
    };

    const novaListaLivros = [...listaLivros, novoLivro];

    console.log(novoLivro);

    axios
      .post("http://localhost:8082/livro", novoLivro)
      .then((response) => {
        console.log("Livro cadastrado com sucesso:", response.data);
        // Resetar os campos do formulário
        setListaLivros(novaListaLivros);

        // Limpar os campos do formulário
        setTitulo("");
        setAutor("");
        setAnoPublicacao("");
        setSinopse("");
        setGenero("");
        setEditora("");
        setQtdePagina("");
        setOferta("");
        setDestaque("");
        setImagem("");
        setTipoLivro("");
        setPreco("");
        setQtdeEstoque("");
        setPrecoEbook("");
        setQtdeEstoqueEbook("");

        window.alert("Livro cadastrado!", novoLivro);
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
                    <Form.Group controlId="formGenero">
                      <Form.Label className={styles.labelCadastro}>
                        Gênero
                      </Form.Label>
                      <Form.Control
                        className={styles.inputCadastrar}
                        type="text"
                        rows={3}
                        placeholder="Digite o genero do livro"
                        value={genero}
                        onChange={(e) => setGenero(e.target.value)}
                      />
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

              <Row>
                <Col>
                  <Form.Group controlId="formSinopse">
                    <Form.Label className={styles.labelCadastro}>
                      Sinopse
                    </Form.Label>
                    <Form.Control
                      className={styles.inputSinopseCadastrar}
                      type="textarea"
                      rows={20}
                      placeholder="Digite a sinopse do livro"
                      value={sinopse}
                      onChange={(e) => setSinopse(e.target.value)}
                    />
                  </Form.Group>
                </Col>
              </Row>

              <div className={styles.containerTtipoLivro}>
                {tipoLivro === "FISICO" && (
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
                )}
                {tipoLivro === "EBOOK" && (
                  <div>
                    {/* Renderizar campos específicos para e-books */}
                    {/* Por exemplo, campos para formato, tamanho do arquivo, etc. */}
                  </div>
                )}
                
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
