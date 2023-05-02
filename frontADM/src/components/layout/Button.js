import { useState } from 'react';
import styles from '../layout/Button.module.css';

import Container from '../layout/Container';
import ModalNovo from './ModalNovo';

function Button(){
    
const [modalOpen, setModalOpen] = useState(false);

 const handleOpenModal = () => {
    setModalOpen(true);
};

const handleCloseModal = () => {

    setModalOpen(false);

};


    return(
    <Container>
        <div className={styles.button}>
            <button className={styles.button1} onClick={handleOpenModal} >
                Novo
            </button>

        <ModalNovo isOpen={modalOpen} onClose={handleCloseModal}/>

        </div>
     </Container> 
    );

}

export default Button;