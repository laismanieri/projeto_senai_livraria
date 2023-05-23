import { useState } from "react";
import { FaShoppingCart } from 'react-icons/fa';

import { GiShoppingBag } from 'react-icons/gi';

import { AiOutlineShopping } from 'react-icons/ai';

import { IoCartOutline } from 'react-icons/io5';

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
          <FaShoppingCart alt="cesta" className={styles.navbarCesta}/>
        </button>
        <ModalCarrinho isOpen={modalOpen} onClose={handleCloseModal}/>
      </>
    )
}

export default ButtonCestaCompra;