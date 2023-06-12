import React from "react";
import { Carousel } from "react-bootstrap";
import plaza from "../components/image/plaza.jpg";
import kajak from "../components/image/kajak.jpg";
import toys from "../components/image/toys.jpg";

const MainPage = () => {
  const heightItem = {
    maxHeight: "94vh",
  };

  const bgColor = {
    backgroundColor: "#56667A",
    borderRadius: 15,
    opacity: 0.8,
  };

  return (
    <Carousel>
      <Carousel.Item style={heightItem}>
        <img className="d-block w-100" src={kajak} alt="First slide" />
        <Carousel.Caption style={bgColor}>
          <h3>U nas znajdziesz wszystko</h3>
          <p>Nie czekaj, sprawdź sam !!!</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item style={heightItem}>
        <img className="d-block w-100" src={plaza} alt="Second slide" />

        <Carousel.Caption style={bgColor}>
          <h3>Mamy najlesze ceny w okolicy</h3>
          <p>
            Dzięki nam zaoszczędzisz na kupnie nowego sprzętu, i będzisz mógł
            zostać dłużej
          </p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item style={heightItem}>
        <img className="d-block w-100" src={toys} alt="Third slide" />

        <Carousel.Caption style={bgColor}>
          <h3>Wszystko dla twojego dziecka</h3>
          <p>
            Dzieki szerokiej ofercie asortymentu dla dwojego dziecka, napewno
            chwilę odpoczniesz kiedy on będzie się świetnie bawił
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
};

export default MainPage;
