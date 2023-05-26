import { AiOutlineArrowLeft } from "react-icons/ai";
import Footer from "../../components/layout/Footer";
import Navbar from "../../components/layout/NavBar";
import styles from "../styles/PerfilUsuario.module.css";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { Form, Button, Row, Col } from "react-bootstrap";
import {
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaLock,
  FaUser,
  FaUserCircle,
} from "react-icons/fa";

function PerfilUsuario() {
  const [selectedItem, setSelectedItem] = useState("");

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const renderForm = () => {
    switch (selectedItem) {
      case "Dados Pessoais":
        return <FormDadosPessoais />;
      case "Endereço":
        return <FormEndereco />;
      case "Pedidos":
        return <FormPedidos />;
      case "Sair":
        return <FormSair />;
      default:
        return null;
    }
  };

  return (
    <>
      <Navbar />

      <div className={styles.container}>
        <Link to={"/"}>
          <h1 className={styles.voltarHome}>
            <AiOutlineArrowLeft />
            Voltar
          </h1>
        </Link>

        <div className={styles.linhaHorizontal} />

        <div className={styles.containerGridPerfil}>
          <div className={styles.gridPerfil}>
            <ul className={styles.gridPerfilLista}>
              <li
                className={styles.gridPerfilListaItem}
                onClick={() => handleItemClick("Olá")}
              >
                <FaUserCircle className={styles.imagemPerfil} />
                <span>Olá</span>
              </li>
              <li
                className={styles.gridPerfilListaItem}
                onClick={() => handleItemClick("Dados Pessoais")}
              >
                Dados Pessoais e Autenticação
              </li>
              <li
                className={styles.gridPerfilListaItem}
                onClick={() => handleItemClick("Endereço")}
              >
                Endereço
              </li>
              <li
                className={styles.gridPerfilListaItem}
                onClick={() => handleItemClick("Pedidos")}
              >
                Pedidos
              </li>
              <li
                className={styles.gridPerfilListaItem}
                onClick={() => handleItemClick("Sair")}
              >
                Sair
              </li>
            </ul>
          </div>

          <div className={styles.gridPerfilForm}>{renderForm()}</div>
        </div>
      </div>

      <Footer />
    </>
  );
}

// Componentes de formulário de exemplo
function FormDadosPessoais() {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const alternarMostrarSenha = () => {
    setMostrarSenha(!mostrarSenha);
  };

  const handleToggleExpand = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div>
      <h1>Editar Dados Pessoais e Autenticação</h1>
      <div className={styles.linhaHorizontal} />
      <Form>
        <Form.Group as={Row} controlId="formNome">
          <div className={styles.iconContainer}>
            <Form.Label column sm={2}>
              <FaUser className={styles.iconFormLogin} />
            </Form.Label>
            <Form.Control
              className={styles.inputFormLogin}
              type="text"
              placeholder="Nome"
              // value={nome}
              // onChange={(event) => setNome(event.target.value)}
              // required
            />
          </div>
        </Form.Group>
        <Form.Group as={Row} controlId="formCpf">
          <div className={styles.iconContainer}>
            <Form.Label column sm={2}>
              <FaUser className={styles.iconFormLogin} />
            </Form.Label>
            <Form.Control
              className={styles.inputFormLogin}
              type="text"
              placeholder="CPF"
              readOnly
              // value={cpf}
              // onChange={(event) => setCpf(event.target.value)}
            />
          </div>
        </Form.Group>
        <Form.Group as={Row} controlId="formEmail">
          <div className={styles.iconContainer}>
            <Form.Label column sm={2}>
              <FaEnvelope className={styles.iconFormLogin} />
            </Form.Label>
            <Form.Control
              className={styles.inputFormLogin}
              type="email"
              placeholder="E-mail"
              // value={email}
              // onChange={(event) => setEmail(event.target.value)}
              // required
            />
          </div>
        </Form.Group>

        <div>
          <Button
            className={styles.buttonExpandirSenha}
            variant="secondary"
            onClick={handleToggleExpand}
          >
            {isExpanded ? "Recolher" : "Expandir"} Alterar Senha
          </Button>

          {isExpanded && (
            <div>
              <Form.Group as={Row} controlId="formSenha">
                <div className={styles.iconContainer}>
                  <Form.Label column sm={2}>
                    <FaLock className={styles.iconFormLogin} />
                  </Form.Label>
                  <Form.Control
                    className={styles.inputFormLogin}
                    type={mostrarSenha ? "text" : "password"}
                    placeholder="Senha"
                    // value={senha}
                    // onChange={(event) => setSenha(event.target.value)}
                    // required
                  />

                  <div
                    className={styles.alternarSenha}
                    onClick={alternarMostrarSenha}
                  >
                    {mostrarSenha ? <FaEyeSlash /> : <FaEye />}
                  </div>
                </div>
              </Form.Group>
              <Form.Group as={Row} controlId="formSenha">
                <div className={styles.iconContainer}>
                  <Form.Label column sm={2}>
                    <FaLock className={styles.iconFormLogin} />
                  </Form.Label>
                  <Form.Control
                    className={styles.inputFormLogin}
                    type={mostrarSenha ? "text" : "password"}
                    placeholder="Senha"
                    // value={senha}
                    // onChange={(event) => setSenha(event.target.value)}
                    // required
                  />

                  <div
                    className={styles.alternarSenha}
                    onClick={alternarMostrarSenha}
                  >
                    {mostrarSenha ? <FaEyeSlash /> : <FaEye />}
                  </div>
                </div>
              </Form.Group>
            </div>
          )}
        </div>

        <Button type="submit" className={styles.buttonSalvarPerfil}>
          Salvar
        </Button>
      </Form>
    </div>
  );
}

function FormEndereco() {
  return (
    <div>
      <h1>Endereço</h1>
      <div className={styles.linhaHorizontal} />
      <Form id="livroForm">
        <Row>
          <Col>
            <Form.Group controlId="cep">
              <Col sm="12">
                <Form.Control
                  className={styles.inputCadastrarEndereco}
                  type="text"
                  placeholder="CEP"
                  name="cep"
                />
              </Col>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group controlId="uf">
              <Col sm="12">
                <Form.Control
                  className={styles.inputCadastrarEndereco}
                  type="text"
                  placeholder="Estado"
                  name="uf"
                  // required
                  // value={uf}
                  // onChange={(event) => setUf(event.target.value)}
                />
              </Col>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group controlId="cidade">
              <Col sm="12">
                <Form.Control
                  className={styles.inputCadastrarEndereco}
                  type="text"
                  placeholder="Cidade"
                  name="cidade"
                  // value={cidade}
                  // onChange={(event) => setCidade(event.target.value)}
                  // required
                />
              </Col>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group controlId="logradouro">
              <Col sm="12">
                <Form.Control
                  className={styles.inputCadastrarEndereco}
                  type="text"
                  placeholder="Rua"
                  name="logradouro"
                  // value={logradouro}
                  // onChange={(event) => setLogradouro(event.target.value)}
                  // required
                />
              </Col>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group controlId="bairro">
              <Col sm="12">
                <Form.Control
                  className={styles.inputCadastrarEndereco}
                  type="text"
                  placeholder="Bairro"
                  name="bairro"
                  // value={bairro}
                  // onChange={(event) => setBairro(event.target.value)}
                  // required
                />
              </Col>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group controlId="numero">
              <Col sm="12">
                <Form.Control
                  className={styles.inputCadastrarEndereco}
                  type="text"
                  placeholder="Número"
                  name="numero"
                  // value={numero}
                  // onChange={(event) => setNumero(event.target.value)}
                  // required
                />
              </Col>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col>
            <Form.Group controlId="complemento">
              <Col sm="12">
                <Form.Control
                  className={styles.inputCadastrarEndereco}
                  type="text"
                  placeholder="Complemento"
                  name="complemento"
                  // value={complemento}
                  // onChange={(event) =>
                  //   setComplemento(event.target.value)
                  // }
                />
              </Col>
            </Form.Group>
          </Col>
        </Row>
        <Button type="submit" className={styles.buttonSalvarPerfil}>
          Salvar
        </Button>
      </Form>
    </div>
  );
}

function FormPedidos() {
  return <div>Formulário de Pedidos</div>;
}

function FormSair() {
  return <div>Formulário de Sair</div>;
}

export default PerfilUsuario;
