import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import "./Carousel.css";
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const Banner = () => {
  const sliderRef = React.useRef(null);

  const settings = {
    width: '500px',
    height: '250px',
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    // prevArrow: (
    //   <button
    //     type="button"
    //     className="slick-prev"
    //     onClick={() => sliderRef.current?.slickPrev()}
    //   >
    //     <FaArrowLeft />
    //   </button>
    // ),
    // nextArrow: (
    //   <button
    //     type="button"
    //     className="slick-next"
    //     onClick={() => sliderRef.current?.slickNext()}
    //   >
    //     <FaArrowRight />
    //   </button>
    // ),
  };

  return (
    <div className="carousel-wrapper">
      <Slider {...settings} ref={sliderRef}>
        <div>
        <img 
            src="https://static3.tcdn.com.br/img/img_prod/825130/1679926150_willow_acredita_que_a_unica_maneira_de.png" alt=""/>
        </div>
        <div>
          <img src="https://static3.tcdn.com.br/img/img_prod/825130/1677870219_um_estranho_nos.png" alt="" />
        </div>
        <div>
          <img src="https://static3.tcdn.com.br/img/img_prod/825130/1677706919_banner_trs_mulheres._trs_datas._um_homem_desaparecido.png" alt=""/>
        </div>
        <div>
          <img src="https://static3.tcdn.com.br/img/img_prod/825130/1677848614_existe_aquele_momento_em_que_voc_termina_um_livro_realmente_incrvel_e_s_precisa_de_um_segundo_para_respirar_fundo_e_absorver_todos_os_seus_sentimentos.__to_mas_to_bom_que_voc_no_consegue_expressar_c.png" alt=""/>
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
