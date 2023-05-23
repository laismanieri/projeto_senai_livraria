import React, { useContext, useState } from "react";
import { AuthContext } from "../layout/AuthContext";
import UsuarioLogin from "./UsuarioLogin";

const UsuarioMenu = () => {
  const { user, logout } = useContext(AuthContext);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <div>
      <button onClick={handleMenuToggle}>          <img
            // className={styles.imgUser}
            title="Login"
            src="/img/perfil-de-usuario.png"
            alt="ícone de usuário"
          /></button>
      {menuOpen && (
        <ul>
          <li>Alterar Perfil</li>
          <li>Meus Pedidos</li>
          <li onClick={handleLogout}>Logout</li>
        </ul>
      )}
    </div>
  );
};

export default UsuarioMenu;
