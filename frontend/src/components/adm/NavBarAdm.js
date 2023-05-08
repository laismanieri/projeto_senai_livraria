import styles from "../layout/NavBar.module.css";
import Container from "../layout/Container";
import Search from "./SearchAdm";
import { Link } from "react-router-dom";


function NavbarAdm() {
  return (
    <nav className={styles.navbar}>
      <Container>
        <Link to="/">
          <img src="/img/logo.png" alt="Logo" className={styles.navbarLogo} />
        </Link>
        <Search />
      </Container>
    </nav>
  );
}

export default NavbarAdm;
