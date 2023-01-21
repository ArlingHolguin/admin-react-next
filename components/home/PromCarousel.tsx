import { useState } from 'react';
import { Col, Button, Carousel } from "antd";

const PromCarousel = ({order, promotions}) => {
  const [carousel, setCarousel] = useState(null);
  return (
		<Col
      lg={18}
      md={24}
      sm={24}
      xs={24}
      className="card-prom slider"
      style={{ borderRadius: 15, position: "relative", order: order } }
    >
      <div className="carousel-action">
        <Button
          type="link"
          ghost
          onClick={() => carousel.next()}
        >
          <img src="/static/img/left.svg" />
        </Button>
        <Button
          type="link"
          ghost
          onClick={() => carousel.prev()}
        >
          <img src="/static/img/right.svg" />
        </Button>
      </div>
      <Carousel
        ref={(slider) => setCarousel(slider)}
        dots={false}
      >
        
        <div className="carouselSlide">
          <img
            width="100%"
            src="https://tyt-media.s3.amazonaws.com/paquetes-turisticos-1.jpg"
            alt="Plan turístico 2021"
          />
        </div>
        <div className="carouselSlide">
          <img
            width="100%"
            src="https://tyt-media.s3.amazonaws.com/paquetes-turisticos-1.jpg"
            alt="Plan turístico 2021"
          />
        </div><div className="carouselSlide">
          <img
            width="100%"
            src="https://tyt-media.s3.amazonaws.com/paquetes-turisticos-1.jpg"
            alt="Plan turístico 2021"
          />
        </div><div className="carouselSlide">
          <img
            width="100%"
            src="https://tyt-media.s3.amazonaws.com/paquetes-turisticos-1.jpg"
            alt="Plan turístico 2021"
          />
        </div>
      </Carousel>
    </Col>
	);
};


export async function getServerSideProps() {
  const url = 'https://fakestoreapi.com/products?limit=3';
  const res = await fetch(url);
  const promotions = await res.json();
  return {
    props: {
      promotions
    }
  };
}


export default PromCarousel;



