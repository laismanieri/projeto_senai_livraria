import { useEffect, useState } from "react";
import axios from "axios";
import OfertaAdm from "../../components/carousel/carouselAdm/OfertaAdm";
import Container from "../../components/layout/Container";
import DestaqueAdm from "../../components/carousel/carouselAdm/DestaqueAdm";
import LivroAdm from "../../components/carousel/carouselAdm/LivroAdm";
import CadastroLivro from "../../components/adm/CadastroLivro";
import Footer from "../../components/layout/Footer";
import NavbarAdm from "../../components/adm/NavBarAdm";

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
            <CadastroLivro/>
            <LivroAdm livros={livro} />
            <DestaqueAdm livros={livrosDestaque} />
            <OfertaAdm livros={livrosOferta} />
      </Container>
      <Footer />
    </>
  );
}

export default Adm;
