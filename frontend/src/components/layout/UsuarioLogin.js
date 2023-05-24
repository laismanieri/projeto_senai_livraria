import React, { useContext } from "react";
import styles from "../layout/UsuarioLogin.module.css";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthContext";

function UsuarioLogin() {
  const { user } = useContext(AuthContext);

  if (user) {
    return (
      <div className={styles.loginUser}>
        <div className={styles.divImgUser}>
        <img
            className={styles.imgUser}
            title="Login"
            src="/img/perfil-de-usuario.png"
            alt="ícone de usuário"
          />
        </div>

        <div className={styles.login}>
          <h1 className={styles.boasVindas}>Boas-vindas!</h1>
          <p className={styles.entre}>Olá, {user.nome}</p>
        </div>
      </div>
    );
  } else {
    return (
      <div className={styles.loginUser}>
        <div className={styles.divImgUser}>
          <img
            className={styles.imgUser}
            title="Login"
            src="/img/perfil-de-usuario.png"
            alt="ícone de usuário"
          />
        </div>

        <div className={styles.login}>
          <h1 className={styles.boasVindas}>Boas-vindas!</h1>
          <Link to="/login" className={styles.loginAcesso}>
            <p className={styles.entre}>Entre ou cadastre-se</p>
          </Link>
        </div>
      </div>
    );
  }
}

export default UsuarioLogin;
