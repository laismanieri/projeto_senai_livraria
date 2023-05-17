import CardAdm from "../cards/CardAdm";
import "./Carousel.css"

function OfertaAdm({livros}) {

  return (
    <div className="containerOferta">
      <div className="tituloCarousel">
        <h2>Gerenciar Livros em Oferta</h2>
      </div>
      <div className="linhaHorizontal"/>
        {livros.map((livro) => (
          <div key={livro.id}>
            <CardAdm livro={livro} />
          </div>
        ))}
    </div>
  );
}

export default OfertaAdm;
