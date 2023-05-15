import { useState } from "react";

import styles from "./NavBar.module.css";
import { AiFillHeart } from "react-icons/ai";
import ModalFavoritos from "../modals/ModalFavoritos";

const ButtonFavoritos = () => {

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
        <p>
                      <AiFillHeart />
                    </p>
        </button>
        <ModalFavoritos isOpen={modalOpen} onClose={handleCloseModal}/>
      </>
    )
}

export default ButtonFavoritos;