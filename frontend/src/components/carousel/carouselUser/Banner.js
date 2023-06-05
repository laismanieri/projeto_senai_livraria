import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "../styles/Carousel.css";

const Banner = () => {
  const sliderRef = React.useRef(null);

  const settings = {
    width: '1200px',
    height: '250px',
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };

  return (
    <div className="carousel-wrapper">
      <Slider {...settings} ref={sliderRef}>
        <div>
        <img 
            src="https://leitura.com.br/image/cache/catalog/Maio-2023-1170x300-A-1170x300.png" alt=""/>
        </div>
                <div>
          <img src="https://leitura.com.br/image/cache/catalog/Leitura.1-1170x300.png" alt=""/>
        </div>
        <div>
          <img src="https://leitura.com.br/image/cache/catalog/Rede%20Leitura%20-%2025%20de%20maio-1170x300.jpg" alt="" />
        </div>
        <div>
          <img src="https://leitura.com.br/image/cache/catalog/Banner%20sergio%20vaz%20-%20leitura-1170x300.jpg" alt=""/>
        </div>

      </Slider>
      {/* <button
        className="slick-prev-alt"
        onClick={() => sliderRef.current?.slickPrev()}
      >
       <FaArrowLeft />
      </button>
      <button
        className="slick-next-alt"
        onClick={() => sliderRef.current?.slickNext()}
      >
        <FaArrowRight />
      </button> */}
    </div>
  );
};

export default Banner;
