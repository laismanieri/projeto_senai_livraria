import CardAdm from "../cards/CardAdm";
import "./Carousel.css"

function DestaqueAdm({livros}) {

  return (
    <div>
      <div className="tituloCarousel">
        <h2>Gerenciar Livros em Destaque</h2>
      </div>
      <div className="linhaHorizontal"/>
        {livros.map((livro) => (
          <div key={livro.id} className="containerDestaque">
            <CardAdm livro={livro} />
          </div>
        ))}
    </div>
  );
}

export default DestaqueAdm;
