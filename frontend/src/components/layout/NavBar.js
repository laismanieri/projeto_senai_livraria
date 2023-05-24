import styles from "./NavBar.module.css";
import { Link } from "react-router-dom";
import UsuarioLogin from "./UsuarioLogin";
import ButtonCestaCompra from "../buttons/ButtonCestaCompra";
import ButtonFavoritos from "../buttons/ButtonFavoritos";
import Search from "../layout/Search";
import { AuthContext } from "./AuthContext";
import React, { useContext, useState } from "react";
import { GiShoppingBag } from 'react-icons/gi'
import { FaUser, FaSignOutAlt  } from "react-icons/fa";

function Navbar() {

  const { user, logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
    setMenuOpen(!menuOpen);
  };

  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbarContainerLogo}>
        <Link to="/">
          <img src="/img/logo.png" alt="Logo" className={styles.navbarLogo} />
        </Link>
      </div>

      <Search />
      <div className={styles.userMenuWrapper}>
        <button onClick={handleMenuToggle} className={styles.userButton}>
          <UsuarioLogin />
        </button>
        {menuOpen &&  user && (
          <ul className={styles.menuUsuario}>
            <li className={styles.menuUsuarioLista}>
              <span><FaUser /></span>
              <span>Alterar Perfil</span>
            </li>
            <li className={styles.menuUsuarioLista}>
              <span><GiShoppingBag /></span>
              <span>Meus Pedidos</span>
            </li>
            <li className={styles.menuUsuarioLista} onClick={handleLogout}>
            <span><FaSignOutAlt /></span>
              <span>Sair</span>
            </li>
          </ul>
        )}
      </div>
      <div className={styles.navbarContainerCompra}>
        <ButtonCestaCompra />
      </div>
    </nav>
  );
};


export default Navbar;
