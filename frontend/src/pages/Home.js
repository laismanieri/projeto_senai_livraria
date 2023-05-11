import CarouselBanner from '../components/carousel/Banner';
import Navbar from '../components/layout/NavBar';
import styles from './Home.module.css';
import Container from '../components/layout/Container';
import Footer from '../components/layout/Footer';
import Destaque from "../components/carousel/Destaque";
import Oferta from '../components/carousel/Oferta';
import axios from "axios";
import { useState, useEffect } from "react";


function Home() {
  const [livros, setLivros] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8082/livro')
      .then((response) => {
        console.log(response.data);
        setLivros(response.data)
      })
      .catch(error => console.error(error));
  }, []);

  const livrosDestaque = livros.filter(livro => livro.destaque);
  const livrosOferta = livros.filter(livro => livro.oferta);

  return (
    <>
      <Navbar />
      <CarouselBanner />
      <Container>
        <Destaque livros={livrosDestaque} />
        <Oferta livros={livrosOferta} />
      </Container>
      <Footer />
    </>
  );
}

export default Home;
