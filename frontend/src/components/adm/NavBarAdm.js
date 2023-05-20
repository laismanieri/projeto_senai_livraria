import styles from "../layout/NavBar.module.css";
import { Link } from "react-router-dom";
import SearchAdm from "../adm/SearchAdm";

function NavbarAdm() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainerLogo}>
        <Link to="/">
          <img src="/img/logo.png" alt="Logo" className={styles.navbarLogo} />
        </Link>{" "}
      </div>
      <SearchAdm />
      <div className={styles.marginRight}></div>
    </nav>
  );
}

export default NavbarAdm;
