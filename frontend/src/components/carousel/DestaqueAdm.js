import CardAdm from "../cards/CardAdm";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./Carousel.css"

function DestaqueAdm({livros}) {

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1
  };

  return (
    <div className="container">
      <div className="tituloCarousel">
        <h2>Gerenciar Destaques</h2>
      </div>
      <div className="linhaHorizontal"/>
      <Slider {...settings}>
        {livros.map((livro) => (
          <div key={livro.id}>
            <CardAdm livro={livro} />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default DestaqueAdm;
