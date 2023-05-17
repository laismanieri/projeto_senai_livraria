import Footer from "../components/layout/Footer";
import NavbarAdm from "../components/adm/NavBarAdm";
import { useEffect, useState } from "react";
import axios from "axios";
import OfertaAdm from "../components/carousel/OfertaAdm";
import Container from "../components/layout/Container";
import DestaqueAdm from "../components/carousel/DestaqueAdm";
import LivroAdm from "../components/carousel/LivroAdm";
import styles from "./Adm.module.css";

function Adm() {
  const [livros, setLivros] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:8082/livro")
      .then((response) => {
        console.log(response.data);
        setLivros(response.data);
      })
      .catch((error) => console.error(error));
  }, []);

  const livrosDestaque = livros.filter((livro) => livro.destaque);
  const livrosOferta = livros.filter((livro) => livro.oferta);
  const livro = livros.filter((livro) => !livro.oferta && !livro.destaque);

  return (
    <>
      <NavbarAdm />

      <Container>
        <div className={styles.containerAdm}>
          <div className={styles.containerAdmSecao}>
            <LivroAdm livros={livro} />
          </div>
          <div className={styles.containerAdmSecao}>
            <DestaqueAdm livros={livrosDestaque} />
          </div>
          <div className={styles.containerAdmSecao}>
            <OfertaAdm livros={livrosOferta} />
          </div>
        </div>
      </Container>
      <Footer />
    </>
  );
}

export default Adm;
