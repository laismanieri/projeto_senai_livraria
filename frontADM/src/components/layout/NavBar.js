import{Link} from 'react-router-dom';


import styles from './NavBar.module.css';
import logo from '../../img/logo.png';
import Search from './Search';

function NavBar(){
    return(
      <nav className={styles.navBar}>
        <div className={styles.logo}>
            <Link to="/">
                <img src={logo} alt="Universo dos livros" />
            </Link>
        </div>
        <div>
        <Search/>
        </div>
        {/* <div>
        <ul className={styles.list}>
              <li className={styles.item}><Link to="/">Home</Link></li>
              <li className={styles.item}><Link to="/contato">Contato</Link></li>
        </ul>
        </div> */}
      </nav>
    );
}

export default NavBar;