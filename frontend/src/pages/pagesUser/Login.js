import { useState } from "react";
import styles from "../styles/Login.module.css";
import { Link } from "react-router-dom";
import { FaFacebook, FaLinkedin, FaEnvelope, FaUser, FaLock } from "react-icons/fa";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
          <button className={styles.buttonLoginEntrar}>Entrar</button>
        </div>
      </div>

      <div className={styles.itemLoginConta}>
        <h2 className={styles.loginContaH2}>Criar Conta </h2>
        <div className={styles.iconContainer}>
          <FaEnvelope className={styles.iconFormLogin} />
          <div>
            <input type="email" placeholder="E-mail" className={styles.inputFormLogin}/>
          </div>
        </div>
        <div className={styles.iconContainer}>
          <FaUser className={styles.iconFormLogin} />
          <div>
            <input type="text" placeholder="Nome" className={styles.inputFormLogin} />
          </div>
        </div>
        <div className={styles.iconContainer}>
          <FaLock className={styles.iconFormLogin} />
          <div>
            <input type="password" placeholder="Senha" className={styles.inputFormLogin}/>
          </div>
        </div>
        <div>
          <button className={styles.buttonLoginCadastrar}>Cadastrar</button>
        </div>
      </div>
    </div>
  );
}

export default Login;
