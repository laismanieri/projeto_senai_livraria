import { useState } from "react";

import ModalCarrinho from "../modals/ModalCarrinho";
import styles from "./Button.module.css";

const ButtonCestaCompra = () => {

    const [modalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => {
       setModalOpen(true);
   };
   
   const handleCloseModal = () => {
       setModalOpen(false);
   
   };

    return(
        <>
        <button className={styles.navbarButton} onClick={handleOpenModal} >
          <img src="/img/cesta-de-compras.png" alt="cesta" className={styles.navbarCesta}/>
        </button>
        <ModalCarrinho isOpen={modalOpen} onClose={handleCloseModal}/>
      </>
    )
}

export default ButtonCestaCompra;