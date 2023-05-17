import { useState } from "react";

import styles from "./Button.module.css";
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
        <button className={styles.navbarButtonFav} onClick={handleOpenModal} >
        <p>
                      <AiFillHeart className={styles.iconFavorito} />
                    </p>
        </button>
        <ModalFavoritos isOpen={modalOpen} onClose={handleCloseModal}/>
      </>
    )
}

export default ButtonFavoritos;