import Carousel from 'react-bootstrap/Carousel';
import image from '../../src/pianta.png'

export function CarouselComp() {
  return (
    <Carousel>
      <Carousel.Item interval={4000}>
      <img src={image} text="Second slide" width="400px" />
        <Carousel.Caption>
          <h3>First slide label</h3>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={4000}>
        <img src={image} text="Second slide"  width="400px" />
        <Carousel.Caption>
          <h3>Second slide label</h3>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item interval={4000}>
      <img src={image} text="Second slide"  width="400px" />
        <Carousel.Caption >
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}
