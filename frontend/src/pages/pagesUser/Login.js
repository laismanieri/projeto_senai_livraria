import { useState } from "react";
import "react-toastify/dist/ReactToastify.css"
import { toast } from "react-toastify";
import { Form, Button, Row, Col } from "react-bootstrap";
import styles from "../styles/Login.module.css";
import { Link } from "react-router-dom";
import { FaEnvelope, FaUser, FaLock, FaEyeSlash, FaEye } from "react-icons/fa";
import axios from "axios";

function Login() {
  const [email, setEmail] = useState("");
  const [nome, setNome] = useState("");
  const [senha, setSenha] = useState("");
  const [cpf, setCpf] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const handleFormSubmit = (event) => {
    event.preventDefault();

    const usuario = {
      email,
      nome,
      senha,
      cpf,
    };

    axios
      .post("http://localhost:8082/usuario", usuario)
      .then((response) => {
        if (response.status >= 200 && response.status < 300) {
          toast.success("Cadastro efetuado com sucesso")
          
        } else {
          toast.success("Erro ao cadastrar-se")
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
    setCpf("");
  };

  const alternarMostrarSenha = () => {
    setMostrarSenha(!mostrarSenha);
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
          <Form.Group as={Row} controlId="formCpf">
            <div className={styles.iconContainer}>
              <Form.Label column sm={2}>
                <FaUser className={styles.iconFormLogin} />
              </Form.Label>
              <Form.Control
                className={styles.inputFormLogin}
                type="text"
                placeholder="Cpf"
                value={cpf}
                onChange={(event) => setCpf(event.target.value)}
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
            <Button type="submit" className={styles.buttonLoginCadastrar}>
              Cadastrar
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Login;
