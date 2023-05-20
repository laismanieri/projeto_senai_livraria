import styles from "../layout/NavBar.module.css";
import Container from "../layout/Container";
import Search from "./SearchAdm";
import { Link } from "react-router-dom";
import SearchAdm from "./SearchAdm";


function NavbarAdm() {
  return (
    <nav className={styles.navbar}>
      <Container>
        <Link to="/">
          <img src="/img/logo.png" alt="Logo" className={styles.navbarLogo} />
        </Link>
        <SearchAdm />
      </Container>
    </nav>
  );
}

export default NavbarAdm;
