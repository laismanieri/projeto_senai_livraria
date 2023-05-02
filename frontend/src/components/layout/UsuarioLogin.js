import styles from "../layout/UsuarioLogin.module.css";
import { Link } from "react-router-dom";


function UsuarioLogin() {
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

export default UsuarioLogin;