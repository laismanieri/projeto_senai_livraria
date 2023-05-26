import { Link } from "react-router-dom";
import styles from "../layout/Footer.module.css";
import {
  FaFacebook,
  FaInstagram,
  FaLinkedin,
  FaWhatsapp,
} from "react-icons/fa";

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.row}>
        <div className={styles.column}>
          <img
            className={styles.footerLogoImg}
            src="/img/logo.png"
            alt="logo"
          />
        </div>
        <div className={styles.column}>
          <div className={styles.containerSocialList}>
          <ul className={styles.socialList}>
            <li className={styles.socialListLi}>
              <FaFacebook />
            </li>
            <li className={styles.socialListLi}>
              <FaInstagram />
            </li>
            <li className={styles.socialListLi}>
              <FaLinkedin />
            </li>
            <li className={styles.socialListLi}>
              <FaWhatsapp />
            </li>
          </ul></div>
        </div>
      </div>
      <div className={styles.row}>
        <div className={styles.column}>{/* Conteúdo da terceira parte */}</div>
      </div>
    </footer>
  );
}

export default Footer;
