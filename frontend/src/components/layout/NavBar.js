import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";
import UsuarioLogin from "./UsuarioLogin";
import ButtonCestaCompra from "../buttons/ButtonCestaCompra";
import ButtonFavoritos from "../buttons/ButtonFavoritos";
import Search from "../layout/Search";

function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainerLogo}>
        <Link to="/">
          <img src="/img/logo.png" alt="Logo" className={styles.navbarLogo} />
        </Link>
      </div>

      <Search />
      <UsuarioLogin />
      {/* <ButtonFavoritos /> */}
      <div className={styles.navbarContainerCompra}>
      <ButtonCestaCompra />
      </div>
    </nav>
  );
}

export default Navbar;
