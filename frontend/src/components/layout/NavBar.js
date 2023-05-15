import styles from "./NavBar.module.css";
import Container from "./Container";
import Search from "./Search";
import { Link } from "react-router-dom";
import UsuarioLogin from "./UsuarioLogin";
import ButtonCestaCompra from "./ButtonCestaCompra";


function Navbar() {
  return (
    <nav className={styles.navbar}>
      <Container>
        <Link to="/">
          <img src="/img/logo.png" alt="Logo" className={styles.navbarLogo} />
        </Link>
        <Search />
        <UsuarioLogin />
        <ButtonCestaCompra/>
      </Container>
    </nav>
  );
}

export default Navbar;
