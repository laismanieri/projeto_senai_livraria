import { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import styles from "../styles/Login.module.css";
import { Link } from "react-router-dom";
import { FaEnvelope, FaUser, FaLock, FaEyeSlash, FaEye } from "react-icons/fa";
import Modal from "react-modal";
import axios from "axios";
import { AiOutlineClose } from "react-icons/ai";

function Login() {
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const usuario = {
      email,
      nome,
      senha,
    };

    axios
      .post("http://localhost:8082/usuario", usuario)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          console.log("Cadastro efetuado com sucesso!");
          openModal(); // Abre o modal após o cadastro ser efetuado com sucesso
          // window.alert("Cadastro efetuado com sucesso!");
        } else {
          console.error("Erro ao cadastrar-se.");
        }
        limparFormulario();
      })
      .catch((error) => {
        // Lógica para manipular a resposta em caso de erro
        console.error(error);
      });
  };

  const limparFormulario = () => {
    setEmail("");
    setNome("");
    setSenha("");
  };

  const alternarMostrarSenha = () => {
    setMostrarSenha(!mostrarSenha);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)",
      zIndex: "9999",
    },
  };

  return (
    <div className={styles.containeUserLogin}>
      <div className={styles.itemLoginBemVindo}>
        <div>
          {" "}
          <img src="/img/logo.png" alt="Logo" className={styles.loginLogo} />
        </div>
        <div>
          <h1>Bem vindo de volta</h1>
        </div>
        <div className={styles.loginInfo}>
          <h2 className={styles.loginInfoH2}>
            Para se manter conectado conosco, faça o login com suas informações
            pessoais
          </h2>
        </div>
        <div>
          <Link to="/login-entrar">
            <button className={styles.buttonLoginEntrar}>Entrar</button>
          </Link>
        </div>
      </div>

      <div className={styles.itemLoginConta}>
        <h2 className={styles.loginContaH2}>Criar Conta </h2>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group as={Row} controlId="formNome">
            <div className={styles.iconContainer}>
              <Form.Label column sm={2}>
                <FaUser className={styles.iconFormLogin} />
              </Form.Label>
              <Form.Control
                className={styles.inputFormLogin}
                type="text"
                placeholder="Nome"
                value={nome}
                onChange={(event) => setNome(event.target.value)}
                required
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
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
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
                value={senha}
                onChange={(event) => setSenha(event.target.value)}
                required
              />

              <div
                className={styles.alternarSenha}
                onClick={alternarMostrarSenha}
              >
                {mostrarSenha ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </Form.Group>

          <div className={styles.buttonContainer}>
            <Button
              type="submit"
              className={styles.buttonLoginCadastrar}
              onClick={openModal}
            >
              Cadastrar
            </Button>
          </div>

          <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Cadastro efetuado com sucesso!"
            style={customStyles}
            overlayStyle={customStyles.overlay}
            className={styles.modalCompra}
          >
            <button
              className={styles.buttonFecharModal}
              onClick={() => {
                closeModal();
              }}
            >
              <AiOutlineClose className={styles.imgFechar} />
            </button>
            <h2 className={styles.h2AdicionarSacola}>
              Cadastro efetuado com sucesso!
            </h2>
          </Modal>
        </Form>
      </div>
    </div>
  );
}

export default Login;
