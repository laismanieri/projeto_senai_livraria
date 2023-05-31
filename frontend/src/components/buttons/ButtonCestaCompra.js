import { useState } from "react";
import { FaShoppingCart } from 'react-icons/fa';
import ModalCarrinho from "../modals/ModalCarrinho";
import styles from "./Button.module.css";

const ButtonCestaCompra = () => {
  const [livro, setLivro] = useState(null);
  const [detalhe, setDetalhe] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleOpenModal = () => {
    setModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setModalOpen(false);
  };

  return (
    <>
      <button className={styles.navbarButton} onClick={handleOpenModal}>
        <FaShoppingCart alt="cesta" className={styles.navbarCesta} />
      </button>
      <ModalCarrinho livro={livro} detalhe={detalhe} isOpen={modalOpen} onClose={handleCloseModal} />
    </>
  );
}

export default ButtonCestaCompra;
