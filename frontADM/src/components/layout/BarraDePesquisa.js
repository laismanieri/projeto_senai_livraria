// import styles from './BarraDePesquisa.module.css';
// import {FaSearch} from 'react-icons/fa';
// import { useState } from 'react';
// import axios from 'axios';
// import SearchBooks from './PesquisaBanco';

// function BarraDePesquisa() {
//     const [searchTerm, setSearchTerm] = useState('');
  
//     const handleInputChange = (event) => {
//       setSearchTerm(event.target.value);
//     };
  
//     const handleSubmit = async (event) => {
//       event.preventDefault();
//       const results = await searchBooks(searchTerm);
//       navigate(`/resultados/${encodeURIComponent(searchTerm)}`, { state: { results } });
//     };
  
//     return (
//       <div className={styles.barra}>
//         <form className={styles.form} onSubmit={handleSubmit}>
//           <input type='text' placeholder='Buscar' value={searchTerm} onChange={handleInputChange} />
//           <button type='submit' aria-label='Buscar'><FaSearch /></button>
//         </form>
//       </div>
//     );
//   }
  

// export default BarraDePesquisa;