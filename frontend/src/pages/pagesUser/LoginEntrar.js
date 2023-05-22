import { useState } from "react";
import { Form, Button, Row, Col } from "react-bootstrap";
import styles from "../styles/Login.module.css";
import { Link } from "react-router-dom";
import { FaEnvelope, FaUser, FaLock, FaEyeSlash, FaEye } from "react-icons/fa";
import axios from "axios";

function LoginEntrar() {
  const [mostrarSenha, setMostrarSenha] = useState(false);

  const alternarMostrarSenha = () => {
    setMostrarSenha(!mostrarSenha);
  };

  return (
    <div className={styles.containeUserLoginEntrar}>

      <div className={styles.itemLoginContaEntrar}>
        <h2 className={styles.loginContaH2}>Login </h2>
        <Form>
          <Form.Group as={Row} controlId="formEmail">
            <div className={styles.iconContainer}>
              <Form.Label column sm={2}>
                <FaEnvelope className={styles.iconFormLogin} />
              </Form.Label>
              <Form.Control
                className={styles.inputFormLogin}
                type="email"
                placeholder="E-mail"
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
              Entrar
            </Button>
          </div>
        </Form>
      </div>
      <div className={styles.itemLoginMsg}>
        <div>
          {" "}
          <img src="/img/logo.png" alt="Logo" className={styles.loginLogo} />
        </div>
        <div>
          <h1>Olá! Bem-Vindo</h1>
        </div>
        <div className={styles.loginInfoMsg}>
          <h2 className={styles.loginInfoMsgH2}>
          Entre com os seus dados pessoais e comece a viajar conosco no
          <p className={styles.loginInfoMsgp}>'Universo dos Livros'</p>
          </h2>
        </div>
      </div>

    </div>
  );
}

export default LoginEntrar;
