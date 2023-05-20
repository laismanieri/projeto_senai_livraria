import styles from "./NavBar.module.css";
import Container from "./Container";
import { Link } from "react-router-dom";
import UsuarioLogin from "./UsuarioLogin";
import ButtonCestaCompra from "../buttons/ButtonCestaCompra";
import ButtonFavoritos from "../buttons/ButtonFavoritos";
import Search from "../layout/Search";


function Navbar() {
  return (
    <div className={`${styles.navbar} ${styles.fullWidth }`}>
        <Link to="/">
          <img src="/img/logo.png" alt="Logo" className={styles.navbarLogo} />
        </Link>
        <Search/>
        <UsuarioLogin />
        <ButtonFavoritos/>
        <ButtonCestaCompra/>
    </div>
  );
}

export default Navbar;
