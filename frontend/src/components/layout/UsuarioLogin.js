import React, { useContext } from "react";
import styles from "../layout/UsuarioLogin.module.css";
import { Link } from "react-router-dom";
import { AuthContext } from "./AuthContext";
import { MdPerson } from 'react-icons/md';
import { AiOutlineUser } from 'react-icons/ai';
import { FaUser, FaUserCircle } from 'react-icons/fa';

function UsuarioLogin() {
  const { user } = useContext(AuthContext);

  if (user) {
    return (
      <div className={styles.loginUser}>
        <div className={styles.divImgUser}>
        <MdPerson />
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
        <FaUserCircle/>
        </div>

        <div className={styles.login}>
          <h1 className={styles.boasVindas}>Boas-vindas!</h1>
          <Link to="/login-entrar" className={styles.loginAcesso}>
            <span className={styles.entre}>Entre</span>
            
          </Link>
          <span className={styles.ou}>ou</span>
          <Link to="/login-cadastrar" className={styles.loginAcesso}>
            <span className={styles.cadastreSe}>Cadastre-se</span>
            
          </Link>
        </div>
      </div>
    );
  }
}

export default UsuarioLogin;
