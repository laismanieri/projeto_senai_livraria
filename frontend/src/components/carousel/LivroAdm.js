import CardAdm from "../cards/CardAdm";
import "./Carousel.css"

function LivroAdm({livro, livros}) {

  return (
    <div className="containerLivro">
    <div className="container">
      <div className="tituloCarousel">
        <h2>Gerenciar Livros</h2>
      </div>
      <div className="linhaHorizontal"/>
        {livros.map((livro) => (
          <div key={livro.id} className="containerDestaque">
            <CardAdm livro={livro} />
          </div>
        ))}
    </div>
    </div>
  );
}

export default LivroAdm;